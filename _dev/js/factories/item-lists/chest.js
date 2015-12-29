var Chest = React.createClass({
    statics: {
        idList: [
            'ChestArmor',
            'GenericChestArmor',
            'ChestArmor_Barbarian',
            'ChestArmor_DemonHunter',
            'ChestArmor_WitchDoctor',
            'ChestArmor_Crusader',
            'ChestArmor_Wizard',
            'ChestArmor_Monk',
            'Cloak'
        ],
        test: function ( type ) {
            var result = false;
            this.idList.forEach(function ( listType ) {
                if ( type === listType ) {
                    result = true;
                }
            });

            return result;
        }
    },

    render: function () {}
});