var DataWrapper = React.createClass({
    displayName: 'DataWrapper',
    getInitialState: function () {
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
            trigger: true,
            count: 0,
            toggleItem: 'toggle',

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
            toggle: 'more',
            skillDescOpen: '',
            passiveDescOpen: '',
            hellfire_clear: '',
            url: '',
            itemUrl: '',
            battleTag: localStorage.getItem('battleTag'),
            apiKey: '?locale=en_GB&apikey=65d63bvh7spjgmce3gjq2mv5nzjfsggy',
            profile: 'https://eu.api.battle.net/d3/profile/',
            itemIconBase: 'http://media.blizzard.com/d3/icons/items/large/', // icon + format .png,
            skillIconBase: 'http://media.blizzard.com/d3/icons/skills/64/',
            itemToolTipBase: 'https://eu.api.battle.net/d3/data/'
        };
    },

    loadHeroesData: function () {
        if (this.state.battleTag) {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/', this.state.apiKey)});
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({
                        heroes: data
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            console.log(this.state.url);
        }
    },

    loadHeroData: function () {
        if (this.state.selected) {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/hero/', this.state.selected, this.state.apiKey)});
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({
                        name: data.name,
                        class: data.class,
                        level: data.level,
                        paragon: data.paragonLevel,
                        skills: data.skills.active,
                        passives: data.skills.passive,
                        stats: data.stats,
                        items: data.items,
                        time: data['last-updated']
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            console.log(this.state.url);
        }
    },

    loadItemData: function (itemKey) {
        this.setState({item: itemKey});
        this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
        $.ajax({
            url: this.state.itemUrl,
            dataType: 'jsonp',
            success: function (data) {
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
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
        console.log(this.state.itemUrl);
    },

    loadItemDataWithProps: function (itemKey, left) {
        this.setState({item: itemKey});
        this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
        $.ajax({
            url: this.state.itemUrl,
            dataType: 'jsonp',
            success: function (data) {
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
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
        console.log(this.state.itemUrl);
    },

    checkTrigger: function () {
        if (this.state.trigger === true && this.state.count < 2) {
            setTimeout(function () {
                this.loadHeroesData();
                this.loadHeroData();
                this.getItemData();
            }.bind(this), 250);
            this.setState({count: this.state.count + 1});
        }
    },

    triggerStatCollector: function () {
        this.collectStats();
        console.log('manual stat collector');
    },

    componentDidMount: function () {
        // only called on initial render
        setInterval(this.checkTrigger, 2000);
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

    },

    handleChange: function (e) {
        var input = e.target.value;
        this.setState({battleTag: input});
        localStorage.setItem('battleTag', input);
        // clear old values and call ajax
        this.setState({
            count: 0,
            items: {},
            skills: [],
            passives: [],
            stats: [],
            heroes: {},
            attributes: [],
            class: {},
            name: {},
            level: {},
            paragon: {},
            time: 0,
            toggle: 'more',
            skillDescOpen: '',
            passiveDescOpen: '',
            setRing: false
        });
    },

    setSelect: function () {
        var newValue = this.refs.select.getDOMNode().value;
        this.setState({selected: newValue});
        this.setState({trigger: true});
        this.setState({count: 0});
        this.setState({panels: 'visible'});

        if (this.state.heroes.code) {
            this.setState({invalid: true});
        } else {
            this.setState({invalid: false});
        }

        setInterval(function () {
            this.collectStats();
            console.log('stat collector worker');
        }.bind(this), 4000);
    },

    handleBonusStatsClick: function () {
        this.triggerStatCollector();
        if (this.state.toggle !== 'more') {
            return this.setState({toggle: 'more'});
        } else {
            return this.setState({toggle: 'less'});
        }
    },

    handleSkillDescClick: function () {
        if (this.state.skillDescOpen === 'open') {
            return this.setState({skillDescOpen: ''});
        } else {
            return this.setState({skillDescOpen: 'open'});
        }
    },

    handlePassiveDescClick: function () {
        if (this.state.passiveDescOpen === 'open') {
            return this.setState({passiveDescOpen: ''});
        } else {
            return this.setState({passiveDescOpen: 'open'});
        }
    },

    handleItemClick: function (e) {
        if (!$(e.target).hasClass('open') && $(e.target).hasClass('toggle')) {
            $(e.target).addClass('open');

            if ($(e.target).parent().children().hasClass('open')) {
                $(e.target).parent().children().not($(e.target)).removeClass('open');
            }
        } else {
            $(e.target).removeClass('open');
        }
    },

    handleParagon: function (e) {
        var parent = $(e.target).parent(),
            el = $(e.target);

        if (parent.hasClass('cdr')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonCdr < 10) {
                    this.setState({paragonCdr: Math.round((this.state.paragonCdr + 0.2) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonCdr: 10});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonCdr: 0});
            } else {
                if (this.state.paragonCdr > 0) {
                    this.setState({paragonCdr: Math.round((this.state.paragonCdr - 0.2) * 10) / 10});
                }
            }
        } else if (parent.hasClass('resred')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonResRed < 10) {
                    this.setState({paragonResRed: Math.round((this.state.paragonResRed + 0.2) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonResRed: 10});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonResRed: 0});
            } else {
                if (this.state.paragonResRed > 0) {
                    this.setState({paragonResRed: Math.round((this.state.paragonResRed - 0.2) * 10) / 10});
                }
            }
        } else if (parent.hasClass('atkspd')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonAtkSpd < 10) {
                    this.setState({paragonAtkSpd: Math.round((this.state.paragonAtkSpd + 0.2) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonAtkSpd: 10});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonAtkSpd: 0});
            } else {
                if (this.state.paragonAtkSpd > 0) {
                    this.setState({paragonAtkSpd: Math.round((this.state.paragonAtkSpd - 0.2) * 10) / 10});
                }
            }
        } else if (parent.hasClass('critdmg')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonCritDmg < 50) {
                    this.setState({paragonCritDmg: Math.round((this.state.paragonCritDmg + 1) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonCritDmg: 50});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonCritDmg: 0});
            } else {
                if (this.state.paragonCritDmg > 0) {
                    this.setState({paragonCritDmg: Math.round((this.state.paragonCritDmg - 1) * 10) / 10});
                }
            }
        } else if (parent.hasClass('critchance')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonCritChance < 5) {
                    this.setState({paragonCritChance: Math.round((this.state.paragonCritChance + 0.1) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonCritChance: 5});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonCritChance: 0});
            } else {
                if (this.state.paragonCritChance > 0) {
                    this.setState({paragonCritChance: Math.round((this.state.paragonCritChance - 0.1) * 10) / 10});
                }
            }
        } else if (parent.hasClass('areadmg')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonAreaDmg < 50) {
                    this.setState({paragonAreaDmg: Math.round((this.state.paragonAreaDmg + 1) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonAreaDmg: 50});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonAreaDmg: 0});
            } else {
                if (this.state.paragonAreaDmg > 0) {
                    this.setState({paragonAreaDmg: Math.round((this.state.paragonAreaDmg - 1) * 10) / 10});
                }
            }
        } else if (parent.hasClass('resource')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonResource < 25) {
                    this.setState({paragonResource: Math.round((this.state.paragonResource + 0.5) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonResource: 25});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonResource: 0});
            } else {
                if (this.state.paragonResource > 0) {
                    this.setState({paragonResource: Math.round((this.state.paragonResource - 0.5) * 10) / 10});
                }
            }
        } else if (parent.hasClass('resistall')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonResistAll < 250) {
                    this.setState({paragonResistAll: Math.round((this.state.paragonResistAll + 5) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonResistAll: 250});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonResistAll: 0});
            } else {
                if (this.state.paragonResistAll > 0) {
                    this.setState({paragonResistAll: Math.round((this.state.paragonResistAll - 5) * 10) / 10});
                }
            }
        } else if (parent.hasClass('armor')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonArmor < 25) {
                    this.setState({paragonArmor: Math.round((this.state.paragonArmor + 0.5) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonArmor: 25});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
                this.setState({paragonArmor: 0});
            } else {
                if (this.state.paragonArmor > 0) {
                    this.setState({paragonArmor: Math.round((this.state.paragonArmor - 0.5) * 10) / 10});
                }
            }
        } else if (parent.hasClass('maxlife')) {
            if (el.hasClass('paragon-stat-increment')) {
                if (this.state.paragonMaxHealth < 25) {
                    this.setState({paragonMaxHealth: Math.round((this.state.paragonMaxHealth + 0.5) * 10) / 10});
                }
            } else if (el.hasClass('paragon-stat-max') && !el.hasClass('maxed')) {
                el.addClass('maxed');
                this.setState({paragonMaxHealth: 25});
            } else if (el.hasClass('paragon-stat-max') && el.hasClass('maxed')) {
                el.removeClass('maxed');
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
        var i,
            itemData;

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
    },

    objToString: function (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + ' x' + obj[p] + '</br>';
            }
        }
        return str;
    },

    collectStats: function () {
        var i,
            statPool = [
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
            results = [],
        // stats that add multiplicatively
            cdr = 1,
            resRed = 1,
            dmgRedMelee = 1,
            dmgRedRanged = 1,
        // stats that add additively
            eliteDmg = 0,
            eliteDmgRed = 0,
            areaDmg = 0,
            fireDmg = 0,
            coldDmg = 0,
            lightningDmg = 0,
            physicalDmg = 0,
            poisonDmg = 0,
            goldPickUp = 0,
            maxHealth = 0,
            atkSpd = 0,
            k,
            j,
            m,
            skillDmgToString,
            countedValues,
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
                ['The Shadow’s Mantle', 0],
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
            ];

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

            if (this.state.class && this.state.skills && this.state.skills.length > 0) {
                var saveArr = [];
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
                var saveValues = [];
                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i] && itemSlots[i].attributesRaw) {
                        for (k = 0; k < saveArr.length; k++) {
                            if (itemSlots[i].attributesRaw[saveArr[k]] && itemSlots[i].attributesRaw[saveArr[k]].min) {
                                if (typeof parseInt(itemSlots[i].attributesRaw[saveArr[k]].min === 'number')) {
                                    results[k] = Math.round(itemSlots[i].attributesRaw[saveArr[k]].min * 1000) / 1000;
                                    if (Object.getOwnPropertyNames(itemSlots[i].attributesRaw[saveArr[k]] === saveArr[k])) {
                                        saveValues.push(this.state.skills[k].skill.name + ' ' + Math.round(itemSlots[i].attributesRaw[saveArr[k]].min * 10000) / 100 + '%');
                                        countedValues = saveValues.reduce(function (p, c) {
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

            var checkSave = [],
                repeatSet = [];
            // detect Set -1 ring
            for (i = 0; i < itemSlots.length; i++) {
                checkSave.push(itemSlots[i].name);
                if (checkSave.indexOf('Ring of Royal Grandeur') > -1) {
                    this.setState({setRing: true});
                } else {
                    this.setState({setRing: false});
                }
            }
            // set bonus iterator
            for (i = 0; i < itemSlots.length; i++) {
                if (itemSlots[i] && itemSlots[i].set && itemSlots[i].set.ranks) {

                    for (m = 0; m < setPool.length; m++) {
                        if (itemSlots[i].set.name === setPool[m][0]) {
                            setPool[m][1]++;
                        }
                        for (j = 0; j < itemSlots[i].set.ranks.length; j++) {
                            if (
                                this.state.setRing === true &&
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
                            } else if (this.state.setRing === false && itemSlots[i].set.name === setPool[m][0] && itemSlots[i].set.ranks[j].required <= setPool[m][1]) {
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

            // ignoring mf,gf,thorns and block since they are useless stats
            if (this.state.helmItem && this.state.helmItem.gems && this.state.helmItem.gems[0] && this.state.helmItem.attributesRaw) {
                if (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All && this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                    // increment for cdr gem
                    cdr *= (1 - this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min - (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min * this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier.min));
                } else if (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All && !this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                    cdr *= (1 - this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min);
                }
                if (this.state.helmItem.gems[0].attributesRaw.Hitpoints_Max_Percent_Bonus_Item && this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                    // increment for health gem
                    maxHealth += this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100 + (this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100 * this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier.min);
                } else if (this.state.helmItem.gems[0].attributesRaw.Hitpoints_Max_Percent_Bonus_Item && !this.state.helmItem.attributesRaw.Gem_Attributes_Multiplier) {
                    maxHealth += this.state.helmItem.gems[0].Hitpoints_Max_Percent_Bonus_Item.min * 100;
                }
            }
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

            // Paragon Point Party
            cdr *= (1 - this.state.paragonCdr / 100);
            resRed *= (1 - this.state.paragonResRed / 100);
            maxHealth += this.state.paragonMaxHealth;

            skillDmgToString = this.objToString(countedValues);

            if (findElem !== 0) {
                this.setState({maxEleDmg: maxElement});
                this.setState({maxEleDmgValue: findElem});
            } else {
                this.setState({maxEleDmg: ''});
                this.setState({maxEleDmgValue: 0});
            }
            this.setState({cdrRed: cdr});
            this.setState({resRed: resRed});
            this.setState({eliteDmg: eliteDmg});
            this.setState({eliteDmgRed: eliteDmgRed});
            this.setState({areaDmg: areaDmg});
            this.setState({goldPickup: goldPickUp});
            this.setState({dmgRedMelee: dmgRedMelee});
            this.setState({dmgRedRanged: dmgRedRanged});
            this.setState({maxHealth: maxHealth});
            this.setState({skillDmg: skillDmgToString});
            this.setState({atkSpd: atkSpd});

        }
    },

    render: function () {
        var skillsState = this.state.skills,
            skills = [],
            skillsDesc = [],
            passivesState = this.state.passives,
            passives = [],
            passivesDesc = [],
            statsState = this.state.stats,
            stats = [],
            nameState = this.state.name,
            heroes = [],
            heroesState = this.state.heroes,
            itemsState = this.state.items,
            classState = this.state.class,
            levelState = this.state.level,
            paragonState = this.state.paragon,
            amuletState = this.state.amuletItem,
            shouldersState = this.state.shouldersItem,
            shoulders = [],
            helmState = this.state.helmItem,
            helmet = [],
            torsoState = this.state.chestItem,
            torso = [],
            handsState = this.state.glovesItem,
            hands = [],
            feetState = this.state.bootsItem,
            feet = [],
            bracersState = this.state.bracersItem,
            bracers = [],
            legsState = this.state.legsItem,
            legs = [],
            mainHandState = this.state.mainItem,
            mainHand = [],
            offHandState = this.state.offItem,
            offHand = [],
            beltState = this.state.beltItem,
            belt = [],
            neckState = this.state.amuletItem,
            neck = [],
            ringStateLeft = this.state.ringItemLeft,
            ringLeft = [],
            ringRight = [],
            ringStateRight = this.state.ringItemRight,
            specialPassive = [],
            base = [],
            style = [],
            itemsIconState = this.state.items,
            items = [],
            skillIconBaseUrl = this.state.skillIconBase,
            itemIconBaseUrl = this.state.itemIconBase,
            constructedLink,
            itemQuality,
            isAncient,
            gemLink,
            toggle = this.state.toggleItem,
            timeStamp = this.state.time,
            additionalStatsOffensive = [],
            additionalStatsDefensive = [],
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
            itemAtkSpeedState = this.state.atkSpd,
            paragon = [],
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
            i,
            k,
            m,
            calculatedAttackSpeed = 0,
            minDmgCalc = 0,
            maxDmgCalc = 0,
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
            customBuffPool = [
                ['Steady Aim', 0.2],
                ['Cull the Weak', 0.2]
            ],
            gemPool = [
                ['Zei\'s Stone of Vengeance', 'Item_Power_Passive#ItemPassive_Unique_Gem_012_x1'],
                ['Bane of the Trapped', 'Item_Power_Passive#ItemPassive_Unique_Gem_002_x1'],
                ['Gogok of the Swiftness', 'Item_Power_Passive#ItemPassive_Unique_Gem_008U_x1']
            ],
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

        for (i = 0; i < itemSlots.length; i++) {
            for (m = 0; m < setPool.length; m++) {
                if (itemSlots[i] && itemSlots[i].set) {
                    if (itemSlots[i].set.name === setPool[m][0]) {
                        setPool[m][1]++;
                    }
                }
            }
        }

        switch (classState) {
            case 'demon-hunter':
                style = {
                    backgroundImage: 'url("../../assets/images/dh.png")'
                };
                break;
            case 'witch-doctor':
                style = {
                    backgroundImage: 'url("../../assets/images/wd.png")'
                };
                break;
            case 'barbarian':
                style = {
                    backgroundImage: 'url("../../assets/images/barbarian.png")'
                };
                break;
            case 'crusader':
                style = {
                    backgroundImage: 'url("../../assets/images/crusader.png")'
                };
                break;
            case 'monk':
                style = {
                    backgroundImage: 'url("../../assets/images/monk.png")'
                };
                break;
            case 'wizard':
                style = {
                    backgroundImage: 'url("../../assets/images/wiz.jpg")'
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
            base.push(React.DOM.div({key: nameState.key}, 'Name: ', nameState));
            base.push(React.DOM.div({key: classState.key},
                'Class: ',
                classState.toString().replace(/-/g, '').charAt(0).toUpperCase()
                + classState.toString().replace(/-/g, '').slice(1).toLowerCase()));
            base.push(React.DOM.div({key: levelState.key}, 'Level: ', levelState));
            if (paragonState) {
                base.push(React.DOM.div({key: paragonState.key}, 'Paragon: ', paragonState));
            }
        }

        if (timeStamp && timeStamp * 1000 !== 0) {
            var t = new Date(timeStamp * 1000),
                formatted = t.toLocaleDateString() + ' - ' + t.toLocaleTimeString();
            base.push(React.DOM.div({key: timeStamp.key, className: 'last-updated'}, 'last-updated on: ' + formatted));
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
                                backgroundPosition: '0 25%'
                            };
                            break;
                        case 'c':
                            runeType = {
                                backgroundPosition: '0 49%'
                            };
                            break;
                        case 'd':
                            runeType = {
                                backgroundPosition: '0 73%'
                            };
                            break;
                        case 'e':
                            runeType = {
                                backgroundPosition: '0 97%'
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

        if (itemsIconState.head && helmState) {
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
                            var helmCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' head',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: helmState.key, className: 'desc'}, React.DOM.ul({
                    key: helmState.key,
                    className: 'stats'
                }, helmet)
            )));

        }

        if (itemsIconState.torso && torsoState) {
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
                            var torsoCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' torso',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: torsoState.key, className: 'desc'}, React.DOM.ul({
                    key: torsoState.key,
                    className: 'stats'
                }, torso)
            )));
        }

        if (itemsIconState.hands && handsState) {
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
                            var handsCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' hands',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: handsState.key, className: 'desc'}, React.DOM.ul({
                    key: handsState.key,
                    className: 'stats'
                }, hands)
            )));
        }

        if (itemsIconState.feet && feetState) {
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
                            var feetCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' feet',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: feetState.key, className: 'desc'}, React.DOM.ul({
                    key: feetState.key,
                    className: 'stats'
                }, feet)
            )));
        }

        if (itemsIconState.shoulders && shouldersState) {
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
                        shoulders.push(React.DOM.li({key: shouldersState.key, className: 'primary'}, primaryStat.text));
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
                        shoulders.push(React.DOM.li({key: shouldersState.key, className: 'passive'}, passiveStat.text));
                    });
                }
            }

            if (shouldersState.set && shouldersState.set.ranks) {
                for (i = 0; i < shouldersState.set.ranks.length; i++) {
                    for (k = 1; k <= 6; k++) {
                        for (m = 0; m < setPool.length; m++) {
                            var shouldersCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' shoulders',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: shouldersState.key, className: 'desc'}, React.DOM.ul({
                    key: shouldersState.key,
                    className: 'stats'
                }, shoulders)
            )));
        }

        if (itemsIconState.legs && legsState) {
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
                            var legsCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' legs',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: legsState.key, className: 'desc'}, React.DOM.ul({
                    key: legsState.key,
                    className: 'stats'
                }, legs)
            )));
        }

        if (itemsIconState.bracers && bracersState) {
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
                        bracers.push(React.DOM.li({key: bracersState.key, className: 'secondary'}, secondaryStat.text));
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
                            var bracersCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' bracers',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: bracersState.key, className: 'desc'}, React.DOM.ul({
                    key: bracersState.key,
                    className: 'stats'
                }, bracers)
            )));
        }

        if (itemsIconState.mainHand && mainHandState) {
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
                        if (mainHandState.attributesRaw['Damage_Weapon_Percent_All'] && !mainHandState.attributesRaw['Damage_Weapon_Bonus_Min_X1#Physical']) {
                            minDmgCalc = mainHandState.minDamage.max +
                            mainHandState.attributesRaw[weaponElementsMin[i]].max +
                            (mainHandState.attributesRaw[weaponElementsMin[i]].max * mainHandState.attributesRaw['Damage_Weapon_Percent_All'].max);
                            maxDmgCalc = mainHandState.maxDamage.max +
                                mainHandState.attributesRaw[weaponElementsMin[i]].max +
                                mainHandState.attributesRaw[weaponElementsDelta[i]].max +
                                ((mainHandState.attributesRaw[weaponElementsMin[i]].max + mainHandState.attributesRaw[weaponElementsDelta[i]].max) * mainHandState.attributesRaw['Damage_Weapon_Percent_All'].max);
                            mainHand.push(React.DOM.li({
                                key: mainHandState.key,
                                className: 'raw-damage'
                            }, Math.round(minDmgCalc) + ' - ' + Math.round(maxDmgCalc) +' Damage'));
                        } else if (!mainHandState.attributesRaw['Damage_Weapon_Percent_All'] && !mainHandState.attributesRaw['Damage_Weapon_Bonus_Min_X1#Physical']) {
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
                        mainHand.push(React.DOM.li({key: mainHandState.key, className: 'primary'}, primaryStat.text));
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
                        mainHand.push(React.DOM.li({key: mainHandState.key, className: 'passive'}, passiveStat.text));
                    });
                }
            }

            if (mainHandState.set && mainHandState.set.ranks) {
                for (i = 0; i < mainHandState.set.ranks.length; i++) {
                    for (k = 1; k <= 6; k++) {
                        for (m = 0; m < setPool.length; m++) {
                            var mainCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' mainHand',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: mainHandState.key, className: 'desc'}, React.DOM.ul({
                    key: mainHandState.key,
                    className: 'stats'
                }, mainHand)
            )));
        }

        if (itemsIconState.offHand && offHandState) {
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
                        if (offHandState.attributesRaw['Damage_Weapon_Percent_All'] && !offHandState.attributesRaw['Damage_Weapon_Bonus_Min_X1#Physical']) {
                            offHand.push(React.DOM.li({
                                key: offHandState.key,
                                className: 'raw-damage'
                            }, Math.round(offHandState.minDamage.max +
                            offHandState.attributesRaw[weaponElementsMin[i]].max +
                            (offHandState.attributesRaw[weaponElementsMin[i]].max * offHandState.attributesRaw['Damage_Weapon_Percent_All'].max)) +
                            ' - ' +
                            Math.round(offHandState.maxDamage.max +
                                offHandState.attributesRaw[weaponElementsMin[i]].max +
                                offHandState.attributesRaw[weaponElementsDelta[i]].max +
                                ((offHandState.attributesRaw[weaponElementsMin[i]].max + offHandState.attributesRaw[weaponElementsDelta[i]].max) * offHandState.attributesRaw['Damage_Weapon_Percent_All'].max)
                            ) + ' Damage'));
                        } else if (!offHandState.attributesRaw['Damage_Weapon_Percent_All'] && !offHandState.attributesRaw['Damage_Weapon_Bonus_Min_X1#Physical']) {
                            offHand.push(React.DOM.li({
                                key: offHandState.key,
                                className: 'raw-damage'
                            }, Math.round(offHandState.minDamage.max +
                            offHandState.attributesRaw[weaponElementsMin[i]].max) +
                            ' - ' +
                            Math.round(offHandState.maxDamage.max +
                            offHandState.attributesRaw[weaponElementsMin[i]].max +
                            offHandState.attributesRaw[weaponElementsDelta[i]].max)
                            + ' Damage'));
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
                        offHand.push(React.DOM.li({key: offHandState.key, className: 'secondary'}, secondaryStat.text));
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
                            var offCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' offHand',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: offHandState.key, className: 'desc'}, React.DOM.ul({
                    key: offHandState.key,
                    className: 'stats'
                }, offHand)
            )));
        }

        if (itemsIconState.waist && beltState) {
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
                            var beltCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' waist',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: beltState.key, className: 'desc'}, React.DOM.ul({
                    key: beltState.key,
                    className: 'stats'
                }, belt)
            )));
        }

        if (itemsIconState.rightFinger && ringStateRight) {
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
                        ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'primary'}, primaryStat.text));
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
                        ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'passive'}, passiveStat.text));
                    });
                }
            }

            if (ringStateRight.set && ringStateRight.set.ranks) {
                for (i = 0; i < ringStateRight.set.ranks.length; i++) {
                    for (k = 1; k <= 6; k++) {
                        for (m = 0; m < setPool.length; m++) {
                            var ringRCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' rightFinger',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: ringStateRight.key, className: 'desc'}, React.DOM.ul({
                    key: ringStateRight.key,
                    className: 'stats'
                }, ringRight)
            )));
        }

        if (itemsIconState.leftFinger && ringStateLeft) {
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
                        ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'primary'}, primaryStat.text));
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
                        ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'passive'}, passiveStat.text));
                    });
                } else {
                    isAncient = '';
                }
            }

            if (ringStateLeft.set && ringStateLeft.set.ranks) {
                for (i = 0; i < ringStateLeft.set.ranks.length; i++) {
                    for (k = 1; k <= 6; k++) {
                        for (m = 0; m < setPool.length; m++) {
                            var ringLCount;
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
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' leftFinger',
                onClick: this.handleItemClick,
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: ringStateLeft.key, className: 'desc'}, React.DOM.ul({
                    key: ringStateLeft.key,
                    className: 'stats'
                }, ringLeft)
            )));
        }

        if (itemsIconState.neck && neckState) {
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
                            var neckCount;
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

            if (neckState.attributesRaw && neckState.attributesRaw.Sockets && neckState.gems[0]) {
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
                    neck.push(React.DOM.li({key: neckState.key, className: 'gem-passive unique'}, passiveStat.text));
                });

            } else if (neckState.attributesRaw && neckState.attributesRaw.Sockets) {
                neck.push(React.DOM.li({key: neckState.key, className: 'socket'}));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: toggle + ' ' + isAncient + ' ' + itemQuality + ' neck',
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
        if (statsState.life && statsState.damage && statsState.toughness && statsState.vitality) {
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
            } else if (pCritChance !== 0) {
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
            } else if (pCritDmg !== 0) {
                additionalStatsOffensive.push(React.DOM.div({
                    key: additionalStatsOffensive.key,
                    className: 'bonusstat'
                }, 'Critical Damage increase: ' + Math.round((pCritDmg - 100) * 1000) / 1000 + '%'));
            }

            if (cdrState !== 1) {
                additionalStatsOffensive.push(React.DOM.div({
                    key: additionalStatsOffensive.key,
                    className: 'bonusstat'
                }, 'Cooldown Reduction: ' + Math.round((1 - cdrState) * 100 * 100) / 100 + '%'));
            }

            if (resState !== 1) {
                additionalStatsOffensive.push(React.DOM.div({
                    key: additionalStatsOffensive.key,
                    className: 'bonusstat'
                }, 'Resource Cost Reduction: ' + Math.round((1 - resState) * 100 * 100) / 100 + '%'));
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
            } else if (pAtkSpd !== 0) {
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

        if (statsState.critDamage && statsState.critChance && calculatedAttackSpeed && minDmgCalc !== 0 && maxDmgCalc !== 0) {
            var dexCalc = 1 + statsState.dexterity / 100,
                minMaxCalc = (minDmgCalc + maxDmgCalc) * 0.5,
                critChanceCalc = statsState.critChance + (pCritChance / 100),
                critDmgCalc = statsState.critDamage - 1 + (pCritDmg / 100),
                sheetDpsCalc = dexCalc * minMaxCalc * calculatedAttackSpeed * (critChanceCalc * critDmgCalc + 1),
                buffMult = 0,
                gemMult = 0,
                eleMult = 0,
                effectiveDpsCalc,
                nativeSkillDamage = 1;

            for (i = 0; i < customBuffPool.length; i++) {
                passivesState.forEach(function (passiveName) {
                    if (passiveName.skill.name === customBuffPool[i][0]) {
                        buffMult += customBuffPool[i][1];
                    }
                });
                skillsState.forEach(function (skillName) {
                    if (skillName.skill.name === customBuffPool[i][0]) {
                        buffMult += customBuffPool[i][1];
                    }
                });
            }

            if (this.state.maxEleDmgValue) {
                eleMult += this.state.maxEleDmgValue / 100;
            }

            effectiveDpsCalc = sheetDpsCalc * nativeSkillDamage * (1 + eleMult) * (1 + buffMult);

            stats.push(React.DOM.div({key: statsState.key}, 'DPS: ',
                Math.round(sheetDpsCalc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                ' | EPS: ',
                Math.round(effectiveDpsCalc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            ));
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
            if (maxHealthState !== 0) {
                additionalStatsDefensive.push(React.DOM.div({
                    key: additionalStatsDefensive.key,
                    className: 'bonusstat'
                }, 'Bonus Max Health: ' + maxHealthState + '%'));
            }
        }

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat cdr'},
            'cdr: ' + Math.round(pCdr * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resred'},
            'res: ' + Math.round(pResRed * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat atkspd'},
            'atkspd: ' + Math.round(pAtkSpd * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat critdmg'},
            'critdmg: ' + Math.round(pCritDmg) + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat critchance'},
            'critchance: ' + Math.round(pCritChance * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat areadmg'},
            'areadmg: ' + Math.round(pAreaDmg) + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resource'},
            'resource: ' + Math.round(pResource),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat resistall'},
            'allres: ' + Math.round(pResistAll),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat armor'},
            'armor: ' + Math.round(pArmor * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
        ));

        paragon.push(React.DOM.div({key: paragon.key, className: 'paragon-stat maxlife'},
            'maxlife: ' + Math.round(pLife * 10) / 10 + '%',
            React.DOM.span({key: paragon.key, className: 'paragon-stat-increment', onClick: this.handleParagon}, '+'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-decrement', onClick: this.handleParagon}, '-'),
            React.DOM.span({key: paragon.key, className: 'paragon-stat-max', onClick: this.handleParagon})
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
                React.DOM.div({className: 'd3-item-wrapper'}, items),
                React.DOM.div({className: 'd3-char-bg', style: style}),
                React.DOM.div({className: 'd3-api-url'},
                    '1 - Enter your BattleTag: ',
                    React.DOM.input(
                        {
                            value: this.state.battleTag,
                            placeholder: 'NAME#1234',
                            onChange: this.handleChange
                        }
                    )
                ),
                React.DOM.div({className: 'd3-char-wrapper'},
                    '2 - Click below to select your hero: ',
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
                    className: this.state.panels,
                    id: 'panel-left'
                }, 'General', base, React.DOM.div({className: 'd3-paragon-selector'}, 'Paragon Points: ', paragon)),
                React.DOM.div({
                    className: this.state.skillDescOpen + ' ' + this.state.panels,
                    title: 'click to open detailed description',
                    id: 'panel-bottom-left'
                }, React.DOM.button({
                    onClick: this.handleSkillDescClick
                }, 'show details'), 'Skills', skills),
                React.DOM.div({
                    className: this.state.skillDescOpen,
                    id: 'panel-bottom-left-desc'
                }, React.DOM.button({
                    onClick: this.handleSkillDescClick,
                    title: 'click to close'
                }, 'close'), skillsDesc),
                React.DOM.div({
                    className: this.state.passiveDescOpen + ' ' + this.state.panels,
                    title: 'click to open detailed description',
                    id: 'panel-bottom-right'
                }, React.DOM.button({
                    onClick: this.handlePassiveDescClick
                }, 'show details'), 'Passives', passives, specialPassive),
                React.DOM.div({
                    className: this.state.passiveDescOpen,
                    id: 'panel-bottom-right-desc'
                }, React.DOM.button({
                    onClick: this.handlePassiveDescClick,
                    title: 'click to close'
                }, 'close'), passivesDesc, 'Note: your Hellfire Passive cannot be displayed here, courtesy of blizzard'),
                React.DOM.div({
                        className: this.state.toggle + ' ' + this.state.panels,
                        id: 'panel-right'
                    }, React.DOM.button({
                        onClick: this.handleBonusStatsClick,
                        title: 'click to show/hide more stats'
                    }, 'show ' + this.state.toggle),
                    'Stats',
                    stats),
                React.DOM.div({id: 'panel-right-additional'}, 'Offensive Stats', additionalStatsOffensive, 'Defensive Stats', additionalStatsDefensive)
            )
        );
    }
});

React.render(React.createElement(DataWrapper, {
        pollInterval: 600000
    }),
    document.getElementById('profile-data'));

// Test Profiles
// Ferdi#1763
// McleodNUS#2608
// Mephir#2101
// MazlSan#2233

// todo find formula for min-max dmg calculation
// todo fix set count
