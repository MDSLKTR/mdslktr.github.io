var Belt = React.createClass( {
    statics: {
        idList: [
            'Belt',
            'GenericBelt',
            'Belt_Barbarian'
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
