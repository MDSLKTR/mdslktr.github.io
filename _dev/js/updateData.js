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
            helmRaw: [],
            helmGem: [],

            amuletItem: [],
            amuletGem: [],
            amuletRaw: [],

            shouldersItem: [],
            bracersItem: [],

            chestItem: [],
            chestRaw: [],
            chestGem: [],

            ringItemLeftGem: [],
            ringItemLeftRaw: [],
            ringItemLeft: [],

            ringItemRightGem: [],
            ringItemRightRaw: [],
            ringItemRight: [],

            mainItem: [],
            mainRaw: [],
            mainGem: [],
            mainItemDps: [],

            legsItem: [],
            legsItemRaw: [],
            legsItemGem: [],

            bootsItem: [],

            offItem: [],
            glovesItem: [],
            beltItem: [],
            ringItem: [],
            leftRing: [],
            rightRing: [],
            polling: true,
            url: '',
            itemUrl: '',
            battleTag: localStorage.getItem('battleTag'),
            apiKey: '?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm',
            profile: 'https://eu.api.battle.net/d3/profile/',
            itemIconLink: 'http://media.blizzard.com/d3/icons/items/large/', // icon + format .png,
            skillIconLink: 'http://media.blizzard.com/d3/icons/skills/64/',
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
                    this.setState({heroes: data.heroes});
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
        if (this.state.selected) {
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
        this.setState({item: itemKey});
        this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
        console.log(this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey));
        $.ajax({
            url: this.state.itemUrl,
            dataType: 'jsonp',
            success: function (data) {
                switch (data.type.id) {
                    case 'Helm':
                    case 'Helm_Barbarian':
                    case 'Helm_DemonHunter':
                    case 'Helm_WitchDoctor':
                    case 'Helm_Crusader':
                    case 'Helm_Wizard':
                    case 'Helm_Monk':
                    case 'VoodooMask':
                        this.setState({helmItem: data.attributes});
                        this.setState({helmRaw: data.attributesRaw});
                        this.setState({helmGem: data.gems});
                        break;
                    case 'Shoulders':
                    case 'Shoulders_Barbarian':
                    case 'Shoulders_DemonHunter':
                    case 'Shoulders_WitchDoctor':
                    case 'Shoulders_Crusader':
                    case 'Shoulders_Wizard':
                    case 'Shoulders_Monk':
                        this.setState({shouldersItem: data.attributes});
                        break;
                    case 'Bracers':
                        this.setState({bracersItem: data.attributes});
                        break;
                    case 'ChestArmor':
                    case 'ChestArmor_Barbarian':
                    case 'ChestArmor_DemonHunter':
                    case 'ChestArmor_WitchDoctor':
                    case 'ChestArmor_Crusader':
                    case 'ChestArmor_Wizard':
                    case 'ChestArmor_Monk':
                        this.setState({chestItem: data.attributes});
                        this.setState({chestRaw: data.attributesRaw});
                        this.setState({chestGem: data.gems});
                        break;
                    case 'Legs':
                    case 'Legs_Barbarian':
                    case 'Legs_DemonHunter':
                    case 'Legs_WitchDoctor':
                    case 'Legs_Crusader':
                    case 'Legs_Wizard':
                    case 'Legs_Monk':
                        this.setState({legsItem: data.attributes});
                        this.setState({legsItemRaw: data.attributesRaw});
                        this.setState({legsItemGem: data.gems});
                        break;
                    case 'Boots':
                    case 'Boots_Barbarian':
                    case 'Boots_DemonHunter':
                    case 'Boots_WitchDoctor':
                    case 'Boots_Crusader':
                    case 'Boots_Wizard':
                    case 'Boots_Monk':
                        this.setState({bootsItem: data.attributes});
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
                    case 'HandXbow':
                    case 'Bow2H':
                    case 'Bow':
                        this.setState({mainItem: data.attributes});
                        this.setState({mainRaw: data.attributesRaw});
                        this.setState({mainGem: data.gems});
                        this.setState({mainItemDps: data.dps});
                        break;
                    case 'Quiver':
                    case 'CrusaderShield':
                    case 'Shield':
                    case 'Source':
                        this.setState({offItem: data.attributes});
                        break;
                    case 'Gloves':
                    case 'Gloves_Barbarian':
                    case 'Gloves_DemonHunter':
                    case 'Gloves_WitchDoctor':
                    case 'Gloves_Crusader':
                    case 'Gloves_Wizard':
                    case 'Gloves_Monk':
                        this.setState({glovesItem: data.attributes});
                        break;
                    case 'GenericBelt':
                    case 'Belt_Barbarian':
                        this.setState({beltItem: data.attributes});
                        break;
                    case 'Amulet':
                        this.setState({amuletItem: data.attributes});
                        this.setState({amuletRaw: data.attributesRaw});
                        this.setState({amuletGem: data.gems});
                        break;
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
        //console.log('updated item');
        //console.log(this.state.itemUrl);
    },

    loadItemDataWithProps: function (itemKey, left) {
        this.setState({item: itemKey});
        this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
        console.log(this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey));
        $.ajax({
            url: this.state.itemUrl,
            dataType: 'jsonp',
            success: function (data) {
                if (left === true) {
                    this.setState({ringItemLeft: data.attributes});
                    this.setState({ringItemLeftRaw: data.attributesRaw});
                    this.setState({ringItemLeftGem: data.gems});
                } else {
                    this.setState({ringItemRight: data.attributes});
                    this.setState({ringItemRightRaw: data.attributesRaw});
                    this.setState({ringItemRightGem: data.gems});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
        //console.log('updated ringset');
        //console.log(this.state.itemUrl);
    },

    componentWillMount: function () {
        this.loadHeroesData();
        setInterval(this.loadHeroesData, this.props.pollInterval);
        setInterval(this.loadProfileData, this.props.pollInterval);
        setInterval(this.getItemData, this.props.pollInterval);
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
        this.getItemData();
    },

    getItemData: function () {
        if (this.state.items.neck) {
            var neck = this.state.items.neck.tooltipParams;
            this.loadItemData(neck);
        }

        if (this.state.items.head) {
            var head = this.state.items.head.tooltipParams;
            this.loadItemData(head);
        }

        if (this.state.items.torso) {
            var torso = this.state.items.torso.tooltipParams;
            this.loadItemData(torso);
        }

        if (this.state.items.feet) {
            var feet = this.state.items.feet.tooltipParams;
            this.loadItemData(feet);
        }

        if (this.state.items.hands) {
            var hands = this.state.items.hands.tooltipParams;
            this.loadItemData(hands);
        }

        if (this.state.items.shoulders) {
            var shoulders = this.state.items.shoulders.tooltipParams;
            this.loadItemData(shoulders);
        }

        if (this.state.items.legs) {
            var legs = this.state.items.legs.tooltipParams;
            this.loadItemData(legs);
        }

        if (this.state.items.bracers) {
            var bracers = this.state.items.bracers.tooltipParams;
            this.loadItemData(bracers);
        }

        if (this.state.items.mainHand) {
            var mainHand = this.state.items.mainHand.tooltipParams;
            this.loadItemData(mainHand);
        }

        if (this.state.items.offHand) {
            var offHand = this.state.items.offHand.tooltipParams;
            this.loadItemData(offHand);
        }

        if (this.state.items.waist) {
            var waist = this.state.items.waist.tooltipParams;
            this.loadItemData(waist);
        }

        if (this.state.items.rightFinger) {
            var rightFinger = this.state.items.rightFinger.tooltipParams;
            this.loadItemDataWithProps(rightFinger, false);
        }

        if (this.state.items.leftFinger) {
            var leftFinger = this.state.items.leftFinger.tooltipParams;
            this.loadItemDataWithProps(leftFinger, true);
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
            helmGem = this.state.helmGem,
            helmStateRaw = this.state.helmRaw,
            torsoState = this.state.chestItem,
            torso = [],
            torsoStateRaw = this.state.chestRaw,
            torsoGem = this.state.chestGem,
            handsState = this.state.glovesItem,
            hands = [],
            feetState = this.state.bootsItem,
            feet = [],
            bracersState = this.state.bracersItem,
            bracers = [],
            legsState = this.state.legsItem,
            legs = [],
            legsStateRaw = this.state.legsItemRaw,
            legsGem = this.state.legsItemGem,
            mainHandState = this.state.mainItem,
            mainHandGem = this.state.mainGem,
            mainHandStateRaw = this.state.mainRaw,
            mainHand = [],
            mainHandDps = this.state.mainItemDps,
            offHandState = this.state.offItem,
            offHand = [],
            beltState = this.state.beltItem,
            belt = [],
            neckState = this.state.amuletItem,
            neck = [],
            neckGem = this.state.amuletGem,
            neckStateRaw = this.state.amuletRaw,
            ringStateLeft = this.state.ringItemLeft,
            ringLeft = [],
            ringLeftGem = this.state.ringItemLeftGem,
            ringLeftRaw = this.state.ringItemLeftRaw,
            ringRight = [],
            ringStateRight = this.state.ringItemRight,
            ringRightGem = this.state.ringItemRightGem,
            ringRightRaw = this.state.ringItemRightRaw,
            specialPassive = [],
            base = [],
            style = [],
            itemsIconState = this.state.items,
            items = [],
            skillIconBaseUrl = this.state.skillIconLink,
            itemIconBaseUrl = this.state.itemIconLink;

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

        if (heroesState) {
            heroes.push(React.DOM.option({key: heroesState.key, value: '', style: {display: 'none'}}, 'select hero'));
            heroesState.forEach(function (heroName) {
                heroes.push(React.DOM.option({
                    key: heroesState.key,
                    value: heroName.id
                }, '[' + heroName.class + '] ' + heroName.name + ' (id: ' + heroName.id + ')'));
            });
        }

        if (nameState && classState && levelState) {
            base.push(React.DOM.div({key: nameState.key}, 'Name: ', nameState));
            base.push(React.DOM.div({key: classState.key}, 'Class: ', classState));
            base.push(React.DOM.div({key: levelState.key}, 'Level: ', levelState));
            if (paragonState) {
                base.push(React.DOM.div({key: paragonState.key}, 'Paragon: ', paragonState));
            }
        }

        if (skillsState !== []) {
            skillsState.forEach(function (skillName) {
                var constructedLink,
                    runeType;
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
                    var constructedLink = skillIconBaseUrl.concat(passiveName.skill.icon);
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
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.head.icon, '.png');

            helmet.push(React.DOM.li({key: helmState.key, className: 'name'}, itemsState.head.name));

            if (helmState.primary) {
                helmState.primary.forEach(function (primaryStat) {
                    helmet.push(React.DOM.li({key: helmState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (helmState.secondary) {
                helmState.secondary.forEach(function (secondaryStat) {
                    helmet.push(React.DOM.li({key: helmState.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (helmState.passive) {
                helmState.passive.forEach(function (passiveStat) {
                    helmet.push(React.DOM.li({key: helmState.key, className: 'passive'}, passiveStat.text));
                });
            }

            if (helmStateRaw.Sockets && helmGem[0]) {
                var gemLink = itemIconBaseUrl.concat(helmGem[0].item.icon, '.png');
                helmet.push(React.DOM.li({
                    key: helmState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                if (helmGem[0].attributes.primary) {
                    helmGem[0].attributes.primary.forEach(function (Stat) {
                        helmet.push(React.DOM.li({key: helmState.key, className: 'gem-passive'}, Stat.text));
                    });
                }

                if (helmGem[0].attributes.secondary) {
                    helmGem[0].attributes.secondary.forEach(function (Stat) {
                        helmet.push(React.DOM.li({key: helmState.key, className: 'gem-passive'}, Stat.text));
                    });
                }
            }
            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'head',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: helmState.key, className: 'desc'}, React.DOM.ul({
                    key: helmState.key,
                    className: 'stats'
                }, helmet)
            )));
        }

        if (itemsIconState.hands && torsoState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.torso.icon, '.png');
            torso.push(React.DOM.li({key: torsoState.key, className: 'name'}, itemsState.torso.name));

            if (torsoState.primary) {
                torsoState.primary.forEach(function (primaryStat) {
                    torso.push(React.DOM.li({key: torsoState.key, className: 'primary'}, primaryStat.text));
                });
            }

            if (torsoState.secondary) {
                torsoState.secondary.forEach(function (secondaryStat) {
                    torso.push(React.DOM.li({key: torsoState.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (torsoState.passive) {
                torsoState.passive.forEach(function (passiveStat) {
                    torso.push(React.DOM.li({key: torsoState.key, className: 'passive'}, passiveStat.text));
                });
            }


            if (torsoStateRaw.Sockets && torsoGem[0]) {
                var gemLink = itemIconBaseUrl.concat(torsoGem[0].item.icon, '.png');
                torso.push(React.DOM.li({
                    key: torsoState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
                torso.push(React.DOM.li({
                    key: torsoState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
                torso.push(React.DOM.li({
                    key: torsoState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                if (torsoGem[0].attributes.primary) {
                    torsoGem[0].attributes.primary.forEach(function (Stat) {
                        torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                        torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                        torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                    });
                }
                
            } else if (torsoStateRaw.Sockets) {
                torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
                torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
                torso.push(React.DOM.li({key: torsoState.key, className: 'socket'}));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'torso',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: torsoState.key, className: 'desc'}, React.DOM.ul({
                    key: torsoState.key,
                    className: 'stats'
                }, torso)
            )));
        }

        if (itemsIconState.hands && handsState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.hands.icon, '.png');
            hands.push(React.DOM.li({key: handsState.key, className: 'name'}, itemsState.hands.name));
            if (handsState.primary) {
                handsState.primary.forEach(function (primaryStat) {
                    hands.push(React.DOM.li({key: handsState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (handsState.secondary) {
                handsState.secondary.forEach(function (secondaryStat) {
                    hands.push(React.DOM.li({key: handsState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (handsState.passive) {
                handsState.passive.forEach(function (passiveStat) {
                    hands.push(React.DOM.li({key: handsState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'hands',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: handsState.key, className: 'desc'}, React.DOM.ul({
                    key: handsState.key,
                    className: 'stats'
                }, hands)
            )));
        }

        if (itemsIconState.feet && feetState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.feet.icon, '.png');

            feet.push(React.DOM.li({key: feetState.key, className: 'name'}, itemsState.feet.name));

            if (feetState.primary) {
                feetState.primary.forEach(function (primaryStat) {
                    feet.push(React.DOM.li({key: feetState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (feetState.secondary) {
                feetState.secondary.forEach(function (secondaryStat) {
                    feet.push(React.DOM.li({key: feetState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (feetState.passive) {
                feetState.passive.forEach(function (passiveStat) {
                    feet.push(React.DOM.li({key: feetState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'feet',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: feetState.key, className: 'desc'}, React.DOM.ul({
                    key: feetState.key,
                    className: 'stats'
                }, feet)
            )));
        }

        if (itemsIconState.shoulders && shouldersState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.shoulders.icon, '.png');

            shoulders.push(React.DOM.li({key: shouldersState.key, className: 'name'}, itemsState.shoulders.name));

            if (shouldersState.primary) {
                shouldersState.primary.forEach(function (primaryStat) {
                    shoulders.push(React.DOM.li({key: shouldersState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (shouldersState.secondary) {
                shouldersState.secondary.forEach(function (secondaryStat) {
                    shoulders.push(React.DOM.li({key: shouldersState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (shouldersState.passive) {
                shouldersState.passive.forEach(function (passiveStat) {
                    shoulders.push(React.DOM.li({key: shouldersState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'shoulders',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: shouldersState.key, className: 'desc'}, React.DOM.ul({
                    key: shouldersState.key,
                    className: 'stats'
                }, shoulders)
            )));
        }

        if (itemsIconState.legs && legsState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.legs.icon, '.png');

            legs.push(React.DOM.li({key: legsState.key, className: 'name'}, itemsState.legs.name));

            if (legsState.primary) {
                legsState.primary.forEach(function (primaryStat) {
                    legs.push(React.DOM.li({key: legsState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (legsState.secondary) {
                legsState.secondary.forEach(function (secondaryStat) {
                    legs.push(React.DOM.li({key: legsState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (legsState.passive) {
                legsState.passive.forEach(function (passiveStat) {
                    legs.push(React.DOM.li({key: legsState.key, className: 'passive'}, passiveStat.text));
                });
            }

            if (legsStateRaw.Sockets && legsGem[0]) {
                var gemLink = itemIconBaseUrl.concat(legsGem[0].item.icon, '.png');
                legs.push(React.DOM.li({
                    key: legsState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
                legs.push(React.DOM.li({
                    key: legsState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                if (legsGem[0].attributes.primary) {
                    legsGem[0].attributes.primary.forEach(function (Stat) {
                        legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                        legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                    });
                }
                
            } else if (legsStateRaw.Sockets) {
                legs.push(React.DOM.li({key: legsState.key, className: 'socket'}));
                legs.push(React.DOM.li({key: legsState.key, className: 'socket'}));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'legs',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: legsState.key, className: 'desc'}, React.DOM.ul({
                    key: legsState.key,
                    className: 'stats'
                }, legs)
            )));
        }

        if (itemsIconState.bracers && bracersState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.bracers.icon, '.png');

            bracers.push(React.DOM.li({key: bracersState.key, className: 'name'}, itemsState.bracers.name));

            if (bracersState.primary) {
                bracersState.primary.forEach(function (primaryStat) {
                    bracers.push(React.DOM.li({key: bracersState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (bracersState.secondary) {
                bracersState.secondary.forEach(function (secondaryStat) {
                    bracers.push(React.DOM.li({key: bracersState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (bracersState.passive) {
                bracersState.passive.forEach(function (passiveStat) {
                    bracers.push(React.DOM.li({key: bracersState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'bracers',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: bracersState.key, className: 'desc'}, React.DOM.ul({
                    key: bracersState.key,
                    className: 'stats'
                }, bracers)
            )));
        }

        if (itemsIconState.mainHand && mainHandState && mainHandDps) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.mainHand.icon, '.png');

            mainHand.push(React.DOM.li({key: mainHandState.key, className: 'name'}, itemsState.mainHand.name));

            if (mainHandDps.max) {
                mainHand.push(React.DOM.li({key: mainHandState.key, className: 'dps'}, mainHandDps.max.toString().substring(0,8) + ' DPS'));
            }

            if (mainHandState.primary) {
                mainHandState.primary.forEach(function (primaryStat) {
                    mainHand.push(React.DOM.li({key: mainHandState.key, className: 'primary'}, primaryStat.text));
                });
            }

            if (mainHandState.secondary) {
                mainHandState.secondary.forEach(function (secondaryStat) {
                    mainHand.push(React.DOM.li({key: mainHandState.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (mainHandState.passive) {
                mainHandState.passive.forEach(function (passiveStat) {
                    mainHand.push(React.DOM.li({key: mainHandState.key, className: 'passive'}, passiveStat.text));
                });
            }

            if (mainHandStateRaw.Sockets && mainHandGem[0]) {
                var gemLink = itemIconBaseUrl.concat(mainHandGem[0].item.icon, '.png');
                mainHand.push(React.DOM.li({
                    key: mainHandState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
            } else if (mainHandStateRaw.Sockets) {
                mainHand.push(React.DOM.li({key: mainHandState.key, className: 'socket'}));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'mainHand',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: mainHandState.key, className: 'desc'}, React.DOM.ul({
                    key: mainHandState.key,
                    className: 'stats'
                }, mainHand)
            )));
        }

        if (itemsIconState.offHand && offHandState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.offHand.icon, '.png');

            offHand.push(React.DOM.li({key: offHandState.key, className: 'name'}, itemsState.offHand.name));

            if (offHandState.primary) {
                offHandState.primary.forEach(function (primaryStat) {
                    offHand.push(React.DOM.li({key: offHandState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (offHandState.secondary) {
                offHandState.secondary.forEach(function (secondaryStat) {
                    offHand.push(React.DOM.li({key: offHandState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (offHandState.passive) {
                offHandState.passive.forEach(function (passiveStat) {
                    offHand.push(React.DOM.li({key: offHandState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'offHand',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: offHandState.key, className: 'desc'}, React.DOM.ul({
                    key: offHandState.key,
                    className: 'stats'
                }, offHand)
            )));
        }

        if (itemsIconState.waist && beltState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.waist.icon, '.png');

            belt.push(React.DOM.li({key: beltState.key, className: 'name'}, itemsState.waist.name));

            if (beltState.primary) {
                beltState.primary.forEach(function (primaryStat) {
                    belt.push(React.DOM.li({key: beltState.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (beltState.secondary) {
                beltState.secondary.forEach(function (secondaryStat) {
                    belt.push(React.DOM.li({key: beltState.key, className: 'secondary'}, secondaryStat.text));
                });
            }
            if (beltState.passive) {
                beltState.passive.forEach(function (passiveStat) {
                    belt.push(React.DOM.li({key: beltState.key, className: 'passive'}, passiveStat.text));
                });
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'waist',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: beltState.key, className: 'desc'}, React.DOM.ul({
                    key: beltState.key,
                    className: 'stats'
                }, belt)
            )));
        }

        if (itemsIconState.rightFinger && ringStateRight) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.rightFinger.icon, '.png');

            ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'name'}, itemsState.rightFinger.name));

            if (ringStateRight.primary) {
                ringStateRight.primary.forEach(function (primaryStat) {
                    ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'primary'}, primaryStat.text));
                });
            }

            if (ringStateRight.secondary) {
                ringStateRight.secondary.forEach(function (secondaryStat) {
                    ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (ringStateRight.passive) {
                ringStateRight.passive.forEach(function (passiveStat) {
                    ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'passive'}, passiveStat.text));
                });
            }


            if (ringRightRaw && ringRightRaw.Sockets && ringRightGem[0]) {
                var gemLink = itemIconBaseUrl.concat(ringRightGem[0].item.icon, '.png');
                ringRight.push(React.DOM.li({
                    key: ringStateRight.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                ringRightGem[0].attributes.passive.forEach(function (passiveStat) {
                    ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'gem-passive unique'}, passiveStat.text));
                });

                ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'gem-level'}, ringRightGem[0].attributesRaw.Jewel_Rank.min));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'rightFinger',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: ringStateRight.key, className: 'desc'}, React.DOM.ul({
                    key: ringStateRight.key,
                    className: 'stats'
                }, ringRight)
            )));
        }

        if (itemsIconState.leftFinger && ringStateLeft) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.leftFinger.icon, '.png');

            ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'name'}, itemsState.leftFinger.name));

            if (ringStateLeft.primary) {
                ringStateLeft.primary.forEach(function (primaryStat) {
                    ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'primary'}, primaryStat.text));
                });
            }
            if (ringStateLeft.secondary) {
                ringStateLeft.secondary.forEach(function (secondaryStat) {
                    ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (ringStateLeft.passive) {
                ringStateLeft.passive.forEach(function (passiveStat) {
                    ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'passive'}, passiveStat.text));
                });
            }

            if (ringLeftRaw && ringLeftRaw.Sockets && ringLeftGem[0]) {
                var gemLink = itemIconBaseUrl.concat(ringLeftGem[0].item.icon, '.png');
                ringLeft.push(React.DOM.li({
                    key: ringStateLeft.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
                ringLeftGem[0].attributes.passive.forEach(function (passiveStat) {
                    ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'gem-passive unique'}, passiveStat.text));
                });

                ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'gem-level'}, ringLeftGem[0].attributesRaw.Jewel_Rank.min));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'leftFinger',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: ringStateLeft.key, className: 'desc'}, React.DOM.ul({
                    key: ringStateLeft.key,
                    className: 'stats'
                }, ringLeft)
            )));
        }

        if (itemsIconState.neck && neckState) {
            var constructedLink = itemIconBaseUrl.concat(itemsIconState.neck.icon, '.png');

            neck.push(React.DOM.li({key: neckState.key, className: 'name'}, itemsState.neck.name));

            if (neckState.primary) {
                neckState.primary.forEach(function (primaryStat) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'primary'}, primaryStat.text));
                });
            }

            if (neckState.secondary) {
                neckState.secondary.forEach(function (secondaryStat) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'secondary'}, secondaryStat.text));
                });
            }

            if (neckState.passive) {
                neckState.passive.forEach(function (passiveStat) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'passive'}, passiveStat.text));
                });
            }

            if (neckState && neckStateRaw.Sockets && neckGem[0]) {
                var gemLink = itemIconBaseUrl.concat(neckGem[0].item.icon, '.png');
                neck.push(React.DOM.li({
                    key: neckState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                neckGem[0].attributes.passive.forEach(function (passiveStat) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'gem-passive unique'}, passiveStat.text));
                });

                neck.push(React.DOM.li({key: neckState.key, className: 'gem-level'}, neckGem[0].attributesRaw.Jewel_Rank.min));

            } else if (neckStateRaw.Sockets) {
                neck.push(React.DOM.li({key: neckState.key, className: 'socket'}));
            }

            items.push(React.DOM.div({
                key: itemsIconState.key,
                className: 'neck',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: neckState.key, className: 'desc'}, React.DOM.ul({
                    key: neckState.key,
                    className: 'stats'
                }, neck)
            )));
        }

        if (amuletState && itemsState) {
            if (amuletState.passive && itemsState.neck && itemsState.neck.name === 'Hellfire Amulet') {
                var hellfirePassiveLink = amuletState.passive[0].text.substring(9).replace(' passive.', '').replace(/ /g, '').toLowerCase(),
                    hellfirePassiveDisplay = amuletState.passive[0].text.substring(9).replace(' passive.', ''),
                    constructedLink;

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

            } else if (classState === 'witch-doctor' || classState === 'wizard') {
                stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));

            } else if (classState === 'barbarian' || classState === 'crusader') {
                stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
            }
            stats.push(React.DOM.div({key: statsState.key}, 'Vitality: ', statsState.vitality.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
        }

        return (
            React.DOM.div({className: 'd3-container'},
                React.DOM.div({className: 'd3-char-bg', style: style}),
                React.DOM.div({className: 'd3-item-wrapper'}, items),
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
                React.DOM.div({className: 'panel-left'}, 'General', base),
                React.DOM.div({className: 'panel-bottom-left'}, 'Skills', skills),
                React.DOM.div({className: 'panel-bottom-right'}, 'Passives', passives, specialPassive),
                React.DOM.div({className: 'panel-right'}, 'Stats', stats)
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
// find out how animations triggers work
// correct stats
// <script src="http://us.battle.net/d3/static/js/tooltips.js"></script>
// https://eu.api.battle.net/d3/data/item/CmII7uHdNRIHCAQVtjA30B0yicdaHYQDodYdYJ4mRx29VYTTHT_yCdgdB16d0zCLGjiaA0AASANQElgEYJoDgAFGjQGfRZt_pQG9VYTTrQHegvzltQGgRZt_uAG6wuKqC8ABEhiTvcb8BVAAWAKgAdWb4uwOoAGVnfLhDqABk73G_AWgAcyPgPcBoAG-wY2rDw?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm
// http://media.blizzard.com/d3/icons/items/large/unique_chest_set_07_x1_demonhunter_male.png
