var DamagePercentAll = 'Damage_Weapon_Percent_All',
    DamageBonusMinPhysical = 'Damage_Weapon_Bonus_Min_X1#Physical',
    weaponElementsMin = [
        'Damage_Weapon_Min#Arcane',
        'Damage_Weapon_Min#Fire',
        'Damage_Weapon_Min#Lightning',
        'Damage_Weapon_Min#Cold',
        'Damage_Weapon_Min#Poison',
        'Damage_Weapon_Bonus_Min_X1#Physical'
    ],
    weaponElementsDelta = [
        'Damage_Weapon_Delta#Arcane',
        'Damage_Weapon_Delta#Fire',
        'Damage_Weapon_Delta#Lightning',
        'Damage_Weapon_Delta#Cold',
        'Damage_Weapon_Delta#Poison',
        'Damage_Weapon_Bonus_Delta_X1#Physical'
    ],
    hellfirePassiveDisplay,
    hellfirePassiveLink,
    setPool = [
        ['Cain\'s Fate', 0],
        ['Bastions of Will', 0],
        ['Aughild\'s Victory', 0],
        ['Aughild\'s Authority', 0],
        ['Guardian\'s Contingency', 0],
        ['Immortal King\'s Call', 0],
        ['Natalya\'s Vengeance', 0],
        ['Tal Rasha\'s Elements', 0],
        ['Sage\'s Plight', 0],
        ['Sage\'s Journey', 0],
        ['Born\'s Defiance', 0],
        ['Born\'s Command', 0],
        ['Unhallowed Essence', 0],
        ['Aughild\'s Authority', 0],
        ['Cain\'s Destiny', 0],
        ['Thorns of the Invoker', 0],
        ['Might of the Earth', 0],
        ['Firebird\'s Finery', 0],
        ['Guardian\'s Jeopardy', 0],
        ['Helltooth Harness', 0],
        ['Armor of Akkhan', 0],
        ['Wrath of the Wastes', 0],
        ['Raiment of the Jade Harvester', 0],
        ['Embodiment of the Marauder', 0],
        ['Raiment of a Thousand Storms', 0],
        ['The Legacy of Raekor', 0],
        ['Roland\'s Legacy', 0],
        ['Delsere\'s Magnum Opus', 0],
        ['Monkey King\'s Garb', 0],
        ['Asheara\'s Uniform', 0],
        ['Demon\'s Skin', 0],
        ['Demon\'s Hide', 0],
        ['Asheara\'s Vestments', 0],
        ['Thorns of the Invoker', 0],
        ['Delsere\'s Magnum Opus', 0],
        ['Blackthorne\'s Battlegear', 0],
        ['Inna\'s Mantra', 0],
        ['Vyr\'s Amazing Arcana', 0],
        ['Krelm\'s Buff Bulwark', 0],
        ['The Shadow\'s Mantle', 0],
        ['Endless Walk', 0],
        ['Legacy of Nightmares', 0],
        ['Hallowed Defenders', 0],
        ['Hallowed Protectors', 0],
        ['Manajuma\'s Way', 0],
        ['Zunimassa\'s Haunt', 0],
        ['Chantodo\'s Resolve', 0],
        ['Istvan\'s Paired Blades', 0],
        ['Shenlong\'s Spirit', 0],
        ['Bul-Kathos\'s Oath', 0],
        ['Danetta\'s Hatred', 0],
        ['Captain Crimson\'s Trimmings', 0]
    ],
    passiveBuffPool = [
        ['Cull the Weak', 'Damage', 0.2],
        ['Single Out', 'Crit Chance', 0.25],
        ['Archery', 'Damage', 0.08],
        ['Archery', 'Crit Damage', 0.5],
        ['Archery', 'Crit Chance', 0.05],
        ['Custom Engineering', 'Sentries', 2],
        ['Ambush', 'Damage', 0.4],
        ['Ballistics', 'Damage', 1],
        ['Sharpshooter', 'Crit Chance', 0.04],
        ['Grenadier', 'Damage', 0.1],
        ['Steady Aim', 'Damage', 0.2]
    ],
    skillBuffPool = [
        ['Bait the Trap', 'Crit Chance', 0.1],
        ['Wolf Companion', 'Damage', 0.3]
    ],
    debuffPool = [
        ['Marked for Death', 'Damage', 0.2]
    ],
    gemPool = [
        ['Zei\'s Stone of Vengeance', 'Item_Power_Passive#ItemPassive_Unique_Gem_012_x1'],
        ['Bane of the Trapped', 'Item_Power_Passive#ItemPassive_Unique_Gem_002_x1'],
        ['Gogok of the Swiftness', 'Item_Power_Passive#ItemPassive_Unique_Gem_008U_x1']
    ],
    backgroundImage,
    itemSetCount,
    constructedLink,
    itemQuality,
    isAncient,
    gemLink,
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
    skills = [],
    skillsDesc = [],
    passives = [],
    passivesDesc = [],
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
    items = [],
    mainHand = [],
    offHand = [],
    belt = [],
    neck = [],
    additionalStatsOffensive = [],
    additionalStatsDefensive = [],
    minDmgCalc,
    maxDmgCalc,
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
    },
    runeType,
    runeMap = {
        'a': {
            position: '49%',
            key: 'a'
        },
        'b': {
            position: '97%',
            key: 'b'
        },
        'c': {
            position: '73',
            key: 'c'
        },
        'd': {
            position: '49%',
            key: 'd'
        },
        'e': {
            position: '0',
            key: 'e'
        }
    },
    d3Profile = React.createClass({
        displayName: 'd3Profile',
        getInitialState: function () {
            return {
                debugMode: true,
                skills: [],
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
            //this.initStats();

            // panel shorthands p = panel, l = left and so forth TODO redo this shit
            panelLeft = ReactDOM.findDOMNode(this.refs.pl);
            panelRight = ReactDOM.findDOMNode(this.refs.pr);
            panelBottomLeft = ReactDOM.findDOMNode(this.refs.pbl);
            panelBottomRight = ReactDOM.findDOMNode(this.refs.pbr);
            panelRightAdditional = ReactDOM.findDOMNode(this.refs.pra);
            panelLeftAdditional = ReactDOM.findDOMNode(this.refs.pla);
            panelBottomLeftAdditional = ReactDOM.findDOMNode(this.refs.pbla);
            panelBottomRightAdditional = ReactDOM.findDOMNode(this.refs.pbra);
            itemWrapper = ReactDOM.findDOMNode(this.refs.items);
            charBgWrapper = ReactDOM.findDOMNode(this.refs.charbg);
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

        handleBonusStatsClick: function () {
            this.setState({panelAnimationComplete: false});

            panelRightAdditionalHeight = panelRightAdditional.offsetHeight;
            if (this.state.toggle !== 'visible') {
                this.animateBonusPanelIn(panelRightAdditional, panelRightAdditionalHeight, true);
                this.setState({toggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelRightAdditional, panelRightAdditionalHeight, -1);
                this.setState({toggle: 'hidden'});
            }
        },

        handleSkillDescClick: function () {
            this.setState({panelAnimationComplete: false});

            panelBottomLeftAdditionalHeight = panelBottomLeftAdditional.offsetHeight;
            if (this.state.skillDescToggle !== 'visible') {
                this.animateBonusPanelIn(panelBottomLeftAdditional, panelBottomLeftAdditionalHeight, false);
                this.setState({skillDescToggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelBottomLeftAdditional, panelBottomLeftAdditionalHeight);
                this.setState({skillDescToggle: 'hidden'});
            }
        },

        handlePassiveDescClick: function () {
            this.setState({panelAnimationComplete: false});

            panelBottomRightAdditionalHeight = panelBottomRightAdditional.offsetHeight;
            if (this.state.passiveDescToggle !== 'visible') {
                this.animateBonusPanelIn(panelBottomRightAdditional, panelBottomRightAdditionalHeight, false);
                this.setState({passiveDescToggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelBottomRightAdditional, panelBottomRightAdditionalHeight);
                this.setState({passiveDescToggle: 'hidden'});
            }
        },

        handleItemClick: function (e) {
            this.setState({panelAnimationComplete: false});

            target = e.target;

            if (!e.target.classList.contains('item')) {
                return;
            }

            childElements = target.parentNode.children;

            if (!target.classList.contains('open')) {
                target.classList.add('open');
                TweenLite.fromTo(
                    target,
                    1,
                    {
                        width: 64,
                        height: 128
                    },
                    {
                        width: 450,
                        height: 500,
                        ease: Back.easeOut.config(1.5),
                        onComplete: function () {
                            this.setState({panelAnimationComplete: true});
                        }.bind(this)
                    }
                );

            } else {
                target.classList.remove('open');
                TweenLite.fromTo(
                    target,
                    1,
                    {
                        width: 450,
                        height: 500
                    },
                    {
                        width: 64,
                        height: 128,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            this.setState({panelAnimationComplete: true});
                        }.bind(this)
                    }
                );

            }

            for (i = 0; i < childElements.length; i++) {
                if (childElements[i].classList.contains('open') && childElements[i] !== target) {
                    childElements[i].classList.remove('open');
                    TweenLite.fromTo(
                        childElements[i],
                        1,
                        {
                            width: 450,
                            height: 500
                        },
                        {
                            width: 64,
                            height: 128,
                            ease: Power4.easeOut,
                            onComplete: function () {
                                this.setState({panelAnimationComplete: true});
                            }.bind(this)
                        }
                    );

                }
            }
        },

        getItemData: function () {
            'use strict';
            var itemData,
                i;

            // clear fucking items
            this.setState({
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
                ringItemRight: {}
            });

            if (this.state.items) {
                var itemSlots = [
                    this.state.items.neck,
                    this.state.items.head,
                    this.state.items.torso,
                    this.state.items.feet,
                    this.state.items.hands,
                    this.state.items.shoulders,
                    this.state.items.legs,
                    this.state.items.bracers,
                    this.state.items.mainHand,
                    this.state.items.waist
                ];

                var itemSlotsWithProps = [
                    [this.state.items.leftFinger, 'left'],
                    [this.state.items.rightFinger, 'right'],
                    [this.state.items.offHand, null]
                ];

                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i]) {
                        itemData = itemSlots[i].tooltipParams;
                        api.loadItemData(itemData);
                    }
                }

                for (i = 0; i < itemSlotsWithProps.length; i++) {
                    if (itemSlotsWithProps[i][0]) {
                        itemData = itemSlotsWithProps[i][0].tooltipParams;
                        if (itemSlotsWithProps[i][1] === 'left') {
                            api.loadItemDataWithProps(itemData, true);
                        } else {
                            api.loadItemDataWithProps(itemData, false);
                        }
                    }
                }
            }
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
                        setPool: setPool,
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
                pstat,
                itemIterator,
                skillsState = this.state.skills,
                passivesState = this.state.passives,
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
                itemCollection = {
                    'head': {
                        itemData: this.state.helmItem,
                        view: helmet
                    },
                    'neck': {
                        itemData: this.state.amuletItem,
                        view: neck
                    },
                    'torso': {
                        itemData: this.state.chestItem,
                        view: torso
                    },
                    'feet': {
                        itemData: this.state.bootsItem,
                        view: feet
                    },
                    'hands': {
                        itemData: this.state.glovesItem,
                        view: hands
                    },
                    'shoulders': {
                        itemData: this.state.shouldersItem,
                        view: shoulders
                    },
                    'legs': {
                        itemData: this.state.legsItem,
                        view: legs
                    },
                    'bracers': {
                        itemData: this.state.bracersItem,
                        view: bracers
                    },
                    'mainHand': {
                        itemData: this.state.mainItem,
                        view: mainHand
                    },
                    'offHand': {
                        itemData: this.state.offItem,
                        view: offHand
                    },
                    'leftFinger': {
                        itemData: this.state.ringItemLeft,
                        view: ringLeft
                    },
                    'rightFinger': {
                        itemData: this.state.ringItemRight,
                        view: ringRight
                    },
                    'waist': {
                        itemData: this.state.beltItem,
                        view: belt
                    }
                },
                defenseStats = this.state.defensiveStats,
                offensiveStats = this.state.offensiveStats,
                mergedStats,
                content,
                contentName,
                value;


            if (defenseStats && offensiveStats) {
                mergedStats = Object.assign({}, defenseStats, offensiveStats);
            }

            minDmgCalc = 0;
            maxDmgCalc = 0;
            additionalStatsOffensive = [];
            additionalStatsDefensive = [];
            skills = [];
            skillsDesc = [];
            passives = [];
            passivesDesc = [];
            statsArray = [];
            specialPassive = [];
            base = [];
            style = [];
            shoulders = [];
            helmet = [];
            torso = [];
            hands = [];
            feet = [];
            ringLeft = [];
            ringRight = [];
            bracers = [];
            legs = [];
            items = [];
            mainHand = [];
            offHand = [];
            belt = [];
            neck = [];

            for (m = 0; m < setPool.length; m++) {
                setPool[m][1] = 0;
            }

            for (itemIterator in itemCollection) {
                if (itemCollection.hasOwnProperty(itemIterator)) {
                    for (m = 0; m < setPool.length; m++) {
                        if (itemCollection[itemIterator].itemData && itemCollection[itemIterator].itemData.set) {
                            if (itemCollection[itemIterator].itemData.set.name === setPool[m][0]) {
                                setPool[m][1]++;
                            }
                        }
                    }
                }
            }

            if (this.state.generalStats) {
                backgroundImage = {
                    backgroundImage: 'url(assets/images/' + this.state.generalStats.class.value + '.png)'
                };
            } else {
                backgroundImage = {
                    backgroundImage: 'none'
                };
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

                    if (generalStat === 'lastUpdated') {
                        var t = new Date(this.state.generalStats[generalStat].value * 1000);
                        content = t.toLocaleDateString() + ' - ' + t.toLocaleTimeString();
                    }

                    base.push(React.DOM.div({key: generalStat}, this.state.generalStats[generalStat].name + ': ' + content));
                }
            }

            // Active Skill Parser
            if (skillsState) {
                skillsState.forEach(function (skillData) {
                    if (skillData.rune) {
                        constructedLink = skillIconBaseUrl.concat(skillData.skill.icon);
                        if (skillData.rune.type === runeMap[skillData.rune.type].key) {
                            runeType = {
                                backgroundPosition: '0 ' + runeMap[skillData.rune.type].position
                            };
                        }

                        skills.push(React.DOM.div({key: skillData.skill.name + '-icon', className: 'hasIcon'},
                                skillData.skill.name,
                                ' with ',
                                skillData.rune.name,
                                React.DOM.div({
                                    key: skillData.skill.name + '-icon-front',
                                    className: 'icon-front',
                                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                                }),
                                React.DOM.div({
                                    key: skillData.rune.name + '-icon-back',
                                    className: 'icon-back',
                                    style: runeType
                                })
                            )
                        );
                        skillsDesc.push(React.DOM.div({
                                key: skillData.skill.name + '-description',
                                className: 'description'
                            },
                            React.DOM.div({
                                key: skillData.skill.name + '-desc-icon',
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            skillData.skill.name + ' with ' + skillData.rune.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillData.skill.description.replace(/\n/g, '<br/>')},
                                key: skillData.skill.name + '-desc',
                                className: 'skill-desc'
                            }),
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillData.rune.description.replace(/\n/g, '<br/>')},
                                key: skillData.rune.name + '-desc',
                                className: 'rune-desc'
                            })
                        ));
                    } else if (skillData.skill) {
                        constructedLink = skillIconBaseUrl.concat(skillData.skill.icon);
                        skills.push(React.DOM.div({
                            key: skillData.skill.name + '-icon',
                            className: 'hasIcon'
                        }, skillData.skill.name, React.DOM.div({
                            key: skillData.skill.name + '-icon-front',
                            className: 'icon-front no-rune',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        })));
                        skillsDesc.push(React.DOM.div({
                                key: skillData.skill.name + '-description',
                                className: 'description'
                            },
                            React.DOM.div({
                                key: skillData.skill.name + '-desc-icon',
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            skillData.skill.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillData.skill.description.replace(/\n/g, '<br/>')},
                                key: skillData.skill.name + '-desc',
                                className: 'skill-desc'
                            })
                        ));
                    }
                });
            }

            // Passive Skill Parser
            if (passivesState) {
                passivesState.forEach(function (passive) {
                    if (passive.skill) {
                        constructedLink = skillIconBaseUrl.concat(passive.skill.icon);
                        passives.push(React.DOM.div({
                            key: passive.skill.name,
                            className: 'hasIcon'
                        }, passive.skill.name, React.DOM.div({
                            key: passive.skill.name + '-icon',
                            className: 'icon',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        })));
                        passivesDesc.push(React.DOM.div({
                                key: passive.skill.name + '-description',
                                className: 'description'
                            },
                            React.DOM.div({
                                key: passive.skill.name + '-desc-icon',
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            passive.skill.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: passive.skill.description.replace(/\n/g, '<br/>')},
                                key: passive.skill.name + '-description-text',
                                className: 'passive-desc'
                            })
                        ));
                    }
                });
            }

            // Kanai Power Parser TODO own panel
            if (this.state.kanai) {

                this.state.kanai.forEach(function (power, currentIndex) {
                    if (power) {
                        // TODO broken
                        api.loadKanaiItems(power.tooltipParams, currentIndex);
                        constructedLink = itemIconBaseUrl.concat(power.icon);
                        passives.push(React.DOM.div({
                            key: power.name,
                            className: 'hasIcon'
                        }, power.name, React.DOM.div({
                            key: power.name + '-icon',
                            className: 'icon',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        })));
                        if (self.state.cubeItems) {
                            for (var cubeItem in self.state.cubeItems) {
                                if (self.state.cubeItems.hasOwnProperty(cubeItem)) {
                                    if (cubeItem && self.state.cubeItems[cubeItem].name === power.name) {
                                        passivesDesc.push(React.DOM.div({
                                                key: self.state.cubeItems[cubeItem].name + '-description',
                                                className: 'description'
                                            },
                                            React.DOM.div({
                                                key: self.state.cubeItems[cubeItem].name + '-desc-icon',
                                                className: 'desc-icon',
                                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                                            }),
                                            self.state.cubeItems[cubeItem].name,
                                            React.DOM.p({
                                                dangerouslySetInnerHTML: {__html: self.state.cubeItems[cubeItem].attributes.passive[0].text.replace(/\n/g, '<br/>')},
                                                key: cubeItem.name + '-description-text',
                                                className: 'passive-desc'
                                            })
                                        ));
                                    }
                                }
                            }
                        }
                    }
                });
            }

            // Item Parser
            if (this.state.items) {
                for (var item in itemCollection) {
                    if (itemCollection.hasOwnProperty(item)) {
                        if (itemsIconState && itemsIconState[item]) {
                            constructedLink = itemIconBaseUrl.concat(itemsIconState[item].icon, '.png');

                            switch (itemsState[item].displayColor) {
                                case 'green':
                                    itemQuality = 'set';
                                    break;
                                case 'orange':
                                    itemQuality = 'unique';
                                    break;
                                case 'blue':
                                    itemQuality = 'magic';
                                    break;
                                case 'yellow':
                                    itemQuality = 'rare';
                                    break;
                                case 'white':
                                    itemQuality = 'white';
                                    break;
                                default:
                                    itemQuality = 'common';
                            }

                            if (itemCollection[item].itemData.attributesRaw) {
                                isAncient = itemCollection[item].itemData.attributesRaw.Ancient_Rank && itemCollection[item].itemData.attributesRaw.Ancient_Rank.min === 1.0 ? 'ancient' : '';
                                if (item === 'mainHand' || item === 'offHand') {
                                    if (itemCollection[item].itemData.type) {
                                        var mainHanded = '';
                                        mainHanded = itemCollection[item].itemData.type.twoHanded ? '(2h)' : '(1h)';

                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'item-name',
                                            className: itemQuality + ' name'
                                        }, isAncient + ' ' + itemCollection[item].itemData.name + ' ' + mainHanded));
                                    }

                                    if (itemCollection[item].itemData.dps) {
                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'dps',
                                            className: 'dps'
                                        }, itemCollection[item].itemData.dps.max.toString().substring(0, 7) + ' DPS'));
                                    }

                                    if (itemCollection[item].itemData.minDamage && itemCollection[item].itemData.maxDamage && itemCollection[item].itemData.attributesRaw) {
                                        for (i = 0; i < weaponElementsMin.length; i++) {
                                            if (itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]]) {
                                                if (itemCollection[item].itemData.attributesRaw[DamagePercentAll] && !itemCollection[item].itemData.attributesRaw[DamageBonusMinPhysical]) {
                                                    minDmgCalc = itemCollection[item].itemData.minDamage.max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max +
                                                        (itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max *
                                                        itemCollection[item].itemData.attributesRaw[DamagePercentAll].max);
                                                    maxDmgCalc = itemCollection[item].itemData.maxDamage.max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsDelta[i]].max +
                                                        ((itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsDelta[i]].max) *
                                                        itemCollection[item].itemData.attributesRaw[DamagePercentAll].max);
                                                    itemCollection[item].view.push(React.DOM.li({
                                                        key: itemCollection[item].itemData.name + 'raw-damage',
                                                        className: 'raw-damage'
                                                    }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                                                } else if (!itemCollection[item].itemData.attributesRaw[DamagePercentAll] && !itemCollection[item].itemData.attributesRaw[DamageBonusMinPhysical]) {
                                                    minDmgCalc = itemCollection[item].itemData.minDamage.max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max;
                                                    maxDmgCalc = itemCollection[item].itemData.maxDamage.max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsMin[i]].max +
                                                        itemCollection[item].itemData.attributesRaw[weaponElementsDelta[i]].max;
                                                    itemCollection[item].view.push(React.DOM.li({
                                                        key: itemCollection[item].itemData.name + 'raw-damage',
                                                        className: 'raw-damage'
                                                    }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                                                } else {
                                                    minDmgCalc = itemCollection[item].itemData.minDamage.max;
                                                    maxDmgCalc = itemCollection[item].itemData.maxDamage.max;
                                                    itemCollection[item].view.push(React.DOM.li({
                                                        key: itemCollection[item].itemData.name + 'raw-damage',
                                                        className: 'raw-damage'
                                                    }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                                                }
                                            }
                                        }
                                    }


                                } else {
                                    itemCollection[item].view.push(React.DOM.li({
                                        key: 'item-name',
                                        className: itemQuality + ' name'
                                    }, isAncient + ' ' + itemCollection[item].itemData.name));
                                }
                            }

                            if (itemCollection[item].itemData.attributes) {
                                if (itemCollection[item].itemData.attributes.primary) {
                                    itemCollection[item].itemData.attributes.primary.forEach(function (primaryStat, currentIndex) {
                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'primary-stat-' + currentIndex,
                                            className: 'primary'
                                        }, primaryStat.text));
                                    });
                                }
                                if (itemCollection[item].itemData.attributes.secondary) {
                                    itemCollection[item].itemData.attributes.secondary.forEach(function (secondaryStat, currentIndex) {
                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'secondary-stat-' + currentIndex,
                                            className: 'secondary'
                                        }, secondaryStat.text));
                                    });
                                }

                                if (itemCollection[item].itemData.attributes.passive) {
                                    itemCollection[item].itemData.attributes.passive.forEach(function (passiveStat, currentIndex) {
                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'passive-stat-' + currentIndex,
                                            className: 'passive'
                                        }, passiveStat.text));
                                    });
                                }
                            }

                            if (itemCollection[item].itemData.set && itemCollection[item].itemData.set.ranks) {
                                itemSetCount = 0;
                                for (i = 0; i < itemCollection[item].itemData.set.ranks.length; i++) {
                                    // count of ranks eg. 2, 3, 6
                                    for (k = 1; k <= 6; k++) {
                                        // count of max set boni - 6
                                        for (m = 0; m < setPool.length; m++) {
                                            if (itemCollection[item].itemData.set.name === setPool[m][0] && this.state.setRing) {
                                                if (setPool[m][1] >= 2) {
                                                    itemSetCount = setPool[m][1]++;
                                                } else {
                                                    itemSetCount = setPool[m][1];
                                                }
                                            } else if (itemCollection[item].itemData.set.name === setPool[m][0] && !this.state.setRing) {
                                                itemSetCount = setPool[m][1];
                                            }
                                        }

                                        if (itemCollection[item].itemData.set.ranks[i].required === k && itemCollection[item].itemData.set.ranks[i].required <= itemSetCount) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-primary-bonus-' + primaryStat.text,
                                                    className: 'set-bonus-' + k
                                                }, primaryStat.text));
                                            });
                                        } else if (itemCollection[item].itemData.set.ranks[i].required === k) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-primary-bonus-' + primaryStat.text + '-inactive',
                                                    className: 'set-bonus-' + k + ' inactive'
                                                }, primaryStat.text));
                                            });
                                        }

                                        if (itemCollection[item].itemData.set.ranks[i].required === k && itemCollection[item].itemData.set.ranks[i].required <= itemSetCount) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-secondary bonus-' + secondaryStat.text,
                                                    className: 'set-bonus-' + k
                                                }, secondaryStat.text));
                                            });
                                        } else if (itemCollection[item].itemData.set.ranks[i].required === k) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-secondary bonus-' + secondaryStat.text + '-inactive',
                                                    className: 'set-bonus-' + k + ' inactive'
                                                }, secondaryStat.text));
                                            });
                                        }

                                        if (itemCollection[item].itemData.set.ranks[i].required === k && itemCollection[item].itemData.set.ranks[i].required <= itemSetCount) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-passive bonus-' + passiveStat.text,
                                                    className: 'set-bonus-' + k
                                                }, passiveStat.text));
                                            });
                                        } else if (itemCollection[item].itemData.set.ranks[i].required === k) {
                                            itemCollection[item].itemData.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                                itemCollection[item].view.push(React.DOM.li({
                                                    key: 'set-' + itemCollection[item].itemData.set.name + '-passive bonus-' + passiveStat.text + '-inactive',
                                                    className: 'set-bonus-' + k + ' inactive'
                                                }, passiveStat.text));
                                            });
                                        }
                                    }
                                }
                            }

                            if (itemCollection[item].itemData.attributesRaw && itemCollection[item].itemData.attributesRaw.Sockets) {
                                for (i = 0; i < itemCollection[item].itemData.attributesRaw.Sockets.min; i++) {
                                    if (itemCollection[item].itemData.gems[i]) {
                                        gemLink = itemIconBaseUrl.concat(itemCollection[item].itemData.gems[0].item.icon, '.png');

                                        if (itemCollection[item].itemData.gems[i].attributesRaw.Jewel_Rank) {
                                            itemCollection[item].view.push(React.DOM.li({
                                                key: 'socket-' + i,
                                                className: 'socket',
                                                style: {backgroundImage: 'url(' + gemLink + ')'}
                                            }, React.DOM.span({
                                                key: 'socket-gem-level' + i,
                                                className: 'gem-level'
                                            }, itemCollection[item].itemData.gems[i].attributesRaw.Jewel_Rank.min)));
                                        } else {
                                            itemCollection[item].view.push(React.DOM.li({
                                                key: 'socket-' + i,
                                                className: 'socket',
                                                style: {backgroundImage: 'url(' + gemLink + ')'}
                                            }));
                                        }

                                        if (itemCollection[item].itemData.gems[i].attributes.primary[0]) {
                                            itemCollection[item].view.push(React.DOM.li({
                                                key: 'gem-passive-primary' + i,
                                                className: 'gem-passive'
                                            }, itemCollection[item].itemData.gems[i].attributes.primary[0].text));
                                        }

                                        if (itemCollection[item].itemData.gems[i].attributes.secondary[0]) {
                                            itemCollection[item].view.push(React.DOM.li({
                                                key: 'gem-passive-secondary' + i,
                                                className: 'gem-passive'
                                            }, itemCollection[item].itemData.gems[i].attributes.secondary[0].text));
                                        }

                                        if (itemCollection[item].itemData.gems[i].attributes.passive[0]) {
                                            itemCollection[item].view.push(React.DOM.li({
                                                key: 'gem-passive-secondary' + i,
                                                className: 'gem-passive'
                                            }, itemCollection[item].itemData.gems[i].attributes.passive[0].text));
                                        }

                                    } else {
                                        itemCollection[item].view.push(React.DOM.li({
                                            key: 'socket-' + i,
                                            className: 'socket'
                                        }));
                                    }
                                }
                            }

                            items.push(React.DOM.div({
                                key: item.toString(),
                                className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' ' + item,
                                onClick: this.handleItemClick,
                                style: {backgroundImage: 'url(' + constructedLink + ')'}
                            }, React.DOM.div({className: 'desc'}, React.DOM.ul({
                                    className: 'stats'
                                }, itemCollection[item].view)
                            )));

                        } else {
                            items.push(React.DOM.div({
                                key: item.toString(),
                                className: 'empty item ' + item
                            }));
                        }
                    }
                }
            }

            // Hellfire Stat Parser
            if (amuletState.attributes && this.state.generalStats) {
                if (amuletState.name === 'Hellfire Amulet') {
                    hellfirePassiveLink = amuletState.attributes.passive[0].text
                        .substring(9)
                        .replace(' passive.', '')
                        .replace(/ /g, '').toLowerCase();
                    hellfirePassiveDisplay = amuletState.attributes.passive[0].text
                        .substring(9)
                        .replace(' passive.', '');
                    switch (this.state.generalStats.class.value) {
                        case 'demon-hunter':
                            constructedLink = skillIconBaseUrl.concat('demonhunter_passive_', hellfirePassiveLink);
                            break;
                        case 'witch-doctor':
                            constructedLink = skillIconBaseUrl.concat('witchdoctor_passive_', hellfirePassiveLink);
                            break;
                        case 'barbarian':
                            constructedLink = skillIconBaseUrl.concat('barbarian_passive_', hellfirePassiveLink);
                            break;
                        case 'crusader':
                            constructedLink = skillIconBaseUrl.concat('crusader_passive_', hellfirePassiveLink);
                            break;
                        case 'monk':
                            constructedLink = skillIconBaseUrl.concat('monk_passive_', hellfirePassiveLink);
                            break;
                        case 'wizard':
                            constructedLink = skillIconBaseUrl.concat('wizard_passive_', hellfirePassiveLink);
                            break;
                        default:
                            console.log('new class?');
                    }
                    specialPassive.push(React.DOM.div({
                        key: hellfirePassiveDisplay,
                        className: 'hasIcon'
                    }, hellfirePassiveDisplay, ' (HA)', React.DOM.div({
                        key: hellfirePassiveDisplay,
                        className: 'icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    })));
                }
            }

            // Primary Stat Parser
            for (var primaryStat in primaryStats) {
                if (primaryStats.hasOwnProperty(primaryStat)) {
                    content = '';
                    if (statsState[primaryStat] > 100) {
                        if (primaryStat === 'life' && this.state.defensiveStats) {
                            content += primaryStats[primaryStat].name + ': ' + Math.round(statsState[primaryStat] +
                                    statsState[primaryStat] *
                                    this.state.defensiveStats.maxHealthBonus.paragonModifier.value / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        } else if (primaryStat === 'armor' && this.state.defensiveStats) {
                            content += primaryStats[primaryStat].name + ': ' + Math.round(statsState[primaryStat] +
                                    statsState[primaryStat] *
                                    this.state.defensiveStats.armor.paragonModifier.value / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        } else {
                            content += primaryStats[primaryStat].name + ': ' + Math.round(statsState[primaryStat]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        }

                        statsArray.push(React.DOM.div({key: primaryStat}, content));
                    }
                }
            }

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
            if (statsState && statsState.critDamage && statsState.critChance && minDmgCalc !== 0 && maxDmgCalc !== 0 && this.state.generalStats && this.state.offensiveStats) {
                var statCalc,
                    minMaxCalc = (minDmgCalc + maxDmgCalc) * 0.5,
                    critChanceCalc = statsState.critChance + (this.state.offensiveStats.critChance.paragonModifier.value / 100),
                    critDmgCalc = statsState.critDamage - 1 + (this.state.offensiveStats.critDamage.paragonModifier.value / 100),
                    sheetDpsCalc,

                    effectiveCritChance = critChanceCalc,
                    effectiveCritDamage = critDmgCalc,
                    buffMult = 0,
                    eleMult = 0,
                    effectiveDpsCalc,
                // test value - to be replaced with skill damage
                    skillDamage = 3,
                    gemMult = 1,

                    maxSkillDmg,
                    nativeSkillDamage,
                    pushedValues = [];

                pushedValues.length = 0;

                if (generalStats.class.value === 'demon-hunter' || generalStats.class.value === 'monk') {
                    statCalc = statsState.dexterity / 100;
                } else if (generalStats.class.value === 'barbarian' || generalStats.class.value === 'crusader') {
                    statCalc = statsState.strength / 100;
                } else if (generalStats.class.value === 'wizard' || generalStats.class.value === 'witch-doctor') {
                    statCalc = statsState.intelligence / 100;
                } else {
                    statCalc = 1;
                    console.log('new class?');
                }

                sheetDpsCalc = (1 + statCalc) * minMaxCalc;

                // Skill Damage
                if (this.state.skillDmgRaw) {
                    for (i = 0; i < this.state.skillDmgRaw.length; i++) {
                        skillsState.forEach(function (skillName) {
                            if (skillName.skill) {
                                if (skillDmgStateRaw[i].search(skillName.skill.name.toString()) !== -1) {
                                    pushedValues.push([skillDamage, skillDmgStateRaw[i]]);
                                }
                            }
                        });
                    }
                }

                // passive Buffs
                for (i = 0; i < passiveBuffPool.length; i++) {
                    passivesState.forEach(function (passiveName) {
                        if (passiveName.skill && passiveName.skill.name === passiveBuffPool[i][0]) {
                            if (passiveBuffPool[i][1] === 'Damage') {
                                buffMult += passiveBuffPool[i][2];
                            }

                            if (passiveBuffPool[i][1] === 'Crit Chance') {
                                effectiveCritChance += passiveBuffPool[i][2];
                            }
                        }
                    });
                }
                // active Buffs
                for (i = 0; i < skillBuffPool.length; i++) {
                    skillsState.forEach(function (skillName) {
                        if (skillName.skill && skillName.rune) {
                            if (skillName.skill.name === skillBuffPool[i][0] || skillName.rune.name === skillBuffPool[i][0]) {
                                if (skillBuffPool[i][1] === 'Damage') {
                                    buffMult += skillBuffPool[i][2];
                                }
                            }
                        } else if (skillName.skill) {
                            if (skillName.skill.name === skillBuffPool[i][0]) {
                                if (skillBuffPool[i][1] === 'Damage') {
                                    buffMult += skillBuffPool[i][2];
                                }
                            }
                        }
                    });
                }

                // Elemental Damage Bonus
                if (this.state.maxEleDmgValue) {
                    eleMult += this.state.maxEleDmgValue / 100;
                }

                maxSkillDmg = pushedValues.sort();

                if (maxSkillDmg[0]) {
                    nativeSkillDamage = maxSkillDmg[0][0] * (1 + parseFloat(maxSkillDmg[0][1])) * (1 + eleMult);
                } else {
                    nativeSkillDamage = 1;
                }

                // todo fix this as it is garbage
                calculatedAttackSpeed = 1;

                effectiveDpsCalc = sheetDpsCalc * calculatedAttackSpeed * (effectiveCritChance * effectiveCritDamage + 1) * nativeSkillDamage * (1 + buffMult) * (1 + gemMult);

                if (!effectiveDpsCalc) {
                    statsArray.push(React.DOM.div({key: 'dps'}, 'DPS: ',
                        Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        ' | EDPS: ',
                        'Calculating EDPS..'
                    ));
                } else {
                    statsArray.push(React.DOM.div({key: 'dps'}, 'DPS: ',
                        Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        ' | EDPS: ',
                        Math.round(effectiveDpsCalc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    ));
                }
            }

            return (
                React.DOM.div({className: 'd3-container'},
                    React.DOM.div({className: 'd3-char-bg', ref: 'charbg', style: backgroundImage}),
                    React.DOM.div({className: 'd3-item-wrapper', ref: 'items'}, items),
                    realms(),
                    heroes(),
                    React.DOM.div({
                        className: 'panel-left ' + this.state.paragonToggle,
                        ref: 'pl'
                    }, 'General', base, React.DOM.a({
                        className: 'button',
                        onClick: this.handleParagonStatsClick
                    }, React.DOM.span({className: 'button-text'}, 'show paragon'))),
                    React.DOM.div({
                            className: 'panel-bottom-left ' + this.state.skillDescToggle,
                            title: 'click to open detailed description',
                            ref: 'pbl'
                        }, 'Skills', skills, React.DOM.a({
                            className: 'button',
                            onClick: this.handleSkillDescClick
                        }, React.DOM.span({className: 'button-text'}, 'show details'))
                    ),
                    paragon(),
                    React.DOM.div({
                        className: 'panel-bottom-left-desc ' + this.state.skillDescToggle,
                        ref: 'pbla'
                    }, React.DOM.a({
                        className: 'button',
                        onClick: this.handleSkillDescClick,
                        title: 'click to close'
                    }, React.DOM.span({className: 'button-text'}, 'close')), skillsDesc),
                    React.DOM.div({
                        className: 'panel-bottom-right ' + this.state.passiveDescToggle,
                        title: 'click to open detailed description',
                        ref: 'pbr'
                    }, 'Passives', passives, specialPassive, React.DOM.a({
                        className: 'button',
                        onClick: this.handlePassiveDescClick
                    }, React.DOM.span({className: 'button-text'}, 'show details'))),
                    React.DOM.div({
                        className: 'panel-bottom-right-desc ' + this.state.passiveDescToggle,
                        ref: 'pbra'
                    }, React.DOM.a({
                        className: 'button',
                        onClick: this.handlePassiveDescClick,
                        title: 'click to close'
                    }, React.DOM.span({className: 'button-text'}, 'close')), passivesDesc, 'Note: your Hellfire Passive cannot be displayed here, courtesy of blizzard'),
                    React.DOM.div({
                            ref: 'pr',
                            className: 'panel-right ' + this.state.toggle
                        },
                        'Stats',
                        statsArray,
                        React.DOM.a({
                            className: 'button',
                            onClick: this.handleBonusStatsClick,
                            title: 'click to show/hide more stats'
                        }, React.DOM.span({className: 'button-text'}, 'show more'))
                    ),
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
