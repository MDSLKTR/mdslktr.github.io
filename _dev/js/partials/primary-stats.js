var primaryStatsClass = React.createClass({
    displayName: 'primary-stats-component',
    getInitialState: function () {
        return {
            primaryStats: {},
            primaryStatsMap: {
                'life': {
                    name: 'Life',
                    paragonMod: 'maxHealthBonus'
                },
                'toughness': {
                    name: 'Toughness'
                },
                'dexterity': {
                    name: 'Dexterity'
                },
                'strength': {
                    name: 'Strength'
                },
                'intelligence': {
                    name: 'Intelligence'
                },
                'vitality': {
                    name: 'Vitality'
                },
                'armor': {
                    name: 'Armor',
                    paragonMod: 'armor'
                },
                'damageIncrease': {
                    name: 'Damage Increase'
                },
                'healing': {
                    name: 'Healing'
                }
            }
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                primaryStats: data.primary
            });
        });

        EventSystem.subscribe('api.collect.defensive-stats', function (data) {
            self.setState({
                defensiveStats: data
            });
        });
    },

    render: function () {
        var content,
            stats = [],
            primaryStats = this.state.primaryStatsMap;

        for (var primaryStat in primaryStats) {
            if (primaryStats.hasOwnProperty(primaryStat)) {
                content = '';
                if (this.state.primaryStats[primaryStat] > 100) {
                    if (this.state.defensiveStats && primaryStats[primaryStat].paragonMod) {
                        content += primaryStats[primaryStat].name + ': ' + Math.round(this.state.primaryStats[primaryStat] +
                                    this.state.primaryStats[primaryStat] *
                                    this.state.defensiveStats[primaryStats[primaryStat].paragonMod].paragonModifier.value / 100)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    } else {
                        content += primaryStats[primaryStat].name + ': ' + Math.round(this.state.primaryStats[primaryStat])
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    }

                    stats.push(React.DOM.div({key: primaryStat}, content));
                }
            }
        }

        return (
            React.DOM.div(null, 'Primary Stats', stats
            )
        );
    }
});

var primaryStats = React.createFactory(primaryStatsClass);
