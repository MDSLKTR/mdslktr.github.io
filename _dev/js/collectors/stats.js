var statsCollectorClass = React.createClass({
    displayName: 'stats-collector',
    getInitialState: function () {
        return {
            itemCollection: [],
            calculating: false
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.item.collection', function (data) {
            self.setState({
                itemCollection: data
            });
        });

        EventSystem.subscribe('api.call.active-skills', function (data) {
            self.setState({
                skills: data
            });
        });

        EventSystem.subscribe('api.call.general-stats', function (data) {
            self.setState({
                generalStats: data
            });
        });

        EventSystem.subscribe('api.call.item.set-ring', function (data) {
            self.setState({
                setRing: data
            });
        });

        setInterval(function () {
            self.collect();
        }, 5000);
    },

    collect: function () {
        var that = this;

        if (!this.state.itemCollection || !this.state.skills || !this.state.generalStats ) {
            return;
        }
        if (this.state.calculating) {
            return;
        }
        return new Promise(function (resolve, reject) {
            that.setState({
                calculating: true
            });
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
                    i,
                    m,
                    j,
                    mergedProps = Object.assign({}, off, def),
                    repeatSet = [];

                for (stat in mergedProps) {
                    if (mergedProps.hasOwnProperty(stat)) {
                        mergedProps[stat].value = mergedProps[stat].multiplicative ? 1 : 0;
                    }
                }

                for (i = 0; i < itemSlots.length; i++) {
                    for (stat in off) {
                        if (off.hasOwnProperty(stat)) {
                            if (itemSlots[i].attributesRaw) {
                                if (itemSlots[i].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw[off[stat].key].min) {

                                    if (off[stat].multiplicative) {
                                        off[stat].value *= parseFloat(itemSlots[i].attributesRaw[off[stat].key].min);
                                    } else {
                                        off[stat].value += parseFloat(itemSlots[i].attributesRaw[off[stat].key].min);
                                    }
                                }
                            }

                            if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                if (off[stat].multiplicative) {
                                    if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                        off[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                    }

                                    if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                        off[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min);
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
                                                        off[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                    } else {
                                                        off[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                if (itemSlots[i].set.ranks[j].attributesRaw[off[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min) {
                                                    if (off[stat].multiplicative) {
                                                        off[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
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
                                        def[stat].value *= parseFloat(itemSlots[i].attributesRaw[def[stat].key].min);
                                    } else {
                                        def[stat].value += parseFloat(itemSlots[i].attributesRaw[def[stat].key].min);
                                    }


                                }
                            }

                            if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                if (def[stat].multiplicative) {
                                    if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                        def[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                    }

                                    if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                        def[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min);
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
                                                        def[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                    } else {
                                                        def[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                if (itemSlots[i].set.ranks[j].attributesRaw[def[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min) {
                                                    if (def[stat].multiplicative) {
                                                        def[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
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
                    var mergedObjects = Object.assign({}, that.state.offensiveStats, that.state.defensiveStats);
                    EventSystem.publish('api.collect.offensive-stats', that.state.offensiveStats);
                    EventSystem.publish('api.collect.defensive-stats', that.state.defensiveStats);
                    EventSystem.publish('api.collect.merged-stats', mergedObjects);
                });

                resolve();

                that.setState({
                    calculating: false
                });

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
                offensiveStats: Stats.init('OffensiveStats'),
                defensiveStats: Stats.init('DefensiveStats'),
                setPool: Sets.get(),
                setRing: that.state.setRing
            });
        });
    },

    render: function () {
        return (
            React.DOM.div({
                    className: '', style: {'visibility': 'hidden'}
                }, 'Stat Collector on:', this.state.calculating.toString()
            )
        );
    }
});

var statsCollector = React.createFactory(statsCollectorClass);