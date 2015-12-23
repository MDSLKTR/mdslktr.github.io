var heroesClass = React.createClass({
    displayName: 'heroes-component',
    getInitialState: function () {
        return {
            heroesCollection: [],
            battleTag: '',
            realm: '',
            apiData: {
                tag: '',
                realm: '',
                id: ''
            }
        };
    },

    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.heroes', function( data ) {
            self.setState({
                battleTag: data.tag,
                realm: data.realm
            }, function () {
                self.loadHeroesList( self.state.battleTag, self.state.realm );
            });
        });
    },

    loadHeroesList: function (tag, realm) {
        var self = this,
            type = 'heroes-list';

        if (tag) {
            service.create(type, realm, tag).then(function (url) {
                service.get(url).then(function (response) {
                    var data = JSON.parse(response);

                    self.setState({
                        heroesData: data
                    });
                });
            });
        }
    },

    setCharacterSelect: function (e) {
        this.setState({
            apiData: {
                tag: this.state.battleTag,
                realm: this.state.realm,
                id: e.target.value
            }
        }, function () {
            EventSystem.publish('api.call.hero', this.state.apiData);
        });

        EventSystem.publish('api.clear.item-collection');
        EventSystem.publish('api.clear.item');
    },


    render: function () {
        var heroesCollection = [],
            heroesData = this.state.heroesData;

        if (heroesData) {
            if (heroesData.heroes) {
                heroesCollection.push(React.DOM.option({
                    key: 'heroes-list',
                    value: '',
                    style: {display: 'none'}
                }, 'click to select hero'));
                heroesData.heroes.forEach(function (heroName) {
                    heroesCollection.push(React.DOM.option({
                        key: 'heroes-list' + heroName.id,
                        value: heroName.id
                    }, '[' + heroName.class + '] ' + heroName.name + ' (id: ' + heroName.id + ')'));
                });
            } else if (heroesData.code) {
                heroesCollection.push(React.DOM.option({
                    key: 'heroes-list-invalid',
                    value: '',
                    style: {display: 'none'}
                }, 'invalid battleTag'));
            }
        } else {
            if (!this.state.battleTag || this.state.battleTag === '') {
                heroesCollection.push(React.DOM.option({
                    key: 'heroes-list-empty',
                    value: '',
                    style: {display: 'none'}
                }, 'enter your battleTag in the field below'));
            } else {
                heroesCollection.push(React.DOM.option({
                    key: 'heroes-list-loading',
                    value: '',
                    style: {display: 'none'}
                }, 'loading herolist...'));
            }
        }

        return (
            React.DOM.div({className: 'd3-char-wrapper'},
                '3 - Click below to select your hero: ',
                React.DOM.select(
                    {
                        className: 'd3-chars',
                        ref: 'select',
                        value: this.state.apiData.id,
                        onChange: this.setCharacterSelect
                    }, heroesCollection
                )
            )
        );
    }
});

var heroes = React.createFactory(heroesClass);
