var itemsClass = React.createClass({
    displayName: 'items-component',
    getInitialState: function () {
        return {
            itemIconBase: 'http://media.blizzard.com/d3/icons/items/large/',
            itemsLoaded: 0,
            itemCollection: [],
            setRing: false
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.heroes', function (data) {
            self.setState({
                battleTag: data.tag,
                realm: data.realm
            });
        });

        EventSystem.subscribe('api.clear.items', function () {
            self.setState({
                itemCollection: [],
                itemsLoaded: 0
            });
        });

        EventSystem.subscribe('api.call.items', function (data) {
            self.setState({
                items: data
            }, function () {
                for (var item in this.state.items) {
                    if (this.state.items.hasOwnProperty(item)) {
                        if (this.state.items[item].name === 'Ring of Royal Grandeur') {
                            this.setState({
                                setRing: true
                            }, function () {
                                EventSystem.publish('api.call.item.set-ring', this.state.setRing);
                            });
                        }
                    }
                }
            });
        });

        EventSystem.subscribe('api.call.item', function (data) {
            self.loadItemData(data);
        });

        EventSystem.subscribe('api.call.item-with-props', function (data) {
            self.loadItemDataWithProps(data.url, data.param);
        });
    },
    loadItemData: function (itemKey) {
        var self = this,
            type = 'item-data';

        service.create(type, this.state.realm, this.state.battleTag, itemKey).then(function (url) {
            service.get(url).then(function (response) {
                var data = JSON.parse(response);

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
                        self.setState({helmItem: data}, function () {
                            self.state.itemCollection.push(self.state.helmItem);
                        });
                        break;
                    case 'GenericShoulders':
                    case 'Shoulders':
                    case 'Shoulders_Barbarian':
                    case 'Shoulders_DemonHunter':
                    case 'Shoulders_WitchDoctor':
                    case 'Shoulders_Crusader':
                    case 'Shoulders_Wizard':
                    case 'Shoulders_Monk':
                        self.setState({shouldersItem: data}, function () {
                            self.state.itemCollection.push(self.state.shouldersItem);
                        });
                        break;
                    case 'Bracers':
                        self.setState({bracersItem: data}, function () {
                            self.state.itemCollection.push(self.state.bracersItem);
                        });
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
                        self.setState({chestItem: data}, function () {
                            self.state.itemCollection.push(self.state.chestItem);
                        });
                        break;
                    case 'GenericLegs':
                    case 'Legs':
                    case 'Legs_Barbarian':
                    case 'Legs_DemonHunter':
                    case 'Legs_WitchDoctor':
                    case 'Legs_Crusader':
                    case 'Legs_Wizard':
                    case 'Legs_Monk':
                        self.setState({legsItem: data}, function () {
                            self.state.itemCollection.push(self.state.legsItem);
                        });
                        break;
                    case 'GenericBoots':
                    case 'Boots':
                    case 'Boots_Barbarian':
                    case 'Boots_DemonHunter':
                    case 'Boots_WitchDoctor':
                    case 'Boots_Crusader':
                    case 'Boots_Wizard':
                    case 'Boots_Monk':
                        self.setState({bootsItem: data}, function () {
                            self.state.itemCollection.push(self.state.bootsItem);
                        });
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
                        self.setState({mainItem: data}, function () {
                            EventSystem.publish('api.call.item.mainhand', self.state.mainItem);
                            self.state.itemCollection.push(self.state.mainItem);
                        });
                        break;
                    case 'GenericGloves':
                    case 'Gloves':
                    case 'Gloves_Barbarian':
                    case 'Gloves_DemonHunter':
                    case 'Gloves_WitchDoctor':
                    case 'Gloves_Crusader':
                    case 'Gloves_Wizard':
                    case 'Gloves_Monk':
                        self.setState({glovesItem: data}, function () {
                            self.state.itemCollection.push(self.state.glovesItem);
                        });
                        break;
                    case 'Belt':
                    case 'GenericBelt':
                    case 'Belt_Barbarian':
                        self.setState({beltItem: data}, function () {
                            self.state.itemCollection.push(self.state.beltItem);
                        });
                        break;
                    case 'Amulet':
                        self.setState({amuletItem: data}, function () {
                            EventSystem.publish('api.call.item.amulet', self.state.amuletItem);
                            self.state.itemCollection.push(self.state.amuletItem);
                        });
                        break;
                    default:
                        console.warn('item category does not exist');
                }

                EventSystem.publish('api.call.item.collection', self.state.itemCollection);
                self.setState({
                    itemsLoaded: self.state.itemsLoaded + 1
                }, function () {
                    EventSystem.publish('api.try.collect', self.state.itemsLoaded);
                });
            });
        });
    },

    loadItemDataWithProps: function (itemKey, param) {
        var self = this,
            type = 'item-data';

        service.create(type, this.state.realm, this.state.battleTag, itemKey).then(function (url) {
            service.get(url).then(function (response) {
                var data = JSON.parse(response);

                switch (data.type.id) {
                    case 'Ring':
                        if (param === 'left') {
                            self.setState({ringItemLeft: data}, function () {
                                self.state.itemCollection.push(self.state.ringItemLeft);
                            });
                        } else {
                            self.setState({ringItemRight: data}, function () {
                                self.state.itemCollection.push(self.state.ringItemRight);
                            });
                        }
                        break;
                    case 'Quiver':
                    case 'CrusaderShield':
                    case 'Shield':
                    case 'Orb':
                    case 'Source':
                    case 'Mojo':
                        self.setState({offItem: data}, function () {
                            self.state.itemCollection.push(self.state.offItem);
                            EventSystem.publish('api.call.item.offhand', self.state.offItem);
                        });
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
                        self.setState({offItem: data}, function () {
                            self.state.itemCollection.push(self.state.offItem);
                            EventSystem.publish('api.call.item.offhand', self.state.offItem);
                        });
                        break;
                    default:
                        console.warn('item category does not exist');
                }

                EventSystem.publish('api.call.item.collection', self.state.itemCollection);
                self.setState({
                    itemsLoaded: self.state.itemsLoaded + 1
                }, function () {
                    EventSystem.publish('api.try.collect', self.state.itemsLoaded);
                });
            });
        });
    },

    render: function () {
        var shoulders = [],
            helmet = [],
            setPool = Sets.get(),
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
            weaponElementsMin = WeaponElementsMin.get(),
            weaponElementsDelta = WeaponElementsDelta.get(),
            DamagePercentAll = WeaponDamagePercentAll.get(),
            DamageBonusMinPhysical = WeaponDamageBonusMinPhysical.get(),
            i,
            k,
            m,
            items = [],
            minDmgCalc,
            maxDmgCalc,
            itemQuality,
            itemSetCount,
            isAncient,
            gemLink,
            constructedLink,
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
        };


        for (m = 0; m < setPool.length; m++) {
            setPool[m][1] = 0;
        }

        for (var itemIterator in itemCollection) {
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

        // Item Parser
        if (this.state.items) {
            for (var item in itemCollection) {
                if (itemCollection.hasOwnProperty(item)) {
                    if (this.state.items[item] && itemCollection[item].itemData) {
                        constructedLink = this.state.itemIconBase.concat(this.state.items[item].icon, '.png');

                        switch (this.state.items[item].displayColor) {
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
                                    gemLink = this.state.itemIconBase.concat(itemCollection[item].itemData.gems[0].item.icon, '.png');

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

        return (
            React.DOM.div({className: 'd3-item-wrapper'}, items)
        );
    }
});

var items = React.createFactory(itemsClass);
