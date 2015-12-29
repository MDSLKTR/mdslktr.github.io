var profileClass = React.createClass({
    displayName: 'realm-component',
    getInitialState: function () {
        return {
            realmList: Realms.get(),
            apiData: {
                tag: '',
                realm: ''
            }
        };
    },
    componentDidMount: function () {
        var realms = [],
            initialRealm = storage.get('realm') ? storage.get('realm') : Realms.get()[0],
            savedBattleTag = storage.get('battleTag');

        this.setState({
            apiData: {
                tag: savedBattleTag,
                realm: initialRealm
            },
            realms: realms
        }, function () {
            EventSystem.publish('api.call.heroes', this.state.apiData);
        });

        this.state.realmList.forEach(function (realm) {
            realms.push(React.DOM.option({key: realm, value: realm}, realm.toUpperCase()));
        });
    },

    setRealm: function (e) {
        this.setState({
            apiData: {
                tag: this.state.apiData.tag,
                realm: e.target.value
            }
        }, function () {
            EventSystem.publish('api.call.heroes', this.state.apiData);
        });

        storage.save('realm', e.target.value);
    },

    setBattleTag: function (e) {
        this.setState({
            apiData: {
                tag: e.target.value,
                realm: this.state.apiData.realm
            }
        }, function () {
            EventSystem.publish('api.call.heroes', this.state.apiData);
        });

        storage.save('battleTag', e.target.value);
    },

    render: function () {
        return (
            React.DOM.div({className: 'd3-profile-select'},
                React.DOM.div({className: 'd3-realm-select'},
                    '1 - Realm: ',
                    React.DOM.select(
                        {
                            className: 'd3-realm',
                            ref: 'select',
                            value: this.state.apiData.realm,
                            onChange: this.setRealm
                        }, this.state.realms
                    )
                ),
                React.DOM.div({className: 'd3-battle-tag-field'},
                    '2 - Enter your BattleTag: ',
                    React.DOM.input(
                        {
                            value: this.state.apiData.tag,
                            placeholder: 'NAME#1234',
                            onChange: this.setBattleTag
                        }
                    )
                )
            )
        );
    }
});

var profile = React.createFactory(profileClass);
