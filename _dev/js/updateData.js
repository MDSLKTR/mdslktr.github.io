var statPool = [
        'Damage_Dealt_Percent_Bonus#Fire',
        'Damage_Dealt_Percent_Bonus#Physical',
        'Damage_Dealt_Percent_Bonus#Cold',
        'Damage_Dealt_Percent_Bonus#Poison',
        'Damage_Dealt_Percent_Bonus#Lightning',
        'Power_Cooldown_Reduction_Percent_All',
        'Resource_Cost_Reduction_Percent_All',
        'Damage_Percent_Bonus_Vs_Elites',
        'Damage_Percent_Reduction_From_Elites',
        'Splash_Damage_Effect_Percent',
        'Gold_PickUp_Radius',
        'Damage_Percent_Reduction_From_Melee',
        'Damage_Percent_Reduction_From_Ranged',
        'Hitpoints_Max_Percent_Bonus_Item',
        'Attacks_Per_Second_Percent'
    ],
    DamagePercentAll = 'Damage_Weapon_Percent_All',
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
    fetchHeroList,
    fetchHeroData,
    fetchHeroItems,
    updateHerolist,
    updateHeroData,
    updateHeroItems,
    helmCount,
    torsoCount,
    handsCount,
    feetCount,
    shouldersCount,
    legsCount,
    bracersCount,
    mainCount,
    offCount,
    beltCount,
    ringRCount,
    ringLCount,
    neckCount,
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
    selectedChar,
    i,
    j,
    k,
    m,
    results,
    cdr,
    resRed,
    dmgRedMelee,
    dmgRedRanged,
    eliteDmg,
    eliteDmgRed,
    areaDmg,
    fireDmg,
    coldDmg,
    lightningDmg,
    physicalDmg,
    poisonDmg,
    goldPickUp,
    maxHealth,
    atkSpd,
    saveArr = [],
    saveArray = [],
    combined,
    string,
    calc,
    saveValues = [],
    skilldmgArray = [],
    skills = [],
    skillsDesc = [],
    heroes = [],
    realms = [],
    passives = [],
    passivesDesc = [],
    stats = [],
    paragon = [],
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
    calculatedAttackSpeed,
    minDmgCalc,
    maxDmgCalc,
    pcdr,
    presred,
    patkspd,
    pcritdmg,
    pcritchance,
    pareadmg,
    presource,
    presistall,
    parmor,
    pmaxlife,
    DataWrapper = React.createClass({
        displayName: 'DataWrapper',
        getInitialState: function () {
            var initialRealm;
            if (!localStorage.getItem('realm')) {
                initialRealm = 'eu';
            } else {
                initialRealm = localStorage.getItem('realm');
            }

            return {
                skills: [],
                passives: [],
                stats: [],
                heroes: {},
                items: {},
                attributes: [],
                class: '',
                name: '',
                level: '',
                paragon: '',

                helmItem: {},
                amuletItem: {},
                shouldersItem: {},
                bracersItem: {},
                chestItem: {},
                ringItemLeft: {},
                ringItemRight: {},
                mainItem: {},
                offItem: {},
                legsItem: {},
                bootsItem: {},
                glovesItem: {},
                beltItem: {},

                additionalStats: [],
                atkSpd: 0,
                eliteDmg: 0,
                eliteDmgRed: 0,
                areaDmg: 0,
                goldPickup: 0,
                dmgRedMelee: 0,
                dmgRedRanged: 0,
                maxEleDmg: 0,
                maxHealth: 0,

                paragonCdr: parseInt(localStorage.getItem('paragonCdr')),
                paragonResRed: parseInt(localStorage.getItem('paragonResRed')),
                paragonAtkSpd: parseInt(localStorage.getItem('paragonAtkSpd')),
                paragonCritDmg: parseInt(localStorage.getItem('paragonCritDmg')),
                paragonCritChance: parseInt(localStorage.getItem('paragonCritChance')),
                paragonAreaDmg: parseInt(localStorage.getItem('paragonAreaDmg')),
                paragonResource: parseInt(localStorage.getItem('paragonResource')),
                paragonResistAll: parseInt(localStorage.getItem('paragonResistAll')),
                paragonArmor: parseInt(localStorage.getItem('paragonArmor')),
                paragonMaxHealth: parseInt(localStorage.getItem('paragonMaxHealth')),

                invalid: false,
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
                panelAnimationComplete: false,
                realm: initialRealm,
                battleTag: localStorage.getItem('battleTag'),
                apiKey: '?locale=en_GB&apikey=65d63bvh7spjgmce3gjq2mv5nzjfsggy',
                profile: '.api.battle.net/d3/profile/',
                itemIconBase: 'http://media.blizzard.com/d3/icons/items/large/', // icon + format .png,
                skillIconBase: 'http://media.blizzard.com/d3/icons/skills/64/',
                itemToolTipBase: '.api.battle.net/d3/data/'
            };
        },

        loadHeroesData: function () {
            start = new Date().getTime();
            if (this.state.battleTag) {
                this.setState({heroesDataUrl: 'https://' + this.state.realm + this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/', this.state.apiKey)});
                var request = new XMLHttpRequest();

                if (request) {
                    request.open('GET', this.state.heroesDataUrl, true);
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            if (request.status >= 200 && request.status < 400) {
                                var data = JSON.parse(request.responseText);
                                this.setState({
                                    heroes: data
                                });
                                clearInterval(fetchHeroList);
                                clearInterval(updateHerolist);
                                end = new Date().getTime();
                                console.log('Heroes Data fetched in', end - start, 'ms');
                            }
                        }
                    }.bind(this);
                    request.send();
                }
            }
        },

        loadHeroData: function () {
            start = new Date().getTime();
            if (this.state.selected) {
                this.setState({heroDataUrl: 'https://' + this.state.realm + this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/hero/', this.state.selected, this.state.apiKey)});
                var request = new XMLHttpRequest();

                if (request) {
                    request.open('GET', this.state.heroDataUrl, true);
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            if (request.status >= 200 && request.status < 400) {
                                var data = JSON.parse(request.responseText);
                                this.setState({
                                    name: data.name,
                                    class: data.class,
                                    level: data.level,
                                    paragon: data.paragonLevel,
                                    stats: data.stats,
                                    items: data.items,
                                    time: data['last-updated']
                                });

                                if (data.skills) {
                                    this.setState({
                                        skills: data.skills.active,
                                        passives: data.skills.passive
                                    });
                                }
                                clearInterval(fetchHeroData);
                                clearInterval(updateHeroData);

                                end = new Date().getTime();
                                console.log('Hero Data fetched in', end - start, 'ms');
                            }
                        }
                    }.bind(this);
                    request.send();
                }
            }
        },

        loadItemData: function (itemKey) {
            start = new Date().getTime();
            this.setState({
                itemUrl: 'https://' + this.state.realm + this.state.itemToolTipBase.concat(itemKey, this.state.apiKey)
            });
            var request = new XMLHttpRequest();

            if (request) {
                request.open('GET', this.state.itemUrl, true);
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status >= 200 && request.status < 400) {
                            var data = JSON.parse(request.responseText);
                            switch (data.type.id) {
                                case 'GenericHelm':
                                case 'Helm':
                                case 'Helm_Barbarian':
                                case 'Helm_DemonHunter':
                                case 'Helm_WitchDoctor':
                                case 'Helm_Crusader':
                                case 'Helm_Wizard':
                                case 'Helm_Monk':
                                case 'VoodooMask':
                                    this.setState({helmItem: data});
                                    break;
                                case 'GenericShoulders':
                                case 'Shoulders':
                                case 'Shoulders_Barbarian':
                                case 'Shoulders_DemonHunter':
                                case 'Shoulders_WitchDoctor':
                                case 'Shoulders_Crusader':
                                case 'Shoulders_Wizard':
                                case 'Shoulders_Monk':
                                    this.setState({shouldersItem: data});
                                    break;
                                case 'Bracers':
                                    this.setState({bracersItem: data});
                                    break;
                                case 'ChestArmor':
                                case 'GenericChestArmor':
                                case 'ChestArmor_Barbarian':
                                case 'ChestArmor_DemonHunter':
                                case 'ChestArmor_WitchDoctor':
                                case 'ChestArmor_Crusader':
                                case 'ChestArmor_Wizard':
                                case 'ChestArmor_Monk':
                                case 'Cloak':
                                    this.setState({chestItem: data});
                                    break;
                                case 'GenericLegs':
                                case 'Legs':
                                case 'Legs_Barbarian':
                                case 'Legs_DemonHunter':
                                case 'Legs_WitchDoctor':
                                case 'Legs_Crusader':
                                case 'Legs_Wizard':
                                case 'Legs_Monk':
                                    this.setState({legsItem: data});
                                    break;
                                case 'GenericBoots':
                                case 'Boots':
                                case 'Boots_Barbarian':
                                case 'Boots_DemonHunter':
                                case 'Boots_WitchDoctor':
                                case 'Boots_Crusader':
                                case 'Boots_Wizard':
                                case 'Boots_Monk':
                                    this.setState({bootsItem: data});
                                    break;
                                case 'Polearm':
                                case 'Crossbow':
                                case 'Dagger':
                                case 'Sword':
                                case 'Sword2H':
                                case 'Mace':
                                case 'Axe':
                                case 'FistWeapon':
                                case 'CeremonialKnife':
                                case 'MightyWeapon1H':
                                case 'Flail2H':
                                case 'Flail1H':
                                case 'HandXbow':
                                case 'Bow2H':
                                case 'Bow':
                                case 'Wand':
                                case 'Staff':
                                case 'Staff2H':
                                case 'CeremonialDagger':
                                case 'MightyWeapon2H':
                                case 'Mace2H':
                                    this.setState({mainItem: data});
                                    break;
                                case 'GenericGloves':
                                case 'Gloves':
                                case 'Gloves_Barbarian':
                                case 'Gloves_DemonHunter':
                                case 'Gloves_WitchDoctor':
                                case 'Gloves_Crusader':
                                case 'Gloves_Wizard':
                                case 'Gloves_Monk':
                                    this.setState({glovesItem: data});
                                    break;
                                case 'Belt':
                                case 'GenericBelt':
                                case 'Belt_Barbarian':
                                    this.setState({beltItem: data});
                                    break;
                                case 'Amulet':
                                    this.setState({amuletItem: data});
                                    break;
                            }
                            end = new Date().getTime();
                            console.log('Item Data fetched in', end - start, 'ms');
                        }
                    }
                }.bind(this);
                request.send();
            }
        },

        loadItemDataWithProps: function (itemKey, left) {
            start = new Date().getTime();
            this.setState({
                itemUrl: 'https://' + this.state.realm + this.state.itemToolTipBase.concat(itemKey, this.state.apiKey)
            });

            var request = new XMLHttpRequest();

            if (request) {
                request.open('GET', this.state.itemUrl, true);
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status >= 200 && request.status < 400) {
                            var data = JSON.parse(request.responseText);
                            switch (data.type.id) {
                                case 'Ring':
                                    if (left === true) {
                                        this.setState({ringItemLeft: data});
                                    } else {
                                        this.setState({ringItemRight: data});
                                    }
                                    break;
                                case 'Quiver':
                                case 'CrusaderShield':
                                case 'Shield':
                                case 'Orb':
                                case 'Source':
                                case 'Mojo':
                                    this.setState({offItem: data});
                                    break;
                                case 'Dagger':
                                case 'Sword':
                                case 'Mace':
                                case 'Axe':
                                case 'FistWeapon':
                                case 'MightyWeapon1H':
                                case 'Flail1H':
                                case 'HandXbow':
                                case 'Bow':
                                case 'Wand':
                                case 'Staff':
                                    this.setState({offItem: data});
                                    break;
                            }
                            end = new Date().getTime();
                            console.log('Item Data fetched in', end - start, 'ms');
                        }
                    }
                }.bind(this);
                request.send();
            }
        },

        changeChar: function () {
            updateHeroData = setInterval(this.loadHeroData, 500);
            updateHeroItems = setInterval(this.getItemData, 1250);
        },

        changeBattleTag: function () {
            clearInterval(updateHerolist);
            updateHerolist = setInterval(this.loadHeroesData, 1000);
        },

        triggerStatCollector: function () {
            this.collectStats();
            this.checkSetItems();
            this.collectSkillDamage();
            console.log('manual stat collector');
        },

        checkUpdates: function () {
            if (this.state.panelAnimationComplete) {
                this.collectStats();
                this.checkSetItems();
                this.collectSkillDamage();

                console.log('automatic stat collector');
                return;
            }
            console.log('waiting for animations');
        },

        componentDidMount: function () {
            fetchHeroList = setInterval(this.loadHeroesData, 1000);
            fetchHeroData = setInterval(this.loadHeroData, 1500);

            setInterval(this.checkUpdates, 3000);

            setInterval(this.loadHeroesData, this.props.pollInterval);
            setInterval(this.loadHeroData, this.props.pollInterval);
            setInterval(this.getItemData, this.props.pollInterval);

            if (!parseInt(localStorage.getItem('paragonCdr'))) {
                this.setState({paragonCdr: 0});
            }

            if (!parseInt(localStorage.getItem('paragonResRed'))) {
                this.setState({paragonResRed: 0});
            }

            if (!parseInt(localStorage.getItem('paragonAtkSpd'))) {
                this.setState({paragonAtkSpd: 0});
            }

            if (!parseInt(localStorage.getItem('paragonCritChance'))) {
                this.setState({paragonCritChance: 0});
            }

            if (!parseInt(localStorage.getItem('paragonCritDmg'))) {
                this.setState({paragonCritDmg: 0});
            }

            if (!parseInt(localStorage.getItem('paragonAreaDmg'))) {
                this.setState({paragonAreaDmg: 0});
            }

            if (!parseInt(localStorage.getItem('paragonResource'))) {
                this.setState({paragonResource: 0});
            }

            if (!parseInt(localStorage.getItem('paragonResistAll'))) {
                this.setState({paragonResistAll: 0});
            }

            if (!parseInt(localStorage.getItem('paragonArmor'))) {
                this.setState({paragonArmor: 0});
            }
            if (!parseInt(localStorage.getItem('paragonMaxHealth'))) {
                this.setState({paragonMaxHealth: 0});
            }

            // panel shorthands p = panel, l = left and so forth
            panelLeft = this.refs.pl.getDOMNode();
            panelRight = this.refs.pr.getDOMNode();
            panelBottomLeft = this.refs.pbl.getDOMNode();
            panelBottomRight = this.refs.pbr.getDOMNode();
            panelRightAdditional = this.refs.pra.getDOMNode();
            panelLeftAdditional = this.refs.pla.getDOMNode();
            panelBottomLeftAdditional = this.refs.pbla.getDOMNode();
            panelBottomRightAdditional = this.refs.pbra.getDOMNode();
            itemWrapper = this.refs.items.getDOMNode();
            charBgWrapper = this.refs.charbg.getDOMNode();
        },

        handleChange: function (e) {
            input = e.target.value;

            this.setState({
                battleTag: input,
                heroes: {},
                items: {},
                skills: [],
                passives: [],
                stats: [],
                attributes: [],
                class: {},
                name: {},
                level: {},
                paragon: {},
                time: 0,
                setRing: false,
                toggle: 'hidden',
                paragonToggle: 'hidden',
                skillDescToggle: 'hidden',
                passiveDescToggle: 'hidden'
            });

            this.animatePanelsOut();

            this.animateBonusPanelOut(panelRightAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelLeftAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelBottomLeftAdditional, document.documentElement.clientHeight, 1);
            this.animateBonusPanelOut(panelBottomRightAdditional, document.documentElement.clientHeight / 1.5, 1);

            localStorage.setItem('battleTag', input);
            this.changeBattleTag();
        },

        setRealm: function (e) {
            input = e.target.value;

            this.setState({
                realm: input,
                heroes: {},
                items: {},
                skills: [],
                passives: [],
                stats: [],
                attributes: [],
                class: {},
                name: {},
                level: {},
                paragon: {},
                time: 0,
                setRing: false,
                toggle: 'hidden',
                paragonToggle: 'hidden',
                skillDescToggle: 'hidden',
                passiveDescToggle: 'hidden'
            });

            this.animatePanelsOut();

            this.animateBonusPanelOut(panelRightAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelLeftAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelBottomLeftAdditional, document.documentElement.clientHeight, 1);
            this.animateBonusPanelOut(panelBottomRightAdditional, document.documentElement.clientHeight / 1.5, 1);

            localStorage.setItem('realm', input);
            this.changeBattleTag();
        },

        setSelect: function () {
            selectedChar = this.refs.select.getDOMNode().value;
            this.setState({
                selected: selectedChar,
                panels: 'visible',
                toggle: 'hidden',
                paragonToggle: 'hidden',
                skillDescToggle: 'hidden',
                passiveDescToggle: 'hidden'

            });

            this.changeChar();

            if (this.state.heroes.code) {
                this.setState({invalid: true});
            } else {
                this.setState({invalid: false});
            }

            this.animatePanelsOut();
            setTimeout(this.animatePanelsIn, 1000);

            this.animateBonusPanelOut(panelRightAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelLeftAdditional, document.documentElement.clientHeight / 1.5, -1);
            this.animateBonusPanelOut(panelBottomLeftAdditional, document.documentElement.clientHeight, 1);
            this.animateBonusPanelOut(panelBottomRightAdditional, document.documentElement.clientHeight / 1.5, 1);

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
                this.animateBonusPanelIn(panelRightAdditional, panelRightAdditionalHeight, true, -1);
                this.setState({toggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelRightAdditional, panelRightAdditionalHeight, -1);
                this.setState({toggle: 'hidden'});
            }
        },

        handleParagonStatsClick: function () {
            this.checkParagon();
            this.setState({panelAnimationComplete: false});

            panelLeftAdditionalHeight = panelLeftAdditional.offsetHeight;
            if (this.state.paragonToggle !== 'visible') {
                this.animateBonusPanelIn(panelLeftAdditional, panelLeftAdditionalHeight, false, -1);
                this.setState({paragonToggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelLeftAdditional, panelLeftAdditionalHeight, -1);
                this.setState({paragonToggle: 'hidden'});
            }
        },

        handleSkillDescClick: function () {
            this.setState({panelAnimationComplete: false});

            panelBottomLeftAdditionalHeight = panelBottomLeftAdditional.offsetHeight;
            if (this.state.skillDescToggle !== 'visible') {
                this.animateBonusPanelIn(panelBottomLeftAdditional, panelBottomLeftAdditionalHeight, false, 1);
                this.setState({skillDescToggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelBottomLeftAdditional, panelBottomLeftAdditionalHeight, 1);
                this.setState({skillDescToggle: 'hidden'});
            }
        },

        handlePassiveDescClick: function () {
            this.setState({panelAnimationComplete: false});

            panelBottomRightAdditionalHeight = panelBottomRightAdditional.offsetHeight;
            if (this.state.passiveDescToggle !== 'visible') {
                this.animateBonusPanelIn(panelBottomRightAdditional, panelBottomRightAdditionalHeight, false, 1);
                this.setState({passiveDescToggle: 'visible'});
            } else {
                this.animateBonusPanelOut(panelBottomRightAdditional, panelBottomRightAdditionalHeight, 1);
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

        checkParagon: function () {
            pcdr = this.refs.cdr.getDOMNode();
            presred = this.refs.resred.getDOMNode();
            patkspd = this.refs.atkspd.getDOMNode();
            pcritdmg = this.refs.critdmg.getDOMNode();
            pcritchance = this.refs.critchance.getDOMNode();
            pareadmg = this.refs.areadmg.getDOMNode();
            presource = this.refs.resource.getDOMNode();
            presistall = this.refs.resistall.getDOMNode();
            parmor = this.refs.armor.getDOMNode();
            pmaxlife = this.refs.maxlife.getDOMNode();


            if (this.state.paragonCdr === 10) {
                pcdr.classList.add('maxed');
            }

            if (this.state.paragonResRed === 10) {
                presred.classList.add('maxed');
            }

            if (this.state.paragonAtkSpd === 10) {
                patkspd.classList.add('maxed');
            }

            if (this.state.paragonCritDmg === 50) {
                pcritdmg.classList.add('maxed');
            }

            if (this.state.paragonCritChance === 5) {
                pcritchance.classList.add('maxed');
            }

            if (this.state.paragonAreaDmg === 50) {
                pareadmg.classList.add('maxed');
            }

            if (this.state.paragonResource === 25) {
                presource.classList.add('maxed');
            }

            if (this.state.paragonResistAll === 250) {
                presistall.classList.add('maxed');
            }

            if (this.state.paragonArmor === 25) {
                parmor.classList.add('maxed');
            }

            if (this.state.paragonMaxHealth === 25) {
                pmaxlife.classList.add('maxed');
            }

        },

        handleParagon: function (e) {
            target = e.target;
            parentElement = target.parentNode;

            if (parentElement.classList.contains('cdr')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonCdr < 10) {
                        this.setState({paragonCdr: Math.round((this.state.paragonCdr + 0.2) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonCdr: 10});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonCdr: 0});
                } else {
                    if (this.state.paragonCdr > 0) {
                        this.setState({paragonCdr: Math.round((this.state.paragonCdr - 0.2) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('resred')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonResRed < 10) {
                        this.setState({paragonResRed: Math.round((this.state.paragonResRed + 0.2) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonResRed: 10});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonResRed: 0});
                } else {
                    if (this.state.paragonResRed > 0) {
                        this.setState({paragonResRed: Math.round((this.state.paragonResRed - 0.2) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('atkspd')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonAtkSpd < 10) {
                        this.setState({paragonAtkSpd: Math.round((this.state.paragonAtkSpd + 0.2) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonAtkSpd: 10});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonAtkSpd: 0});
                } else {
                    if (this.state.paragonAtkSpd > 0) {
                        this.setState({paragonAtkSpd: Math.round((this.state.paragonAtkSpd - 0.2) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('critdmg')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonCritDmg < 50) {
                        this.setState({paragonCritDmg: Math.round((this.state.paragonCritDmg + 1) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonCritDmg: 50});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonCritDmg: 0});
                } else {
                    if (this.state.paragonCritDmg > 0) {
                        this.setState({paragonCritDmg: Math.round((this.state.paragonCritDmg - 1) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('critchance')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonCritChance < 5) {
                        this.setState({paragonCritChance: Math.round((this.state.paragonCritChance + 0.1) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonCritChance: 5});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonCritChance: 0});
                } else {
                    if (this.state.paragonCritChance > 0) {
                        this.setState({paragonCritChance: Math.round((this.state.paragonCritChance - 0.1) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('areadmg')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonAreaDmg < 50) {
                        this.setState({paragonAreaDmg: Math.round((this.state.paragonAreaDmg + 1) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonAreaDmg: 50});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonAreaDmg: 0});
                } else {
                    if (this.state.paragonAreaDmg > 0) {
                        this.setState({paragonAreaDmg: Math.round((this.state.paragonAreaDmg - 1) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('resource')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonResource < 25) {
                        this.setState({paragonResource: Math.round((this.state.paragonResource + 0.5) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonResource: 25});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonResource: 0});
                } else {
                    if (this.state.paragonResource > 0) {
                        this.setState({paragonResource: Math.round((this.state.paragonResource - 0.5) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('resistall')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonResistAll < 250) {
                        this.setState({paragonResistAll: Math.round((this.state.paragonResistAll + 5) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonResistAll: 250});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonResistAll: 0});
                } else {
                    if (this.state.paragonResistAll > 0) {
                        this.setState({paragonResistAll: Math.round((this.state.paragonResistAll - 5) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('armor')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonArmor < 25) {
                        this.setState({paragonArmor: Math.round((this.state.paragonArmor + 0.5) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonArmor: 25});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonArmor: 0});
                } else {
                    if (this.state.paragonArmor > 0) {
                        this.setState({paragonArmor: Math.round((this.state.paragonArmor - 0.5) * 10) / 10});
                    }
                }
            }
            if (parentElement.classList.contains('maxlife')) {
                if (target.classList.contains('paragon-stat-increment')) {
                    if (this.state.paragonMaxHealth < 25) {
                        this.setState({paragonMaxHealth: Math.round((this.state.paragonMaxHealth + 0.5) * 10) / 10});
                    }
                } else if (target.classList.contains('paragon-stat-max') && !target.classList.contains('maxed')) {
                    target.classList.add('maxed');
                    this.setState({paragonMaxHealth: 25});
                } else if (target.classList.contains('paragon-stat-max') && target.classList.contains('maxed')) {
                    target.classList.remove('maxed');
                    this.setState({paragonMaxHealth: 0});
                } else {
                    if (this.state.paragonMaxHealth > 0) {
                        this.setState({paragonMaxHealth: Math.round((this.state.paragonMaxHealth - 0.5) * 10) / 10});
                    }
                }
            }
            this.triggerStatCollector();
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
                        this.loadItemData(itemData);
                    }
                }

                for (i = 0; i < itemSlotsWithProps.length; i++) {
                    if (itemSlotsWithProps[i][0]) {
                        itemData = itemSlotsWithProps[i][0].tooltipParams;
                        if (itemSlotsWithProps[i][1] === 'left') {
                            this.loadItemDataWithProps(itemData, true);
                        } else {
                            this.loadItemDataWithProps(itemData, false);
                        }
                    }
                }
            }

            clearInterval(updateHeroItems);
            clearInterval(fetchHeroItems);
        },

        skillDmgSanitize: function (obj) {
            calc = 0;
            string = '';
            combined = '';
            saveArray.length = 0;

            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {

                    string = p.toString().slice(4);

                    if (parseFloat(p)) {
                        calc = parseFloat(p) * parseFloat(obj[p]);
                    }

                    if (calc !== 0) {
                        combined += string + ' ' + Math.round(calc * 10000) / 100 + '%' + '<br>';
                        saveArray.push(calc + ' ' + string);
                    }
                }
            }
            if (combined !== '') {
                this.setState({skillDmgRaw: saveArray});
                return combined;
            }
        },

        collectSetNoRingStats: function () {
            var repeatSet = [],
                i,
                j,
                k,
                m;

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
                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i] && itemSlots[i].set && itemSlots[i].set.ranks) {

                        for (m = 0; m < setPool.length; m++) {
                            if (itemSlots[i].set.name === setPool[m][0]) {
                                setPool[m][1]++;
                            }
                            for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                if (itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
                                    for (k = 0; k < statPool.length; k++) {
                                        // check if the stats are releveant for stat building
                                        if (itemSlots[i].set.ranks[j].attributesRaw[statPool[k]] && itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min) {
                                            if (typeof parseInt(itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min === 'number')) {
                                                results[k] = Math.round(itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min * 1000) / 1000;
                                                switch (statPool[k]) {
                                                    case 'Damage_Dealt_Percent_Bonus#Fire':
                                                        fireDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Cold':
                                                        coldDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Lightning':
                                                        lightningDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Physical':
                                                        physicalDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Poison':
                                                        poisonDmg += results[k] * 100;
                                                        break;
                                                    case 'Power_Cooldown_Reduction_Percent_All':
                                                        cdr *= (1 - results[k]);
                                                        break;
                                                    case 'Resource_Cost_Reduction_Percent_All':
                                                        resRed *= (1 - results[k]);
                                                        break;
                                                    case 'Damage_Percent_Bonus_Vs_Elites':
                                                        eliteDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Elites':
                                                        eliteDmgRed += results[k] * 100;
                                                        break;
                                                    case 'Splash_Damage_Effect_Percent':
                                                        areaDmg += results[k] * 100;
                                                        break;
                                                    case 'Gold_PickUp_Radius':
                                                        goldPickUp += results[k];
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Melee':
                                                        dmgRedMelee *= (1 - results[k]);
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Ranged':
                                                        dmgRedRanged *= (1 - results[k]);
                                                        break;
                                                    case 'Hitpoints_Max_Percent_Bonus_Item':
                                                        maxHealth += results[k] * 100;
                                                        break;
                                                    case 'Attacks_Per_Second_Percent':
                                                        atkSpd += results[k];
                                                        break;
                                                }
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
        },

        collectSetRingStats: function () {
            var repeatSet = [],
                i,
                j,
                k,
                m;

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
                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i] && itemSlots[i].set && itemSlots[i].set.ranks) {

                        for (m = 0; m < setPool.length; m++) {
                            if (itemSlots[i].set.name === setPool[m][0]) {
                                setPool[m][1]++;
                            }
                            for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                                if (
                                    itemSlots[i].set.name === setPool[m][0] &&
                                    itemSlots[i].set.ranks[j].required <= setPool[m][1] + 1 &&
                                    setPool[m][1] >= 2
                                ) {
                                    for (k = 0; k < statPool.length; k++) {
                                        // check if the stats are releveant for stat building
                                        if (itemSlots[i].set.ranks[j].attributesRaw[statPool[k]] && itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min) {
                                            if (typeof parseInt(itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min === 'number')) {
                                                results[k] = Math.round(itemSlots[i].set.ranks[j].attributesRaw[statPool[k]].min * 1000) / 1000;
                                                switch (statPool[k]) {
                                                    case 'Damage_Dealt_Percent_Bonus#Fire':
                                                        fireDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Cold':
                                                        coldDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Lightning':
                                                        lightningDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Physical':
                                                        physicalDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Dealt_Percent_Bonus#Poison':
                                                        poisonDmg += results[k] * 100;
                                                        break;
                                                    case 'Power_Cooldown_Reduction_Percent_All':
                                                        cdr *= (1 - results[k]);
                                                        break;
                                                    case 'Resource_Cost_Reduction_Percent_All':
                                                        resRed *= (1 - results[k]);
                                                        break;
                                                    case 'Damage_Percent_Bonus_Vs_Elites':
                                                        eliteDmg += results[k] * 100;
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Elites':
                                                        eliteDmgRed += results[k] * 100;
                                                        break;
                                                    case 'Splash_Damage_Effect_Percent':
                                                        areaDmg += results[k] * 100;
                                                        break;
                                                    case 'Gold_PickUp_Radius':
                                                        goldPickUp += results[k];
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Melee':
                                                        dmgRedMelee *= (1 - results[k]);
                                                        break;
                                                    case 'Damage_Percent_Reduction_From_Ranged':
                                                        dmgRedRanged *= (1 - results[k]);
                                                        break;
                                                    case 'Hitpoints_Max_Percent_Bonus_Item':
                                                        maxHealth += results[k] * 100;
                                                        break;
                                                    case 'Attacks_Per_Second_Percent':
                                                        atkSpd += results[k];
                                                        break;
                                                }
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
        },

        checkSetItems: function () {
            var checkSave = [];

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
                        this.collectSetRingStats();
                    } else {
                        this.collectSetNoRingStats();
                    }
                }
            }
        },

        collectSkillDamage: function () {
            var i,
                k,
                m,
                countedValues;

            skilldmgArray.length = 0;
            saveArr.length = 0;
            saveValues.length = 0;

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

                if (this.state.class && this.state.skills && this.state.skills.length > 0) {
                    for (m = 0; m < this.state.skills.length; m++) {
                        if (this.state.skills[m].skill) {
                            switch (this.state.class) {
                                case 'demon-hunter':
                                    saveArr.push('Power_Damage_Percent_Bonus#DemonHunter_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                case 'witch-doctor':
                                    saveArr.push('Power_Damage_Percent_Bonus#Witchdoctor_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                case 'barbarian':
                                    saveArr.push('Power_Damage_Percent_Bonus#Barbarian_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                case 'crusader':
                                    saveArr.push('Power_Damage_Percent_Bonus#Crusader_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                case 'monk':
                                    saveArr.push('Power_Damage_Percent_Bonus#Monk_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                case 'wizard':
                                    saveArr.push('Power_Damage_Percent_Bonus#Wizard_' + this.state.skills[m].skill.name.replace(/ /g, ''));
                                    break;
                                default:
                            }
                        }
                    }

                    // skill bonus damage iterator
                    for (i = 0; i < itemSlots.length; i++) {
                        if (itemSlots[i] && itemSlots[i].attributesRaw) {
                            for (k = 0; k < saveArr.length; k++) {
                                if (itemSlots[i].attributesRaw[saveArr[k]] && itemSlots[i].attributesRaw[saveArr[k]].min) {
                                    if (typeof parseInt(itemSlots[i].attributesRaw[saveArr[k]].min === 'number')) {
                                        results[k] = Math.round(itemSlots[i].attributesRaw[saveArr[k]].min * 1000) / 1000;
                                        if (Object.getOwnPropertyNames(itemSlots[i].attributesRaw[saveArr[k]] === saveArr[k])) {
                                            saveValues.push(this.state.skills[k].skill.name + ' ' + Math.round(itemSlots[i].attributesRaw[saveArr[k]].min * 10000) / 100 + '%');

                                            skilldmgArray.push(itemSlots[i].attributesRaw[saveArr[k]].min + this.state.skills[k].skill.name);

                                            countedValues = skilldmgArray.reduce(function (p, c) {
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
                    }
                }
            }

            this.setState({skillDmg: this.skillDmgSanitize(countedValues)});
        },

        collectStats: function () {
            var i,
                k;

            // stats that add multiplicatively
            results = [];
            cdr = 1;
            resRed = 1;
            dmgRedMelee = 1;
            dmgRedRanged = 1;
            // stats that add additively
            eliteDmg = 0;
            eliteDmgRed = 0;
            areaDmg = 0;
            fireDmg = 0;
            coldDmg = 0;
            lightningDmg = 0;
            physicalDmg = 0;
            poisonDmg = 0;
            goldPickUp = 0;
            maxHealth = 0;
            atkSpd = 0;

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
                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i] && itemSlots[i].attributesRaw) {
                        for (k = 0; k < statPool.length; k++) {
                            if (itemSlots[i].attributesRaw[statPool[k]] && itemSlots[i].attributesRaw[statPool[k]].min) {
                                if (typeof parseInt(itemSlots[i].attributesRaw[statPool[k]].min === 'number')) {
                                    results[k] = Math.round(itemSlots[i].attributesRaw[statPool[k]].min * 1000) / 1000;
                                    switch (statPool[k]) {
                                        case 'Damage_Dealt_Percent_Bonus#Fire':
                                            fireDmg += results[k] * 100;
                                            break;
                                        case 'Damage_Dealt_Percent_Bonus#Cold':
                                            coldDmg += results[k] * 100;
                                            break;
                                        case 'Damage_Dealt_Percent_Bonus#Lightning':
                                            lightningDmg += results[k] * 100;
                                            break;
                                        case 'Damage_Dealt_Percent_Bonus#Physical':
                                            physicalDmg += results[k] * 100;
                                            break;
                                        case 'Damage_Dealt_Percent_Bonus#Poison':
                                            poisonDmg += results[k] * 100;
                                            break;
                                        case 'Power_Cooldown_Reduction_Percent_All':
                                            cdr *= (1 - results[k]);
                                            break;
                                        case 'Resource_Cost_Reduction_Percent_All':
                                            resRed *= (1 - results[k]);
                                            break;
                                        case 'Damage_Percent_Bonus_Vs_Elites':
                                            eliteDmg += results[k] * 100;
                                            break;
                                        case 'Damage_Percent_Reduction_From_Elites':
                                            eliteDmgRed += results[k] * 100;
                                            break;
                                        case 'Splash_Damage_Effect_Percent':
                                            areaDmg += results[k] * 100;
                                            break;
                                        case 'Gold_PickUp_Radius':
                                            goldPickUp += results[k];
                                            break;
                                        case 'Damage_Percent_Reduction_From_Melee':
                                            dmgRedMelee *= (1 - results[k]);
                                            break;
                                        case 'Damage_Percent_Reduction_From_Ranged':
                                            dmgRedRanged *= (1 - results[k]);
                                            break;
                                        case 'Hitpoints_Max_Percent_Bonus_Item':
                                            maxHealth += results[k] * 100;
                                            break;
                                        case 'Attacks_Per_Second_Percent':
                                            atkSpd += results[k];
                                            break;
                                        default:
                                            console.log('default');
                                    }
                                }
                            }
                        }
                    }
                }

                // ignoring mf,gf,thorns and block since they are useless stats
                if (this.state.helmItem && this.state.helmItem.gems && this.state.helmItem.gems[0] && this.state.helmItem.attributesRaw) {
                    if (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All && this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                        // increment for cdr gem
                        cdr *= (1 - this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min -
                        (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min * this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier.min));
                    } else if (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All && !this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                        cdr *= (1 - this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min);
                    }
                    if (this.state.helmItem.gems[0].attributesRaw.Hitpoints_Max_Percent_Bonus_Item && this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                        // increment for health gem
                        maxHealth += this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100 +
                        (this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100 * this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier.min);
                    } else if (this.state.helmItem.gems[0].attributesRaw.Hitpoints_Max_Percent_Bonus_Item && !this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                        maxHealth += this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100;
                    }
                }

                // reduce is a neat method
                var eleDmg = [
                        fireDmg,
                        poisonDmg,
                        lightningDmg,
                        physicalDmg,
                        coldDmg
                    ],
                    findElem = eleDmg.reduce(function (max, arr) {
                        return max >= arr ? max : arr;
                    }, -Infinity),
                    maxElement;

                switch (findElem) {
                    case fireDmg:
                        maxElement = 'Fire Damage Increase: ' + Math.round(findElem * 100) / 100 + '%';
                        break;
                    case coldDmg:
                        maxElement = 'Cold Damage Increase: ' + Math.round(findElem * 100) / 100 + '%';
                        break;
                    case physicalDmg:
                        maxElement = 'Physical Damage Increase: ' + Math.round(findElem * 100) / 100 + '%';
                        break;
                    case lightningDmg:
                        maxElement = 'Lightning Damage Increase: ' + Math.round(findElem * 100) / 100 + '%';
                        break;
                    case poisonDmg:
                        maxElement = 'Poison Damage Increase: ' + Math.round(findElem * 100) / 100 + '%';
                        break;
                }

                // Find max Elemental Damage Bonus
                if (findElem !== 0) {
                    this.setState({maxEleDmg: maxElement});
                    this.setState({maxEleDmgValue: findElem});
                } else {
                    this.setState({maxEleDmg: ''});
                    this.setState({maxEleDmgValue: 0});
                }

                // set states of other stats
                this.setState({cdrRed: cdr});
                this.setState({resRed: resRed});
                this.setState({eliteDmg: eliteDmg});
                this.setState({eliteDmgRed: eliteDmgRed});
                this.setState({areaDmg: areaDmg});
                this.setState({goldPickup: goldPickUp});
                this.setState({dmgRedMelee: dmgRedMelee});
                this.setState({dmgRedRanged: dmgRedRanged});
                this.setState({maxHealth: maxHealth});
                this.setState({atkSpd: atkSpd});
            }
        },

        render: function () {
            var skillsState = this.state.skills,
                passivesState = this.state.passives,
                statsState = this.state.stats,
                nameState = this.state.name,
                heroesState = this.state.heroes,
                itemsState = this.state.items,
                classState = this.state.class,
                levelState = this.state.level,
                paragonState = this.state.paragon,
                amuletState = this.state.amuletItem,
                shouldersState = this.state.shouldersItem,
                helmState = this.state.helmItem,
                torsoState = this.state.chestItem,
                handsState = this.state.glovesItem,
                feetState = this.state.bootsItem,
                bracersState = this.state.bracersItem,
                legsState = this.state.legsItem,
                mainHandState = this.state.mainItem,
                offHandState = this.state.offItem,
                beltState = this.state.beltItem,
                neckState = this.state.amuletItem,
                ringStateLeft = this.state.ringItemLeft,
                ringStateRight = this.state.ringItemRight,
                itemsIconState = this.state.items,
                skillIconBaseUrl = this.state.skillIconBase,
                itemIconBaseUrl = this.state.itemIconBase,
                timeStamp = this.state.time,
                cdrState = this.state.cdrRed,
                resState = this.state.resRed,
                eliteDmgState = this.state.eliteDmg,
                eliteDmgRedState = this.state.eliteDmgRed,
                areaDmgState = this.state.areaDmg,
                goldPickUpState = this.state.goldPickup,
                dmgRedMeleeState = this.state.dmgRedMelee,
                dmgRedRangedState = this.state.dmgRedRanged,
                maxElementDmg = this.state.maxEleDmg,
                maxHealthState = this.state.maxHealth,
                skillDmgState = this.state.skillDmg,
                skillDmgStateRaw = this.state.skillDmgRaw,
                itemAtkSpeedState = this.state.atkSpd,
                pCdr = this.state.paragonCdr,
                pAtkSpd = this.state.paragonAtkSpd,
                pResRed = this.state.paragonResRed,
                pCritDmg = this.state.paragonCritDmg,
                pCritChance = this.state.paragonCritChance,
                pAreaDmg = this.state.paragonAreaDmg,
                pResource = this.state.paragonResource,
                pResistAll = this.state.paragonResistAll,
                pArmor = this.state.paragonArmor,
                pLife = this.state.paragonMaxHealth,
                itemSlots = [
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

            calculatedAttackSpeed = 0;
            minDmgCalc = 0;
            maxDmgCalc = 0;
            additionalStatsOffensive.length = 0;
            additionalStatsDefensive.length = 0;
            skills.length = 0;
            skillsDesc.length = 0;
            heroes.length = 0;
            realms.length = 0;
            passives.length = 0;
            passivesDesc.length = 0;
            stats.length = 0;
            paragon.length = 0;
            specialPassive.length = 0;
            base.length = 0;
            style.length = 0;
            shoulders.length = 0;
            helmet.length = 0;
            torso.length = 0;
            hands.length = 0;
            feet.length = 0;
            ringLeft.length = 0;
            ringRight.length = 0;
            bracers.length = 0;
            legs.length = 0;
            items.length = 0;
            mainHand.length = 0;
            offHand.length = 0;
            belt.length = 0;
            neck.length = 0;

            for (i = 0; i < itemSlots.length; i++) {
                for (m = 0; m < setPool.length; m++) {
                    if (itemSlots[i] && itemSlots[i].set) {
                        if (itemSlots[i].set.name === setPool[m][0]) {
                            setPool[m][1]++;
                        }
                    }
                }
            }

            realms.push(React.DOM.option({key: 'eu', value: 'eu'}, 'EU'));
            realms.push(React.DOM.option({key: 'us', value: 'us'}, 'US'));
            realms.push(React.DOM.option({key: 'kr', value: 'kr'}, 'KR'));

            switch (classState) {
                case 'demon-hunter':
                    style = {
                        backgroundImage: 'url("assets/images/dh.png")'
                    };
                    break;
                case 'witch-doctor':
                    style = {
                        backgroundImage: 'url("assets/images/wd.png")'
                    };
                    break;
                case 'barbarian':
                    style = {
                        backgroundImage: 'url("assets/images/barbarian.png")'
                    };
                    break;
                case 'crusader':
                    style = {
                        backgroundImage: 'url("assets/images/crusader.png")'
                    };
                    break;
                case 'monk':
                    style = {
                        backgroundImage: 'url("assets/images/monk.png")'
                    };
                    break;
                case 'wizard':
                    style = {
                        backgroundImage: 'url("assets/images/wiz.jpg")'
                    };
                    break;
                default:
                    style = {
                        backgroundImage: 'none'
                    };
            }
            if (heroesState.heroes) {
                heroes.push(React.DOM.option({
                    key: heroesState.heroes.key,
                    value: '',
                    style: {display: 'none'}
                }, 'click to select hero'));
                heroesState.heroes.forEach(function (heroName) {
                    heroes.push(React.DOM.option({
                        key: heroesState.heroes.key,
                        value: heroName.id
                    }, '[' + heroName.class + '] ' + heroName.name + ' (id: ' + heroName.id + ')'));
                });
            } else if (heroesState.code) {
                heroes.push(React.DOM.option({
                    key: heroesState.code.key,
                    value: '',
                    style: {display: 'none'}
                }, 'invalid battleTag'));
            } else if (this.state.battleTag === null || this.state.battleTag === '') {
                heroes.push(React.DOM.option({
                    value: '',
                    style: {display: 'none'}
                }, 'enter your battleTag in the field below'));
            } else {
                heroes.push(React.DOM.option({value: '', style: {display: 'none'}}, 'loading herolist...'));
            }

            if (nameState && classState && levelState) {
                var sanitizeName =
                    classState.toString().replace(/-/g, '').charAt(0).toUpperCase() +
                    classState.toString().replace(/-/g, '').slice(1).toLowerCase();

                base.push(React.DOM.div({key: nameState.key}, 'Name: ', nameState));
                base.push(React.DOM.div({key: 'class-name'},
                    'Class: ',
                    sanitizeName
                ));
                base.push(React.DOM.div({key: levelState.key}, 'Level: ', levelState));
                if (paragonState) {
                    base.push(React.DOM.div({key: paragonState.key}, 'Paragon: ', paragonState));
                }
            } else {
                base.push(React.DOM.div({key: 'class-name'},
                    'Class: '
                ));
            }

            if (timeStamp && timeStamp * 1000 !== 0) {
                var t = new Date(timeStamp * 1000),
                    formatted = t.toLocaleDateString() + ' - ' + t.toLocaleTimeString();
                base.push(React.DOM.div({
                    key: timeStamp.key,
                    className: 'last-updated'
                }, 'last-updated on: ' + formatted));
            }

            if (skillsState !== []) {
                skillsState.forEach(function (skillName) {
                    var runeType;
                    if (skillName.rune) {
                        constructedLink = skillIconBaseUrl.concat(skillName.skill.icon);
                        switch (skillName.rune.type) {
                            case 'a':
                                runeType = {
                                    backgroundPosition: '0 0'
                                };
                                break;
                            case 'b':
                                runeType = {
                                    backgroundPosition: '0 97%'
                                };
                                break;
                            case 'c':
                                runeType = {
                                    backgroundPosition: '0 25%'
                                };
                                break;
                            case 'd':
                                runeType = {
                                    backgroundPosition: '0 49%'
                                };
                                break;
                            case 'e':
                                runeType = {
                                    backgroundPosition: '0 73%'
                                };
                                break;
                        }
                        skills.push(React.DOM.div({key: skillsState.key, className: 'hasIcon'},
                                skillName.skill.name,
                                ' with ',
                                skillName.rune.name,
                                React.DOM.div({
                                    key: skillsState.key,
                                    className: 'icon-front',
                                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                                }),
                                React.DOM.div({key: skillsState.key, className: 'icon-back', style: runeType})
                            )
                        );
                        skillsDesc.push(React.DOM.div({key: skillsState.key, className: 'description'},
                            React.DOM.div({
                                key: skillsState.key,
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            skillName.skill.name + ' with ' + skillName.rune.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillName.skill.description.replace(/\n/g, '<br/>')},
                                key: skillsState.key,
                                className: 'skill-desc'
                            }),
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillName.rune.description.replace(/\n/g, '<br/>')},
                                key: skillsState.key,
                                className: 'rune-desc'
                            })
                        ));
                    } else if (skillName.skill) {
                        constructedLink = skillIconBaseUrl.concat(skillName.skill.icon);
                        skills.push(React.DOM.div({
                            key: skillsState.key,
                            className: 'hasIcon'
                        }, skillName.skill.name, React.DOM.div({
                            key: skillsState.key,
                            className: 'icon-front no-rune',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        })));
                        skillsDesc.push(React.DOM.div({key: skillsState.key, className: 'description'},
                            React.DOM.div({
                                key: skillsState.key,
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            skillName.skill.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: skillName.skill.description.replace(/\n/g, '<br/>')},
                                key: skillsState.key,
                                className: 'skill-desc'
                            })
                        ));
                    }
                });
            }

            if (passivesState !== []) {
                passivesState.forEach(function (passiveName) {
                    if (passiveName.skill) {
                        constructedLink = skillIconBaseUrl.concat(passiveName.skill.icon);
                        passives.push(React.DOM.div({
                            key: passivesState.key,
                            className: 'hasIcon'
                        }, passiveName.skill.name, React.DOM.div({
                            key: passivesState.key,
                            className: 'icon',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        })));
                        passivesDesc.push(React.DOM.div({key: passivesState.key, className: 'description'},
                            React.DOM.div({
                                key: passivesState.key,
                                className: 'desc-icon',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            passiveName.skill.name,
                            React.DOM.p({
                                dangerouslySetInnerHTML: {__html: passiveName.skill.description.replace(/\n/g, '<br/>')},
                                key: passivesState.key,
                                className: 'passive-desc'
                            })
                        ));
                    }
                });
            }

            if (itemsIconState && itemsIconState.head && helmState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.head.icon, '.png');

                switch (itemsState.head.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (helmState.attributesRaw) {
                    if (helmState.attributesRaw.Ancient_Rank && helmState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        helmet.push(React.DOM.li({
                            key: helmState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.head.name));
                    } else {
                        isAncient = '';
                        helmet.push(React.DOM.li({
                            key: helmState.key,
                            className: itemQuality + ' name'
                        }, itemsState.head.name));
                    }
                }

                if (helmState.attributes) {
                    if (helmState.attributes.primary) {
                        helmState.attributes.primary.forEach(function (primaryStat) {
                            helmet.push(React.DOM.li({key: helmState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (helmState.attributes.secondary) {
                        helmState.attributes.secondary.forEach(function (secondaryStat) {
                            helmet.push(React.DOM.li({key: helmState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }

                    if (helmState.attributes.passive) {
                        helmState.attributes.passive.forEach(function (passiveStat) {
                            helmet.push(React.DOM.li({key: helmState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (helmState.set && helmState.set.ranks) {
                    for (i = 0; i < helmState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (helmState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        helmCount = setPool[m][1]++;
                                    } else {
                                        helmCount = setPool[m][1];
                                    }
                                } else if (helmState.set.name === setPool[m][0] && !this.state.setRing) {
                                    helmCount = setPool[m][1];
                                }
                            }

                            if (helmState.set.ranks[i].required === k && helmState.set.ranks[i].required <= helmCount) {
                                helmState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (helmState.set.ranks[i].required === k) {
                                helmState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (helmState.set.ranks[i].required === k && helmState.set.ranks[i].required <= helmCount) {
                                helmState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (helmState.set.ranks[i].required === k) {
                                helmState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (helmState.set.ranks[i].required === k && helmState.set.ranks[i].required <= helmCount) {
                                helmState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (helmState.set.ranks[i].required === k) {
                                helmState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    helmet.push(React.DOM.li({
                                        key: helmState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (helmState.attributesRaw && helmState.attributesRaw.Sockets && helmState.gems[0]) {
                    gemLink = itemIconBaseUrl.concat(helmState.gems[0].item.icon, '.png');
                    helmet.push(React.DOM.li({
                        key: helmState.key,
                        className: 'socket',
                        style: {backgroundImage: 'url(' + gemLink + ')'}
                    }));

                    if (helmState.gems[0].attributes.primary) {
                        helmState.gems[0].attributes.primary.forEach(function (Stat) {
                            helmet.push(React.DOM.li({key: helmState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }

                    if (helmState.gems[0].attributes.secondary) {
                        helmState.gems[0].attributes.secondary.forEach(function (Stat) {
                            helmet.push(React.DOM.li({key: helmState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' head',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: helmState.key, className: 'desc'}, React.DOM.ul({
                        key: helmState.key,
                        className: 'stats'
                    }, helmet)
                )));

            }

            if (itemsIconState && itemsIconState.torso && torsoState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.torso.icon, '.png');

                switch (itemsState.torso.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (torsoState.attributesRaw) {
                    if (torsoState.attributesRaw.Ancient_Rank && torsoState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        torso.push(React.DOM.li({
                            key: torsoState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.torso.name));
                    } else {
                        isAncient = '';
                        torso.push(React.DOM.li({
                            key: torsoState.key,
                            className: itemQuality + ' name'
                        }, itemsState.torso.name));
                    }
                }

                if (torsoState.attributes) {
                    if (torsoState.attributes.primary) {
                        torsoState.attributes.primary.forEach(function (primaryStat) {
                            torso.push(React.DOM.li({key: torsoState.key, className: 'primary'}, primaryStat.text));
                        });
                    }

                    if (torsoState.attributes.secondary) {
                        torsoState.attributes.secondary.forEach(function (secondaryStat) {
                            torso.push(React.DOM.li({key: torsoState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }

                    if (torsoState.attributes.passive) {
                        torsoState.attributes.passive.forEach(function (passiveStat) {
                            torso.push(React.DOM.li({key: torsoState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (torsoState.set && torsoState.set.ranks) {
                    for (i = 0; i < torsoState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (torsoState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        torsoCount = setPool[m][1]++;
                                    } else {
                                        torsoCount = setPool[m][1];
                                    }
                                } else if (torsoState.set.name === setPool[m][0] && !this.state.setRing) {
                                    torsoCount = setPool[m][1];
                                }
                            }

                            if (torsoState.set.ranks[i].required === k && torsoState.set.ranks[i].required <= torsoCount) {
                                torsoState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (torsoState.set.ranks[i].required === k) {
                                torsoState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (torsoState.set.ranks[i].required === k && torsoState.set.ranks[i].required <= torsoCount) {
                                torsoState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (torsoState.set.ranks[i].required === k) {
                                torsoState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (torsoState.set.ranks[i].required === k && torsoState.set.ranks[i].required <= torsoCount) {
                                torsoState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (torsoState.set.ranks[i].required === k) {
                                torsoState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    torso.push(React.DOM.li({
                                        key: torsoState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (torsoState.attributesRaw && torsoState.attributesRaw.Sockets && torsoState.gems[0]) {
                    gemLink = itemIconBaseUrl.concat(torsoState.gems[0].item.icon, '.png');
                    if (torsoState.gems[0].attributes.primary) {
                        torsoState.gems[0].attributes.primary.forEach(function (Stat) {
                            torso.push(React.DOM.li({
                                key: torsoState.key,
                                className: 'socket',
                                style: {backgroundImage: 'url(' + gemLink + ')'}
                            }));
                            torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                            torso.push(React.DOM.li({
                                key: torsoState.key,
                                className: 'socket',
                                style: {backgroundImage: 'url(' + gemLink + ')'}
                            }));
                            torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                            torso.push(React.DOM.li({
                                key: torsoState.key,
                                className: 'socket',
                                style: {backgroundImage: 'url(' + gemLink + ')'}
                            }));
                            torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }

                } else if (torsoState.attributesRaw && torsoState.attributesRaw.Sockets) {
                    torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
                    torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
                    torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' torso',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: torsoState.key, className: 'desc'}, React.DOM.ul({
                        key: torsoState.key,
                        className: 'stats'
                    }, torso)
                )));
            }

            if (itemsIconState && itemsIconState.hands && handsState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.hands.icon, '.png');

                switch (itemsState.hands.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (handsState.attributesRaw) {
                    if (handsState.attributesRaw.Ancient_Rank && handsState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        hands.push(React.DOM.li({
                            key: handsState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.hands.name));
                    } else {
                        isAncient = '';
                        hands.push(React.DOM.li({
                            key: handsState.key,
                            className: itemQuality + ' name'
                        }, itemsState.hands.name));
                    }
                }


                if (handsState.attributes) {
                    if (handsState.attributes.primary) {
                        handsState.attributes.primary.forEach(function (primaryStat) {
                            hands.push(React.DOM.li({key: handsState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (handsState.attributes.secondary) {
                        handsState.attributes.secondary.forEach(function (secondaryStat) {
                            hands.push(React.DOM.li({key: handsState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }
                    if (handsState.attributes.passive) {
                        handsState.attributes.passive.forEach(function (passiveStat) {
                            hands.push(React.DOM.li({key: handsState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (handsState.set && handsState.set.ranks) {
                    for (i = 0; i < handsState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (handsState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        handsCount = setPool[m][1]++;
                                    } else {
                                        handsCount = setPool[m][1];
                                    }
                                } else if (handsState.set.name === setPool[m][0] && !this.state.setRing) {
                                    handsCount = setPool[m][1];
                                }
                            }

                            if (handsState.set.ranks[i].required === k && handsState.set.ranks[i].required <= handsCount) {
                                handsState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (handsState.set.ranks[i].required === k) {
                                handsState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (handsState.set.ranks[i].required === k && handsState.set.ranks[i].required <= handsCount) {
                                handsState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (handsState.set.ranks[i].required === k) {
                                handsState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (handsState.set.ranks[i].required === k && handsState.set.ranks[i].required <= handsCount) {
                                handsState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (handsState.set.ranks[i].required === k) {
                                handsState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    hands.push(React.DOM.li({
                                        key: handsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' hands',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: handsState.key, className: 'desc'}, React.DOM.ul({
                        key: handsState.key,
                        className: 'stats'
                    }, hands)
                )));
            }

            if (itemsIconState && itemsIconState.feet && feetState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.feet.icon, '.png');

                switch (itemsState.feet.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (feetState.attributesRaw) {
                    if (feetState.attributesRaw.Ancient_Rank && feetState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        feet.push(React.DOM.li({
                            key: feetState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.feet.name));
                    } else {
                        isAncient = '';
                        feet.push(React.DOM.li({
                            key: feetState.key,
                            className: itemQuality + ' name'
                        }, itemsState.feet.name));
                    }
                }


                if (feetState.attributes) {
                    if (feetState.attributes.primary) {
                        feetState.attributes.primary.forEach(function (primaryStat) {
                            feet.push(React.DOM.li({key: feetState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (feetState.attributes.secondary) {
                        feetState.attributes.secondary.forEach(function (secondaryStat) {
                            feet.push(React.DOM.li({key: feetState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }
                    if (feetState.attributes.passive) {
                        feetState.attributes.passive.forEach(function (passiveStat) {
                            feet.push(React.DOM.li({key: feetState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (feetState.set && feetState.set.ranks) {
                    for (i = 0; i < feetState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (feetState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        feetCount = setPool[m][1]++;
                                    } else {
                                        feetCount = setPool[m][1];
                                    }
                                } else if (feetState.set.name === setPool[m][0] && !this.state.setRing) {
                                    feetCount = setPool[m][1];
                                }
                            }

                            if (feetState.set.ranks[i].required === k && feetState.set.ranks[i].required <= feetCount) {
                                feetState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (feetState.set.ranks[i].required === k) {
                                feetState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (feetState.set.ranks[i].required === k && feetState.set.ranks[i].required <= feetCount) {
                                feetState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (feetState.set.ranks[i].required === k) {
                                feetState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (feetState.set.ranks[i].required === k && feetState.set.ranks[i].required <= feetCount) {
                                feetState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (feetState.set.ranks[i].required === k) {
                                feetState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    feet.push(React.DOM.li({
                                        key: feetState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' feet',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: feetState.key, className: 'desc'}, React.DOM.ul({
                        key: feetState.key,
                        className: 'stats'
                    }, feet)
                )));
            }

            if (itemsIconState && itemsIconState.shoulders && shouldersState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.shoulders.icon, '.png');

                switch (itemsState.shoulders.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (shouldersState.attributesRaw) {
                    if (shouldersState.attributesRaw.Ancient_Rank && shouldersState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        shoulders.push(React.DOM.li({
                            key: shouldersState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.shoulders.name));
                    } else {
                        isAncient = '';
                        shoulders.push(React.DOM.li({
                            key: shouldersState.key,
                            className: itemQuality + ' name'
                        }, itemsState.shoulders.name));
                    }
                }

                if (shouldersState.attributes) {
                    if (shouldersState.attributes.primary) {
                        shouldersState.attributes.primary.forEach(function (primaryStat) {
                            shoulders.push(React.DOM.li({
                                key: shouldersState.key,
                                className: 'primary'
                            }, primaryStat.text));
                        });
                    }
                    if (shouldersState.attributes.secondary) {
                        shouldersState.attributes.secondary.forEach(function (secondaryStat) {
                            shoulders.push(React.DOM.li({
                                key: shouldersState.key,
                                className: 'secondary'
                            }, secondaryStat.text));
                        });
                    }
                    if (shouldersState.attributes.passive) {
                        shouldersState.attributes.passive.forEach(function (passiveStat) {
                            shoulders.push(React.DOM.li({
                                key: shouldersState.key,
                                className: 'passive'
                            }, passiveStat.text));
                        });
                    }
                }

                if (shouldersState.set && shouldersState.set.ranks) {
                    for (i = 0; i < shouldersState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (shouldersState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        shouldersCount = setPool[m][1]++;
                                    } else {
                                        shouldersCount = setPool[m][1];
                                    }
                                } else if (shouldersState.set.name === setPool[m][0] && !this.state.setRing) {
                                    shouldersCount = setPool[m][1];
                                }
                            }

                            if (shouldersState.set.ranks[i].required === k && shouldersState.set.ranks[i].required <= shouldersCount) {
                                shouldersState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (shouldersState.set.ranks[i].required === k) {
                                shouldersState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (shouldersState.set.ranks[i].required === k && shouldersState.set.ranks[i].required <= shouldersCount) {
                                shouldersState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (shouldersState.set.ranks[i].required === k) {
                                shouldersState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (shouldersState.set.ranks[i].required === k && shouldersState.set.ranks[i].required <= shouldersCount) {
                                shouldersState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (shouldersState.set.ranks[i].required === k) {
                                shouldersState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    shoulders.push(React.DOM.li({
                                        key: shouldersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' shoulders',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: shouldersState.key, className: 'desc'}, React.DOM.ul({
                        key: shouldersState.key,
                        className: 'stats'
                    }, shoulders)
                )));
            }

            if (itemsIconState && itemsIconState.legs && legsState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.legs.icon, '.png');

                switch (itemsState.legs.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (legsState.attributesRaw) {
                    if (legsState.attributesRaw.Ancient_Rank && legsState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        legs.push(React.DOM.li({
                            key: legsState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.legs.name));
                    } else {
                        isAncient = '';
                        legs.push(React.DOM.li({
                            key: legsState.key,
                            className: itemQuality + ' name'
                        }, itemsState.legs.name));
                    }
                }

                if (legsState.attributes) {
                    if (legsState.attributes.primary) {
                        legsState.attributes.primary.forEach(function (primaryStat) {
                            legs.push(React.DOM.li({key: legsState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (legsState.attributes.secondary) {
                        legsState.attributes.secondary.forEach(function (secondaryStat) {
                            legs.push(React.DOM.li({key: legsState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }
                    if (legsState.attributes.passive) {
                        legsState.attributes.passive.forEach(function (passiveStat) {
                            legs.push(React.DOM.li({key: legsState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (legsState.set && legsState.set.ranks) {
                    for (i = 0; i < legsState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (legsState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        legsCount = setPool[m][1]++;
                                    } else {
                                        legsCount = setPool[m][1];
                                    }
                                } else if (legsState.set.name === setPool[m][0] && !this.state.setRing) {
                                    legsCount = setPool[m][1];
                                }
                            }

                            if (legsState.set.ranks[i].required === k && legsState.set.ranks[i].required <= legsCount) {
                                legsState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (legsState.set.ranks[i].required === k) {
                                legsState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (legsState.set.ranks[i].required === k && legsState.set.ranks[i].required <= legsCount) {
                                legsState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (legsState.set.ranks[i].required === k) {
                                legsState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (legsState.set.ranks[i].required === k && legsState.set.ranks[i].required <= legsCount) {
                                legsState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (legsState.set.ranks[i].required === k) {
                                legsState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    legs.push(React.DOM.li({
                                        key: legsState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }


                if (legsState.attributesRaw && legsState.attributesRaw.Sockets && legsState.gems[0]) {
                    gemLink = itemIconBaseUrl.concat(legsState.gems[0].item.icon, '.png');

                    if (legsState.gems[0].attributes.primary) {
                        legsState.gems[0].attributes.primary.forEach(function (Stat) {
                            legs.push(React.DOM.li({
                                key: legsState.key,
                                className: 'socket',
                                style: {backgroundImage: 'url(' + gemLink + ')'}
                            }));
                            legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                            legs.push(React.DOM.li({
                                key: legsState.key,
                                className: 'socket',
                                style: {backgroundImage: 'url(' + gemLink + ')'}
                            }));
                            legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }
                } else if (legsState.attributesRaw && legsState.attributesRaw.Sockets) {
                    legs.push(React.DOM.li({key: legsState.key, className: 'socket'}));
                    legs.push(React.DOM.li({key: legsState.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' legs',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: legsState.key, className: 'desc'}, React.DOM.ul({
                        key: legsState.key,
                        className: 'stats'
                    }, legs)
                )));
            }

            if (itemsIconState && itemsIconState.bracers && bracersState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.bracers.icon, '.png');

                switch (itemsState.bracers.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (bracersState.attributesRaw) {
                    if (bracersState.attributesRaw.Ancient_Rank && bracersState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        bracers.push(React.DOM.li({
                            key: bracersState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.bracers.name));
                    } else {
                        isAncient = '';

                        bracers.push(React.DOM.li({
                            key: bracersState.key,
                            className: itemQuality + ' name'
                        }, itemsState.bracers.name));
                    }
                }


                if (bracersState.attributes) {
                    if (bracersState.attributes.primary) {
                        bracersState.attributes.primary.forEach(function (primaryStat) {
                            bracers.push(React.DOM.li({key: bracersState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (bracersState.attributes.secondary) {
                        bracersState.attributes.secondary.forEach(function (secondaryStat) {
                            bracers.push(React.DOM.li({
                                key: bracersState.key,
                                className: 'secondary'
                            }, secondaryStat.text));
                        });
                    }
                    if (bracersState.attributes.passive) {
                        bracersState.attributes.passive.forEach(function (passiveStat) {
                            bracers.push(React.DOM.li({key: bracersState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (bracersState.set && bracersState.set.ranks) {
                    for (i = 0; i < bracersState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (bracersState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        bracersCount = setPool[m][1]++;
                                    } else {
                                        bracersCount = setPool[m][1];
                                    }
                                } else if (bracersState.set.name === setPool[m][0] && !this.state.setRing) {
                                    bracersCount = setPool[m][1];
                                }
                            }

                            if (bracersState.set.ranks[i].required === k && bracersState.set.ranks[i].required <= bracersCount) {
                                bracersState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (bracersState.set.ranks[i].required === k) {
                                bracersState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (bracersState.set.ranks[i].required === k && bracersState.set.ranks[i].required <= bracersCount) {
                                bracersState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (bracersState.set.ranks[i].required === k) {
                                bracersState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (bracersState.set.ranks[i].required === k && bracersState.set.ranks[i].required <= bracersCount) {
                                bracersState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (bracersState.set.ranks[i].required === k) {
                                bracersState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    bracers.push(React.DOM.li({
                                        key: bracersState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' bracers',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: bracersState.key, className: 'desc'}, React.DOM.ul({
                        key: bracersState.key,
                        className: 'stats'
                    }, bracers)
                )));
            }

            if (itemsIconState && itemsIconState.mainHand && mainHandState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.mainHand.icon, '.png');

                switch (itemsState.mainHand.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (mainHandState.attributesRaw && mainHandState.type) {
                    var mainHanded = '';
                    if (mainHandState.type.twoHanded === true) {
                        mainHanded = '(2h)';
                    } else {
                        mainHanded = '(1h)';
                    }

                    if (mainHandState.attributesRaw.Ancient_Rank && mainHandState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        mainHand.push(React.DOM.li({
                            key: mainHandState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.mainHand.name + ' ' + mainHanded));
                    } else {
                        isAncient = '';
                        mainHand.push(React.DOM.li({
                            key: mainHandState.key,
                            className: itemQuality + ' name'
                        }, itemsState.mainHand.name + ' ' + mainHanded));
                    }
                }

                if (mainHandState.dps) {
                    mainHand.push(React.DOM.li({
                        key: mainHandState.key,
                        className: 'dps'
                    }, mainHandState.dps.max.toString().substring(0, 7) + ' DPS'));
                }

                if (mainHandState.minDamage && mainHandState.maxDamage && mainHandState.attributesRaw) {
                    for (i = 0; i < weaponElementsMin.length; i++) {
                        if (mainHandState.attributesRaw[weaponElementsMin[i]]) {
                            if (mainHandState.attributesRaw[DamagePercentAll] && !mainHandState.attributesRaw[DamageBonusMinPhysical]) {
                                minDmgCalc = mainHandState.minDamage.max +
                                mainHandState.attributesRaw[weaponElementsMin[i]].max +
                                (mainHandState.attributesRaw[weaponElementsMin[i]].max *
                                mainHandState.attributesRaw[DamagePercentAll].max);
                                maxDmgCalc = mainHandState.maxDamage.max +
                                mainHandState.attributesRaw[weaponElementsMin[i]].max +
                                mainHandState.attributesRaw[weaponElementsDelta[i]].max +
                                ((mainHandState.attributesRaw[weaponElementsMin[i]].max + mainHandState.attributesRaw[weaponElementsDelta[i]].max) *
                                mainHandState.attributesRaw[DamagePercentAll].max);
                                mainHand.push(React.DOM.li({
                                    key: mainHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                            } else if (!mainHandState.attributesRaw[DamagePercentAll] && !mainHandState.attributesRaw[DamageBonusMinPhysical]) {
                                minDmgCalc = mainHandState.minDamage.max +
                                mainHandState.attributesRaw[weaponElementsMin[i]].max;
                                maxDmgCalc = mainHandState.maxDamage.max +
                                mainHandState.attributesRaw[weaponElementsMin[i]].max +
                                mainHandState.attributesRaw[weaponElementsDelta[i]].max;
                                mainHand.push(React.DOM.li({
                                    key: mainHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                            } else {
                                minDmgCalc = mainHandState.minDamage.max;
                                maxDmgCalc = mainHandState.maxDamage.max;
                                mainHand.push(React.DOM.li({
                                    key: mainHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) + ' Damage'));
                            }
                        }
                    }
                }

                if (mainHandState.attributes) {
                    if (mainHandState.attributes.primary) {
                        mainHandState.attributes.primary.forEach(function (primaryStat) {
                            mainHand.push(React.DOM.li({
                                key: mainHandState.key,
                                className: 'primary'
                            }, primaryStat.text));
                        });
                    }

                    if (mainHandState.attributes.secondary) {
                        mainHandState.attributes.secondary.forEach(function (secondaryStat) {
                            mainHand.push(React.DOM.li({
                                key: mainHandState.key,
                                className: 'secondary'
                            }, secondaryStat.text));
                        });
                    }

                    if (mainHandState.attributes.passive) {
                        mainHandState.attributes.passive.forEach(function (passiveStat) {
                            mainHand.push(React.DOM.li({
                                key: mainHandState.key,
                                className: 'passive'
                            }, passiveStat.text));
                        });
                    }
                }

                if (mainHandState.set && mainHandState.set.ranks) {
                    for (i = 0; i < mainHandState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (mainHandState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        mainCount = setPool[m][1]++;
                                    } else {
                                        mainCount = setPool[m][1];
                                    }
                                } else if (mainHandState.set.name === setPool[m][0] && !this.state.setRing) {
                                    mainCount = setPool[m][1];
                                }
                            }

                            if (mainHandState.set.ranks[i].required === k && mainHandState.set.ranks[i].required <= mainCount) {
                                mainHandState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (mainHandState.set.ranks[i].required === k) {
                                mainHandState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (mainHandState.set.ranks[i].required === k && mainHandState.set.ranks[i].required <= mainCount) {
                                mainHandState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (mainHandState.set.ranks[i].required === k) {
                                mainHandState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (mainHandState.set.ranks[i].required === k && mainHandState.set.ranks[i].required <= mainCount) {
                                mainHandState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (mainHandState.set.ranks[i].required === k) {
                                mainHandState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    mainHand.push(React.DOM.li({
                                        key: mainHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (mainHandState.attributesRaw && mainHandState.attributesRaw.Sockets && mainHandState.gems[0]) {
                    if (!mainHandState.gems[0].attributesRaw.Jewel_Rank) {
                        gemLink = itemIconBaseUrl.concat(mainHandState.gems[0].item.icon, '.png');
                        mainHand.push(React.DOM.li({
                            key: mainHandState.key,
                            className: 'socket',
                            style: {backgroundImage: 'url(' + gemLink + ')'}
                        }));
                    } else if (mainHandState.gems[0].attributesRaw.Jewel_Rank) {
                        gemLink = itemIconBaseUrl.concat(mainHandState.gems[0].item.icon, '.png');
                        mainHand.push(React.DOM.li({
                            key: mainHandState.key,
                            className: 'socket',
                            style: {backgroundImage: 'url(' + gemLink + ')'}
                        }, React.DOM.span({
                            key: mainHandState.key,
                            className: 'gem-level'
                        }, mainHandState.gems[0].attributesRaw.Jewel_Rank.min)));
                    }

                    if (mainHandState.gems[0].attributes.primary) {
                        mainHandState.gems[0].attributes.primary.forEach(function (Stat) {
                            mainHand.push(React.DOM.li({key: mainHandState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }
                    // exception for the new unique gem
                    if (mainHandState.gems[0].attributes.passive) {
                        mainHandState.gems[0].attributes.passive.forEach(function (Stat) {
                            mainHand.push(React.DOM.li({key: mainHandState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }

                } else if (mainHandState.attributesRaw && mainHandState.attributesRaw.Sockets) {
                    mainHand.push(React.DOM.li({key: mainHandState.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' mainHand',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: mainHandState.key, className: 'desc'}, React.DOM.ul({
                        key: mainHandState.key,
                        className: 'stats'
                    }, mainHand)
                )));
            }

            if (itemsIconState && itemsIconState.offHand && offHandState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.offHand.icon, '.png');

                switch (itemsState.offHand.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (offHandState.attributesRaw && offHandState.type) {
                    var offHanded = '';
                    if (offHandState.type.twoHanded === true) {
                        offHanded = '(2h)';
                    } else if (offHandState.type.twoHanded !== true && offHandState.dps) {
                        offHanded = '(1h)';
                    } else {
                        offHanded = '';
                    }
                    if (offHandState.attributesRaw.Ancient_Rank && offHandState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        offHand.push(React.DOM.li({
                            key: offHandState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.offHand.name + ' ' + offHanded));
                    } else {
                        isAncient = '';
                        offHand.push(React.DOM.li({
                            key: offHandState.key,
                            className: itemQuality + ' name'
                        }, itemsState.offHand.name + ' ' + offHanded));
                    }
                }

                if (offHandState.dps) {
                    offHand.push(React.DOM.li({
                        key: offHandState.key,
                        className: 'dps'
                    }, offHandState.dps.max.toString().substring(0, 8) + ' DPS'));
                }

                if (offHandState.minDamage && offHandState.maxDamage && offHandState.attributesRaw) {
                    for (i = 0; i < weaponElementsMin.length; i++) {
                        if (offHandState.attributesRaw[weaponElementsMin[i]]) {
                            if (offHandState.attributesRaw[DamagePercentAll] && !offHandState.attributesRaw[DamageBonusMinPhysical]) {
                                offHand.push(React.DOM.li({
                                    key: offHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(offHandState.minDamage.max +
                                offHandState.attributesRaw[weaponElementsMin[i]].max +
                                (offHandState.attributesRaw[weaponElementsMin[i]].max *
                                offHandState.attributesRaw[DamagePercentAll].max)) +
                                ' - ' +
                                Math.round(offHandState.maxDamage.max +
                                    offHandState.attributesRaw[weaponElementsMin[i]].max +
                                    offHandState.attributesRaw[weaponElementsDelta[i]].max +
                                    ((offHandState.attributesRaw[weaponElementsMin[i]].max +
                                    offHandState.attributesRaw[weaponElementsDelta[i]].max) *
                                    offHandState.attributesRaw[DamagePercentAll].max)
                                ) + ' Damage'));
                            } else if (!offHandState.attributesRaw[DamagePercentAll] && !offHandState.attributesRaw[DamageBonusMinPhysical]) {
                                offHand.push(React.DOM.li({
                                    key: offHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(offHandState.minDamage.max +
                                offHandState.attributesRaw[weaponElementsMin[i]].max) +
                                ' - ' +
                                Math.round(offHandState.maxDamage.max +
                                offHandState.attributesRaw[weaponElementsMin[i]].max +
                                offHandState.attributesRaw[weaponElementsDelta[i]].max) +
                                ' Damage'));
                            } else {
                                offHand.push(React.DOM.li({
                                    key: offHandState.key,
                                    className: 'raw-damage'
                                }, Math.round(offHandState.minDamage.max) +
                                ' - ' +
                                Math.round(offHandState.maxDamage.max) +
                                ' Damage'));
                            }
                        }
                    }
                }

                if (offHandState.attributes) {
                    if (offHandState.attributes.primary) {
                        offHandState.attributes.primary.forEach(function (primaryStat) {
                            offHand.push(React.DOM.li({key: offHandState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (offHandState.attributes.secondary) {
                        offHandState.attributes.secondary.forEach(function (secondaryStat) {
                            offHand.push(React.DOM.li({
                                key: offHandState.key,
                                className: 'secondary'
                            }, secondaryStat.text));
                        });
                    }
                    if (offHandState.attributes.passive) {
                        offHandState.attributes.passive.forEach(function (passiveStat) {
                            offHand.push(React.DOM.li({key: offHandState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (offHandState.set && offHandState.set.ranks) {
                    for (i = 0; i < offHandState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (offHandState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        offCount = setPool[m][1]++;
                                    } else {
                                        offCount = setPool[m][1];
                                    }
                                } else if (offHandState.set.name === setPool[m][0] && !this.state.setRing) {
                                    offCount = setPool[m][1];
                                }
                            }

                            if (offHandState.set.ranks[i].required === k && offHandState.set.ranks[i].required <= offCount) {
                                offHandState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (offHandState.set.ranks[i].required === k) {
                                offHandState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (offHandState.set.ranks[i].required === k && offHandState.set.ranks[i].required <= offCount) {
                                offHandState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (offHandState.set.ranks[i].required === k) {
                                offHandState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (offHandState.set.ranks[i].required === k && offHandState.set.ranks[i].required <= offCount) {
                                offHandState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (offHandState.set.ranks[i].required === k) {
                                offHandState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    offHand.push(React.DOM.li({
                                        key: offHandState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (offHandState.attributesRaw && offHandState.attributesRaw.Sockets && offHandState.gems[0]) {
                    if (!offHandState.gems[0].attributesRaw.Jewel_Rank) {
                        gemLink = itemIconBaseUrl.concat(offHandState.gems[0].item.icon, '.png');
                        offHand.push(React.DOM.li({
                            key: offHandState.key,
                            className: 'socket',
                            style: {backgroundImage: 'url(' + gemLink + ')'}
                        }));
                    } else if (offHandState.gems[0].attributesRaw.Jewel_Rank) {
                        gemLink = itemIconBaseUrl.concat(offHandState.gems[0].item.icon, '.png');
                        offHand.push(React.DOM.li({
                            key: offHandState.key,
                            className: 'socket',
                            style: {backgroundImage: 'url(' + gemLink + ')'}
                        }, React.DOM.span({
                            key: offHandState.key,
                            className: 'gem-level'
                        }, offHandState.gems[0].attributesRaw.Jewel_Rank.min)));
                    }

                    if (offHandState.gems[0].attributes.primary) {
                        offHandState.gems[0].attributes.primary.forEach(function (Stat) {
                            offHand.push(React.DOM.li({key: offHandState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }
                    // exception for the new unique gem
                    if (offHandState.gems[0].attributes.passive) {
                        offHandState.gems[0].attributes.passive.forEach(function (Stat) {
                            offHand.push(React.DOM.li({key: offHandState.key, className: 'gem-passive'}, Stat.text));
                        });
                    }

                } else if (offHandState.attributesRaw && offHandState.attributesRaw.Sockets) {
                    offHand.push(React.DOM.li({key: offHandState.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' offHand',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: offHandState.key, className: 'desc'}, React.DOM.ul({
                        key: offHandState.key,
                        className: 'stats'
                    }, offHand)
                )));
            }

            if (itemsIconState && itemsIconState.waist && beltState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.waist.icon, '.png');

                switch (itemsState.waist.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (beltState.attributesRaw) {
                    if (beltState.attributesRaw.Ancient_Rank && beltState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        belt.push(React.DOM.li({
                            key: beltState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.waist.name));
                    } else {
                        isAncient = '';
                        belt.push(React.DOM.li({
                            key: beltState.key,
                            className: itemQuality + ' name'
                        }, itemsState.waist.name));
                    }
                }

                if (beltState.attributes) {
                    if (beltState.attributes.primary) {
                        beltState.attributes.primary.forEach(function (primaryStat) {
                            belt.push(React.DOM.li({key: beltState.key, className: 'primary'}, primaryStat.text));
                        });
                    }
                    if (beltState.attributes.secondary) {
                        beltState.attributes.secondary.forEach(function (secondaryStat) {
                            belt.push(React.DOM.li({key: beltState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }
                    if (beltState.attributes.passive) {
                        beltState.attributes.passive.forEach(function (passiveStat) {
                            belt.push(React.DOM.li({key: beltState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (beltState.set && beltState.set.ranks) {
                    for (i = 0; i < beltState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (beltState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        beltCount = setPool[m][1]++;
                                    } else {
                                        beltCount = setPool[m][1];
                                    }
                                } else if (beltState.set.name === setPool[m][0] && !this.state.setRing) {
                                    beltCount = setPool[m][1];
                                }
                            }

                            if (beltState.set.ranks[i].required === k && beltState.set.ranks[i].required <= beltCount) {
                                beltState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (beltState.set.ranks[i].required === k) {
                                beltState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (beltState.set.ranks[i].required === k && beltState.set.ranks[i].required <= beltCount) {
                                beltState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (beltState.set.ranks[i].required === k) {
                                beltState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (beltState.set.ranks[i].required === k && beltState.set.ranks[i].required <= beltCount) {
                                beltState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (beltState.set.ranks[i].required === k) {
                                beltState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    belt.push(React.DOM.li({
                                        key: beltState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' waist',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: beltState.key, className: 'desc'}, React.DOM.ul({
                        key: beltState.key,
                        className: 'stats'
                    }, belt)
                )));
            }

            if (itemsIconState && itemsIconState.rightFinger && ringStateRight) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.rightFinger.icon, '.png');

                switch (itemsState.rightFinger.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (ringStateRight.attributesRaw) {
                    if (ringStateRight.attributesRaw.Ancient_Rank && ringStateRight.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        ringRight.push(React.DOM.li({
                            key: ringStateRight.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.rightFinger.name));
                    } else {
                        isAncient = '';
                        ringRight.push(React.DOM.li({
                            key: ringStateRight.key,
                            className: itemQuality + ' name'
                        }, itemsState.rightFinger.name));
                    }
                }


                if (ringStateRight.attributes) {
                    if (ringStateRight.attributes.primary) {
                        ringStateRight.attributes.primary.forEach(function (primaryStat) {
                            ringRight.push(React.DOM.li({
                                key: ringStateRight.key,
                                className: 'primary'
                            }, primaryStat.text));
                        });
                    }

                    if (ringStateRight.attributes.secondary) {
                        ringStateRight.attributes.secondary.forEach(function (secondaryStat) {
                            if (secondaryStat.color !== 'orange') {
                                ringRight.push(React.DOM.li({
                                    key: ringStateRight.key,
                                    className: 'secondary'
                                }, secondaryStat.text));
                            } else {
                                // handle a dumb exception for the wrongly entered ring of royal grandeur passive
                                ringRight.push(React.DOM.li({
                                    key: ringStateRight.key,
                                    className: 'passive'
                                }, secondaryStat.text));
                            }
                        });
                    }

                    if (ringStateRight.attributes.passive) {
                        ringStateRight.attributes.passive.forEach(function (passiveStat) {
                            ringRight.push(React.DOM.li({
                                key: ringStateRight.key,
                                className: 'passive'
                            }, passiveStat.text));
                        });
                    }
                }

                if (ringStateRight.set && ringStateRight.set.ranks) {
                    for (i = 0; i < ringStateRight.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (ringStateRight.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        ringRCount = setPool[m][1]++;
                                    } else {
                                        ringRCount = setPool[m][1];
                                    }
                                } else if (ringStateRight.set.name === setPool[m][0] && !this.state.setRing) {
                                    ringRCount = setPool[m][1];
                                }
                            }

                            if (ringStateRight.set.ranks[i].required === k && ringStateRight.set.ranks[i].required <= ringRCount) {
                                ringStateRight.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (ringStateRight.set.ranks[i].required === k) {
                                ringStateRight.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (ringStateRight.set.ranks[i].required === k && ringStateRight.set.ranks[i].required <= ringRCount) {
                                ringStateRight.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (ringStateRight.set.ranks[i].required === k) {
                                ringStateRight.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (ringStateRight.set.ranks[i].required === k && ringStateRight.set.ranks[i].required <= ringRCount) {
                                ringStateRight.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (ringStateRight.set.ranks[i].required === k) {
                                ringStateRight.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    ringRight.push(React.DOM.li({
                                        key: ringStateRight.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (ringStateRight.attributesRaw && ringStateRight.attributesRaw.Sockets && ringStateRight.gems[0] && ringStateRight.gems[0].attributesRaw.Jewel_Rank) {
                    gemLink = itemIconBaseUrl.concat(ringStateRight.gems[0].item.icon, '.png');
                    ringRight.push(React.DOM.li({
                        key: ringStateRight.key,
                        className: 'socket',
                        style: {backgroundImage: 'url(' + gemLink + ')'}
                    }, React.DOM.span({
                        key: ringStateRight.key,
                        className: 'gem-level'
                    }, ringStateRight.gems[0].attributesRaw.Jewel_Rank.min)));

                    ringStateRight.gems[0].attributes.passive.forEach(function (passiveStat) {
                        ringRight.push(React.DOM.li({
                            key: ringStateRight.key,
                            className: 'gem-passive unique'
                        }, passiveStat.text));
                    });
                } else if (ringStateRight.attributesRaw && ringStateRight.attributesRaw.Sockets) {
                    ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' rightFinger',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: ringStateRight.key, className: 'desc'}, React.DOM.ul({
                        key: ringStateRight.key,
                        className: 'stats'
                    }, ringRight)
                )));
            }

            if (itemsIconState && itemsIconState.leftFinger && ringStateLeft) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.leftFinger.icon, '.png');

                switch (itemsState.leftFinger.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (ringStateLeft.attributesRaw) {
                    if (ringStateLeft.attributesRaw.Ancient_Rank && ringStateLeft.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        ringLeft.push(React.DOM.li({
                            key: ringStateLeft.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.leftFinger.name));
                    } else {
                        isAncient = '';
                        ringLeft.push(React.DOM.li({
                            key: ringStateLeft.key,
                            className: itemQuality + ' name'
                        }, itemsState.leftFinger.name));
                    }
                }

                if (ringStateLeft.attributes) {
                    if (ringStateLeft.attributes.primary) {
                        ringStateLeft.attributes.primary.forEach(function (primaryStat) {
                            ringLeft.push(React.DOM.li({
                                key: ringStateLeft.key,
                                className: 'primary'
                            }, primaryStat.text));
                        });
                    }
                    if (ringStateLeft.attributes.secondary) {
                        ringStateLeft.attributes.secondary.forEach(function (secondaryStat) {
                            ringLeft.push(React.DOM.li({
                                key: ringStateLeft.key,
                                className: 'secondary'
                            }, secondaryStat.text));
                        });
                    }

                    if (ringStateLeft.attributes.passive) {
                        ringStateLeft.attributes.passive.forEach(function (passiveStat) {
                            ringLeft.push(React.DOM.li({
                                key: ringStateLeft.key,
                                className: 'passive'
                            }, passiveStat.text));
                        });
                    } else {
                        isAncient = '';
                    }
                }

                if (ringStateLeft.set && ringStateLeft.set.ranks) {
                    for (i = 0; i < ringStateLeft.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (ringStateLeft.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        ringLCount = setPool[m][1]++;
                                    } else {
                                        ringLCount = setPool[m][1];
                                    }
                                } else if (ringStateLeft.set.name === setPool[m][0] && !this.state.setRing) {
                                    ringLCount = setPool[m][1];
                                }
                            }

                            if (ringStateLeft.set.ranks[i].required === k && ringStateLeft.set.ranks[i].required <= ringLCount) {
                                ringStateLeft.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (ringStateLeft.set.ranks[i].required === k) {
                                ringStateLeft.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (ringStateLeft.set.ranks[i].required === k && ringStateLeft.set.ranks[i].required <= ringLCount) {
                                ringStateLeft.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (ringStateLeft.set.ranks[i].required === k) {
                                ringStateLeft.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (ringStateLeft.set.ranks[i].required === k && ringStateLeft.set.ranks[i].required <= ringLCount) {
                                ringStateLeft.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (ringStateLeft.set.ranks[i].required === k) {
                                ringStateLeft.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    ringLeft.push(React.DOM.li({
                                        key: ringStateLeft.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (ringStateLeft.attributesRaw && ringStateLeft.attributesRaw.Sockets && ringStateLeft.gems[0] && ringStateLeft.gems[0].attributesRaw.Jewel_Rank) {
                    gemLink = itemIconBaseUrl.concat(ringStateLeft.gems[0].item.icon, '.png');
                    ringLeft.push(React.DOM.li({
                        key: ringStateLeft.key,
                        className: 'socket',
                        style: {backgroundImage: 'url(' + gemLink + ')'}
                    }, React.DOM.span({
                        key: ringStateLeft.key,
                        className: 'gem-level'
                    }, ringStateLeft.gems[0].attributesRaw.Jewel_Rank.min)));
                    ringStateLeft.gems[0].attributes.passive.forEach(function (passiveStat) {
                        ringLeft.push(React.DOM.li({
                            key: ringStateLeft.key,
                            className: 'gem-passive unique'
                        }, passiveStat.text));
                    });
                } else if (ringStateLeft.attributesRaw && ringStateLeft.attributesRaw.Sockets) {
                    ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' leftFinger',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: ringStateLeft.key, className: 'desc'}, React.DOM.ul({
                        key: ringStateLeft.key,
                        className: 'stats'
                    }, ringLeft)
                )));
            }

            if (itemsIconState && itemsIconState.neck && neckState) {
                constructedLink = itemIconBaseUrl.concat(itemsIconState.neck.icon, '.png');

                switch (itemsState.neck.displayColor) {
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
                    case 'gray':
                        itemQuality = 'common';
                        break;
                    default:
                }

                if (neckState.attributesRaw) {
                    if (neckState.attributesRaw.Ancient_Rank && neckState.attributesRaw.Ancient_Rank.min === 1.0) {
                        isAncient = 'ancient';
                        neck.push(React.DOM.li({
                            key: neckState.key,
                            className: itemQuality + ' name'
                        }, isAncient + ' ' + itemsState.neck.name));
                    } else {
                        isAncient = '';
                        neck.push(React.DOM.li({
                            key: neckState.key,
                            className: itemQuality + ' name'
                        }, itemsState.neck.name));
                    }
                }

                if (neckState.attributes) {
                    if (neckState.attributes.primary) {
                        neckState.attributes.primary.forEach(function (primaryStat) {
                            neck.push(React.DOM.li({key: neckState.key, className: 'primary'}, primaryStat.text));
                        });
                    }

                    if (neckState.attributes.secondary) {
                        neckState.attributes.secondary.forEach(function (secondaryStat) {
                            neck.push(React.DOM.li({key: neckState.key, className: 'secondary'}, secondaryStat.text));
                        });
                    }

                    if (neckState.attributes.passive) {
                        neckState.attributes.passive.forEach(function (passiveStat) {
                            neck.push(React.DOM.li({key: neckState.key, className: 'passive'}, passiveStat.text));
                        });
                    }
                }

                if (neckState.set && neckState.set.ranks) {
                    for (i = 0; i < neckState.set.ranks.length; i++) {
                        for (k = 1; k <= 6; k++) {
                            for (m = 0; m < setPool.length; m++) {
                                if (neckState.set.name === setPool[m][0] && this.state.setRing) {
                                    if (setPool[m][1] >= 2) {
                                        neckCount = setPool[m][1]++;
                                    } else {
                                        neckCount = setPool[m][1];
                                    }
                                } else if (neckState.set.name === setPool[m][0] && !this.state.setRing) {
                                    neckCount = setPool[m][1];
                                }
                            }

                            if (neckState.set.ranks[i].required === k && neckState.set.ranks[i].required <= neckCount) {
                                neckState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k
                                    }, primaryStat.text));
                                });
                            } else if (neckState.set.ranks[i].required === k) {
                                neckState.set.ranks[i].attributes.primary.forEach(function (primaryStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, primaryStat.text));
                                });
                            }

                            if (neckState.set.ranks[i].required === k && neckState.set.ranks[i].required <= neckCount) {
                                neckState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k
                                    }, secondaryStat.text));
                                });
                            } else if (neckState.set.ranks[i].required === k) {
                                neckState.set.ranks[i].attributes.secondary.forEach(function (secondaryStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, secondaryStat.text));
                                });
                            }

                            if (neckState.set.ranks[i].required === k && neckState.set.ranks[i].required <= neckCount) {
                                neckState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k
                                    }, passiveStat.text));
                                });
                            } else if (neckState.set.ranks[i].required === k) {
                                neckState.set.ranks[i].attributes.passive.forEach(function (passiveStat) {
                                    neck.push(React.DOM.li({
                                        key: neckState.key,
                                        className: 'set-bonus-' + k + ' inactive'
                                    }, passiveStat.text));
                                });
                            }
                        }
                    }
                }

                if (neckState.attributesRaw && neckState.attributesRaw.Sockets && neckState.gems[0] && neckState.gems[0].attributesRaw.Jewel_Rank) {
                    gemLink = itemIconBaseUrl.concat(neckState.gems[0].item.icon, '.png');
                    neck.push(React.DOM.li({
                        key: neckState.key,
                        className: 'socket',
                        style: {backgroundImage: 'url(' + gemLink + ')'}
                    }, React.DOM.span({
                        key: neckState.key,
                        className: 'gem-level'
                    }, neckState.gems[0].attributesRaw.Jewel_Rank.min)));

                    neckState.gems[0].attributes.passive.forEach(function (passiveStat) {
                        neck.push(React.DOM.li({
                            key: neckState.key,
                            className: 'gem-passive unique'
                        }, passiveStat.text));
                    });

                } else if (neckState.attributesRaw && neckState.attributesRaw.Sockets) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'socket'}));
                }

                items.push(React.DOM.div({
                    key: itemsIconState.key,
                    className: 'item' + ' ' + isAncient + ' ' + itemQuality + ' neck',
                    onClick: this.handleItemClick,
                    style: {backgroundImage: 'url(' + constructedLink + ')'}
                }, React.DOM.div({key: neckState.key, className: 'desc'}, React.DOM.ul({
                        key: neckState.key,
                        className: 'stats'
                    }, neck)
                )));
            }

            if (amuletState.attributes && itemsState) {
                if (amuletState.attributes.passive[0] && amuletState.attributes.passive[0].text.search('passive') !== -1 && itemsState.neck && itemsState.neck.name === 'Hellfire Amulet') {
                    hellfirePassiveLink = amuletState.attributes.passive[0].text.substring(9).replace(' passive.', '').replace(/ /g, '').toLowerCase();
                    hellfirePassiveDisplay = amuletState.attributes.passive[0].text.substring(9).replace(' passive.', '');
                    switch (classState) {
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
                        key: amuletState.key,
                        className: 'hasIcon'
                    }, hellfirePassiveDisplay, ' (HA)', React.DOM.div({
                        key: amuletState.key,
                        className: 'icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    })));
                }
            }
            if (statsState && statsState.life && statsState.damage && statsState.toughness && statsState.vitality) {
                stats.push(React.DOM.div({key: statsState.key}, 'Life: ', Math.round(statsState.life + statsState.life * pLife / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                stats.push(React.DOM.div({key: statsState.key}, 'Toughness: ', Math.round(statsState.toughness).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));

                if (classState === 'demon-hunter' || classState === 'monk') {
                    stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));

                    if (statsState.strength > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }
                    if (statsState.intelligence > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }

                } else if (classState === 'witch-doctor' || classState === 'wizard') {
                    stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));

                    if (statsState.strength > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }
                    if (statsState.dexterity > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }

                } else if (classState === 'barbarian' || classState === 'crusader') {
                    stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));

                    if (statsState.dexterity > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }
                    if (statsState.intelligence > 1000) {
                        stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                    }
                }

                stats.push(React.DOM.div({key: statsState.key}, 'Vitality: ', statsState.vitality.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')));
                stats.push(React.DOM.div({key: statsState.key}, 'Armor: ', Math.round(statsState.armor + statsState.armor * pArmor / 100)));
                if (statsState.damageIncrease !== 0.0) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Damage Increase: ', statsState.damageIncrease));
                }

                if (statsState.damageReduction !== 0.0) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Damage Increase: ', statsState.damageReduction));
                }
            }

            if (additionalStatsOffensive && statsState) {

                if (statsState.critChance) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Critical Hit Chance: ' + Math.round((statsState.critChance * 100 + pCritChance) * 1000) / 1000 + '%'));
                } else if (!statsState.critChance && pCritChance !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Critical Hit Chance: ' + Math.round(pCritChance * 1000) / 1000 + '%'));
                }

                if (statsState.critDamage) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                        // - 100 because for some reason the crit dmg from the ajax call responds with 100 too much, maybe paragon bug?
                    }, 'Critical Damage increase: ' + Math.round(((statsState.critDamage * 100 + pCritDmg) - 100) * 1000) / 1000 + '%'));
                } else if (!statsState.critDamage && pCritDmg !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Critical Damage increase: ' + Math.round((pCritDmg - 100) * 1000) / 1000 + '%'));
                }

                if (cdrState !== 1) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Cooldown Reduction: ' + Math.round((1 - cdrState + (pCdr / 100)) * 100 * 100) / 100 + '%'));
                } else if (pCdr !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Cooldown Reduction: ' + pCdr + '%'));
                }
                if (resState !== 1) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Resource Cost Reduction: ' + Math.round((1 - resState + (pResRed / 100)) * 100 * 100) / 100 + '%'));
                } else if (pResRed !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Resource Cost Reduction: ' + pResRed + '%'));
                }
                if (mainHandState.attacksPerSecond && offHandState.attacksPerSecond) {
                    calculatedAttackSpeed = mainHandState.attacksPerSecond.max + mainHandState.attacksPerSecond.max * (0.15 + itemAtkSpeedState + pAtkSpd / 100);
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                        // apparently the second weapon gives you a 15% attackspeed bonus flat
                    }, 'Attacks per Second: ' + Math.round(calculatedAttackSpeed * 100) / 100));
                } else if (mainHandState.attacksPerSecond) {
                    calculatedAttackSpeed = mainHandState.attacksPerSecond.max + mainHandState.attacksPerSecond.max * (itemAtkSpeedState + pAtkSpd / 100);
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Attacks per Second: ' + Math.round(calculatedAttackSpeed * 100) / 100));
                } else if (!mainHandState.attacksPerSecond && pAtkSpd !== 0) {
                    calculatedAttackSpeed = pAtkSpd / 100;
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Attacks per Second: ' + Math.round(calculatedAttackSpeed * 100) / 100));
                }

                if (eliteDmgState !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Bonus Damage to Elites: ' + eliteDmgState + '%'));
                }

                if (areaDmgState !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Area Bonus Damage: ' + (areaDmgState + pAreaDmg) + '%'));
                } else if (pAreaDmg !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Area Bonus Damage: ' + pAreaDmg + '%'));
                }

                if (maxElementDmg !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, maxElementDmg));
                }

                if (statsState.primaryResource) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Primary Resource: ' + (statsState.primaryResource + pResource)));
                } else if (pResource !== 0) {
                    additionalStatsOffensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Primary Resource: ' + pResource));
                }

                if (skillDmgState) {
                    additionalStatsOffensive.push(React.DOM.div({
                        dangerouslySetInnerHTML: {__html: 'Skill Damage: ' + skillDmgState},
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }));
                }
            }

            if (statsState && statsState.critDamage && statsState.critChance && calculatedAttackSpeed && minDmgCalc !== 0 && maxDmgCalc !== 0) {
                var statCalc,
                    minMaxCalc = (minDmgCalc + maxDmgCalc) * 0.5,
                    critChanceCalc = statsState.critChance + (pCritChance / 100),
                    critDmgCalc = statsState.critDamage - 1 + (pCritDmg / 100),
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

                if (classState === 'demon-hunter' || classState === 'monk') {
                    statCalc = statsState.dexterity / 100;
                } else if (classState === 'barbarian' || classState === 'crusader') {
                    statCalc = statsState.strength / 100;
                } else if (classState === 'wizard' || classState === 'witch-doctor') {
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

                effectiveDpsCalc = sheetDpsCalc * calculatedAttackSpeed * (effectiveCritChance * effectiveCritDamage + 1) * nativeSkillDamage * (1 + buffMult) * (1 + gemMult);

                if (!effectiveDpsCalc) {
                    stats.push(React.DOM.div({key: 'dps'}, 'DPS: ',
                        Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        ' | EDPS: ',
                        'Calculating EDPS..'
                    ));
                } else {
                    stats.push(React.DOM.div({key: 'dps'}, 'DPS: ',
                        Math.round(sheetDpsCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        ' | EDPS: ',
                        Math.round(effectiveDpsCalc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    ));
                }
            }

            if (additionalStatsDefensive && statsState) {
                if (statsState.secondaryResource) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsOffensive.key,
                        className: 'bonusstat'
                    }, 'Secondary Resource: ' + statsState.secondaryResource));
                }

                if (statsState.physicalResist) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Physical Resist: ' + (statsState.physicalResist + pResistAll)));
                } else if (pResistAll !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Physical Resist: ' + pResistAll));
                }

                if (statsState.fireResist) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Fire Resist: ' + (statsState.fireResist + pResistAll)));
                } else if (pResistAll !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Fire Resist: ' + pResistAll));
                }

                if (statsState.coldResist) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Cold Resist: ' + (statsState.coldResist + pResistAll)));
                } else if (pResistAll !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Cold Resist: ' + pResistAll));
                }

                if (statsState.lightningResist) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Lighting Resist: ' + (statsState.lightningResist + pResistAll)));
                } else if (pResistAll !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Lighting Resist: ' + pResistAll));
                }

                if (statsState.poisonResist) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Poison Resist: ' + (statsState.poisonResist + pResistAll)));
                } else if (pResistAll !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Poison Resist: ' + pResistAll));
                }

                if (goldPickUpState !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Gold Pick-up Radius: ' + goldPickUpState + ' yards'));
                }

                if (dmgRedMeleeState !== 1) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Melee Damage Reduction: ' + Math.round((1 - dmgRedMeleeState) * 100 * 1000) / 1000 + '%'));
                }

                if (dmgRedRangedState !== 1) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Ranged Damage Reduction: ' + Math.round((1 - dmgRedRangedState) * 100 * 1000) / 1000 + '%'));
                }

                if (eliteDmgRedState !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Damage Reduction from Elites: ' + eliteDmgRedState + '%'));
                }
                if (maxHealthState) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Bonus Max Health: ' + (maxHealthState + pLife) + '%'));
                } else if (pLife !== 0) {
                    additionalStatsDefensive.push(React.DOM.div({
                        key: additionalStatsDefensive.key,
                        className: 'bonusstat'
                    }, 'Bonus Max Health: ' + pLife + '%'));
                }
            }

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat cdr'},
                'cdr: ' + Math.round(pCdr * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'cdr',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resred'},
                'res: ' + Math.round(pResRed * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'resred',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat atkspd'},
                'atkspd: ' + Math.round(pAtkSpd * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'atkspd',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat critdmg'},
                'critdmg: ' + Math.round(pCritDmg) + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'critdmg',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat critchance'},
                'critchance: ' + Math.round(pCritChance * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'critchance',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat areadmg'},
                'areadmg: ' + Math.round(pAreaDmg) + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'areadmg',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resource'},
                'resource: ' + Math.round(pResource),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'resource',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resistall'},
                'allres: ' + Math.round(pResistAll),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'resistall',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat armor'},
                'armor: ' + Math.round(pArmor * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'armor',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat maxlife'},
                'maxlife: ' + Math.round(pLife * 10) / 10 + '%',
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-increment',
                    onClick: this.handleParagon
                }, '+'),
                React.DOM.span({
                    key: paragon.key,
                    className: 'paragon-stat-decrement',
                    onClick: this.handleParagon
                }, '-'),
                React.DOM.span({
                    key: paragon.key,
                    ref: 'maxlife',
                    className: 'paragon-stat-max',
                    onClick: this.handleParagon
                })
            ));

            localStorage.setItem('paragonCdr', this.state.paragonCdr);
            localStorage.setItem('paragonResRed', this.state.paragonResRed);
            localStorage.setItem('paragonAtkSpd', this.state.paragonAtkSpd);
            localStorage.setItem('paragonCritDmg', this.state.paragonCritDmg);
            localStorage.setItem('paragonCritChance', this.state.paragonCritChance);
            localStorage.setItem('paragonAreaDmg', this.state.paragonAreaDmg);
            localStorage.setItem('paragonResource', this.state.paragonResource);
            localStorage.setItem('paragonResistAll', this.state.paragonResistAll);
            localStorage.setItem('paragonArmor', this.state.paragonArmor);
            localStorage.setItem('paragonMaxHealth', this.state.paragonMaxHealth);

            return (
                React.DOM.div({className: 'd3-container'},
                    React.DOM.div({className: 'd3-char-bg', ref: 'charbg', style: style}),
                    React.DOM.div({className: 'd3-item-wrapper', ref: 'items'}, items),
                    React.DOM.div({className: 'd3-realm-wrapper'},
                        '1 - Realm: ',
                        React.DOM.select(
                            {
                                className: 'd3-realm',
                                ref: 'select',
                                value: this.state.realm,
                                onChange: this.setRealm
                            }, realms
                        )
                    ),
                    React.DOM.div({className: 'd3-api-url'},
                        '2 - Enter your BattleTag: ',
                        React.DOM.input(
                            {
                                value: this.state.battleTag,
                                placeholder: 'NAME#1234',
                                onChange: this.handleChange
                            }
                        )
                    ),
                    React.DOM.div({className: 'd3-char-wrapper'},
                        '3 - Click below to select your hero: ',
                        React.DOM.select(
                            {
                                className: 'd3-chars',
                                ref: 'select',
                                value: this.state.selected,
                                onChange: this.setSelect
                            }, heroes
                        )
                    ),
                    React.DOM.div({
                        className: this.state.paragonToggle,
                        id: 'panel-left',
                        ref: 'pl'
                    }, 'General', base, React.DOM.a({
                        className: 'button',
                        onClick: this.handleParagonStatsClick
                    }, React.DOM.span({className: 'button-text'}, 'show paragon'))),
                    React.DOM.div({
                            className: this.state.skillDescToggle,
                            title: 'click to open detailed description',
                            id: 'panel-bottom-left',
                            ref: 'pbl'
                        }, 'Skills', skills, React.DOM.a({
                            className: 'button',
                            onClick: this.handleSkillDescClick
                        }, React.DOM.span({className: 'button-text'}, 'show details'))
                    ),
                    React.DOM.div({
                        id: 'panel-left-additional',
                        ref: 'pla'
                    }, 'Paragon Points: ', paragon, React.DOM.a({
                        className: 'button',
                        onClick: this.handleParagonStatsClick,
                        title: 'click to close'
                    }, React.DOM.span({className: 'button-text'}, 'close'))),
                    React.DOM.div({
                        className: this.state.skillDescToggle,
                        id: 'panel-bottom-left-desc',
                        ref: 'pbla'
                    }, React.DOM.a({
                        className: 'button',
                        onClick: this.handleSkillDescClick,
                        title: 'click to close'
                    }, React.DOM.span({className: 'button-text'}, 'close')), skillsDesc),
                    React.DOM.div({
                        className: this.state.passiveDescToggle,
                        title: 'click to open detailed description',
                        id: 'panel-bottom-right',
                        ref: 'pbr'
                    }, 'Passives', passives, specialPassive, React.DOM.a({
                        className: 'button',
                        onClick: this.handlePassiveDescClick
                    }, React.DOM.span({className: 'button-text'}, 'show details'))),
                    React.DOM.div({
                        className: this.state.passiveDescToggle,
                        id: 'panel-bottom-right-desc',
                        ref: 'pbra'
                    }, React.DOM.a({
                        className: 'button',
                        onClick: this.handlePassiveDescClick,
                        title: 'click to close'
                    }, React.DOM.span({className: 'button-text'}, 'close')), passivesDesc, 'Note: your Hellfire Passive cannot be displayed here, courtesy of blizzard'),
                    React.DOM.div({
                            id: 'panel-right',
                            ref: 'pr',
                            className: this.state.toggle
                        },
                        'Stats',
                        stats,
                        React.DOM.a({
                            className: 'button',
                            onClick: this.handleBonusStatsClick,
                            title: 'click to show/hide more stats'
                        }, React.DOM.span({className: 'button-text'}, 'show more'))
                    ),
                    React.DOM.div({
                            id: 'panel-right-additional',
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

React.render(React.createElement(DataWrapper, {
        pollInterval: 600000
    }),
    document.querySelector('.d3-profile'));

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
