var heroClass = React.createClass({
    displayName: 'hero-component',
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
            service.create(type, realm, tag, id).then(function (url) {
                service.get(url).then(function (response) {
                    var data = JSON.parse(response);

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
                        primaryStats: data.stats,
                        kanai: data.legendaryPowers
                    }, function () {
                        EventSystem.publish('api.call.stats', {
                            general: this.state.generalStats,
                            primary: this.state.primaryStats
                        });
                        EventSystem.publish('api.call.kanai', this.state.kanai);
                        EventSystem.publish('api.call.items', {
                            items: this.state.items,
                            count: this.state.items ? Object.keys(this.state.items).length : 0
                        });
                        this.requestItemData();
                    });

                    if (data.skills) {
                        self.setState({
                            skills: data.skills.active,
                            passives: data.skills.passive
                        }, function () {
                            EventSystem.publish('api.call.skills', {
                                actives: this.state.skills,
                                passives: this.state.passives
                            });
                        });
                    }
                });
            });
        }
    },

    requestItemData: function () {
        var itemData,
            addParams = {
            leftFinger: 'left',
            rightFinger: 'right',
            offHand: 'offhand'
        };

        for (var item in this.state.items) {
            if (this.state.items.hasOwnProperty(item)) {
                if (addParams.hasOwnProperty(item)) {
                    itemData = {
                        url: this.state.items[item].tooltipParams,
                        param: addParams[item]
                    };
                    EventSystem.publish('api.call.item-with-props', itemData);
                } else {
                    itemData = this.state.items[item].tooltipParams;
                    EventSystem.publish('api.call.item', itemData);
                }
            }
        }
    },

    render: function () {
        return (
            React.DOM.div({className: ''},
                primaryStats(),
                generalStats(),
                offensiveStats(),
                defensiveStats(),
                skills(),
                passives(),
                kanai()
            )
        );
    }
});

var hero = React.createFactory(heroClass);
