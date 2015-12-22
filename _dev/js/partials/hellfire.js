var hellfireClass = React.createClass({
    displayName: 'hellfire-passive-component',
    getInitialState: function () {
        return {
            passives: [],
            skillIconBaseUrl: 'http://media.blizzard.com/d3/icons/skills/64/'
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.general-stats', function (data) {
            self.setState({
                generalStats: data
            });
        });

        EventSystem.subscribe('api.call.item.amulet', function (data) {
            self.setState({
                amuletItem: data
            });
        });
    },

    render: function () {
        var hellfirePassive = [],
            constructedLink,
            hellfirePassiveLink,
            hellfirePassiveDisplay,
            skillIconBaseUrl = this.state.skillIconBaseUrl,
            amuletState = this.state.amuletItem;

        if (amuletState && this.state.generalStats) {
            if (amuletState.name === 'Hellfire Amulet') {
                hellfirePassiveLink = amuletState.attributes.passive[0].text
                    .substring(9)
                    .replace(' passive.', '')
                    .replace(/ /g, '').toLowerCase();
                hellfirePassiveDisplay = amuletState.attributes.passive[0].text
                    .substring(9)
                    .replace(' passive.', '');
                switch (this.state.generalStats.class.value) {
                    case 'demon-hunter':
                        constructedLink = skillIconBaseUrl.concat('demonhunter_passive_', hellfirePassiveLink);
                        break;
                    case 'witch-doctor':
                        constructedLink = skillIconBaseUrl.concat('witchdoctor_passive_', hellfirePassiveLink);
                        break;
                    case 'barbarian':
                        constructedLink = skillIconBaseUrl.concat('barbarian_passive_', hellfirePassiveLink);
                        break;
                    case 'crusader':
                        constructedLink = skillIconBaseUrl.concat('crusader_passive_', hellfirePassiveLink);
                        break;
                    case 'monk':
                        constructedLink = skillIconBaseUrl.concat('monk_passive_', hellfirePassiveLink);
                        break;
                    case 'wizard':
                        constructedLink = skillIconBaseUrl.concat('wizard_passive_', hellfirePassiveLink);
                        break;
                    default:
                        console.log('new class?');
                }
                hellfirePassive.push(React.DOM.div({
                    key: hellfirePassiveDisplay,
                    className: 'hasIcon'
                }, hellfirePassiveDisplay, ' (HA)', React.DOM.div({
                    key: hellfirePassiveDisplay,
                    className: 'icon',
                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                })));
            }
        }

        return (
            React.DOM.div({
                    className: ''
                }, 'Hellfire Passive', hellfirePassive
            )
        );
    }
});

var hellfire = React.createFactory(hellfireClass);
