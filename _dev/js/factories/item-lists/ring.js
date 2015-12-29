var Ring = React.createClass({
    statics: {
        idList: [
            'Ring'
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