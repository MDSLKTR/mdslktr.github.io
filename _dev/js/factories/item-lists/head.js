var Head = React.createClass({
    statics: {
        idList: [
            'GenericHelm',
            'Helm',
            'Helm_Barbarian',
            'Helm_DemonHunter',
            'Helm_WitchDoctor',
            'Helm_Crusader',
            'Helm_Wizard',
            'Helm_Monk',
            'VoodooMask',
            'SpiritStone_Monk'
        ],
        test: function (type) {
            var result = false;
            this.idList.forEach(function (listType) {
                if (type === listType) {
                    result = true;
                }
            });

            return result;
        }
    },

    render: function () {
    }
});