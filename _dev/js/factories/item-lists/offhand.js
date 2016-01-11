var OffHand = React.createClass( {
    statics: {
        idList: [
            'Quiver',
            'CrusaderShield',
            'Shield',
            'Orb',
            'Source',
            'Mojo',
            'Dagger',
            'Sword',
            'Mace',
            'Axe',
            'FistWeapon',
            'MightyWeapon1H',
            'Flail1H',
            'HandXbow',
            'Bow',
            'Wand',
            'Staff'
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
