var itemClass = React.createClass({
    loadItemData: function (itemKey) {
        var self = this,
            type = 'item-data';

        service.create(type, this.state.realm, this.state.battleTag, itemKey).then(function (url) {
            service.get(url).then(function (response) {
                var data = JSON.parse(response);

                if (self.state.debugMode) {
                    console.log(data);
                }

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
                        self.setState({helmItem: data});
                        break;
                    case 'GenericShoulders':
                    case 'Shoulders':
                    case 'Shoulders_Barbarian':
                    case 'Shoulders_DemonHunter':
                    case 'Shoulders_WitchDoctor':
                    case 'Shoulders_Crusader':
                    case 'Shoulders_Wizard':
                    case 'Shoulders_Monk':
                        self.setState({shouldersItem: data});
                        break;
                    case 'Bracers':
                        self.setState({bracersItem: data});
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
                        self.setState({chestItem: data});
                        break;
                    case 'GenericLegs':
                    case 'Legs':
                    case 'Legs_Barbarian':
                    case 'Legs_DemonHunter':
                    case 'Legs_WitchDoctor':
                    case 'Legs_Crusader':
                    case 'Legs_Wizard':
                    case 'Legs_Monk':
                        self.setState({legsItem: data});
                        break;
                    case 'GenericBoots':
                    case 'Boots':
                    case 'Boots_Barbarian':
                    case 'Boots_DemonHunter':
                    case 'Boots_WitchDoctor':
                    case 'Boots_Crusader':
                    case 'Boots_Wizard':
                    case 'Boots_Monk':
                        self.setState({bootsItem: data});
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
                        self.setState({mainItem: data});
                        break;
                    case 'GenericGloves':
                    case 'Gloves':
                    case 'Gloves_Barbarian':
                    case 'Gloves_DemonHunter':
                    case 'Gloves_WitchDoctor':
                    case 'Gloves_Crusader':
                    case 'Gloves_Wizard':
                    case 'Gloves_Monk':
                        self.setState({glovesItem: data});
                        break;
                    case 'Belt':
                    case 'GenericBelt':
                    case 'Belt_Barbarian':
                        self.setState({beltItem: data});
                        break;
                    case 'Amulet':
                        self.setState({amuletItem: data});
                        break;
                }
            });
        });
    },

    render: function () {}
});

var item = React.createFactory(itemClass);
