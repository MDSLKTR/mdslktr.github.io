var skillsClass = React.createClass({
    displayName: 'active-skills-component',
    getInitialState: function () {
        return {
            skills: [],
            skillIconBaseUrl: 'http://media.blizzard.com/d3/icons/skills/64/',
            runeMap: Runes.get()
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.skills', function (data) {
            self.setState({
                skills: data.actives
            });
        });
    },

    render: function () {
        var skills = [],
            skillsDesc = [],
            constructedLink,
            runeType,
            runeMap = this.state.runeMap,
            rune = '',
            runeDesc = '',
            runeName = '',
            skillIconBaseUrl = this.state.skillIconBaseUrl;

        if (!this.state.skills) {
            return;
        }

        this.state.skills.forEach(function (skillData) {
            if (skillData.rune) {
                constructedLink = skillIconBaseUrl.concat(skillData.skill.icon);
                if (runeMap.hasOwnProperty(skillData.rune.type)) {
                    runeType = {
                        backgroundPosition: '0 ' + runeMap[skillData.rune.type]
                    };
                }

                runeName = skillData.rune.name;

                rune = React.DOM.span({
                    key: skillData.rune.name + '-active-skill-rune-icon',
                    className: 'active-skill-rune-icon',
                    style: runeType
                });

                runeDesc = React.DOM.p({
                    dangerouslySetInnerHTML: {__html: skillData.rune.description.replace(/\n/g, '<br/>')},
                    key: skillData.rune.name + '-desc',
                    className: 'rune-desc'
                });
            }

            skills.push(
                React.DOM.div({key: skillData.skill.name + '-icon', className: 'active-skill-bg'},
                    React.DOM.div({
                        key: skillData.skill.name + '-active-skill-icon',
                        className: 'active-skill-icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    }),
                    React.DOM.span({
                        className: 'active-skill-name'
                    }, skillData.skill.name),
                    React.DOM.span({
                            className: 'active-skill-rune'
                        }, rune,
                        React.DOM.span({
                            className: 'active-skill-rune-name'
                        }, runeName))
                )
            );
            skillsDesc.push(React.DOM.div({
                    key: skillData.skill.name + '-description',
                    className: 'description'
                },
                React.DOM.div({
                    key: skillData.skill.name + '-desc-icon',
                    className: 'desc-icon',
                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                }),
                skillData.skill.name + ' with ' + runeName,
                React.DOM.p({
                    dangerouslySetInnerHTML: {__html: skillData.skill.description.replace(/\n/g, '<br/>')},
                    key: skillData.skill.name + '-desc',
                    className: 'skill-desc'
                }),
                runeDesc
            ));
        });

        return (
            React.DOM.div({className: 'd3-active-skills'}, 'Skills', skills
            )
        );
    }
});

var skills = React.createFactory(skillsClass);
