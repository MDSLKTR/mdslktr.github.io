var realmsClass = React.createClass({
    getInitialState: function () {
        return {
            realmList: [
                'eu',
                'us',
                'kr'
            ]
        };
    },
    componentDidMount: function () {
        var realms = [],
            self = this,
            initialRealm = storage.get('realm') ? storage.get('realm') : 'eu',
            savedBattleTag = storage.get('battleTag');

        this.setState({
            selectedRealm: initialRealm
        }, function () {

            heroes1();
            setInterval(this.startStatCollectorRunner, 3000);
            // Todo this is kind of garbage
            setInterval(api.loadHeroesList(this.state.battleTag), this.props.pollInterval);
            setInterval(api.loadHeroData(this.state.selectedChar), this.props.pollInterval);

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

        //this.animatePanelsOut();
        //
        //this.animateBonusPanelOut(panelRightAdditional, document.documentElement.clientHeight / 1.5, -1);
        //this.animateBonusPanelOut(panelLeftAdditional, document.documentElement.clientHeight / 1.5, -1);
        //this.animateBonusPanelOut(panelBottomLeftAdditional, document.documentElement.clientHeight, 1);
        //this.animateBonusPanelOut(panelBottomRightAdditional, document.documentElement.clientHeight / 1.5, 1);

        this.setState({
            selectedRealm: e.target.value
        }, function () {
            d3Profile.changeBattleTag(this.state.battleTag);
        });

        storage.save('realm', e.target.value);
    },

    render: function () {
        return (
            React.DOM.div({className: 'd3-realm-wrapper'},
                '1 - Realm: ',
                React.DOM.select(
                    {
                        className: 'd3-realm',
                        ref: 'select',
                        value: this.state.selectedRealm,
                        onChange: this.setRealm
                    }, this.state.realms
                )
            )
        );
    }
});

var realms = React.createFactory(realmsClass);
