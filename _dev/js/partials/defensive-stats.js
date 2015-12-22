var defensiveStatsClass = React.createClass({
    displayName: 'defensive-stats-component',
    getInitialState: function () {
        return {
            primaryStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.primary-stats', function (data) {
            self.setState({
                primaryStats: data
            });
        });

        EventSystem.subscribe('api.collect.defensive-stats', function (data) {
            self.setState({
                defensiveStats: data
            });
        });
    },

    render: function () {
        var contentName,
            value,
            stats = [],
            defensiveStats = this.state.defensiveStats;

        if (this.state.primaryStats) {
            for (var defensiveStat in defensiveStats) {
                if (defensiveStats.hasOwnProperty(defensiveStat)) {
                    contentName = '';
                    value = 0;

                    if (defensiveStats[defensiveStat].name) {
                        contentName += defensiveStats[defensiveStat].name;
                        contentName += ': ';
                    }

                    if (defensiveStats[defensiveStat].fromApi) {
                        if (defensiveStats[defensiveStat].hasMods) {
                            value = Math.round((defensiveStats[defensiveStat].paragonModifier.value +
                                    this.state.primaryStats[defensiveStats[defensiveStat].key] *
                                    defensiveStats[defensiveStat].normalization) * 1000) / 1000;
                        } else {
                            value = Math.round((this.state.primaryStats[defensiveStats[defensiveStat].key]) * 1000) / 1000;
                        }
                    } else {
                        if (defensiveStats[defensiveStat].hasMods) {
                            value = Math.round((defensiveStats[defensiveStat].paragonModifier.value +
                                    defensiveStats[defensiveStat].value *
                                    defensiveStats[defensiveStat].normalization) * 1000) / 1000;
                        } else {
                            value = Math.round((defensiveStats[defensiveStat].value *
                                    defensiveStats[defensiveStat].normalization) * 1000) / 1000;
                        }
                    }

                    if (value) {
                        stats.push(React.DOM.div({
                            key: defensiveStat,
                            className: 'bonusstat'
                        }, contentName + value + defensiveStats[defensiveStat].unit));
                    }
                }
            }
        }
        return (
            React.DOM.div({
                    className: 'whatever'
                }, 'Defensive Stats', stats
            )
        );
    }
});

var defensiveStats = React.createFactory(defensiveStatsClass);