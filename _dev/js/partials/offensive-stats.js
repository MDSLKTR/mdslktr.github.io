var offensiveStatsClass = React.createClass({
    displayName: 'offensive-stats-component',
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

        EventSystem.subscribe('api.call.item-offhand', function (data) {
            self.setState({
                offHand: data
            });
        });

        EventSystem.subscribe('api.call.item-mainhand', function (data) {
            self.setState({
                mainHand: data
            });
        });

        EventSystem.subscribe('api.collect.offensive-stats', function (data) {
            self.setState({
                offensiveStats: data
            });
        });
    },

    normalizeMultiplicativeStat: function (value, modifier) {
        var normalizedMod = modifier / 100;
        if (value === 1) {
            return modifier;
        }
        return Math.floor((1 - Math.floor(value * (1 - normalizedMod) * 10000) / 10000) * 100) / 100;
    },

    normalizeWeaponAttackSpeed: function (value, modifier, mainHandSpeed, offHandModifier) {
        return offHandModifier ?
        Math.round((mainHandSpeed + mainHandSpeed * (offHandModifier + value + modifier)) * 100) / 100 :
        Math.round((mainHandSpeed + mainHandSpeed * (value + modifier)) * 100) / 100;
    },

    render: function () {
        var contentName,
            value,
            stats = [],
            mainHandState = this.state.mainHand,
            offHandState = this.state.offHand,
            offensiveStats = this.state.offensiveStats;

        if (this.state.primaryStats) {
            for (var offensiveStat in offensiveStats) {
                if (offensiveStats.hasOwnProperty(offensiveStat)) {
                    contentName = '';
                    value = 0;

                    if (offensiveStats[offensiveStat].name) {
                        contentName += offensiveStats[offensiveStat].name;
                        contentName += ': ';
                    }


                    if (offensiveStats[offensiveStat].fromApi) {
                        if (offensiveStats[offensiveStat].hasMods) {
                            switch (offensiveStat) {
                                case 'critDamage':
                                    value = Math.round((this.state.primaryStats[offensiveStats[offensiveStat].key] *
                                            offensiveStats[offensiveStat].normalization +
                                            offensiveStats[offensiveStat].paragonModifier.value +
                                            offensiveStats[offensiveStat].errorCorrection / 100) * 1000) / 1000;
                                    break;
                                default:
                                    value = Math.round((this.state.primaryStats[offensiveStats[offensiveStat].key] *
                                            offensiveStats[offensiveStat].normalization +
                                            offensiveStats[offensiveStat].paragonModifier.value) * 1000) / 1000;
                            }
                        } else {
                            switch (offensiveStat) {
                                case 'critDamage':
                                    value = Math.round((this.state.primaryStats[offensiveStats[offensiveStat].key] *
                                            offensiveStats[offensiveStat].normalization +
                                            offensiveStats[offensiveStat].errorCorrection) * 1000) / 1000;
                                    break;
                                default:
                                    value = Math.round(this.state.primaryStats[offensiveStats[offensiveStat].key *
                                            offensiveStats[offensiveStat].normalization] * 1000) / 1000;
                            }
                        }
                    } else {
                        if (offensiveStats[offensiveStat].hasMods) {
                            switch (offensiveStat) {
                                case 'ResCostRed':
                                case 'cooldownReduction':
                                    value = this.normalizeMultiplicativeStat(
                                        offensiveStats[offensiveStat].value,
                                        offensiveStats[offensiveStat].paragonModifier.value
                                    );
                                    break;
                                case 'attacksPerSecond':
                                    value = this.normalizeWeaponAttackSpeed(
                                        offensiveStats[offensiveStat].value * offensiveStats[offensiveStat].normalization,
                                        offensiveStats[offensiveStat].paragonModifier.value,
                                        mainHandState && mainHandState.attacksPerSecond ? mainHandState.attacksPerSecond.max : 0,
                                        offHandState && offHandState.attacksPerSecond ? 0.15 : 0
                                    );
                                    break;
                                default:
                                    value = (offensiveStats[offensiveStat].paragonModifier.value +
                                    offensiveStats[offensiveStat].value * offensiveStats[offensiveStat].normalization);
                            }
                        } else {
                            switch (offensiveStat) {
                                case 'ResCostRed':
                                case 'cooldownReduction':
                                    value = this.normalizeMultiplicativeStat(
                                        offensiveStats[offensiveStat].value,
                                        1
                                    );
                                    break;
                                case 'attacksPerSecond':
                                    value = this.normalizeWeaponAttackSpeed(
                                        offensiveStats[offensiveStat].value * offensiveStats[offensiveStat].normalization,
                                        1,
                                        mainHandState.attacksPerSecond ? mainHandState.attacksPerSecond.max : 0,
                                        offHandState.attacksPerSecond ? 0.15 : 0
                                    );
                                    break;
                                default:
                                    value = offensiveStats[offensiveStat].value * offensiveStats[offensiveStat].normalization;
                            }
                        }
                    }

                    if (value) {
                        stats.push(React.DOM.div({
                            key: offensiveStat,
                            className: 'bonusstat'
                        }, contentName + value + offensiveStats[offensiveStat].unit));
                    }
                }
            }
        }
        return (
            React.DOM.div({
                    className: 'whatever'
                }, 'Offensive Stats', stats, skillDamage()
            )
        );
    }
});

var offensiveStats = React.createFactory(offensiveStatsClass);
