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
        EventSystem.subscribe('api.call.active-skills', function (data) {
            self.setState({
                skills: data
            });
        });
    },

    render: function () {
        var skills = [],
            skillsDesc = [],
            constructedLink,
            runeType,
            runeMap = this.state.runeMap,
            skillIconBaseUrl = this.state.skillIconBaseUrl;

        if (!this.state.skills) {
            return;
        }

        this.state.skills.forEach(function (skillData) {
            if (skillData.rune) {
                constructedLink = skillIconBaseUrl.concat(skillData.skill.icon);
                if (skillData.rune.type === runeMap[skillData.rune.type].key) {
                    runeType = {
                        backgroundPosition: '0 ' + runeMap[skillData.rune.type].position
                    };
                }

                skills.push(React.DOM.div({key: skillData.skill.name + '-icon', className: 'hasIcon'},
                    skillData.skill.name,
                    ' with ',
                    skillData.rune.name,
                    React.DOM.div({
                        key: skillData.skill.name + '-icon-front',
                        className: 'icon-front',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    }),
                    React.DOM.div({
                        key: skillData.rune.name + '-icon-back',
                        className: 'icon-back',
                        style: runeType
                    })
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
                    skillData.skill.name + ' with ' + skillData.rune.name,
                    React.DOM.p({
                        dangerouslySetInnerHTML: {__html: skillData.skill.description.replace(/\n/g, '<br/>')},
                        key: skillData.skill.name + '-desc',
                        className: 'skill-desc'
                    }),
                    React.DOM.p({
                        dangerouslySetInnerHTML: {__html: skillData.rune.description.replace(/\n/g, '<br/>')},
                        key: skillData.rune.name + '-desc',
                        className: 'rune-desc'
                    })
                ));
            } else if (skillData.skill) {
                constructedLink = skillIconBaseUrl.concat(skillData.skill.icon);
                skills.push(React.DOM.div({
                    key: skillData.skill.name + '-icon',
                    className: 'hasIcon'
                }, skillData.skill.name, React.DOM.div({
                    key: skillData.skill.name + '-icon-front',
                    className: 'icon-front no-rune',
                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                })));
                skillsDesc.push(React.DOM.div({
                        key: skillData.skill.name + '-description',
                        className: 'description'
                    },
                    React.DOM.div({
                        key: skillData.skill.name + '-desc-icon',
                        className: 'desc-icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    }),
                    skillData.skill.name,
                    React.DOM.p({
                        dangerouslySetInnerHTML: {__html: skillData.skill.description.replace(/\n/g, '<br/>')},
                        key: skillData.skill.name + '-desc',
                        className: 'skill-desc'
                    })
                ));
            }
        });

        return (
            React.DOM.div({
                    className: ''
                }, 'Skills', skills
            )
        );
    }
});

var skills = React.createFactory(skillsClass);
