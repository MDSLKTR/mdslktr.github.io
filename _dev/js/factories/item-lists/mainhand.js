var MainHand = React.createClass({
    statics: {
        idList: [
            'Polearm',
            'Crossbow',
            'Dagger',
            'Sword',
            'Sword2H',
            'Mace',
            'Axe',
            'FistWeapon',
            'CeremonialKnife',
            'MightyWeapon1H',
            'Flail2H',
            'Flail1H',
            'HandXbow',
            'Bow2H',
            'Bow',
            'Wand',
            'Staff',
            'Staff2H',
            'CeremonialDagger',
            'MightyWeapon2H',
            'Mace2H'
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