var DataWrapper = React.createClass({
    displayName: 'DataWrapper',
    getInitialState: function () {
        return {
            skills: [],
            passives: [],
            stats: [],
            heroes: [],
            items: [],
            attributes: [],
            class: {},
            name: {},
            level: {},
            paragon: {},

            helmItem: [],
            amuletItem: [],
            shouldersItem: [],
            bracersItem: [],
            chestItem: [],
            ringItemLeft: [],
            ringItemRight: [],
            mainItem: [],
            offItem: [],
            legsItem: [],
            bootsItem: [],
            glovesItem: [],
            beltItem: [],

            additionalStats: [],
            cdrRed: [],
            resRed: [],
            atkSpd: [],
            eliteDmg: [],
            areaDmg: [],
            goldPickup: [],
            dmgRedMelee: [],
            dmgRedRanged: [],
            maxEleDmg: [],
            maxHealth: [],

            invalid: false,
            time: [],
            isOpen: [],
            refreshing: 'on',
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
        if (this.state.battleTag && this.state.refreshing === 'on') {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/', this.state.apiKey)});
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({heroes: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            //console.log('updated herolist');
            console.log(this.state.url);
        }
    },

    loadProfileData: function () {
        if (this.state.selected && this.state.refreshing === 'on') {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/hero/', this.state.selected, this.state.apiKey)});
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({name: data.name});
                    this.setState({class: data.class});
                    this.setState({level: data.level});
                    this.setState({paragon: data.paragonLevel});
                    this.setState({skills: data.skills.active});
                    this.setState({passives: data.skills.passive});
                    this.setState({stats: data.stats});
                    this.setState({items: data.items});
                    this.setState({time: data['last-updated']});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            //console.log('updated data');
            console.log(this.state.url);
        }
    },

    loadItemData: function (itemKey) {
        if (this.state.refreshing === 'on') {
            this.setState({item: itemKey});
            this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
            console.log(this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey));
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
                        case 'Mace':
                        case 'Axe':
                        case 'CeremonialKnife':
                        case 'MightyWeapon':
                        case 'Flail2H':
                        case 'Flail1H':
                        case 'HandXbow':
                        case 'Bow2H':
                        case 'Bow':
                        case 'Wand':
                        case 'Staff':
                        case 'Staff2H':
                        case 'CeremonialDagger':
                            this.setState({mainItem: data});
                            break;
                        case 'Quiver':
                        case 'CrusaderShield':
                        case 'Shield':
                        case 'Source':
                        case 'Mojo':
                            this.setState({offItem: data});
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
            //console.log('updated item');
            //console.log(this.state.itemUrl);
        }
    },

    loadItemDataWithProps: function (itemKey, left) {
        if (this.state.refreshing === 'on') {
            this.setState({item: itemKey});
            this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
            console.log(this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey));
            $.ajax({
                url: this.state.itemUrl,
                dataType: 'jsonp',
                success: function (data) {
                    if (left === true) {
                        this.setState({ringItemLeft: data});
                    } else {
                        this.setState({ringItemRight: data});
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            //console.log('updated ringset');
            //console.log(this.state.itemUrl);
        }
    },

    setPolling: function () {
        if (this.state.refreshing === 'off') {
            this.setState({refreshing: 'on'});
        } else {
            this.setState({refreshing: 'off'});
        }
    },

    componentWillMount: function () {
        this.loadHeroesData();
        setInterval(this.loadHeroesData, this.props.pollInterval);
        setInterval(this.loadProfileData, this.props.pollInterval);
        setInterval(this.getItemData, this.props.pollInterval);
        setInterval(this.collectStats, this.props.pollInterval);
    },

    handleChange: function (e) {
        var input = e.target.value;
        this.setState({battleTag: input});
        localStorage.setItem('battleTag', input);
    },

    setSelect: function () {
        var newValue = this.refs.select.getDOMNode().value;
        this.setState({selected: newValue});
        this.loadProfileData();

        if (this.state.heroes.code) {
            this.setState({invalid: true});
        } else {
            this.setState({invalid: false});
        }

        this.getItemData();
        this.collectStats();
    },

    handleClick: function() {
        if (this.state.isOpen === 'open') {
            return this.setState({isOpen: ''})
        } else {
            return this.setState({isOpen: 'open'})
        }
    },

    getItemData: function () {
        var i,
            itemData;

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
                this.state.items.offHand,
                this.state.items.waist
            ];

            var itemSlotsWithProps = [
                [this.state.items.leftFinger, 'left'],
                [this.state.items.rightFinger, 'right']
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
                'Power_Damage_Percent_Bonus#DemonHunter_ClusterArrow',
                'Power_Damage_Percent_Bonus#DemonHunter_Sentry',
                'Gold_PickUp_Radius',
                'Damage_Percent_Reduction_From_Melee',
                'Damage_Percent_Reduction_From_Ranged',
                'Hitpoints_Max_Percent_Bonus_Item'
            ],
            results = [],
            cdr = 0,
            eliteDmg = 0,
            areaDmg = 0,
            resRed = 0,
            skillDmg = 0,
            fireDmg = 0,
            coldDmg = 0,
            lightningDmg = 0,
            physicalDmg = 0,
            poisonDmg = 0,
            atkSpd = 0,
            dmgRedMelee = 0,
            dmgRedRanged = 0,
            goldPickUp = 0,
            maxHealth = 0,
            k;

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
                                        cdr += results[k] * 100;
                                        break;
                                    case 'Resource_Cost_Reduction_Percent_All':
                                        resRed += results[k] * 100;
                                        break;
                                    case 'Damage_Percent_Bonus_Vs_Elites':
                                        eliteDmg += results[k] * 100;
                                        break;
                                    case 'Splash_Damage_Effect_Percent':
                                        areaDmg += results[k] * 100;
                                        break;
                                    case 'Gold_PickUp_Radius':
                                        goldPickUp += results[k];
                                        break;
                                    case 'Damage_Percent_Reduction_From_Melee':
                                        dmgRedMelee += results[k] * 100;
                                        break;
                                    case 'Damage_Percent_Reduction_From_Ranged':
                                        dmgRedRanged += results[k] * 100;
                                        break;
                                    case 'Hitpoints_Max_Percent_Bonus_Item':
                                        maxHealth += results[k] * 100;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
            // todo set boni
            // increment for cdr gem
            if (this.state.helmItem && this.state.helmItem.gems && this.state.helmItem.gems[0]) {
                if (this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All) {
                    cdr += this.state.helmItem.gems[0].attributesRaw.Power_Cooldown_Reduction_Percent_All.min * 100;
                }
                if (this.state.helmItem.gems[0].attributesRaw.Hitpoints_Max_Percent_Bonus_Item) {
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
                findElem = eleDmg.reduce(function(max, arr) {
                    return max >= arr ? max : arr;
                }, -Infinity),
                maxElement;

            switch (findElem) {
                case fireDmg:
                    maxElement = 'Fire Damage Increase: ' + findElem + '%';
                    break;
                case coldDmg:
                    maxElement = 'Cold Damage Increase: ' + findElem + '%';
                    break;
                case physicalDmg:
                    maxElement = 'Physical Damage Increase: ' + findElem + '%';
                    break;
                case lightningDmg:
                    maxElement = 'Lightning Damage Increase: ' + findElem + '%';
                    break;
                case poisonDmg:
                    maxElement = 'Poison Damage Increase: ' + findElem + '%';
                    break;
            }

            if (findElem !== 0) {
                this.setState({maxEleDmg: maxElement});
            } else {
                this.setState({maxEleDmg: ''});
            }
            this.setState({cdrRed: cdr});
            this.setState({resRed: resRed});
            this.setState({atkSpd: atkSpd});
            this.setState({eliteDmg: eliteDmg});
            this.setState({areaDmg: areaDmg});
            this.setState({goldPickup: goldPickUp});
            this.setState({dmgRedMelee: dmgRedMelee});
            this.setState({dmgRedRanged: dmgRedRanged});
            this.setState({maxHealth: maxHealth});

        }
    },

    render: function () {
        var skillsState = this.state.skills,
            skills = [],
            passivesState = this.state.passives,
            passives = [],
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
            refreshing = this.state.refreshing,
            timeStamp = this.state.time,
            time = [],
            additionalStatsOffensive = [],
            additionalStatsDefensive = [],
            cdrState = this.state.cdrRed,
            resState = this.state.resRed,
            eliteDmgState = this.state.eliteDmg,
            areaDmgState = this.state.areaDmg,
            goldPickUpState = this.state.goldPickup,
            dmgRedMeleeState = this.state.dmgRedMelee,
            dmgRedRangedState = this.state.dmgRedRanged,
            maxElementDmg = this.state.maxEleDmg,
            maxHealthState = this.state.maxHealth;

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
                    backgroundImage: 'url("../../assets/images/empty.svg)'
                };
        }
        if (heroesState.heroes) {
            heroes.push(React.DOM.option({key: heroesState.heroes.key, value: '', style: {display: 'none'}}, 'select hero'));
            heroesState.heroes.forEach(function (heroName) {
                heroes.push(React.DOM.option({
                    key: heroesState.heroes.key,
                    value: heroName.id
                }, '[' + heroName.class + '] ' + heroName.name + ' (id: ' + heroName.id + ')'));
            });
        } else if (heroesState.code) {
            heroes.push(React.DOM.option({key: heroesState.code.key, value: '', style: {display: 'none'}}, 'invalid battleTag'));
        } else if (this.state.battleTag === null) {
            heroes.push(React.DOM.option({value: '', style: {display: 'none'}}, 'enter your battleTag in the field below'));
        } else {
            heroes.push(React.DOM.option({value: '', style: {display: 'none'}}, 'loading herolist...'));
        }

        if (nameState && classState && levelState) {
            base.push(React.DOM.div({key: nameState.key}, 'Name: ', nameState));
            base.push(React.DOM.div({key: classState.key}, 'Class: ', classState));
            base.push(React.DOM.div({key: levelState.key}, 'Level: ', levelState));
            if (paragonState) {
                base.push(React.DOM.div({key: paragonState.key}, 'Paragon: ', paragonState));
            }
        }

        if (timeStamp && timeStamp * 1000 !== 0) {
            var t = new Date(timeStamp * 1000),
                formatted = t.toLocaleDateString() + ' ' + t.toLocaleTimeString();
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
                            React.DOM.div({key: skillsState.key, className: 'icon-back', style: runeType}))
                    );
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (helmState.attributesRaw) {
                if (helmState.attributesRaw.Ancient_Rank && helmState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            helmet.push(React.DOM.li({key: helmState.key, className: itemQuality + ' name'}, itemsState.head.name));

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
                className: isAncient + ' ' + itemQuality + ' head',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (torsoState.attributesRaw) {
                if (torsoState.attributesRaw.Ancient_Rank && torsoState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            torso.push(React.DOM.li({key: torsoState.key, className: itemQuality + ' name'}, itemsState.torso.name));

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
                className: isAncient + ' ' + itemQuality + ' torso',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (handsState.attributesRaw) {
                if (handsState.attributesRaw.Ancient_Rank && handsState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            hands.push(React.DOM.li({key: handsState.key, className: itemQuality + ' name'}, itemsState.hands.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' hands',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (feetState.attributesRaw) {
                if (feetState.attributesRaw.Ancient_Rank && feetState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            feet.push(React.DOM.li({key: feetState.key, className: itemQuality + ' name'}, itemsState.feet.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' feet',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (shouldersState.attributesRaw) {
                if (shouldersState.attributesRaw.Ancient_Rank && shouldersState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            shoulders.push(React.DOM.li({
                key: shouldersState.key,
                className: itemQuality + ' name'
            }, itemsState.shoulders.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' shoulders',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (legsState.attributesRaw) {
                if (legsState.attributesRaw.Ancient_Rank && legsState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            legs.push(React.DOM.li({key: legsState.key, className: itemQuality + ' name'}, itemsState.legs.name));

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
                className: isAncient + ' ' + itemQuality + ' legs',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (bracersState.attributesRaw) {
                if (bracersState.attributesRaw.Ancient_Rank && bracersState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            bracers.push(React.DOM.li({
                key: bracersState.key,
                className: itemQuality + ' name'
            }, itemsState.bracers.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' bracers',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (mainHandState.attributesRaw) {
                if (mainHandState.attributesRaw.Ancient_Rank && mainHandState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            mainHand.push(React.DOM.li({
                key: mainHandState.key,
                className: itemQuality + ' name'
            }, itemsState.mainHand.name));

            if (mainHandState.dps) {
                mainHand.push(React.DOM.li({
                    key: mainHandState.key,
                    className: 'dps'
                }, mainHandState.dps.max.toString().substring(0, 8) + ' DPS'));
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

            if (mainHandState.attributesRaw && mainHandState.attributesRaw.Sockets && mainHandState.gems[0]) {
                gemLink = itemIconBaseUrl.concat(mainHandState.gems[0].item.icon, '.png');
                mainHand.push(React.DOM.li({
                    key: mainHandState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                if (mainHandState.gems[0].attributes.primary) {
                    mainHandState.gems[0].attributes.primary.forEach(function (Stat) {
                        mainHand.push(React.DOM.li({key: mainHandState.key, className: 'gem-passive'}, Stat.text));
                    });
                }

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
                className: isAncient + ' ' + itemQuality + ' mainHand',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (offHandState.attributesRaw) {
                if (offHandState.attributesRaw.Ancient_Rank && offHandState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            offHand.push(React.DOM.li({
                key: offHandState.key,
                className: itemQuality + ' name'
            }, itemsState.offHand.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' offHand',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (beltState.attributesRaw) {
                if (beltState.attributesRaw.Ancient_Rank && beltState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            belt.push(React.DOM.li({key: beltState.key, className: itemQuality + ' name'}, itemsState.waist.name));

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

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' waist',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (ringStateRight.attributesRaw) {
                if (ringStateRight.attributesRaw.Ancient_Rank && ringStateRight.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            ringRight.push(React.DOM.li({
                key: ringStateRight.key,
                className: itemQuality + ' name'
            }, itemsState.rightFinger.name));

            if (ringStateRight.attributes) {
                if (ringStateRight.attributes.primary) {
                    ringStateRight.attributes.primary.forEach(function (primaryStat) {
                        ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'primary'}, primaryStat.text));
                    });
                }

                if (ringStateRight.attributes.secondary) {
                    ringStateRight.attributes.secondary.forEach(function (secondaryStat) {
                        ringRight.push(React.DOM.li({
                            key: ringStateRight.key,
                            className: 'secondary'
                        }, secondaryStat.text));
                    });
                }

                if (ringStateRight.attributes.passive) {
                    ringStateRight.attributes.passive.forEach(function (passiveStat) {
                        ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'passive'}, passiveStat.text));
                    });
                }
            }

            if (ringStateRight.attributesRaw && ringStateRight.attributesRaw.Sockets && ringStateRight.gems[0]) {
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
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' rightFinger',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (ringStateLeft.attributesRaw) {
                if (ringStateLeft.attributesRaw.Ancient_Rank && ringStateLeft.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            ringLeft.push(React.DOM.li({
                key: ringStateLeft.key,
                className: itemQuality + ' name'
            }, itemsState.leftFinger.name));

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

            if (ringStateLeft.attributesRaw && ringStateLeft.attributesRaw.Sockets && ringStateLeft.gems[0]) {
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
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: isAncient + ' ' + itemQuality + ' leftFinger',
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
                case 'gray':
                    itemQuality = 'common';
                    break;
                default:
            }

            if (neckState.attributesRaw) {
                if (neckState.attributesRaw.Ancient_Rank && neckState.attributesRaw.Ancient_Rank.min === 1.0) {
                    isAncient = 'ancient';
                } else {
                    isAncient = '';
                }
            }

            neck.push(React.DOM.li({key: neckState.key, className: itemQuality + ' name'}, itemsState.neck.name));

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
                className: isAncient + ' ' + itemQuality + ' neck',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: neckState.key, className: 'desc'}, React.DOM.ul({
                    key: neckState.key,
                    className: 'stats'
                }, neck)
            )));
        }

        if (amuletState.attributes && itemsState) {
            if (amuletState.attributes.passive && itemsState.neck && itemsState.neck.name === 'Hellfire Amulet') {
                var hellfirePassiveLink = amuletState.attributes.passive[0].text.substring(9).replace(' passive.', '').replace(/ /g, '').toLowerCase(),
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
            stats.push(React.DOM.div({key: statsState.key}, 'Life: ', statsState.life.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
            stats.push(React.DOM.div({key: statsState.key}, 'Damage: ', statsState.damage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
            stats.push(React.DOM.div({key: statsState.key}, 'Toughness: ', statsState.toughness.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));

            if (classState === 'demon-hunter' || classState === 'monk') {
                stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));

                if (statsState.strength > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }
                if (statsState.intelligence > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }

            } else if (classState === 'witch-doctor' || classState === 'wizard') {
                stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));

                if (statsState.strength > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }
                if (statsState.dexterity > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }

            } else if (classState === 'barbarian' || classState === 'crusader') {
                stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));

                if (statsState.dexterity > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }
                if (statsState.intelligence > 1000) {
                    stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
                }
            }

            stats.push(React.DOM.div({key: statsState.key}, 'Vitality: ', statsState.vitality.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
        }

        if (additionalStatsOffensive && statsState) {

            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Critical Hit Chance: ' + Math.round(statsState.critChance * 1000) / 10 + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Critical Damage increase: ' + Math.round(statsState.critDamage * 1000) / 10  + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Cooldown Reduction: ' + cdrState + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Resource Cost Reduction: ' + resState + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Attacks per Second: ' +  Math.round(statsState.attackSpeed * 1000) / 1000));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Bonus Dmg to Elite: ' + eliteDmgState + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Area Damage Bonus: ' + areaDmgState + '%'));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, 'Primary Resource: ' + statsState.primaryResource));
            additionalStatsOffensive.push(React.DOM.div({
                key: additionalStatsOffensive.key,
                className: 'bonusstat'
            }, maxElementDmg));
        }

        if (additionalStatsDefensive && statsState) {
            if (statsState.secondaryResource !== 0) {
                additionalStatsDefensive.push(React.DOM.div({
                    key: additionalStatsOffensive.key,
                    className: 'bonusstat'
                }, 'Secondary Resource: ' + statsState.secondaryResource));
            }

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Physical Resist: ' + statsState.physicalResist));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Fire Resist: ' + statsState.fireResist));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Cold Resist: ' + statsState.coldResist));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Lighting Resist: ' + statsState.lightningResist));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Poison Resist: ' + statsState.poisonResist));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Gold Pick-up Radius: ' + goldPickUpState));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Melee Damage Reduction: ' + Math.round(dmgRedMeleeState * 1000) / 1000 + '%'));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Ranged Damage Reduction: ' + Math.round(dmgRedRangedState * 1000) / 1000 + '%'));

            additionalStatsDefensive.push(React.DOM.div({
                key: additionalStatsDefensive.key,
                className: 'bonusstat'
            }, 'Bonus Max Health: ' + maxHealthState + '%'));
        }

        return (
            React.DOM.div({className: 'd3-container'},
                React.DOM.div({className: 'd3-item-wrapper'}, items),
                React.DOM.div({className: 'd3-char-bg', style: style}),
                React.DOM.div({className: 'd3-api-url'},
                    React.DOM.input(
                        {
                            value: this.state.battleTag,
                            placeholder: 'NAME#1234',
                            onChange: this.handleChange
                        }
                    )
                ),
                React.DOM.div({className: 'd3-char-wrapper'},
                    React.DOM.select(
                        {
                            className: 'd3-chars',
                            ref: 'select',
                            value: this.state.selected,
                            onChange: this.setSelect
                        }, heroes
                    )
                ),
                React.DOM.div({id: 'panel-left'}, 'General', base),
                React.DOM.div({id: 'panel-bottom-left'}, 'Skills', skills),
                React.DOM.div({id: 'panel-bottom-right'}, 'Passives', passives, specialPassive),
                React.DOM.div({className: this.state.isOpen , id: 'panel-right' ,onClick: this.handleClick}, 'Stats', stats),
                React.DOM.div({id: 'panel-right-additional'}, 'Offensive Stats', additionalStatsOffensive, 'Defensive Stats', additionalStatsDefensive),
                React.DOM.div({className: 'setButton', onClick: this.setPolling}, 'refreshing is: ' + refreshing)
            )
        );
    }
});

React.render(React.createElement(DataWrapper, {
        pollInterval: 2000
    }),
    document.getElementById('profile-data'));

// Ferdi#1763
// McleodNUS#2608


// todos
// save url to localStorage - done
// item colors
// ancient state
// offhand weapons dont work
// fallback if socket is empty
// find out how animations triggers work
// correct stats
// <script src="http://us.battle.net/d3/static/js/tooltips.js"></script>
// https://eu.api.battle.net/d3/data/item/CmII7uHdNRIHCAQVtjA30B0yicdaHYQDodYdYJ4mRx29VYTTHT_yCdgdB16d0zCLGjiaA0AASANQElgEYJoDgAFGjQGfRZt_pQG9VYTTrQHegvzltQGgRZt_uAG6wuKqC8ABEhiTvcb8BVAAWAKgAdWb4uwOoAGVnfLhDqABk73G_AWgAcyPgPcBoAG-wY2rDw?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm
// http://media.blizzard.com/d3/icons/items/large/unique_chest_set_07_x1_demonhunter_male.png
