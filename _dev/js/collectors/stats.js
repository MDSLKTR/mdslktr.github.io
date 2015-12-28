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

                var workerBlob = Worker.create(function (e) {
                    var itemSlots = e.data.itemSlots,
                        setRing = e.data.setRing,
                        mergedStats = Object.assign({},e.data.offensiveStats, e.data.defensiveStats),
                        stat,
                        setPool = e.data.setPool,
                        primaryStats = e.data.primaryStats,
                        i,
                        m,
                        j,
                        repeatSet = [];

                    for (i = 0; i < itemSlots.length; i++) {
                        for (stat in mergedStats) {
                            if (mergedStats.hasOwnProperty(stat)) {
                                if (itemSlots[i].attributesRaw) {
                                    if (itemSlots[i].attributesRaw[mergedStats[stat].key] && itemSlots[i].attributesRaw[mergedStats[stat].key].min) {
                                        if (mergedStats[stat].multiplicative) {
                                            mergedStats[stat].value *= (1 - parseFloat(itemSlots[i].attributesRaw[mergedStats[stat].key].min));
                                        } else {
                                            mergedStats[stat].value += parseFloat(itemSlots[i].attributesRaw[mergedStats[stat].key].min);
                                        }
                                    }
                                }

                                if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                    if (mergedStats[stat].multiplicative) {
                                        if (itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            mergedStats[stat].value *=
                                                (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min));
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            mergedStats[stat].value *=
                                                (1 - parseFloat(itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key].min));
                                        }
                                    } else {
                                        if (itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            mergedStats[stat].value +=
                                                parseFloat(itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                        }

                                        if (itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                            mergedStats[stat].value +=
                                                parseFloat(itemSlots[i].gems[0].attributesRaw[mergedStats[stat].key].min);
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
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min) {
                                                        if (mergedStats[stat].multiplicative) {
                                                            mergedStats[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min));
                                                        } else {
                                                            mergedStats[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                    if (itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min) {
                                                        if (mergedStats[stat].multiplicative) {
                                                            mergedStats[stat].value *= (1 - parseFloat(itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min));
                                                        } else {
                                                            mergedStats[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[mergedStats[stat].key].min);
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
                    }

                    for (stat in mergedStats) {
                        if (mergedStats.hasOwnProperty(stat)) {
                            if (primaryStats[mergedStats[stat].key]) {
                                if (mergedStats[stat].multiplicative) {
                                    mergedStats[stat].value *= (1 - parseFloat(primaryStats[mergedStats[stat].key]));
                                } else {
                                    mergedStats[stat].value += primaryStats[mergedStats[stat].key];
                                }
                            }

                            if (mergedStats[stat].paragonModifier) {
                                if (mergedStats[stat].multiplicative) {
                                    mergedStats[stat].value *= (1 - parseFloat(mergedStats[stat].paragonModifier.value / mergedStats[stat].normalization));
                                } else {
                                    mergedStats[stat].value += mergedStats[stat].paragonModifier.value / mergedStats[stat].normalization;
                                }
                            }

                            if (mergedStats[stat].multiplicative) {
                                mergedStats[stat].value = 1 - mergedStats[stat].value;
                            }

                            if (mergedStats[stat].normalization) {
                                mergedStats[stat].value *= mergedStats[stat].normalization;
                            }

                            if (mergedStats[stat].errorCorrection) {
                                mergedStats[stat].value += mergedStats[stat].errorCorrection;
                            }

                            if (mergedStats[stat].addStat) {
                                mergedStats[stat].value += mergedStats[mergedStats[stat].addStat].value *
                                    mergedStats[mergedStats[stat].addStat].normalization +
                                    mergedStats[mergedStats[stat].addStat].paragonModifier.value;
                            }

                            if (mergedStats[stat].value > mergedStats[stat].cap) {
                                mergedStats[stat].value = mergedStats[stat].cap;
                            }

                            mergedStats[stat].value = Math.floor((mergedStats[stat].value) * 100) / 100;
                        }
                    }

                    // send results back to the main thread
                    this.postMessage({
                        offensiveStats: e.data.offensiveStats,
                        defensiveStats: e.data.defensiveStats
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
