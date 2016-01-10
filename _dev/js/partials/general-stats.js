var generalStatsClass = React.createClass({
    displayName: 'general-stats-component',
    getInitialState: function () {
        return {
            generalStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                generalStats: data.general
            });
        });
    },

    render: function () {
        var content = '',
            base = [];

        if (!this.state.generalStats) {
            return;
        }

        for (var generalStat in this.state.generalStats) {
            if (this.state.generalStats.hasOwnProperty(generalStat)) {
                content = '';
                content += this.state.generalStats[generalStat].value;

                if (generalStat === 'class') {
                    content =
                        this.state.generalStats[generalStat].value.toString().replace(/-/g, '').charAt(0).toUpperCase() +
                        this.state.generalStats[generalStat].value.toString().replace(/-/g, '').slice(1).toLowerCase();
                }

                // todo get icons from the api here
                if (generalStat === 'hardcore') {
                    if (this.state.generalStats[generalStat].value) {
                        this.state.generalStats[generalStat].name = 'Hardcore Character';
                    }
                }

                if (generalStat === 'lastUpdated') {
                    var t = new Date(this.state.generalStats[generalStat].value * 1000);
                    content = t.toLocaleDateString() + ' - ' + t.toLocaleTimeString();
                }

                if ( content ) {
                    base.push(React.DOM.div({key: generalStat}, this.state.generalStats[generalStat].name + ': ' + content));
                }
            }
        }

        return (
            React.DOM.div({className: 'd3-general-stats'}, 'General', base)
        );
    }
});

var generalStats = React.createFactory(generalStatsClass);
