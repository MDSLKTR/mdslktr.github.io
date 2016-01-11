var Shoulders = React.createClass( {
    statics: {
        idList: [
            'GenericShoulders',
            'Shoulders',
            'Shoulders_Barbarian',
            'Shoulders_DemonHunter',
            'Shoulders_WitchDoctor',
            'Shoulders_Crusader',
            'Shoulders_Wizard',
            'Shoulders_Monk'
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

    render: function() {
    }
} );
