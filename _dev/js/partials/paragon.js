var paragonClass = React.createClass({
    displayName: 'paragon-component',
    getInitialState: function () {
        return {
            mergedStats: {},
            paragonStats: []
        };
    },
    componentDidMount: function () {
        var self = this;

        // todo fix this better
        EventSystem.subscribe('api.call.paragon', function () {
            self.setState({
                offensiveStats: Stats.get('OffensiveStats'),
                defensiveStats: Stats.get('DefensiveStats')
            }, function () {
                self.setState({
                    mergedStats: Object.assign(self.state.offensiveStats, self.state.defensiveStats)
                }, function () {
                    self.loadParagonStats( this.state.mergedStats );
                });
            });
        });
    },

    loadParagonStats: function (mergedStats) {
        for (var stat in mergedStats) {
            if (mergedStats.hasOwnProperty(stat)) {
                if (mergedStats[stat].isParagonStat) {
                    if (storage.get(stat)) {
                        if (Stats.get('OffensiveStats').hasOwnProperty(stat)) {
                            Stats.set('OffensiveStats', stat.toString(), 'paragonModifier', 'value', parseFloat(storage.get(stat)));
                        } else {
                            Stats.set('DefensiveStats', stat.toString(), 'paragonModifier', 'value', parseFloat(storage.get(stat)));
                        }
                        this.forceUpdate();
                        //mergedStats[stat].paragonModifier.value = parseInt(storage.get(stat));
                    }
                }
            }
        }
    },

    checkParagon: function (mergedStats) {
        for (var stat in mergedStats) {
            if (mergedStats.hasOwnProperty(stat)) {
                if (mergedStats[stat].isParagonStat) {
                    var node = ReactDOM.findDOMNode(this.refs[stat]);
                    if (mergedStats[stat].paragonModifier.value === mergedStats[stat].paragonModifier.max) {
                        node.classList.add('maxed');
                    }
                }
            }
        }
    },

    handleParagonStatsClick: function () {
        // TODO call animate service here
        this.checkParagon(this.state.mergedStats);
    },

    handleParagon: function (e) {
        var target = e.target,
            parentElement = target.parentNode,
            mergedStats = this.state.mergedStats;

        for (var stat in mergedStats) {
            if (mergedStats.hasOwnProperty(stat)) {
                if (mergedStats[stat].isParagonStat) {
                    if (parentElement.classList.contains(stat)) {
                        if (target.classList.contains('paragon-stat-increment')) {
                            if (mergedStats[stat].paragonModifier.value < mergedStats[stat].paragonModifier.max) {
                                mergedStats[stat].paragonModifier.value = Math.round((mergedStats[stat].paragonModifier.value + mergedStats[stat].paragonModifier.increment) * 10) / 10;
                            }
                        } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                            target.classList.add('maxed');
                            mergedStats[stat].paragonModifier.value = mergedStats[stat].paragonModifier.max;
                        } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                            target.classList.remove('maxed');
                            mergedStats[stat].paragonModifier.value = 0;
                        } else {
                            if (mergedStats[stat].paragonModifier.value > 0) {
                                mergedStats[stat].paragonModifier.value = Math.round((mergedStats[stat].paragonModifier.value - mergedStats[stat].paragonModifier.increment) * 10) / 10;
                            }
                        }

                        storage.save(stat, mergedStats[stat].paragonModifier.value);

                        if (Stats.get('OffensiveStats').hasOwnProperty(stat)) {
                            Stats.set('OffensiveStats', stat.toString(), 'paragonModifier', 'value', mergedStats[stat].paragonModifier.value);
                        } else {
                            Stats.set('DefensiveStats', stat.toString(), 'paragonModifier', 'value', mergedStats[stat].paragonModifier.value);
                        }
                    }
                }
            }
        }
        this.forceUpdate();
    },

    render: function () {
        var mergedStats = this.state.mergedStats,
            paragonStats = [],
            self = this;
        for (var pstat in mergedStats) {
            if (mergedStats.hasOwnProperty(pstat)) {
                if (mergedStats[pstat].isParagonStat) {
                    paragonStats.push(React.DOM.div({key: pstat, className: 'paragon-stat ' + pstat},
                        // TODO change unit for paragonStat invidiually
                        mergedStats[pstat].name + ' ' + Math.round(mergedStats[pstat].paragonModifier.value * 10) / 10 + mergedStats[pstat].unit,
                        React.DOM.span({
                            className: 'paragon-stat-increment',
                            onClick: self.handleParagon
                        }, '+'),
                        React.DOM.span({
                            className: 'paragon-stat-decrement',
                            onClick: self.handleParagon
                        }, '-'),
                        React.DOM.span({
                            ref: pstat,
                            className: 'paragon-stat-max',
                            onClick: self.handleParagon
                        })
                    ));
                }
            }
        }


        return (
            React.DOM.div({
                className: 'panel-left-additional'
            }, 'Paragon Points: ', paragonStats)
        );
    }
});

var paragon = React.createFactory(paragonClass);
