var Hands = React.createClass( {
    statics: {
        idList: [
            'GenericGloves',
            'Gloves',
            'Gloves_Barbarian',
            'Gloves_DemonHunter',
            'Gloves_WitchDoctor',
            'Gloves_Crusader',
            'Gloves_Wizard',
            'Gloves_Monk'
        ],
        test: function( type ) {
            var result = false;
            this.idList.forEach( function( listType ) {
                if ( type === listType ) {
                    result = true;
                }
            } );

            return result;
        }
    },

    render: function() {}
} );
