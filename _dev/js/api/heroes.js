var heroesClass = React.createClass( {
    displayName: 'heroes-component',
    getInitialState: function() {
        return {
            heroesCollection: [],
            battleTag: '',
            realm: '',
            apiData: {
                tag: '',
                realm: '',
                id: ''
            },
            charIconMap: CharIcons.get()
        };
    },

    componentDidMount: function() {
        var self = this;
        EventSystem.subscribe( 'api.call.heroes', function( data ) {
            self.setState( {
                battleTag: data.tag,
                realm: data.realm
            }, function() {
                self.loadHeroesList( self.state.battleTag, self.state.realm );
            } );
        } );
    },

    loadHeroesList: function( tag, realm ) {
        var self = this,
            type = 'heroes-list';

        if ( tag ) {
            service.create( type, realm, tag ).then( function( url ) {
                service.get( url ).then( function( response ) {
                    var data = JSON.parse( response );

                    self.setState( {
                        heroesData: data
                    } );
                } );
            } );
        }
    },

    setCharacterSelect: function( e ) {
        var self = this;
        this.setState( {
            apiData: {
                tag: this.state.battleTag,
                realm: this.state.realm,
                id: e.target.value
            }
        }, function() {
            EventSystem.publish( 'api.call.hero', this.state.apiData );
        } );

        // TODO call animator

        this.state.heroesData.heroes.forEach( function( hero ) {
            if ( hero.id.toString() === e.target.value ) {
                self.setState( {
                    selectedClass: React.DOM.span( {
                        className: 'd3-character-icon',
                        style: {
                            backgroundImage: 'url(\'assets/images/portraits.png\') ',
                            backgroundPosition:
                                self.state.charIconMap[ hero.class.concat( '_', hero.gender ) ].x + 'px ' +
                                self.state.charIconMap[ hero.class.concat( '_', hero.gender ) ].y + 'px'
                        }
                    } )
                } );
            }
        } );

        EventSystem.publish( 'api.clear.items' );
        EventSystem.publish( 'api.clear.item' );
    },

    render: function() {
        var heroesCollection = [],
            heroesData = this.state.heroesData;

        if ( heroesData ) {
            if ( heroesData.heroes ) {
                heroesCollection.push( React.DOM.option( {
                    key: 'heroes-list',
                    value: '',
                    style: { display: 'none' }
                }, 'click to select hero' ) );
                heroesData.heroes.forEach( function( hero ) {
                    heroesCollection.push( React.DOM.option( {
                        key: 'heroes-list' + hero.id,
                        value: hero.id
                    }, hero.level + ' - ' + hero.name + ' (' + hero.class.charAt( 0 ).toUpperCase() + hero.class.slice( 1 ) + ')' ) );
                } );
            }

            if ( heroesData.code ) {
                heroesCollection.push( React.DOM.option( {
                    key: 'heroes-list-invalid',
                    value: '',
                    style: { display: 'none' }
                }, 'invalid battleTag' ) );
            }
        } else {
            if ( !this.state.battleTag || this.state.battleTag === '' ) {
                heroesCollection.push( React.DOM.option( {
                    key: 'heroes-list-empty',
                    value: '',
                    style: { display: 'none' }
                }, 'Enter your BattleTag above' ) );
            } else {
                heroesCollection.push( React.DOM.option( {
                    key: 'heroes-list-loading',
                    value: '',
                    style: { display: 'none' }
                }, 'loading herolist...' ) );
            }
        }

        return (
            React.DOM.div( { className: 'd3-character-select' },
                React.DOM.h3( null, 'Characters' ),
                this.state.selectedClass,
                React.DOM.select(
                    {
                        className: 'd3-chars',
                        value: this.state.apiData.id,
                        onChange: this.setCharacterSelect
                    }, heroesCollection
                )
            )
        );
    }
} );

var heroes = React.createFactory( heroesClass );
