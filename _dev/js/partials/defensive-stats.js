var defensiveStatsClass = React.createClass({
    displayName: 'defensive-stats-component',
    getInitialState: function () {
        return {
            primaryStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.collect.defensive-stats', function (data) {
            self.setState({
                defensiveStats: data
            });
        });
    },

    render: function () {
        var contentName,
            stats = [],
            defensiveStats = this.state.defensiveStats;

        for (var defensiveStat in defensiveStats) {
            if (defensiveStats.hasOwnProperty(defensiveStat)) {
                contentName = '';

                if (defensiveStats[defensiveStat].name) {
                    contentName += defensiveStats[defensiveStat].name;
                    contentName += ': ';
                }

                if (defensiveStats[defensiveStat].value && !defensiveStats[defensiveStat].hide) {
                    stats.push(React.DOM.div({
                        key: defensiveStat,
                        className: 'bonusstat'
                    }, contentName + defensiveStats[defensiveStat].value + defensiveStats[defensiveStat].unit));
                }
            }
        }
        return (
            React.DOM.div(null, 'Defensive Stats', stats)
        );
    }
});

var defensiveStats = React.createFactory(defensiveStatsClass);
