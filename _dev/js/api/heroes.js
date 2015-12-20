var heroesClass = React.createClass({
    loadHeroesList: function (tag, realm, debugMode) {
        var self = this,
            type = 'heroes-list';
        if (tag) {
            service.create(type, realm, tag).then(function (url) {
                service.get(url).then(function (response) {
                    var data = JSON.parse(response);

                    if (debugMode) {
                        console.log(data);
                    }

                    self.setState({
                        heroes: data
                    });
                });
            });
        }
    },

    componentDidMount: function () {
        this.loadHeroesList();
    },

    render: function () {
        return (
            React.DOM.div({className: 'd3-realm-wrapper'})
        );
    }
});

var heroes1 = React.createFactory(heroesClass);
