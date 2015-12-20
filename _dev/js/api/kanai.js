var kanaiClass = React.createClass({
    loadKanaiItems: function (itemKey, index) {
        var self = this,
            type = 'item-data';

        if (this.state.cubeItems[index]) {
            // TODO Fix this better
            return;
        }

        service.create(type, this.state.realm, this.state.battleTag, itemKey).then(function (url) {
            service.get(url).then(function (response) {
                var data = JSON.parse(response);

                if (self.state.debugMode) {
                    console.log(data);
                }

                self.state.cubeItems[index] = data;
            });
        });
    },
    render: function () {}
});


var kanai = React.createFactory(kanaiClass);
