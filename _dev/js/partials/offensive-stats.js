var offensiveStatsClass = React.createClass({
    displayName: 'offensive-stats-component',
    getInitialState: function () {
        return {
            offhand: {},
            mainHand: {},
            offensiveStats: {},
            generalStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;

        EventSystem.subscribe('api.call.item.offhand', function (data) {
            self.setState({
                offHand: data
            });
        });

        EventSystem.subscribe('api.call.item.mainhand', function (data) {
            self.setState({
                mainHand: data
            });
        });

        EventSystem.subscribe('api.collect.offensive-stats', function (data) {
            self.setState({
                offensiveStats: data
            });
        });

        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                generalStats: data.general
            });
        });
    },

    normalizeWeaponAttackSpeed: function (value, mainHandSpeed, offHandModifier) {
        return offHandModifier ?
        Math.round((mainHandSpeed + mainHandSpeed * (offHandModifier + value)) * 100) / 100 :
        Math.round((mainHandSpeed + mainHandSpeed * value) * 100) / 100;
    },

    render: function () {
        var contentName,
            value,
            stats = [],
            mainHandState = this.state.mainHand,
            offHandState = this.state.offHand,
            offensiveStats = this.state.offensiveStats;

        for (var offensiveStat in offensiveStats) {
            if (offensiveStats.hasOwnProperty(offensiveStat)) {
                contentName = '';
                value = 0;

                if (offensiveStats[offensiveStat].specificName && this.state.generalStats.class) {
                    if (offensiveStats[offensiveStat].specificName[this.state.generalStats.class.value]) {
                        contentName += offensiveStats[offensiveStat].specificName[this.state.generalStats.class.value];
                    }
                } else {
                    contentName += offensiveStats[offensiveStat].name;
                }

                contentName += ': ';
                if (offensiveStat === 'attacksPerSecond') {
                    value = this.normalizeWeaponAttackSpeed(
                        offensiveStats[offensiveStat].value / offensiveStats[offensiveStat].normalization,
                        mainHandState && mainHandState.attacksPerSecond ? mainHandState.attacksPerSecond.max : 0,
                        offHandState && offHandState.attacksPerSecond ? 0.15 : 0);
                } else {
                    value = offensiveStats[offensiveStat].value;
                }

                if (value && !offensiveStats[offensiveStat].hide) {
                    stats.push(React.DOM.div({
                        key: offensiveStat,
                        className: 'bonusstat'
                    }, contentName + value + offensiveStats[offensiveStat].unit));
                }
            }
        }
        return (
            React.DOM.div(null, 'Offensive Stats', stats, skillDamage()
            )
        );
    }
});

var offensiveStats = React.createFactory(offensiveStatsClass);
