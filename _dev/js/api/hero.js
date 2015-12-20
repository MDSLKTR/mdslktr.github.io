var heroClass = React.createClass({
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.hero', function( data ) {
            self.setState({
                battleTag: data.tag,
                realm: data.realm,
                id: data.id
            }, function () {
                self.loadHeroData( self.state.battleTag, self.state.realm, self.state.id );
            });
        });
    },
    loadHeroData: function ( tag, realm, id ) {
        var self = this,
            type = 'hero-data';
        if (id) {
            service.create(type, tag, realm, id).then(function (url) {
                service.get(url).then(function (response) {
                    var data = JSON.parse(response);

                    if (self.state.debugMode) {
                        console.log(data);
                    }

                    self.setState({
                        generalStats: {
                            'name': {
                                name: 'Name',
                                value: data.name
                            },
                            'id': {
                                name: 'Id',
                                value: data.id
                            },
                            'class': {
                                name: 'Class',
                                value: data.class
                            },
                            'level': {
                                name: 'Level',
                                value: data.level
                            },
                            'paragonLevel': {
                                name: 'Paragon Level',
                                value: data.paragonLevel
                            },
                            'lastUpdated': {
                                name: 'Last updated on',
                                value: data['last-updated']
                            }
                        },
                        items: data.items,
                        stats: data.stats,
                        kanai: data.legendaryPowers
                    });

                    if (data.skills) {
                        self.setState({
                            skills: data.skills.active,
                            passives: data.skills.passive
                        });
                    }
                }).then(function () {
                    self.getItemData();
                });
            });
        }
    },

    render: function () {
        return (
            console.log(1)
        );
    }
});

var hero = React.createFactory(heroClass);
