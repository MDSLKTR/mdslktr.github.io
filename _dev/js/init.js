var d3Profile = React.createClass({
        displayName: 'd3Profile',
        getInitialState: function () {
            return {
                setRing: false,
                calculatingStats: false
            };
        },

        triggerStatCollector: function () {
            this.collectStats();
            this.collectSkillDamage();
            console.log('manual stat collector');
        },

        startStatCollectorRunner: function () {
            if (this.state.panelAnimationComplete) {
                //this.collectStats();
                //this.collectSkillDamage();

                console.log('automatic stat collector');
                return;
            }
            console.log('waiting for animations');
        },

        componentDidMount: function () {
            var self = this;
            EventSystem.subscribe('api.call.general-stats', function (data) {
                self.setState({
                    generalStats: data
                });
            });
        },

        render: function () {
            var backgroundImage;
            if (this.state.generalStats) {
                backgroundImage = {
                    backgroundImage: 'url(assets/images/' + this.state.generalStats.class.value + '.png)'
                };
            } else {
                backgroundImage = {
                    backgroundImage: 'none'
                };
            }

            return (
                React.DOM.div({className: 'd3-container'},
                    React.DOM.div({className: 'd3-char-bg', ref: 'charbg', style: backgroundImage}),
                    items(),
                    profile(),
                    heroes(),
                    hero(),
                    paragon(),

                    skillDamageCollector(),
                    statsCollector()
                )
            );
        }
    });

ReactDOM.render(React.createElement(d3Profile, {
        pollInterval: 600000
    }),
    document.querySelector('.d3-profile'));

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
// todo add new interface + refactor data
// todo split parser into components
