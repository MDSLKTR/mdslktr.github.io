var statsCollectorClass = React.createClass({
        displayName: 'stats-collector',
        getInitialState: function () {
            return {
                itemCollection: [],
                itemCount: 0
            };
        },
        componentDidMount: function () {
            var self = this;
            EventSystem.subscribe('api.call.item.collection', function (data) {
                self.setState({
                    itemCollection: data
                });
            });

            EventSystem.subscribe('api.call.stats', function (data) {
                self.setState({
                    primaryStats: data.primary
                });
            });

            EventSystem.subscribe('api.call.skills', function (data) {
                self.setState({
                    skills: data.actives
                });
            });

            EventSystem.subscribe('api.call.stats', function (data) {
                self.setState({
                    generalStats: data.general
                });
            });

            EventSystem.subscribe('api.call.item.set-ring', function (data) {
                self.setState({
                    setRing: data
                });
            });

            EventSystem.subscribe('api.call.items', function (data) {
                self.setState({
                    itemCount: data.count
                });
            });


            EventSystem.subscribe('api.try.collect', function (data) {
                if (self.state.itemCount === data) {
                    self.collect();
                }
            });

            EventSystem.subscribe('api.call.collect', function () {
                self.collect();
            });
        },

        collect: function () {
            var that = this;

            if (!this.state.itemCollection || !this.state.skills || !this.state.generalStats) {
                return;
            }

            return new Promise(function (resolve, reject) {
                Worker.create = function (workerJob) {
                    var str = workerJob.toString();
                    var blob = new Blob(
                        ['\'use strict\';\nself.onmessage =' + str],
                        {type: 'text/javascript'}
                    );
                    return window.URL.createObjectURL(blob);
                };

                // worker job
                var workerBlob = Worker.create(function (e) {
                    // image modification data goes here
                    var itemSlots = e.data.itemSlots,
                        off = e.data.offensiveStats,
                        def = e.data.defensiveStats,
                        setRing = e.data.setRing,
                        stat,
                        setPool = e.data.setPool,
                        primaryStats = e.data.primaryStats,
                        i,
                        m,
                        j,
                        repeatSet = [];

                    for (i = 0; i < itemSlots.length; i++) {
                        for (stat in off) {
                            if (off.hasOwnProperty(stat)) {
                                if (itemSlots[i].attributesRaw) {
                                    if (itemSlots[i].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw[off[stat].key].min) {
                                        if (off[stat].multiplicative) {
                                            off[stat].value *= (1 - parseFloat(itemSlots[i].attributesRaw[off[stat].key].min));
                                        } else {
                                            off[stat].value += parseFloat(itemSlots[i].attributesRaw[off[stat].key].min);
                                        }
                                    }
                                }

                                if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                    if (off[stat].multiplicative) {
                                        if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            off[stat].value *= (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min));
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            off[stat].value *= (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min));
                                        }
                                    } else {
                                        if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            off[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            off[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min);
                                        }
                                    }
                                }

                                if (itemSlots[i].set && itemSlots[i].set.ranks) {
                                    for (m = 0; m < setPool.length; m++) {
                                        if (itemSlots[i].set.name === setPool[m][0]) {
                                            setPool[m][1]++;
                                        }

                                        for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                            if (setRing) {
                                                // TODO this is failing
                                                if (
                                                    itemSlots[i].set.name === setPool[m][0] &&
                                                    itemSlots[i].set.ranks[j].required <= setPool[m][1] + 1 &&
                                                    setPool[m][1] >= 2
                                                ) {
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[off[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min) {
                                                        if (off[stat].multiplicative) {
                                                            off[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min));
                                                        } else {
                                                            off[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[off[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min) {
                                                        if (off[stat].multiplicative) {
                                                            off[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min));
                                                        } else {
                                                            off[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // TODO this is failing
                                    if (repeatSet.indexOf(itemSlots[i].set.name) > -1) {
                                        continue;
                                    }
                                    repeatSet.push(itemSlots[i].set.name);
                                }
                            }
                        }

                        for (stat in def) {
                            if (def.hasOwnProperty(stat)) {
                                if (itemSlots[i].attributesRaw) {
                                    if (itemSlots[i].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw[def[stat].key].min) {

                                        if (def[stat].multiplicative) {
                                            def[stat].value *= (1 - parseFloat(itemSlots[i].attributesRaw[def[stat].key].min));
                                        } else {
                                            def[stat].value += parseFloat(itemSlots[i].attributesRaw[def[stat].key].min);
                                        }
                                    }
                                }

                                if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                    if (def[stat].multiplicative) {
                                        if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            def[stat].value *= (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min));
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            def[stat].value *= (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min));
                                        }
                                    } else {
                                        if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            def[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            def[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min);
                                        }
                                    }
                                }

                                if (itemSlots[i].set && itemSlots[i].set.ranks) {
                                    for (m = 0; m < setPool.length; m++) {
                                        if (itemSlots[i].set.name === setPool[m][0]) {
                                            setPool[m][1]++;
                                        }
                                        for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                            if (setRing) {
                                                if (
                                                    itemSlots[i].set.name === setPool[m][0] &&
                                                    itemSlots[i].set.ranks[j].required <= setPool[m][1] + 1 &&
                                                    setPool[m][1] >= 2
                                                ) {
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[def[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min) {
                                                        if (def[stat].multiplicative) {
                                                            def[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min));
                                                        } else {
                                                            def[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[def[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min) {
                                                        if (def[stat].multiplicative) {
                                                            def[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min));
                                                        } else {
                                                            def[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (repeatSet.indexOf(itemSlots[i].set.name) > -1) {
                                        continue;
                                    }
                                    repeatSet.push(itemSlots[i].set.name);
                                }
                            }
                        }
                    }

                    for (stat in off) {
                        if (off.hasOwnProperty(stat)) {
                            if (primaryStats[off[stat].key]) {
                                if (off[stat].multiplicative) {
                                    off[stat].value *= (1 - parseFloat(primaryStats[off[stat].key]));
                                } else {
                                    off[stat].value += primaryStats[off[stat].key];
                                }
                            }

                            if (off[stat].paragonModifier) {
                                if (off[stat].multiplicative) {
                                    off[stat].value *= (1 - parseFloat(off[stat].paragonModifier.value / off[stat].normalization));
                                } else {
                                    off[stat].value += off[stat].paragonModifier.value / off[stat].normalization;
                                }
                            }

                            if (off[stat].multiplicative) {
                                off[stat].value = 1 - off[stat].value;
                            }

                            if (off[stat].normalization) {
                                off[stat].value *= off[stat].normalization;
                            }

                            if (off[stat].errorCorrection) {
                                off[stat].value += off[stat].errorCorrection;
                            }

                            if (off[stat].addStat) {
                                off[stat].value += off[off[stat].addStat].value * off[off[stat].addStat].normalization + off[off[stat].addStat].paragonModifier.value;
                            }

                            if (off[stat].value > off[stat].cap) {
                                off[stat].value = off[stat].cap;
                            }

                            off[stat].value = Math.floor((off[stat].value) * 100) / 100;
                        }
                    }


                    for (stat in def) {
                        if (def.hasOwnProperty(stat)) {
                            if (primaryStats[def[stat].key]) {
                                if (def[stat].multiplicative) {
                                    def[stat].value *= (1 - parseFloat(primaryStats[def[stat].key]));
                                } else {
                                    def[stat].value += primaryStats[def[stat].key];
                                }
                            }

                            if (def[stat].paragonModifier) {
                                if (def[stat].multiplicative) {
                                    def[stat].value *= (1 - parseFloat(def[stat].paragonModifier.value / def[stat].normalization));
                                } else {
                                    def[stat].value += def[stat].paragonModifier.value / def[stat].normalization;
                                }
                            }

                            if (def[stat].multiplicative) {
                                def[stat].value = 1 - def[stat].value;
                            }

                            if (def[stat].normalization) {
                                def[stat].value *= def[stat].normalization;
                            }

                            if (def[stat].errorCorrection) {
                                def[stat].value += def[stat].errorCorrection;
                            }

                            if (def[stat].addStat) {
                                def[stat].value += def[def[stat].addStat].value * def[def[stat].addStat].normalization + def[def[stat].addStat].paragonModifier.value;
                            }

                            if (def[stat].value > def[stat].cap) {
                                def[stat].value = def[stat].cap;
                            }

                            def[stat].value = Math.floor((def[stat].value) * 100) / 100;
                        }
                    }

                    // send results back to the main thread
                    this.postMessage({
                        offensiveStats: off,
                        defensiveStats: def
                    });

                    // die
                    this.close();
                });

                // create worker instance
                var worker = new Worker(workerBlob);

                worker.onmessage = function (e) {
                    that.setState({
                        offensiveStats: e.data.offensiveStats,
                        defensiveStats: e.data.defensiveStats
                    }, function () {
                        EventSystem.publish('api.collect.offensive-stats', that.state.offensiveStats);
                        EventSystem.publish('api.collect.defensive-stats', that.state.defensiveStats);
                    });

                    resolve();

                    console.info('the web worker had a save journey');
                };

                // return a failure message if the worker didn't complete
                worker.onerror = function (e) {
                    reject(Error(
                        'one of the workers had an horrible accident\n' +
                        e.message +
                        ' in line ' +
                        e.lineno)
                    );
                    this.terminate();
                };

                worker.postMessage({
                    itemSlots: that.state.itemCollection,
                    offensiveStats: Stats.get('OffensiveStats'),
                    defensiveStats: Stats.get('DefensiveStats'),
                    setPool: Sets.get(),
                    setRing: that.state.setRing,
                    primaryStats: that.state.primaryStats
                });
            });
        },

        render: function () {
            return (
                React.DOM.div({
                        style: {'visibility': 'hidden'}
                    }, 'Stats Worker'
                )
            );
        }
    })
    ;

var statsCollector = React.createFactory(statsCollectorClass);
