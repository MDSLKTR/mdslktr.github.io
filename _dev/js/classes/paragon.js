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
        EventSystem.subscribe('api.call.stats', function( data ) {
            self.setState({
                mergedStats: Object.assign({}, data.offensiveStats, data.defensiveStats)
            }, function () {
                self.loadParagonStats( self.state.mergedStats );
            });
        });
    },

    loadParagonStats: function (mergedStats) {
        for (var stat in mergedStats) {
            if (mergedStats.hasOwnProperty(stat)) {
                if (mergedStats[stat].isParagonStat) {
                    if (storage.get(stat)) {
                        mergedStats[stat].paragonModifier.value = parseInt(storage.get(stat));
                    } else {
                        mergedStats[stat].paragonModifier.value = 0;
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
        //this.setState({panelAnimationComplete: false});
        //
        //panelLeftAdditionalHeight = panelLeftAdditional.offsetHeight;
        //if (this.state.paragonToggle !== 'visible') {
        //    this.animateBonusPanelIn(panelLeftAdditional, panelLeftAdditionalHeight, false);
        //    this.setState({paragonToggle: 'visible'});
        //} else {
        //    this.animateBonusPanelOut(panelLeftAdditional, panelLeftAdditionalHeight, -1);
        //    this.setState({paragonToggle: 'hidden'});
        //}
    },

    handleParagon: function (e) {
        var target = e.target;
        var parentElement = target.parentNode;
        // Todo remap wrong paragon stats

        var mergedStats = this.state.mergedStats;

        for (var stat in mergedStats) {
            if (mergedStats.hasOwnProperty(stat)) {
                if (mergedStats[stat].isParagonStat) {
                    if (parentElement.classList.contains(stat)) {
                        if (target.classList.contains('paragon-stat-increment')) {
                            if (mergedStats[stat].paragonModifier.value < mergedStats[stat].paragonModifier.max) {
                                mergedStats[stat].paragonModifier.value = Math.round((mergedStats[stat].paragonModifier.value + mergedStats[stat].paragonModifier.increment ) * 10) / 10;
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
                    }
                }
            }
        }
        // Todo, send to stats collector
        //this.triggerStatCollector();
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
                className: 'panel-left-additional ',
                ref: 'pla'
            }, 'Paragon Points: ', paragonStats, React.DOM.a({
                className: 'button',
                onClick: this.handleParagonStatsClick,
                title: 'click to close'
            }, React.DOM.span({className: 'button-text'}, 'close')))
        );
    }
});

var paragon = React.createFactory(paragonClass);
