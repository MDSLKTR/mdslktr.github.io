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

            polling: true,
            url: '',
            itemUrl: '',
            battleTag: localStorage.getItem('battleTag'),
            apiKey: '?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm',
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
                        this.setState({helmItem: data});
                        break;
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
                    case 'ChestArmor_Barbarian':
                    case 'ChestArmor_DemonHunter':
                    case 'ChestArmor_WitchDoctor':
                    case 'ChestArmor_Crusader':
                    case 'ChestArmor_Wizard':
                    case 'ChestArmor_Monk':
                        this.setState({chestItem: data});
                        break;
                    case 'Legs':
                    case 'Legs_Barbarian':
                    case 'Legs_DemonHunter':
                    case 'Legs_WitchDoctor':
                    case 'Legs_Crusader':
                    case 'Legs_Wizard':
                    case 'Legs_Monk':
                        this.setState({legsItem: data});
                        break;
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
                    case 'Flail':
                    case 'HandXbow':
                    case 'Bow2H':
                    case 'Bow':
                    case 'Wand':
                    case 'Staff':
                    case 'Staff2H':
                        this.setState({mainItem: data});
                        break;
                    case 'Quiver':
                    case 'CrusaderShield':
                    case 'Shield':
                    case 'Source':
                    case 'Mojo':
                        this.setState({offItem: data});
                        break;
                    case 'Gloves':
                    case 'Gloves_Barbarian':
                    case 'Gloves_DemonHunter':
                    case 'Gloves_WitchDoctor':
                    case 'Gloves_Crusader':
                    case 'Gloves_Wizard':
                    case 'Gloves_Monk':
                        this.setState({glovesItem: data});
                        break;
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
            gemLink;

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

            helmet.push(React.DOM.li({key: helmState.key, className: 'name'}, itemsState.head.name));

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
                className: 'head',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: helmState.key, className: 'desc'}, React.DOM.ul({
                    key: helmState.key,
                    className: 'stats'
                }, helmet)
            )));
        }

        if (itemsIconState.torso && torsoState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.torso.icon, '.png');
            torso.push(React.DOM.li({key: torsoState.key, className: 'name'}, itemsState.torso.name));

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

                if (torsoState.gems[0].attributes.primary) {
                    torsoState.gems[0].attributes.primary.forEach(function (Stat) {
                        torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
                        torso.push(React.DOM.li({key: torsoState.key, className: 'gem-passive'}, Stat.text));
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
                className: 'torso',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: torsoState.key, className: 'desc'}, React.DOM.ul({
                    key: torsoState.key,
                    className: 'stats'
                }, torso)
            )));
        }

        if (itemsIconState.hands && handsState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.hands.icon, '.png');
            hands.push(React.DOM.li({key: handsState.key, className: 'name'}, itemsState.hands.name));

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
                className: 'hands',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: handsState.key, className: 'desc'}, React.DOM.ul({
                    key: handsState.key,
                    className: 'stats'
                }, hands)
            )));
        }

        if (itemsIconState.feet && feetState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.feet.icon, '.png');

            feet.push(React.DOM.li({key: feetState.key, className: 'name'}, itemsState.feet.name));

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
                className: 'feet',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: feetState.key, className: 'desc'}, React.DOM.ul({
                    key: feetState.key,
                    className: 'stats'
                }, feet)
            )));
        }

        if (itemsIconState.shoulders && shouldersState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.shoulders.icon, '.png');

            shoulders.push(React.DOM.li({key: shouldersState.key, className: 'name'}, itemsState.shoulders.name));

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
                className: 'shoulders',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: shouldersState.key, className: 'desc'}, React.DOM.ul({
                    key: shouldersState.key,
                    className: 'stats'
                }, shoulders)
            )));
        }

        if (itemsIconState.legs && legsState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.legs.icon, '.png');

            legs.push(React.DOM.li({key: legsState.key, className: 'name'}, itemsState.legs.name));
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

                if (legsState.gems[0].attributes.primary) {
                    legsState.gems[0].attributes.primary.forEach(function (Stat) {
                        legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                        legs.push(React.DOM.li({key: legsState.key, className: 'gem-passive'}, Stat.text));
                    });
                }

            } else if (legsState.attributesRaw && legsState.attributesRaw.Sockets) {
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
            constructedLink = itemIconBaseUrl.concat(itemsIconState.bracers.icon, '.png');

            bracers.push(React.DOM.li({key: bracersState.key, className: 'name'}, itemsState.bracers.name));

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
                className: 'bracers',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: bracersState.key, className: 'desc'}, React.DOM.ul({
                    key: bracersState.key,
                    className: 'stats'
                }, bracers)
            )));
        }

        if (itemsIconState.mainHand && mainHandState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.mainHand.icon, '.png');

            mainHand.push(React.DOM.li({key: mainHandState.key, className: 'name'}, itemsState.mainHand.name));

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
            } else if (mainHandState.attributesRaw && mainHandState.attributesRaw.Sockets) {
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
            constructedLink = itemIconBaseUrl.concat(itemsIconState.offHand.icon, '.png');

            offHand.push(React.DOM.li({key: offHandState.key, className: 'name'}, itemsState.offHand.name));

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
                className: 'offHand',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: offHandState.key, className: 'desc'}, React.DOM.ul({
                    key: offHandState.key,
                    className: 'stats'
                }, offHand)
            )));
        }

        if (itemsIconState.waist && beltState) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.waist.icon, '.png');

            belt.push(React.DOM.li({key: beltState.key, className: 'name'}, itemsState.waist.name));

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
                className: 'waist',
                style: {backgroundImage: 'url(' + constructedLink + ')'}
            }, React.DOM.div({key: beltState.key, className: 'desc'}, React.DOM.ul({
                    key: beltState.key,
                    className: 'stats'
                }, belt)
            )));
        }

        if (itemsIconState.rightFinger && ringStateRight) {
            constructedLink = itemIconBaseUrl.concat(itemsIconState.rightFinger.icon, '.png');

            ringRight.push(React.DOM.li({key: ringStateRight.key, className: 'name'}, itemsState.rightFinger.name));

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
                }));

                ringStateRight.gems[0].attributes.passive.forEach(function (passiveStat) {
                    ringRight.push(React.DOM.li({
                        key: ringStateRight.key,
                        className: 'gem-passive unique'
                    }, passiveStat.text));
                });

                ringRight.push(React.DOM.li({
                    key: ringStateRight.key,
                    className: 'gem-level'
                }, ringStateRight.gems[0].attributesRaw.Jewel_Rank.min));
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
            constructedLink = itemIconBaseUrl.concat(itemsIconState.leftFinger.icon, '.png');

            ringLeft.push(React.DOM.li({key: ringStateLeft.key, className: 'name'}, itemsState.leftFinger.name));

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
                }
            }

            if (ringStateLeft.attributesRaw && ringStateLeft.attributesRaw.Sockets && ringStateLeft.gems[0]) {
                gemLink = itemIconBaseUrl.concat(ringStateLeft.gems[0].item.icon, '.png');
                ringLeft.push(React.DOM.li({
                    key: ringStateLeft.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));
                ringStateLeft.gems[0].attributes.passive.forEach(function (passiveStat) {
                    ringLeft.push(React.DOM.li({
                        key: ringStateLeft.key,
                        className: 'gem-passive unique'
                    }, passiveStat.text));
                });

                ringLeft.push(React.DOM.li({
                    key: ringStateLeft.key,
                    className: 'gem-level'
                }, ringStateLeft.gems[0].attributesRaw.Jewel_Rank.min));
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
            constructedLink = itemIconBaseUrl.concat(itemsIconState.neck.icon, '.png');

            neck.push(React.DOM.li({key: neckState.key, className: 'name'}, itemsState.neck.name));

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
                gemLink = itemIconBaseUrl.concat(neckGem[0].item.icon, '.png');
                neck.push(React.DOM.li({
                    key: neckState.key,
                    className: 'socket',
                    style: {backgroundImage: 'url(' + gemLink + ')'}
                }));

                neckState.gems[0].attributes.passive.forEach(function (passiveStat) {
                    neck.push(React.DOM.li({key: neckState.key, className: 'gem-passive unique'}, passiveStat.text));
                });

                neck.push(React.DOM.li({
                    key: neckState.key,
                    className: 'gem-level'
                }, neckState.gems[0].attributesRaw.Jewel_Rank.min));

            } else if (neckState.attributesRaw && neckState.attributesRaw.Sockets) {
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
                    hellfirePassiveDisplay = amuletState.passive[0].text.substring(9).replace(' passive.', '');

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
                React.DOM.div({id: 'panel-left'}, 'General', base),
                React.DOM.div({id: 'panel-bottom-left'}, 'Skills', skills),
                React.DOM.div({id: 'panel-bottom-right'}, 'Passives', passives, specialPassive),
                React.DOM.div({id: 'panel-right'}, 'Stats', stats)
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
