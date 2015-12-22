var profileClass = React.createClass({
    displayName: 'realm-component',
    getInitialState: function () {
        return {
            realmList: [
                'eu',
                'us',
                'kr'
            ],
            apiData: {
                tag: '',
                realm: ''
            }
        };
    },
    componentDidMount: function () {
        var realms = [],
            initialRealm = storage.get('realm') ? storage.get('realm') : 'eu',
            savedBattleTag = storage.get('battleTag');

        this.setState({
            apiData: {
                tag: savedBattleTag,
                realm: initialRealm
            }
        }, function () {
            EventSystem.publish('api.call.heroes', this.state.apiData);

            //setInterval(this.startStatCollectorRunner, 3000);
            // Todo this is kind of garbage
            //setInterval(api.loadHeroesList(this.state.battleTag), this.props.pollInterval);
            //setInterval(api.loadHeroData(this.state.selectedChar), this.props.pollInterval);

        });

        this.state.realmList.forEach(function (realm) {
            realms.push(React.DOM.option({key: realm, value: realm}, realm.toUpperCase()));
        });

        this.setState({
            realms: realms
        });
    },

    setRealm: function (e) {
        this.setState({
            setRing: false,
            toggle: 'hidden',
            paragonToggle: 'hidden',
            skillDescToggle: 'hidden',
            passiveDescToggle: 'hidden'
        });

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
            setRing: false,
            toggle: 'hidden',
            paragonToggle: 'hidden',
            skillDescToggle: 'hidden',
            passiveDescToggle: 'hidden'
        });

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
            React.DOM.div({
                    // todo find a better way to do this
                    className: 'useless-wrapper'
                },
                React.DOM.div({className: 'd3-realm-wrapper'},
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
                React.DOM.div({className: 'd3-api-url'},
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
