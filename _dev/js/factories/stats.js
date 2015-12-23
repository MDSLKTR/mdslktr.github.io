var Stats;
Stats = React.createClass({
    statics: {
        offensiveStats: {},
        defensiveStats: {},
        init: function (statList) {
            var statKeys = [
                    'OffensiveStats',
                    'DefensiveStats',
                    'SkillDamage'
                ],
                self = this,
                returnValue = null;

            statKeys.forEach(function (statKey) {
                if (statList === statKey) {
                    var key = statKey.toString(),
                        prefix = 'init',
                        func = prefix.concat(key);

                    returnValue = self[func]();
                }
            });
            return returnValue;
        },

        get: function (statList) {
            var statKeys = [
                    'OffensiveStats',
                    'DefensiveStats',
                    'SkillDamage'
                ],
                self = this,
                returnValue = null;

            statKeys.forEach(function (statKey) {
                if (statList === statKey) {
                    var key = statKey.toString(),
                        prefix = 'get',
                        func = prefix.concat(key);

                    returnValue = self[func]();
                }
            });
            return returnValue;
        },

        set: function (statList, stat, prop, deepProp, value) {
            var statKeys = [
                    'OffensiveStats',
                    'DefensiveStats',
                    'SkillDamage'
                ],
                self = this,
                returnValue = null;

            statKeys.forEach(function (statKey) {
                if (statList === statKey) {
                    var key = statKey.toString(),
                        prefix = 'set',
                        func = prefix.concat(key);

                    returnValue = self[func](stat, prop, deepProp, value);
                }
            });
            return returnValue;
        },

        initOffensiveStats: function () {
            this.offensiveStats = {
                'critChance': {
                    name: 'Critical Hit Chance',
                    paragonModifier: {
                        increment: 0.1,
                        max: 5,
                        value: 0
                    },
                    unit: '%',
                    key: 'critChance',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 100,
                    isParagonStat: true
                },
                'critDamage': {
                    name: 'Critical Hit Damage',
                    paragonModifier: {
                        increment: 1,
                        max: 50,
                        value: 0
                    },
                    unit: '%',
                    errorCorrection: -100,
                    key: 'critDamage',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 100,
                    isParagonStat: true
                },
                'primaryResource': {
                    name: 'Primary Resource',
                    paragonModifier: {
                        increment: 0.5,
                        max: 25,
                        value: 0
                    },
                    unit: '',
                    key: 'primaryResource',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1,
                    isParagonStat: true
                },
                'cooldownReduction': {
                    name: 'Cooldown Reduction',
                    paragonModifier: {
                        increment: 0.2,
                        max: 10,
                        value: 0
                    },
                    unit: '%',
                    key: 'Power_Cooldown_Reduction_Percent_All',
                    multiplicative: true,
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: true
                },
                ResCostRed: {
                    name: 'Resource Cost Reduction',
                    paragonModifier: {
                        increment: 0.2,
                        max: 10,
                        value: 0
                    },
                    unit: '%',
                    key: 'Resource_Cost_Reduction_Percent_All',
                    multiplicative: true,
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: true
                },
                eliteDmgBonus: {
                    name: 'Elite Damage Bonus',
                    unit: '%',
                    value: 0,
                    key: 'Damage_Percent_Bonus_Vs_Elites',
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                areaDamage: {
                    name: 'Area Damage Bonus',
                    paragonModifier: {
                        increment: 1,
                        max: 50,
                        value: 0
                    },
                    unit: '%',
                    key: 'Splash_Damage_Effect_Percent',
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: true
                },
                attacksPerSecond: {
                    name: 'Attacks Per Second',
                    paragonModifier: {
                        increment: 0.2,
                        max: 10,
                        value: 0
                    },
                    unit: '',
                    key: 'Attacks_Per_Second_Percent',
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 1,
                    isParagonStat: true
                },
                fireDmgBonus: {
                    name: 'Fire Damage Bonus',
                    type: 'offensive',
                    unit: '%',
                    key: 'Damage_Dealt_Percent_Bonus#Fire',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                physicalDmgBonus: {
                    name: 'Physical Damage Bonus',
                    type: 'offensive',
                    unit: '%',
                    key: 'Damage_Dealt_Percent_Bonus#Physical',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                coldDmgBonus: {
                    name: 'Cold Damage Bonus',
                    type: 'offensive',
                    unit: '%',
                    key: 'Damage_Dealt_Percent_Bonus#Cold',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                poisonDmgBonus: {
                    name: 'Poison Damage Bonus',
                    type: 'offensive',
                    unit: '%',
                    key: 'Damage_Dealt_Percent_Bonus#Poison',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                lightningDmgBonus: {
                    name: 'Lightning Damage Bonus',
                    type: 'offensive',
                    unit: '%',
                    key: 'Damage_Dealt_Percent_Bonus#Lightning',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                }
            };

            EventSystem.publish('api.collect.offensive-stats', this.offensiveStats);
        },

        initDefensiveStats: function () {
            this.defensiveStats = {
                goldPickUpRange: {
                    name: 'Gold Pick-up Range',
                    unit: ' yards',
                    key: 'Gold_PickUp_Radius',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 1
                },
                meleeDamageReduction: {
                    name: 'Melee Damage Reduction',
                    unit: '%',
                    key: 'Damage_Percent_Reduction_From_Melee',
                    multiplicative: true,
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                rangedDamageReduction: {
                    name: 'Ranged Damage Reduction',
                    unit: '%',
                    key: 'Damage_Percent_Reduction_From_Ranged',
                    multiplicative: true,
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                eliteDamageReduction: {
                    name: 'Elite Damage Reduction',
                    unit: '%',
                    key: 'Damage_Percent_Reduction_From_Elites',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100
                },
                maxHealthBonus: {
                    name: 'Max Health Bonus',
                    paragonModifier: {
                        increment: 0.5,
                        max: 25,
                        value: 0
                    },
                    unit: '%',
                    key: 'Hitpoints_Max_Percent_Bonus_Item',
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: true
                },
                'secondaryResource': {
                    name: 'Secondary Resource',
                    unit: '',
                    key: 'secondaryResource',
                    value: 0,
                    hasMods: false,
                    fromApi: true,
                    normalization: 1
                },
                'fireResist': {
                    name: 'Fire Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'fireResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'coldResist': {
                    name: 'Cold Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'coldResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'lightningResist': {
                    name: 'Lightning Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'lightningResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'physicalResist': {
                    name: 'Physical Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'physicalResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'poisonResist': {
                    name: 'Poison Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'poisonResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'arcaneResist': {
                    name: 'Arcane Resist',
                    paragonModifier: {
                        increment: 5,
                        max: 250,
                        value: 0
                    },
                    unit: '',
                    key: 'arcaneResist',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1
                },
                'lifeOnHit': {
                    name: 'Life on Hit',
                    paragonModifier: {
                        increment: 160.9,
                        max: 8046.3,
                        value: 0
                    },
                    unit: '',
                    key: 'lifeOnHit',
                    value: 0,
                    hasMods: true,
                    fromApi: true,
                    normalization: 1,
                    isParagonStat: true
                },
                'magicFind': {
                    name: 'Magic Find',
                    unit: '',
                    key: 'magicFind',
                    value: 0,
                    hasMods: false,
                    fromApi: true,
                    normalization: 100,
                    isParagonStat: false
                },
                'thorns': {
                    name: 'Thorns',
                    key: 'Thorns_Fixed#Physical',
                    unit: '',
                    value: 0,
                    hasMods: false,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: false
                },
                'movementSpeed': {
                    name: 'Movement Speed',
                    paragonModifier: {
                        increment: 0.5,
                        max: 25,
                        value: 0
                    },
                    unit: '%',
                    value: 0,
                    key: 'Movement_Scalar',
                    hasMods: true,
                    fromApi: false,
                    normalization: 100,
                    isParagonStat: true
                },
                'armor': {
                    name: 'Armor',
                    paragonModifier: {
                        increment: 0.5,
                        max: 25,
                        value: 0
                    },
                    unit: '%',
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 1,
                    isParagonStat: true
                },
                'allResist': {
                    name: 'Resist All',
                    paragonModifier: {
                        increment: 0.5,
                        max: 25,
                        value: 0
                    },
                    unit: '%',
                    value: 0,
                    hasMods: true,
                    fromApi: false,
                    normalization: 1,
                    isParagonStat: true
                }
            };

            EventSystem.publish('api.collect.defensive-stats', this.defensiveStats);
        },

        getOffensiveStats: function () {
            console.log('get', this.offensiveStats);
            return this.offensiveStats;
        },

        getDefensiveStats: function () {
            return this.defensiveStats;
        },

        getSkillDamage: function () {
            return {
                unit: '%',
                value: 0
            };
        },

        setOffensiveStats: function (stat, prop, deepProp, value) {
            console.log(stat, prop, deepProp, value);
            if (deepProp) {
                this.offensiveStats[stat][prop][deepProp] = value;
            } else {
                this.offensiveStats[stat][prop] = value;
            }

            console.log('set', this.offensiveStats);
            EventSystem.publish('api.call.collect');
        },

        setDefensiveStats: function (stat, prop, deepProp, value) {
            console.log(stat, prop, deepProp, value);
            if (deepProp) {
                this.defensiveStats[stat][prop][deepProp] = value;
            } else {
                this.defensiveStats[stat][prop] = value;
            }

            EventSystem.publish('api.call.collect');
        }
    },

    render: function () {}
});







