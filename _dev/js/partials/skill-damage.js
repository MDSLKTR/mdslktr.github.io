var skillDamageClass = React.createClass({
    displayName: 'skill-damage-component',
    getInitialState: function () {
        return {
            skillDmg: {}
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.collect.skill-damage', function (data) {
            self.setState({
                skillDmg: data
            });
        });

    },

    render: function () {
        var skillDamage = [];

        if (this.state.skillDmg) {
            skillDamage.push(React.DOM.div({
                dangerouslySetInnerHTML: {__html: 'Skill Damage: ' + this.state.skillDmg},
                key: 'Skill Damage Stat',
                className: 'bonusstat'
            }));
        }
        return (
            React.DOM.span({
                    className: 'whatever'
                }, skillDamage
            )

        );
    }
});

var skillDamage = React.createFactory(skillDamageClass);
