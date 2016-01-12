var d3Profile = React.createClass( {
    displayName: 'd3Profile',
    getInitialState: function() {
        return {
            generalStats: null,
            charBackgroundUrl: 'assets/images/'
        };
    },

    componentDidMount: function() {
        var self = this;
        EventSystem.subscribe( 'api.call.stats', function( data ) {
            self.setState( {
                generalStats: data.general
            } );
        } );

        Stats.init( 'OffensiveStats' );
        Stats.init( 'DefensiveStats' );

        EventSystem.publish( 'api.call.paragon' );

        EventSystem.subscribe( 'api.open.overlay', function( data ) {
            self.setState( {
                overlay: data
            } );
        } );

        this.generateDate();
        this.checkMediaQueries();
    },

    checkMediaQueries: function() {
        var mediaQueries = {},
            type,
            mediaQueryListeners = {},
            setBreakpoint = function setBreakpoint( type ) {
                for ( type in mediaQueries ) {
                    if ( mediaQueries.hasOwnProperty( type ) ) {
                        if ( mediaQueryListeners[ type ].matches ) {
                            currentBreakPoint = type;
                        }
                    }
                }
            };

        try {
            mediaQueries = JSON.parse(
                window
                    .getComputedStyle( document.querySelector( 'body' ), ':before' )
                    .getPropertyValue( 'content' )
                    .replace( /\\"/g, '"' )
                    .replace( /^"/g, '' )
                    .replace( /"$/g, '' )
                    .replace( /'/g, ' ' )
            );
        } catch ( e ) {
            console.log( 'Couldn\'t parse the media queries' );
        }

        var currentBreakPoint = {};

        for ( type in mediaQueries ) {
            if ( mediaQueries.hasOwnProperty( type ) ) {
                mediaQueryListeners[ type ] = window.matchMedia( mediaQueries[ type ].mq );
                mediaQueryListeners[ type ].addListener( setBreakpoint );
                currentBreakPoint[ type ] = mediaQueries[ type ].px;
            }
        }

        setBreakpoint( mediaQueries[ type ] );
    },

    generateDate: function() {
        this.setState( {
            currentYear: new Date().getFullYear()
        } );
    },

    render: function() {
        var backgroundImage = {};
        if ( this.state.generalStats ) {
            console.log( this.state.charBackgroundUrl + this.state.generalStats.class.value + '-' + this.state.generalStats.gender.value + '.jpg)' );
            backgroundImage = {
                backgroundImage: 'url(' + this.state.charBackgroundUrl + this.state.generalStats.class.value + '-' + this.state.generalStats.gender.value + '.jpg)'
            };
        }

        return (
            React.DOM.div( { className: 'd3-container' },
                React.DOM.header( { className: 'd3-header', role: 'banner' }, 'Emtpyness' ),
                React.DOM.main( { className: 'd3-profile', role: 'main' },
                    React.DOM.div( {
                            className: 'd3-char-bg',
                            ref: 'charbg',
                            style: backgroundImage
                        },
                        items(),
                        this.state.overlay ),
                    hero(),
                    paragon(),
                    skillDamageCollector(),
                    statsCollector(),
                    React.DOM.div( {
                            className: 'd3-profile-select-container'
                        },
                        profile(),
                        heroes()
                    ),
                    skills(),
                    passives(),
                    kanai()
                ),
                React.DOM.footer( { className: 'd3-footer', role: 'contentinfo' }, React.DOM.small( null, '© Simon Kunz - ' + this.state.currentYear + ' | Icons & Game Texts © Blizzard' ) )
            )
        );
    }
} );

ReactDOM.render( React.createElement( d3Profile, {} ),
    document.querySelector( '.d3-page' ) );

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
// todo add new interface
