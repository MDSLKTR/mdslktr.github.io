var primaryStatsClass = React.createClass({
    displayName: 'primary-stats-component',
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
    },

    render: function () {
        var content,
            stats = [],
            primaryStats = {
                'life': {
                    name: 'Life'
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
                    name: 'Armor'
                },
                'damageIncrease': {
                    name: 'Damage Increase'
                },
                'healing': {
                    name: 'Healing'
                }
            };

        for (var primaryStat in primaryStats) {
            if (primaryStats.hasOwnProperty(primaryStat)) {
                content = '';
                if (this.state.primaryStats[primaryStat] > 100) {
                    if (primaryStat === 'life' && this.state.defensiveStats) {
                        content += primaryStats[primaryStat].name + ': ' + Math.round(this.state.primaryStats[primaryStat] +
                                this.state.primaryStats[primaryStat] *
                                this.state.defensiveStats.maxHealthBonus.paragonModifier.value / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    } else if (primaryStat === 'armor' && this.state.defensiveStats) {
                        content += primaryStats[primaryStat].name + ': ' + Math.round(this.state.primaryStats[primaryStat] +
                                this.state.primaryStats[primaryStat] *
                                this.state.defensiveStats.armor.paragonModifier.value / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    } else {
                        content += primaryStats[primaryStat].name + ': ' + Math.round(this.state.primaryStats[primaryStat]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    }

                    stats.push(React.DOM.div({key: primaryStat}, content));
                }
            }
        }

        return (
            // TODO where to put this
            React.DOM.div({
                    className: 'whatever',
                    ref: 'pl'
                }, 'Primary Stats', stats
            )
        );
    }
});

var primaryStats = React.createFactory(primaryStatsClass);
