var d3Profile = React.createClass({
        displayName: 'd3Profile',
        getInitialState: function () {
            return {
                generalStats: null
            };
        },

        componentDidMount: function () {
            var self = this;
            EventSystem.subscribe('api.call.stats', function (data) {
                self.setState({
                    generalStats: data.general
                });
            });

            Stats.init('OffensiveStats');
            Stats.init('DefensiveStats');

            EventSystem.publish('api.call.paragon');
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

ReactDOM.render(React.createElement(d3Profile, {}),
    document.querySelector('.d3-profile'));

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
// todo add new interface
