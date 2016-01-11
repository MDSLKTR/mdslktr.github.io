var kanaiClass = React.createClass( {
    displayName: 'kanai-component',
    getInitialState: function() {
        return {
            kanai: [],
            itemIconBaseUrl: 'http://media.blizzard.com/d3/icons/items/large/',
            cubeItems: {}
        };
    },

    componentDidMount: function() {
        var self = this;
        EventSystem.subscribe( 'api.call.kanai', function( data ) {
            self.setState( {
                kanai: data
            }, function() {
                data.forEach( function( power, key ) {
                    if ( !power ) {
                        return;
                    }
                    self.loadKanaiItems( power.tooltipParams, key );
                } );
            } );
        } );

        EventSystem.subscribe( 'api.call.heroes', function( data ) {
            self.setState( {
                battleTag: data.tag,
                realm: data.realm
            } );
        } );
    },

    loadKanaiItems: function( itemKey, key ) {
        var self = this,
            type = 'item-data';

        service.create( type, this.state.realm, this.state.battleTag, itemKey ).then( function( url ) {
            service.get( url ).then( function( response ) {
                self.state.cubeItems[ key ] = JSON.parse( response );
            } );
        } );
    },
    render: function() {
        var kanai = [],
            kanaiDesc = [],
            constructedLink,
            itemIconBaseUrl = this.state.itemIconBaseUrl,
            self = this;

        if ( this.state.kanai && this.state.cubeItems ) {
            this.state.kanai.forEach( function( power ) {
                if ( power ) {
                    constructedLink = itemIconBaseUrl.concat( power.icon );
                    kanai.push( React.DOM.div( {
                        key: power.name,
                        className: 'hasIcon'
                    }, power.name, React.DOM.div( {
                        key: power.name + '-icon',
                        className: 'icon',
                        style: { backgroundImage: 'url(' + constructedLink + '.png)' }
                    } ) ) );
                    for ( var cubeItem in self.state.cubeItems ) {
                        if ( self.state.cubeItems.hasOwnProperty( cubeItem ) ) {
                            if ( cubeItem && self.state.cubeItems[ cubeItem ].name === power.name ) {
                                kanaiDesc.push( React.DOM.div( {
                                        key: self.state.cubeItems[ cubeItem ].name + '-description',
                                        className: 'description'
                                    },
                                    React.DOM.div( {
                                        key: self.state.cubeItems[ cubeItem ].name + '-desc-icon',
                                        className: 'desc-icon',
                                        style: { backgroundImage: 'url(' + constructedLink + '.png)' }
                                    } ),
                                    self.state.cubeItems[ cubeItem ].name,
                                    React.DOM.p( {
                                        dangerouslySetInnerHTML: { __html: self.state.cubeItems[ cubeItem ].attributes.passive[ 0 ].text.replace( /\n/g, '<br/>' ) },
                                        key: cubeItem.name + '-description-text',
                                        className: 'passive-desc'
                                    } )
                                ) );
                            }
                        }
                    }
                }
            } );
        }

        return (
            React.DOM.div( {
                    className: 'd3-cube-powers'
                }, 'Kanai', kanai
            )
        );
    }
} );

var kanai = React.createFactory( kanaiClass );
