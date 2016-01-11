var profileClass = React.createClass( {
    displayName: 'realm-component',
    getInitialState: function() {
        return {
            realmList: Realms.get(),
            apiData: {
                tag: '',
                realm: ''
            }
        };
    },
    componentDidMount: function() {
        var realms = [],
            initialRealm = storage.get( 'realm' ),
            savedBattleTag = storage.get( 'battleTag' );

        this.state.realmList.forEach( function( realm ) {
            realms.push( React.DOM.option( { key: realm, value: realm }, realm.toUpperCase() ) );
        } );

        this.setState( {
            realms: realms
        } );

        if ( initialRealm ) {
            this.setState( {
                apiData: {
                    tag: savedBattleTag,
                    realm: initialRealm
                }
            }, function() {
                EventSystem.publish( 'api.call.heroes', this.state.apiData );
            } );
        }
    },

    setRealm: function( e ) {
        this.setState( {
            apiData: {
                tag: this.state.apiData.tag,
                realm: e.target.value
            }
        }, function() {
            EventSystem.publish( 'api.call.heroes', this.state.apiData );
        } );

        storage.save( 'realm', e.target.value );
    },

    setBattleTag: function( e ) {
        this.setState( {
            apiData: {
                tag: e.target.value,
                realm: this.state.apiData.realm
            }
        }, function() {
            EventSystem.publish( 'api.call.heroes', this.state.apiData );
        } );

        storage.save( 'battleTag', e.target.value );
    },

    render: function() {
        return (
            React.DOM.div( { className: 'd3-profile-select' },
                React.DOM.div( { className: 'd3-realm-select' },
                    React.DOM.h3( null, 'Realm' ),
                    React.DOM.select(
                        {
                            className: 'd3-realm',
                            ref: 'select',
                            value: this.state.apiData.realm,
                            onChange: this.setRealm
                        }, React.DOM.option( {
                            style: { display: 'none' },
                            disabled: 'disabled'
                        }, 'Select your Realm' ), this.state.realms
                    )
                ),
                React.DOM.div( { className: 'd3-battle-tag-field' },
                    React.DOM.h3( null, 'BattleTag' ),
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
} );

var profile = React.createFactory( profileClass );
