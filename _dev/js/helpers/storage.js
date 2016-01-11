var storage = React.createClass( {
    statics: {
        get: function( key ) {
            return localStorage.getItem( key );
        },

        save: function( key, value ) {
            localStorage.setItem( key, value );
        }
    },

    render: function() {}
} );
