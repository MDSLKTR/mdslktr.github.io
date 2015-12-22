var passivesClass = React.createClass({
    displayName: 'passive-skills-component',
    getInitialState: function () {
        return {
            passives: [],
            skillIconBaseUrl: 'http://media.blizzard.com/d3/icons/skills/64/'
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.passive-skills', function (data) {
            self.setState({
                passives: data
            });
        });
    },

    render: function () {
        var passives = [],
            passivesDesc = [],
            constructedLink,
            skillIconBaseUrl = this.state.skillIconBaseUrl;

        if (this.state.passives) {
            this.state.passives.forEach(function (passive) {
                if (passive.skill) {
                    constructedLink = skillIconBaseUrl.concat(passive.skill.icon);
                    passives.push(React.DOM.div({
                        key: passive.skill.name,
                        className: 'hasIcon'
                    }, passive.skill.name, React.DOM.div({
                        key: passive.skill.name + '-icon',
                        className: 'icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    })));
                    passivesDesc.push(React.DOM.div({
                            key: passive.skill.name + '-description',
                            className: 'description'
                        },
                        React.DOM.div({
                            key: passive.skill.name + '-desc-icon',
                            className: 'desc-icon',
                            style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                        }),
                        passive.skill.name,
                        React.DOM.p({
                            dangerouslySetInnerHTML: {__html: passive.skill.description.replace(/\n/g, '<br/>')},
                            key: passive.skill.name + '-description-text',
                            className: 'passive-desc'
                        })
                    ));
                }
            });
        }

        return (
            React.DOM.div({
                className: ''
            }, 'Passives', passives, hellfire()
            )
        );
    }
});

var passives = React.createFactory(passivesClass);
