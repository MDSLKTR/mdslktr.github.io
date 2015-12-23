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

        EventSystem.subscribe('api.clear.item', function () {
            self.setState({
                amuletItem: {}
            });
        });
    },

    render: function () {
        var hellfirePassive = [],
            constructedLink = '',
            hellfirePassiveName = '',
            hellfirePassiveDisplay = '',
            skillIconBaseUrl = this.state.skillIconBaseUrl,
            prefix,
            passivePrefixMapping = {
                'demon-hunter': 'demonhunter_passive_',
                'witch-doctor': 'witchdoctor_passive_',
                'barbarian': 'barbarian_passive_',
                'crusader': 'crusader_passive_',
                'monk': 'monk_passive_',
                'wizard': 'wizard_passive_'
            };

        if (this.state.amuletItem && this.state.generalStats) {
            if (this.state.amuletItem.name === 'Hellfire Amulet') {
                hellfirePassiveName = this.state.amuletItem.attributes.passive[0].text
                    .substring(9)
                    .replace(' passive.', '')
                    .replace(/ /g, '')
                    .toLowerCase();
                hellfirePassiveDisplay = this.state.amuletItem.attributes.passive[0].text
                    .substring(9)
                    .replace(' passive.', '');

                for (prefix in passivePrefixMapping) {
                    if (passivePrefixMapping.hasOwnProperty(prefix)) {
                        if (this.state.generalStats.class.value === prefix) {
                            constructedLink = skillIconBaseUrl.concat(passivePrefixMapping[prefix], hellfirePassiveName);
                        }
                    }
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
            React.DOM.div({className: ''}, 'Hellfire Passive', hellfirePassive
            )
        );
    }
});

var hellfire = React.createFactory(hellfireClass);
