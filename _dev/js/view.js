var backgroundImage,
    start,
    end,
    panelLeft,
    panelRight,
    panelBottomLeft,
    panelBottomRight,
    panelRightAdditional,
    panelLeftAdditional,
    panelLeftWidth,
    panelRightWidth,
    panelBottomLeftHeight,
    panelBottomRightHeight,
    panelBottomLeftWidth,
    panelBottomRightWidth,
    panelRightAdditionalHeight,
    panelLeftAdditionalHeight,
    panelBottomLeftAdditional,
    panelBottomRightAdditional,
    panelBottomLeftAdditionalHeight,
    panelBottomRightAdditionalHeight,
    itemWrapper,
    charBgWrapper,
    target,
    childElements,
    parentElement,
    input,
    i,
    j,
    k,
    m,
    results,
    skillDamageRaw = [],
    combined,
    string,
    calc,
    statsArray = [],
    specialPassive = [],
    base = [],
    style = [],
    shoulders = [],
    helmet = [],
    torso = [],
    hands = [],
    feet = [],
    ringLeft = [],
    ringRight = [],
    bracers = [],
    legs = [],
    mainHand = [],
    offHand = [],
    belt = [],
    neck = [],
    additionalStatsOffensive = [],
    additionalStatsDefensive = [],
    minDmgCalc,
    maxDmgCalc,
    d3Profile = React.createClass({
        displayName: 'd3Profile',
        getInitialState: function () {
            return {
                debugMode: true,
                passives: [],
                stats: [],
                items: {},
                attributes: [],
                class: '',
                name: '',
                level: '',
                paragon: '',
                helmItem: {},
                amuletItem: {},
                chestItem: {},
                bootsItem: {},
                glovesItem: {},
                shouldersItem: {},
                legsItem: {},
                bracersItem: {},
                mainItem: {},
                offItem: {},
                beltItem: {},
                ringItemLeft: {},
                ringItemRight: {},
                setRing: false,
                time: 0,
                toggle: '',
                skillDescToggle: '',
                passiveDescToggle: '',
                paragonToggle: '',
                hellfire_clear: '',
                heroesDataUrl: '',
                heroDataUrl: '',
                itemUrl: '',
                cubeItems: {},
                panelAnimationComplete: false,
                calculatingSkillDamage: false,
                calculatingStats: false,
                battleTag: localStorage.getItem('battleTag'),
                itemIconBase: 'http://media.blizzard.com/d3/icons/items/large/', // icon + format .png,
                skillIconBase: 'http://media.blizzard.com/d3/icons/skills/64/'
            };
        },

        checkParagonStat: function (stat) {
            return stat.paragonModifier ? true : false;
        },

        initStats: function () {
            this.setState({
                offensiveStats: stats.init('OffensiveStats'),
                defensiveStats: stats.init('DefensiveStats'),
                skillDamage: stats.init('SkillDamageStat')
            }, function () {
                this.loadParagonStats();
            });
        },

        triggerStatCollector: function () {
            this.checkSetItems();
            this.collectStats();
            this.collectSkillDamage();
            console.log('manual stat collector');
        },

        startStatCollectorRunner: function () {
            if (this.state.panelAnimationComplete) {
                //this.collectStats();
                //this.checkSetItems();
                //this.collectSkillDamage();

                console.log('automatic stat collector');
                return;
            }
            console.log('waiting for animations');
        },

        componentDidMount: function () {
        },

        animatePanelsIn: function () {
            this.setState({panelAnimationComplete: false});

            TweenLite.fromTo(
                panelLeft,
                2,
                {
                    x: panelLeftWidth * -1,
                    z: 0.01,
                    delay: 0.5
                },
                {
                    x: 0,
                    z: 0.01,
                    visibility: 'visible',
                    delay: 0.5,
                    ease: Back.easeOut.config(1.1),
                    onComplete: function () {
                        this.setState({panelAnimationComplete: true});

                        TweenLite.to(
                            itemWrapper,
                            2,
                            {
                                delay: 0.5,
                                opacity: 1,
                                visibility: 'visible'
                            }
                        );

                        TweenLite.to(
                            charBgWrapper,
                            2,
                            {
                                delay: 0.5,
                                opacity: 1,
                                visibility: 'visible'
                            }
                        );
                    }.bind(this)
                }
            );

            TweenLite.fromTo(
                panelRight,
                2,
                {
                    x: panelRightWidth,
                    z: 0.01,
                    delay: 0.5
                },
                {
                    x: 0,
                    ease: Back.easeOut.config(1.1),
                    z: 0.01,
                    visibility: 'visible',
                    delay: 0.5
                }
            );

            TweenLite.fromTo(
                panelBottomLeft,
                2,
                {
                    x: panelBottomLeftWidth * -1,
                    y: panelBottomLeftHeight,
                    delay: 0.5
                },
                {
                    x: 0,
                    y: 0,
                    ease: Back.easeOut.config(1.1),
                    z: 0.01,
                    visibility: 'visible',
                    delay: 0.5
                }
            );

            TweenLite.fromTo(
                panelBottomRight,
                2,
                {
                    x: panelBottomRightWidth,
                    y: panelBottomRightHeight,
                    delay: 0.5
                },
                {
                    x: 0,
                    y: 0,
                    ease: Back.easeOut.config(1.1),
                    z: 0.01,
                    visibility: 'visible',
                    delay: 0.5
                }
            );
        },

        animatePanelsOut: function () {
            this.setState({panelAnimationComplete: false});

            panelLeftWidth = panelLeft.offsetWidth;
            panelRightWidth = panelRight.offsetWidth;
            panelBottomLeftHeight = panelBottomLeft.offsetHeight;
            panelBottomRightHeight = panelBottomRight.offsetHeight;
            panelBottomLeftWidth = panelBottomLeft.offsetWidth;
            panelBottomRightWidth = panelBottomRight.offsetWidth;

            TweenLite.to(
                itemWrapper,
                0.25,
                {
                    opacity: 0
                }
            );

            TweenLite.to(
                charBgWrapper,
                0.25,
                {
                    opacity: 0
                }
            );

            TweenLite.to(
                panelLeft,
                1,
                {
                    x: panelLeftWidth * -1,
                    z: 0.01,
                    delay: 0.5,
                    onComplete: function () {
                        this.setState({panelAnimationComplete: true});
                    }.bind(this)
                }
            );

            TweenLite.to(
                panelRight,
                1,
                {
                    x: panelRightWidth,
                    z: 0.01,
                    delay: 0.5
                }
            );

            TweenLite.to(
                panelBottomLeft,
                1,
                {
                    x: panelBottomLeftWidth * -1,
                    y: panelBottomLeftHeight,
                    delay: 0.5
                }
            );

            TweenLite.to(
                panelBottomRight,
                1,
                {
                    x: panelBottomRightWidth,
                    y: panelBottomRightHeight,
                    delay: 0.5
                }
            );
        },

        animateBonusPanelIn: function (panel, height, triggerStatCollector) {
            TweenLite.to(
                panel,
                1.5,
                {
                    y: 0,
                    z: 0.01,
                    visibility: 'visible',
                    ease: Power4.easeOut,
                    onComplete: function () {
                        this.setState({panelAnimationComplete: true});

                        if (triggerStatCollector === true) {
                            this.triggerStatCollector();
                        }
                    }.bind(this)
                }
            );
        },

        animateBonusPanelOut: function (panel, height, dir) {
            TweenLite.to(
                panel,
                1.5,
                {
                    y: height * dir,
                    z: 0.01,
                    ease: Power4.easeOut,
                    onComplete: function () {
                        this.setState({panelAnimationComplete: true});
                    }.bind(this)
                }
            );
        },

        skillDmgSanitize: function (obj) {
            calc = 0;
            string = '';
            combined = '';
            skillDamageRaw.length = 0;

            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {

                    string = p.toString().slice(4);

                    if (parseFloat(p)) {
                        calc = parseFloat(p) * parseFloat(obj[p]);
                    }

                    if (calc !== 0) {
                        combined += string + ' ' + Math.round(calc * 10000) / 100 + '%' + '<br>';
                        skillDamageRaw.push(calc + ' ' + string);
                    }
                }
            }
            if (combined !== '') {
                this.setState({skillDmgRaw: skillDamageRaw});
                return combined;
            }
        },

        checkSetItems: function () {
            var checkSave = [],
                setRing = false;

            if (this.state.items) {
                var itemSlots = [
                    this.state.helmItem,
                    this.state.amuletItem,
                    this.state.chestItem,
                    this.state.bootsItem,
                    this.state.glovesItem,
                    this.state.shouldersItem,
                    this.state.legsItem,
                    this.state.bracersItem,
                    this.state.mainItem,
                    this.state.offItem,
                    this.state.beltItem,
                    this.state.ringItemLeft,
                    this.state.ringItemRight
                ];

                // detect Set -1 ring
                for (i = 0; i < itemSlots.length; i++) {
                    checkSave.push(itemSlots[i].name);
                    if (checkSave.indexOf('Ring of Royal Grandeur') > -1) {
                        setRing = true;
                    }
                }

                // putting this into the loop will cause a freeze, weird
                this.setState({
                    setRing: setRing
                });

                this.forceUpdate();
            }
        },

        collectSkillDamage: function () {
            var that = this;

            if (this.state.items) {
                var itemSlots = [
                    this.state.helmItem,
                    this.state.amuletItem,
                    this.state.chestItem,
                    this.state.bootsItem,
                    this.state.glovesItem,
                    this.state.shouldersItem,
                    this.state.legsItem,
                    this.state.bracersItem,
                    this.state.mainItem,
                    this.state.offItem,
                    this.state.beltItem,
                    this.state.ringItemLeft,
                    this.state.ringItemRight
                ];

                if (this.state.calculatingSkillDamage) {
                    return;
                }
                return new Promise(function (resolve, reject) {
                    that.setState({
                        calculatingSkillDamage: true
                    });
                    Worker.create = function (workerJob) {
                        var str = workerJob.toString();
                        var blob = new Blob(
                            ['\'use strict\';\nself.onmessage =' + str],
                            {type: 'text/javascript'}
                        );
                        return window.URL.createObjectURL(blob);
                    };

                    var workerBlob = Worker.create(function (e) {
                        var itemSlots = e.data.itemSlots,
                            skillDamage = e.data.skillDamage,
                            skills = e.data.skills,
                            className = e.data.className,
                            i,
                            k,
                            m,
                            p,
                            stackedValues = [],
                            skillPrefixMapping = [
                                ['demon-hunter', 'Power_Damage_Percent_Bonus#DemonHunter_'],
                                ['witch-doctor', 'Power_Damage_Percent_Bonus#Witchdoctor_'],
                                ['barbarian', 'Power_Damage_Percent_Bonus#Barbarian_'],
                                ['crusader', 'Power_Damage_Percent_Bonus#Crusader_'],
                                ['monk', 'Power_Damage_Percent_Bonus#Monk_'],
                                ['wizard', 'Power_Damage_Percent_Bonus#Wizard_']
                            ],
                            skillsPercentBonusNames = [],
                            skillsPercentBonusValues = [];

                        skillDamage.value = 0;

                        for (m = 0; m < skills.length; m++) {
                            if (skills[m].skill) {
                                for (p = 0; p < skillPrefixMapping.length; p++) {
                                    if (skillPrefixMapping[p][0] === className) {
                                        skillsPercentBonusNames.push(skillPrefixMapping[p][1] + skills[m].skill.name.replace(/ /g, ''));
                                    }
                                }
                            }
                        }

                        for (i = 0; i < itemSlots.length; i++) {
                            if (itemSlots[i].attributesRaw) {
                                for (k = 0; k < skillsPercentBonusNames.length; k++) {
                                    if (itemSlots[i].attributesRaw[skillsPercentBonusNames[k]]) {
                                        if (Object.getOwnPropertyNames(itemSlots[i].attributesRaw[skillsPercentBonusNames[k]] === skillsPercentBonusNames[k])) {
                                            skillsPercentBonusValues.push(parseFloat(itemSlots[i].attributesRaw[skillsPercentBonusNames[k]].min) + skills[k].skill.name);
                                            stackedValues = skillsPercentBonusValues.reduce(function (p, c) {
                                                if (c in p) {
                                                    p[c]++;
                                                } else {
                                                    p[c] = 1;
                                                }
                                                return p;
                                            }, {});
                                        }
                                    }
                                }
                            }
                        }

                        // send results back to the main thread
                        self.postMessage({
                            countedValues: stackedValues
                        });

                        // die
                        self.close();
                    });

                    // create worker instance
                    var worker = new Worker(workerBlob);

                    worker.onmessage = function (e) {
                        resolve();

                        that.setState({
                            calculatingSkillDamage: false
                        });

                        that.setState({skillDmg: that.skillDmgSanitize(e.data.countedValues)});

                        console.info('the web worker had a save journey');
                    };

                    // return a failure message if the worker didn't complete
                    worker.onerror = function (e) {
                        reject(Error(
                                'one of the workers had an horrible accident\n' +
                                e.message +
                                ' in line ' +
                                e.lineno)
                        );
                        this.terminate();
                    };

                    worker.postMessage({
                        itemSlots: itemSlots,
                        skillDamage: that.state.skillDamage,
                        skills: that.state.skills,
                        className: that.state.generalStats.class.value
                    });
                });
            }
        },

        collectStats: function () {
            var that = this;

            if (this.state.items) {
                var itemSlots = [
                    this.state.helmItem,
                    this.state.amuletItem,
                    this.state.chestItem,
                    this.state.bootsItem,
                    this.state.glovesItem,
                    this.state.shouldersItem,
                    this.state.legsItem,
                    this.state.bracersItem,
                    this.state.mainItem,
                    this.state.offItem,
                    this.state.beltItem,
                    this.state.ringItemLeft,
                    this.state.ringItemRight
                ];

                if (this.state.calculatingStats) {
                    return;
                }
                return new Promise(function (resolve, reject) {
                    that.setState({
                        calculatingStats: true
                    });
                    Worker.create = function (workerJob) {
                        var str = workerJob.toString();
                        var blob = new Blob(
                            ['\'use strict\';\nself.onmessage =' + str],
                            {type: 'text/javascript'}
                        );
                        return window.URL.createObjectURL(blob);
                    };

                    // worker job
                    var workerBlob = Worker.create(function (e) {
                        // image modification data goes here
                        var itemSlots = e.data.itemSlots,
                            off = e.data.offensiveStats,
                            def = e.data.defensiveStats,
                            setRing = e.data.setRing,
                            stat,
                            setPool = e.data.setPool,
                            i,
                            m,
                            j,
                            mergedProps = Object.assign({}, off, def),
                            repeatSet = [];

                        for (stat in mergedProps) {
                            if (mergedProps.hasOwnProperty(stat)) {
                                mergedProps[stat].value = mergedProps[stat].multiplicative ? 1 : 0;
                            }
                        }

                        for (i = 0; i < itemSlots.length; i++) {
                            for (stat in off) {
                                if (off.hasOwnProperty(stat)) {
                                    if (itemSlots[i].attributesRaw) {
                                        if (itemSlots[i].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw[off[stat].key].min) {

                                            if (off[stat].multiplicative) {
                                                off[stat].value *= parseFloat(itemSlots[i].attributesRaw[off[stat].key].min);
                                            } else {
                                                off[stat].value += parseFloat(itemSlots[i].attributesRaw[off[stat].key].min);
                                            }
                                        }
                                    }

                                    if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                        if (off[stat].multiplicative) {
                                            if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                off[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                            }

                                            if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                off[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min);
                                            }
                                        } else {
                                            if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                off[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                            }

                                            if (itemSlots[i].gems[0].attributesRaw[off[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                off[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[off[stat].key].min);
                                            }
                                        }
                                    }

                                    if (itemSlots[i].set && itemSlots[i].set.ranks) {
                                        for (m = 0; m < setPool.length; m++) {
                                            if (itemSlots[i].set.name === setPool[m][0]) {
                                                setPool[m][1]++;
                                            }

                                            for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                                if (setRing) {
                                                    // TODO this is failing
                                                    if (
                                                        itemSlots[i].set.name === setPool[m][0] &&
                                                        itemSlots[i].set.ranks[j].required <= setPool[m][1] + 1 &&
                                                        setPool[m][1] >= 2
                                                    ) {
                                                        if (itemSlots[i].set.ranks[j].attributesRaw[off[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min) {
                                                            if (off[stat].multiplicative) {
                                                                off[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                            } else {
                                                                off[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                        if (itemSlots[i].set.ranks[j].attributesRaw[off[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min) {
                                                            if (off[stat].multiplicative) {
                                                                off[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                            } else {
                                                                off[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[off[stat].key].min);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        // TODO this is failing
                                        if (repeatSet.indexOf(itemSlots[i].set.name) > -1) {
                                            continue;
                                        }
                                        repeatSet.push(itemSlots[i].set.name);
                                    }
                                }
                            }

                            for (stat in def) {
                                if (def.hasOwnProperty(stat)) {
                                    if (itemSlots[i].attributesRaw) {
                                        if (itemSlots[i].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw[def[stat].key].min) {

                                            if (def[stat].multiplicative) {
                                                def[stat].value *= parseFloat(itemSlots[i].attributesRaw[def[stat].key].min);
                                            } else {
                                                def[stat].value += parseFloat(itemSlots[i].attributesRaw[def[stat].key].min);
                                            }


                                        }
                                    }

                                    if (itemSlots[i].gems && itemSlots[i].gems[0]) {
                                        if (def[stat].multiplicative) {
                                            if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                def[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                            }

                                            if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                def[stat].value *= parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min);
                                            }
                                        } else {
                                            if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                def[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min * itemSlots[i].attributesRaw.Gem_Attributes_Multiplier.min);
                                            }

                                            if (itemSlots[i].gems[0].attributesRaw[def[stat].key] && !itemSlots[i].attributesRaw.Gem_Attributes_Multiplier) {
                                                def[stat].value += parseFloat(itemSlots[i].gems[0].attributesRaw[def[stat].key].min);
                                            }
                                        }
                                    }

                                    if (itemSlots[i].set && itemSlots[i].set.ranks) {
                                        for (m = 0; m < setPool.length; m++) {
                                            if (itemSlots[i].set.name === setPool[m][0]) {
                                                setPool[m][1]++;
                                            }
                                            for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                                if (setRing) {
                                                    if (
                                                        itemSlots[i].set.name === setPool[m][0] &&
                                                        itemSlots[i].set.ranks[j].required <= setPool[m][1] + 1 &&
                                                        setPool[m][1] >= 2
                                                    ) {
                                                        if (itemSlots[i].set.ranks[j].attributesRaw[def[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min) {
                                                            if (def[stat].multiplicative) {
                                                                def[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                            } else {
                                                                def[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                                        if (itemSlots[i].set.ranks[j].attributesRaw[def[stat].key] && itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min) {
                                                            if (def[stat].multiplicative) {
                                                                def[stat].value *= parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                            } else {
                                                                def[stat].value += parseFloat(itemSlots[i].set.ranks[j].attributesRaw[def[stat].key].min);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (repeatSet.indexOf(itemSlots[i].set.name) > -1) {
                                            continue;
                                        }
                                        repeatSet.push(itemSlots[i].set.name);
                                    }
                                }
                            }
                        }

                        // send results back to the main thread
                        self.postMessage({
                            offensiveStats: off,
                            defensiveStats: def
                        });

                        // die
                        self.close();
                    });

                    // create worker instance
                    var worker = new Worker(workerBlob);

                    worker.onmessage = function (e) {
                        that.setState({
                            offensiveStats: e.data.offensiveStats,
                            defensiveStats: e.data.defensiveStats
                        });

                        resolve();

                        that.setState({
                            calculatingStats: false
                        });

                        console.info('the web worker had a save journey');
                    };

                    // return a failure message if the worker didn't complete
                    worker.onerror = function (e) {
                        reject(Error(
                                'one of the workers had an horrible accident\n' +
                                e.message +
                                ' in line ' +
                                e.lineno)
                        );
                        this.terminate();
                    };

                    worker.postMessage({
                        itemSlots: itemSlots,
                        offensiveStats: that.state.offensiveStats,
                        defensiveStats: that.state.defensiveStats,
                        setPool: Sets.get(),
                        setRing: that.state.setRing
                    });
                });
            }
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
            var self = this,
                statsState = this.state.stats,
                itemsState = this.state.items,
                generalStats = this.state.generalStats,
                amuletState = this.state.amuletItem,
                mainHandState = this.state.mainItem,
                offHandState = this.state.offItem,
                itemsIconState = this.state.items,
                skillIconBaseUrl = this.state.skillIconBase,
                itemIconBaseUrl = this.state.itemIconBase,
                skillDmgState = this.state.skillDmg,
                skillDmgStateRaw = this.state.skillDmgRaw,
                calculatedAttackSpeed = 0,
                defenseStats = this.state.defensiveStats,
                offensiveStats = this.state.offensiveStats,
                mergedStats,
                content,
                contentName,
                value;

            minDmgCalc = 0;
            maxDmgCalc = 0;
            additionalStatsOffensive = [];
            additionalStatsDefensive = [];
            statsArray = [];
            specialPassive = [];
            base = [];
            style = [];

            //for (m = 0; m < setPool.length; m++) {
            //    setPool[m][1] = 0;
            //}
            //
            //for (itemIterator in itemCollection) {
            //    if (itemCollection.hasOwnProperty(itemIterator)) {
            //        for (m = 0; m < setPool.length; m++) {
            //            if (itemCollection[itemIterator].itemData && itemCollection[itemIterator].itemData.set) {
            //                if (itemCollection[itemIterator].itemData.set.name === setPool[m][0]) {
            //                    setPool[m][1]++;
            //                }
            //            }
            //        }
            //    }
            //}

            // Primary Stat Parser

            // Offensive Stat Parser
            if (statsState) {
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
                                        value = Math.round((statsState[offensiveStats[offensiveStat].key] *
                                                offensiveStats[offensiveStat].normalization +
                                                offensiveStats[offensiveStat].paragonModifier.value +
                                                offensiveStats[offensiveStat].errorCorrection / 100) * 1000) / 1000;
                                        break;
                                    default:
                                        value = Math.round((statsState[offensiveStats[offensiveStat].key] *
                                                offensiveStats[offensiveStat].normalization +
                                                offensiveStats[offensiveStat].paragonModifier.value) * 1000) / 1000;
                                }
                            } else {
                                switch (offensiveStat) {
                                    case 'critDamage':
                                        value = Math.round((statsState[offensiveStats[offensiveStat].key] *
                                                offensiveStats[offensiveStat].normalization +
                                                offensiveStats[offensiveStat].errorCorrection) * 1000) / 1000;
                                        break;
                                    default:
                                        value = Math.round(statsState[offensiveStats[offensiveStat].key *
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
                                            mainHandState.attacksPerSecond ? mainHandState.attacksPerSecond.max : 0,
                                            offHandState.attacksPerSecond ? 0.15 : 0
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
                            additionalStatsOffensive.push(React.DOM.div({
                                key: offensiveStat,
                                className: 'bonusstat'
                            }, contentName + value + offensiveStats[offensiveStat].unit));
                        }
                    }
                }

                if (skillDmgState) {
                    additionalStatsOffensive.push(React.DOM.div({
                        dangerouslySetInnerHTML: {__html: 'Skill Damage: ' + skillDmgState},
                        key: 'Skill Damage Stat',
                        className: 'bonusstat'
                    }));
                }
            }

            // Defensive Stat Parser
            if (statsState) {
                for (var defenseStat in defenseStats) {
                    if (defenseStats.hasOwnProperty(defenseStat)) {
                        contentName = '';
                        value = 0;

                        if (defenseStats[defenseStat].name) {
                            contentName += defenseStats[defenseStat].name;
                            contentName += ': ';
                        }

                        if (defenseStats[defenseStat].fromApi) {
                            if (defenseStats[defenseStat].hasMods) {
                                value = Math.round((defenseStats[defenseStat].paragonModifier.value +
                                        statsState[defenseStats[defenseStat].key] *
                                        defenseStats[defenseStat].normalization) * 1000) / 1000;
                            } else {
                                value = Math.round((statsState[defenseStats[defenseStat].key]) * 1000) / 1000;
                            }
                        } else {
                            if (defenseStats[defenseStat].hasMods) {
                                value = Math.round((defenseStats[defenseStat].paragonModifier.value +
                                        defenseStats[defenseStat].value *
                                        defenseStats[defenseStat].normalization) * 1000) / 1000;
                            } else {
                                value = Math.round((defenseStats[defenseStat].value *
                                        defenseStats[defenseStat].normalization) * 1000) / 1000;
                            }
                        }

                        if (value) {
                            additionalStatsDefensive.push(React.DOM.div({
                                key: defenseStat,
                                className: 'bonusstat'
                            }, contentName + value + defenseStats[defenseStat].unit));
                        }
                    }
                }
            }

            //TODO custom dps shit unbreak this
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

            if (this.state.generalStats) {
                backgroundImage = {
                    backgroundImage: 'url(assets/images/' + this.state.generalStats.class.value + '.png)'
                };
            } else {
                backgroundImage = {
                    backgroundImage: 'none'
                };
            }

            return (
                React.DOM.div({className: 'd3-container'},
                    React.DOM.div({className: 'd3-char-bg', ref: 'charbg', style: backgroundImage}),
                    items(),
                    profile(),
                    heroes(),
                    hero(),
                    paragon(),
                    React.DOM.div({
                            className: 'panel-right-additional ',
                            ref: 'pra'
                        },
                        'Offensive Stats',
                        additionalStatsOffensive,
                        'Defensive Stats',
                        additionalStatsDefensive,
                        React.DOM.a({
                            className: 'button',
                            onClick: this.handleBonusStatsClick,
                            title: 'click to show/hide more stats'
                        }, React.DOM.span({className: 'button-text'}, 'show less')))
                )
            );
        }
    });

ReactDOM.render(React.createElement(d3Profile, {
        pollInterval: 600000
    }),
    document.querySelector('.d3-profile'));

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
// todo add new interface + refactor data
// todo split parser into components
