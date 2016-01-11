var statsCollectorClass = React.createClass( {
        displayName: 'stats-collector',
        getInitialState: function() {
            return {
                itemCollection: [],
                itemCount: 0
            };
        },
        componentDidMount: function() {
            var self = this;
            EventSystem.subscribe( 'api.call.item.collection', function( data ) {
                self.setState( {
                    itemCollection: data
                } );
            } );

            EventSystem.subscribe( 'api.call.stats', function( data ) {
                self.setState( {
                    primaryStats: data.primary
                } );
            } );

            EventSystem.subscribe( 'api.call.skills', function( data ) {
                self.setState( {
                    skills: data.actives
                } );
            } );

            EventSystem.subscribe( 'api.call.stats', function( data ) {
                self.setState( {
                    generalStats: data.general
                } );
            } );

            EventSystem.subscribe( 'api.call.item.set-ring', function( data ) {
                self.setState( {
                    setRing: data
                } );
            } );

            EventSystem.subscribe( 'api.call.items', function( data ) {
                self.setState( {
                    itemCount: data.count
                } );
            } );

            EventSystem.subscribe( 'api.try.collect', function( data ) {
                if ( self.state.itemCount === data ) {
                    self.collect();
                }
            } );

            EventSystem.subscribe( 'api.call.collect', function() {
                self.collect();
            } );
        },

        collect: function() {
            var that = this;

            if ( !this.state.itemCollection || !this.state.skills || !this.state.generalStats ) {
                return;
            }

            return new Promise( function( resolve, reject ) {
                Worker.create = function( workerJob ) {
                    var str = workerJob.toString();
                    var blob = new Blob(
                        [ '\'use strict\';\nself.onmessage =' + str ],
                        { type: 'text/javascript' }
                    );
                    return window.URL.createObjectURL( blob );
                };

                var workerBlob = Worker.create( function( e ) {
                    var itemSlots = e.data.itemSlots,
                        setRing = e.data.setRing,
                        mergedStats = Object.assign( {}, e.data.offensiveStats, e.data.defensiveStats ),
                        stat,
                        setPool = e.data.setPool,
                        primaryStats = e.data.primaryStats,
                        i,
                        m,
                        j,
                        repeatSet = [];

                    for ( stat in mergedStats ) {
                        if ( mergedStats.hasOwnProperty( stat ) ) {
                            if ( mergedStats[ stat ].multiplicative ) {
                                mergedStats[ stat ].value = 1;
                            } else {
                                mergedStats[ stat ].value = 0;
                            }
                            for ( i = 0; i < itemSlots.length; i++ ) {
                                // Look for stats in item properties
                                if ( itemSlots[ i ].attributesRaw ) {
                                    if ( itemSlots[ i ].attributesRaw[ mergedStats[ stat ].key ] && itemSlots[ i ].attributesRaw[ mergedStats[ stat ].key ].min ) {
                                        if ( mergedStats[ stat ].multiplicative ) {
                                            mergedStats[ stat ].value *= ( 1 - itemSlots[ i ].attributesRaw[ mergedStats[ stat ].key ].min );
                                        } else {
                                            mergedStats[ stat ].value += itemSlots[ i ].attributesRaw[ mergedStats[ stat ].key ].min;
                                        }
                                    }
                                }

                                // Look for stats in item gems
                                if ( itemSlots[ i ].gems[ 0 ] ) {
                                    if ( itemSlots[ i ].gems[ 0 ].attributesRaw[ mergedStats[ stat ].key ] ) {
                                        if ( mergedStats[ stat ].multiplicative ) {
                                            if ( itemSlots[ i ].attributesRaw.Gem_Attributes_Multiplier ) {
                                                mergedStats[ stat ].value *=
                                                    ( 1 - itemSlots[ i ].gems[ 0 ].attributesRaw[ mergedStats[ stat ].key ].min *
                                                        itemSlots[ i ].attributesRaw.Gem_Attributes_Multiplier.min );
                                            } else {
                                                mergedStats[ stat ].value *=
                                                    ( 1 - itemSlots[ i ].gems[ 0 ].attributesRaw[ mergedStats[ stat ].key ].min );
                                            }
                                        } else {
                                            if ( itemSlots[ i ].attributesRaw.Gem_Attributes_Multiplier ) {
                                                mergedStats[ stat ].value +=
                                                    itemSlots[ i ].gems[ 0 ].attributesRaw[ mergedStats[ stat ].key ].min * itemSlots[ i ].attributesRaw.Gem_Attributes_Multiplier.min;
                                            } else {
                                                mergedStats[ stat ].value +=
                                                    itemSlots[ i ].gems[ 0 ].attributesRaw[ mergedStats[ stat ].key ].min;
                                            }
                                        }
                                    }
                                }

                                // Look for stats in set bonuses
                                if ( itemSlots[ i ].set && itemSlots[ i ].set.ranks ) {
                                    for ( m = 0; m < setPool.length; m++ ) {
                                        if ( itemSlots[ i ].set.name === setPool[ m ][ 0 ] ) {
                                            setPool[ m ][ 1 ]++;
                                        }

                                        for ( j = 0; j < itemSlots[ i ].set.ranks.length; j++ ) {
                                            if ( setRing ) {
                                                // TODO this is failing
                                                if (
                                                    itemSlots[ i ].set.name === setPool[ m ][ 0 ] &&
                                                    itemSlots[ i ].set.ranks[ j ].required <= setPool[ m ][ 1 ] + 1 &&
                                                    setPool[ m ][ 1 ] >= 2
                                                ) {
                                                    if ( itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ] && itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min ) {
                                                        if ( mergedStats[ stat ].multiplicative ) {
                                                            mergedStats[ stat ].value *= ( 1 - itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min );
                                                        } else {
                                                            mergedStats[ stat ].value += itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min;
                                                        }
                                                    }
                                                }
                                            } else {
                                                if ( itemSlots[ i ].set.name === setPool[ m ][ 0 ] && itemSlots[ i ].set.ranks[ j ].required <= setPool[ m ][ 1 ] ) {
                                                    if ( itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ] && itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min ) {
                                                        if ( mergedStats[ stat ].multiplicative ) {
                                                            mergedStats[ stat ].value *= ( 1 - itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min );
                                                        } else {
                                                            mergedStats[ stat ].value += itemSlots[ i ].set.ranks[ j ].attributesRaw[ mergedStats[ stat ].key ].min;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // TODO this is failing
                                    if ( repeatSet.indexOf( itemSlots[ i ].set.name ) > -1 ) {
                                        continue;
                                    }
                                    repeatSet.push( itemSlots[ i ].set.name );
                                }
                            }

                            // Read stats from the API
                            if ( primaryStats[ mergedStats[ stat ].key ] ) {
                                if ( mergedStats[ stat ].multiplicative ) {
                                    mergedStats[ stat ].value *=  ( 1 - primaryStats[ mergedStats[ stat ].key ] );
                                } else {
                                    mergedStats[ stat ].value += primaryStats[ mergedStats[ stat ].key ];
                                }
                            }

                            // Apply paragon points
                            if ( mergedStats[ stat ].paragonModifier ) {
                                if ( mergedStats[ stat ].multiplicative ) {

                                    if ( mergedStats[ stat ].value === 1 ) {
                                        // to fix a weird floating rounding error, we need to make sure truncing is only applied when calculated with API data
                                        mergedStats[ stat ].value = mergedStats[ stat ].paragonModifier.value;
                                        continue;
                                    }

                                    mergedStats[ stat ].value *= ( 1 - mergedStats[ stat ].paragonModifier.value / mergedStats[ stat ].normalization );
                                } else {
                                    mergedStats[ stat ].value += mergedStats[ stat ].paragonModifier.value / mergedStats[ stat ].normalization;
                                }
                            }

                            // Format multiplicative stats
                            if ( mergedStats[ stat ].multiplicative ) {
                                mergedStats[ stat ].value = Math.floor( ( 1 - mergedStats[ stat ].value ) * 10000 ) / 10000;
                            }

                            // Normalize Stats
                            if ( mergedStats[ stat ].normalization ) {
                                mergedStats[ stat ].value *= mergedStats[ stat ].normalization;
                            }

                            // Correct API errors
                            if ( mergedStats[ stat ].errorCorrection ) {
                                mergedStats[ stat ].value += mergedStats[ stat ].errorCorrection;
                            }

                            // Apply stat cap
                            if ( mergedStats[ stat ].value > mergedStats[ stat ].cap ) {
                                mergedStats[ stat ].value = mergedStats[ stat ].cap;
                            }
                        }
                    }

                    for ( stat in mergedStats ) {
                        if ( mergedStats.hasOwnProperty( stat ) ) {
                            // Re-map stats
                            if ( mergedStats[ stat ].addStat ) {
                                mergedStats[ stat ].value += mergedStats[ mergedStats[ stat ].addStat ].value;
                            }

                            if ( mergedStats[ stat ].value && mergedStats[ stat ].unit === '%' ) {
                                mergedStats[ stat ].value = mergedStats[ stat ].value.toFixed( 2 );
                            }
                        }
                    }

                    // send results back to the main thread
                    this.postMessage( {
                        offensiveStats: e.data.offensiveStats,
                        defensiveStats: e.data.defensiveStats
                    } );

                    // die
                    this.close();
                } );

                // create worker instance
                var worker = new Worker( workerBlob );

                worker.onmessage = function( e ) {
                    that.setState( {
                        offensiveStats: e.data.offensiveStats,
                        defensiveStats: e.data.defensiveStats
                    }, function() {
                        EventSystem.publish( 'api.collect.offensive-stats', that.state.offensiveStats );
                        EventSystem.publish( 'api.collect.defensive-stats', that.state.defensiveStats );
                    } );

                    resolve();

                    console.info( 'the web worker had a save journey' );
                };

                // return a failure message if the worker didn't complete
                worker.onerror = function( e ) {
                    reject( Error(
                        'one of the workers had an horrible accident\n' +
                        e.message +
                        ' in line ' +
                        e.lineno )
                    );
                    this.terminate();
                };

                worker.postMessage( {
                    itemSlots: that.state.itemCollection,
                    offensiveStats: Stats.get( 'OffensiveStats' ),
                    defensiveStats: Stats.get( 'DefensiveStats' ),
                    setPool: Sets.get(),
                    setRing: that.state.setRing,
                    primaryStats: that.state.primaryStats
                } );
            } );
        },

        render: function() {
            return (
                React.DOM.div( {
                        style: { 'display': 'none' }
                    }, 'Stats Worker'
                )
            );
        }
    } )
    ;

var statsCollector = React.createFactory( statsCollectorClass );
