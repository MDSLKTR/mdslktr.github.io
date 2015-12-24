var edpsClass = React.createClass({
    displayName: 'edps-component',
    getInitialState: function () {
        return {
            primaryStats: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                primaryStats: data.primary
            });
        });
    },

    render: function () {
        var stats = null;
        //if (statsState && statsState.critDamage && statsState.critChance && minDmgCalc !== 0 && maxDmgCalc !== 0 && this.state.generalStats && this.state.offensiveStats) {
        //    var statCalc,
        //        minMaxCalc = (minDmgCalc + maxDmgCalc) * 0.5,
        //        critChanceCalc = statsState.critChance + (this.state.offensiveStats.critChance.paragonModifier.value / 100),
        //        critDmgCalc = statsState.critDamage - 1 + (this.state.offensiveStats.critDamage.paragonModifier.value / 100),
        //        sheetDpsCalc,
        //
        //        effectiveCritChance = critChanceCalc,
        //        effectiveCritDamage = critDmgCalc,
        //        buffMult = 0,
        //        eleMult = 0,
        //        effectiveDpsCalc,
        //    // test value - to be replaced with skill damage
        //        skillDamage = 3,
        //        gemMult = 1,
        //
        //        maxSkillDmg,
        //        nativeSkillDamage,
        //        pushedValues = [];
        //
        //    pushedValues.length = 0;
        //
        //    if (generalStats.class.value === 'demon-hunter' || generalStats.class.value === 'monk') {
        //        statCalc = statsState.dexterity / 100;
        //    } else if (generalStats.class.value === 'barbarian' || generalStats.class.value === 'crusader') {
        //        statCalc = statsState.strength / 100;
        //    } else if (generalStats.class.value === 'wizard' || generalStats.class.value === 'witch-doctor') {
        //        statCalc = statsState.intelligence / 100;
        //    } else {
        //        statCalc = 1;
        //        console.log('new class?');
        //    }
        //
        //    sheetDpsCalc = (1 + statCalc) * minMaxCalc;
        //
        //    // Skill Damage
        //    if (this.state.skillDmgRaw) {
        //        for (i = 0; i < this.state.skillDmgRaw.length; i++) {
        //            skillsState.forEach(function (skillName) {
        //                if (skillName.skill) {
        //                    if (skillDmgStateRaw[i].search(skillName.skill.name.toString()) !== -1) {
        //                        pushedValues.push([skillDamage, skillDmgStateRaw[i]]);
        //                    }
        //                }
        //            });
        //        }
        //    }
        //
        //    // passive Buffs
        //    for (i = 0; i < passiveBuffPool.length; i++) {
        //        passivesState.forEach(function (passiveName) {
        //            if (passiveName.skill && passiveName.skill.name === passiveBuffPool[i][0]) {
        //                if (passiveBuffPool[i][1] === 'Damage') {
        //                    buffMult += passiveBuffPool[i][2];
        //                }
        //
        //                if (passiveBuffPool[i][1] === 'Crit Chance') {
        //                    effectiveCritChance += passiveBuffPool[i][2];
        //                }
        //            }
        //        });
        //    }
        //    // active Buffs
        //    for (i = 0; i < skillBuffPool.length; i++) {
        //        skillsState.forEach(function (skillName) {
        //            if (skillName.skill && skillName.rune) {
        //                if (skillName.skill.name === skillBuffPool[i][0] || skillName.rune.name === skillBuffPool[i][0]) {
        //                    if (skillBuffPool[i][1] === 'Damage') {
        //                        buffMult += skillBuffPool[i][2];
        //                    }
        //                }
        //            } else if (skillName.skill) {
        //                if (skillName.skill.name === skillBuffPool[i][0]) {
        //                    if (skillBuffPool[i][1] === 'Damage') {
        //                        buffMult += skillBuffPool[i][2];
        //                    }
        //                }
        //            }
        //        });
        //    }
        //
        //    // Elemental Damage Bonus
        //    if (this.state.maxEleDmgValue) {
        //        eleMult += this.state.maxEleDmgValue / 100;
        //    }
        //
        //    maxSkillDmg = pushedValues.sort();
        //
        //    if (maxSkillDmg[0]) {
        //        nativeSkillDamage = maxSkillDmg[0][0] * (1 + parseFloat(maxSkillDmg[0][1])) * (1 + eleMult);
        //    } else {
        //        nativeSkillDamage = 1;
        //    }
        //
        //    // todo fix this as it is garbage
        //    calculatedAttackSpeed = 1;
        //
        //    effectiveDpsCalc = sheetDpsCalc * calculatedAttackSpeed * (effectiveCritChance * effectiveCritDamage + 1) * nativeSkillDamage * (1 + buffMult) * (1 + gemMult);
        //
        //    if (!effectiveDpsCalc) {
        //        statsArray.push(React.DOM.div({key: 'dps'}, 'DPS: ',
        //            Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        //            ' | EDPS: ',
        //            'Calculating EDPS..'
        //        ));
        //    } else {
        //        statsArray.push(React.DOM.div({key: 'dps'}, 'DPS: ',
        //            Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        //            ' | EDPS: ',
        //            Math.round(effectiveDpsCalc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        //        ));
        //    }
        //}

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

var edps = React.createFactory(edpsClass);
