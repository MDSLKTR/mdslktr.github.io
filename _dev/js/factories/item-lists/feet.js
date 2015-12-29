var Feet = React.createClass({
    statics: {
        idList: [
            'GenericBoots',
            'Boots',
            'Boots_Barbarian',
            'Boots_DemonHunter',
            'Boots_WitchDoctor',
            'Boots_Crusader',
            'Boots_Wizard',
            'Boots_Monk'
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