var paragonClass = React.createClass({
    displayName: 'paragon-component',
    getInitialState: function () {
        return {
            mergedStats: {},
            paragonStats: [],
            generalStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;

        EventSystem.subscribe('api.call.paragon', function () {
            self.setState({
                offensiveStats: Stats.get('OffensiveStats'),
                defensiveStats: Stats.get('DefensiveStats')
            }, function () {
                self.setState({
                    mergedStats: Object.assign({}, self.state.offensiveStats, self.state.defensiveStats)
                }, function () {
                    self.loadParagonStats( this.state.mergedStats );
                    self.checkParagon( this.state.mergedStats );
                });
            });
        });

        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                generalStats: data.general
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
            self = this,
            contentName = '';

        for (var pstat in mergedStats) {
            if (mergedStats.hasOwnProperty(pstat)) {
                contentName = '';
                if (mergedStats[pstat].isParagonStat) {


                    if (mergedStats[pstat].specificName && this.state.generalStats.class) {
                        if (mergedStats[pstat].specificName[this.state.generalStats.class.value]) {
                            contentName += mergedStats[pstat].specificName[this.state.generalStats.class.value];
                        }
                    } else {
                        contentName += mergedStats[pstat].name;
                    }

                    contentName += ': ';

                    paragonStats.push(React.DOM.div({key: pstat, className: 'paragon-stat ' + pstat},
                        contentName + mergedStats[pstat].paragonModifier.value + mergedStats[pstat].unit,
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
            React.DOM.div({className: 'd3-paragon-container'}, 'Paragon Points: ', paragonStats)
        );
    }
});

var paragon = React.createFactory(paragonClass);
