var d3Profile = React.createClass({
    displayName: 'd3Profile',
    getInitialState: function () {
        return {
            generalStats: null,
            charBackgroundUrl: 'assets/images/'
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

        EventSystem.subscribe('api.open.overlay', function (data) {
            self.setState({
                overlay: data
            });
        });
    },

    render: function () {

        var backgroundImage = {};
        if (this.state.generalStats) {
            console.log(this.state.charBackgroundUrl + this.state.generalStats.class.value + '-' + this.state.generalStats.gender.value + '.jpg)');
            backgroundImage = {
                backgroundImage: 'url(' + this.state.charBackgroundUrl + this.state.generalStats.class.value + '-' + this.state.generalStats.gender.value + '.jpg)'
            };
        }

        return (
            React.DOM.div({className: 'd3-container', ref: 'container'},
                React.DOM.div({
                    className: 'd3-char-bg',
                    ref: 'charbg',
                    style: backgroundImage
                }, items(), this.state.overlay),
                hero(),
                paragon(),
                skillDamageCollector(),
                statsCollector(),
                React.DOM.div({
                        className: 'd3-profile-select-container'
                    },
                    profile(),
                    heroes()
                ),
                skills(),
                passives(),
                kanai()
            )
        );
    }
});

ReactDOM.render(React.createElement(d3Profile, {}),
    document.querySelector('.d3-profile'));

// todo find out how the % dmg of the skill can be gathered
// todo add more buffs
// todo add new interface
