var Legs = React.createClass({
    statics: {
        idList: [
            'GenericLegs',
            'Legs',
            'Legs_Barbarian',
            'Legs_DemonHunter',
            'Legs_WitchDoctor',
            'Legs_Crusader',
            'Legs_Wizard',
            'Legs_Monk'
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
