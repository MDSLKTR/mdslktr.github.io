var hellfireClass = React.createClass( {
    displayName: 'hellfire-passive-component',
    getInitialState: function() {
        return {
            passives: [],
            skillIconBaseUrl: 'http://media.blizzard.com/d3/icons/skills/64/',
            prefixTypes: [
                'x1_',
                'p1_'
            ]
        };
    },
    componentDidMount: function() {
        var self = this;
        EventSystem.subscribe( 'api.call.stats', function( data ) {
            self.setState( {
                generalStats: data.general
            } );
        } );

        EventSystem.subscribe( 'api.call.item.amulet', function( data ) {
            self.setState( {
                amuletItem: data
            }, function() {
                self.constructHellfirePassive();
            } );
        } );

        EventSystem.subscribe( 'api.clear.item', function() {
            self.setState( {
                amuletItem: {},
                icon: '',
                name: ''
            } );
        } );
    },

    testIconUrl: function( base, prefix, name ) {
        var self = this;
        return new Promise( function( resolve ) {
            var img = new Image(),
                firstRun = true;

            img.src = '';

            img.onload = function() {
                console.log( 'icon found' );
                resolve( img.src );
            };
            img.onerror = function() {
                console.error( 'skill icon could not be found, trying fallback url' );
                self.state.prefixTypes.forEach( function( type, index ) {
                    img.src = '';

                    if ( !firstRun ) {
                        self.state.prefixTypes.splice( index, 1 );
                    }

                    firstRun = false;

                    img.src = base.concat( type, prefix, name, '.png' );
                } );
            };

            img.src = base.concat( prefix, name, '.png' );
        } );
    },

    constructHellfirePassive: function() {
        var skillIconBaseUrl = this.state.skillIconBaseUrl,
            hellfirePassiveName = '',
            prefix,
            self = this,
            classPrefixMapping = {
                'demon-hunter': 'demonhunter_passive_',
                'witch-doctor': 'witchdoctor_passive_',
                'barbarian': 'barbarian_passive_',
                'crusader': 'crusader_passive_',
                'monk': 'monk_passive_',
                'wizard': 'wizard_passive_'
            };

        if ( this.state.amuletItem && this.state.generalStats ) {
            if ( this.state.amuletItem.name === 'Hellfire Amulet' ) {
                hellfirePassiveName = this.state.amuletItem.attributes.passive[ 0 ].text
                    .substring( 9 )
                    .replace( ' passive.', '' )
                    .replace( / /g, '' )
                    .toLowerCase();

                this.setState( {
                    name: this.state.amuletItem.attributes.passive[ 0 ].text
                        .substring( 9 )
                        .replace( ' passive.', '' )
                } );

                for ( prefix in classPrefixMapping ) {
                    if ( classPrefixMapping.hasOwnProperty( prefix ) ) {
                        if ( this.state.generalStats.class.value === prefix ) {
                            this.testIconUrl( skillIconBaseUrl, classPrefixMapping[ prefix ], hellfirePassiveName ).then( function( url ) {
                                self.setState( {
                                    icon: url
                                } );
                            } );
                        }
                    }
                }
            }
        }
    },

    render: function() {
        var hellfirePassive = [];

        if ( this.state.name && this.state.icon ) {
            hellfirePassive.push( React.DOM.div( {
                key: this.state.name,
                className: 'hasIcon'
            }, this.state.name, ' (HA)', React.DOM.div( {
                key: this.state.name,
                className: 'icon',
                style: { backgroundImage: 'url(' + this.state.icon + ')' }
            } ) ) );
        }

        return (
            React.DOM.div( { className: 'd3-hellfire-passive' }, hellfirePassive )
        );
    }
} );

var hellfire = React.createFactory( hellfireClass );
