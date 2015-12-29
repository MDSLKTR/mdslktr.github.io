var defensiveStatsClass = React.createClass({
    displayName: 'defensive-stats-component',
    getInitialState: function () {
        return {
            defensiveStats: {},
            generalStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.collect.defensive-stats', function (data) {
            self.setState({
                defensiveStats: data
            });
        });

        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                generalStats: data.general
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

                if (defensiveStats[defensiveStat].specificName && this.state.generalStats.class) {
                    if (defensiveStats[defensiveStat].specificName[this.state.generalStats.class.value]) {
                        contentName += defensiveStats[defensiveStat].specificName[this.state.generalStats.class.value];
                    }
                } else {
                    contentName += defensiveStats[defensiveStat].name;
                }

                contentName += ': ';

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
