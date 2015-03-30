var DataWrapper = React.createClass({displayName: "DataWrapper",
    getInitialState: function () {
        return {
            skills: [],
            passives: [],
            stats: [],
            class: {},
            name: {},
            level: {},
            paragon: {},
            polling: true,
            isHidden: false,
            url: localStorage.getItem('url')
        };
    },
    loadCommentsFromServer: function () {
        if (this.state.polling === true) {
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({name: data.name});
                    this.setState({class: data.class});
                    this.setState({level: data.level});
                    this.setState({paragon: data.paragonLevel});
                    this.setState({skills: data.skills.active});
                    this.setState({passives: data.skills.passive});
                    this.setState({stats: data.stats});
                }.bind(this),
                error: function (xhr, status, err) {
                    this.setState({url: 'invalid api url'});
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            console.log('updated');
        }
    },

    componentWillMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    componentDidMount: function() {
    },

    clickHandler: function () {
        this.setState({polling: false});
        var newUrl = this.state.url.replace(this.state.url,[prompt('Enter a new url')]);
        this.setState({url: newUrl});
        console.log(newUrl);
        this.setState({polling: true});
        localStorage.setItem('url', newUrl);
    },

    render: function () {

        var skillsState = this.state.skills,
            skills = [],
            passivesState = this.state.passives,
            passives = [],
            statsState = this.state.stats,
            stats = [],
            nameState = this.state.name,
            classState = this.state.class,
            levelState = this.state.level,
            paragonState = this.state.paragon,
            base = [],
            style = [];

        if (classState === 'demon-hunter') {
            style = {
                backgroundImage: "url('/assets/images/dh.jpg')"
            };
        } else if (classState === 'witch-doctor') {
            style = {
                backgroundImage: "url('/assets/images/wd.png')"
            };
        } else {
            style = {
                backgroundImage: "url('/assets/images/empty.svg')"
            };
        }

        base.push(React.DOM.li({key: nameState.key}, "Name: ", nameState));
        base.push(React.DOM.li({key: classState.key}, "Class: ", classState));
        base.push(React.DOM.li({key: levelState.key + paragonState.key}, "Level: ", levelState));
        base.push(React.DOM.li({key: paragonState.key}, "Paragon: ", paragonState));

        skillsState.forEach(function (skillName) {
            if (skillName.rune) {
                skills.push(React.DOM.li({key: skillsState.key}, skillName.skill.name, " with ", skillName.rune.name));
            } else {
                skills.push(React.DOM.li({key: skillsState.key}, skillName.skill.name));
            }
        });

        passivesState.forEach(function (passiveName) {
            passives.push(React.DOM.li({key: passivesState.key}, passiveName.skill.name));
        });


        stats.push(React.DOM.li({key: statsState.key}, "Life: ", statsState.life));
        stats.push(React.DOM.li({key: statsState.key}, "Damage: ", statsState.damage));
        stats.push(React.DOM.li({key: statsState.key}, "Toughness: ", statsState.toughness));


        var statsArray = [statsState.strength, statsState.dexterity, statsState.intelligence];
        if (classState === ('demon-hunter' || 'monk')) {
           stats.push(React.DOM.li({key: statsState.key}, "Dexterity: ", statsState.dexterity));

        } else if (classState === ('witch-doctor' || 'wizard')) {
           stats.push(React.DOM.li({key: statsState.key}, "Intelligence: ", statsState.intelligence));

        } else if (classState === ('barbarian' || 'crusader')) {
           stats.push(React.DOM.li({key: statsState.key}, "Strength: ", statsState.strength));
        } else {
            console.log('new class?');
        }

        stats.push(React.DOM.li({key: statsState.key}, "Vitality: ", statsState.vitality));

        return (
            React.DOM.div({className: 'd3-container'},
                React.DOM.div({className: 'd3-char-bg', key: classState.key + '-image', style: style}),
                React.DOM.div({className: 'd3-api-url' , onClick: this.clickHandler}, this.state.url),
                React.DOM.div({className: 'd3-data'},
                    React.DOM.ul({className: 'base'}, base),
                    React.DOM.ul({className: 'skills'}, skills),
                    React.DOM.ul({className: 'passives'}, passives),
                    React.DOM.ul({className: 'stats'}, stats)
                )
            )
        );
    }
});

React.render(React.createElement(DataWrapper, {
        pollInterval: 5000
    }),
    document.getElementById('profile-data'));

// http://eu.battle.net/api/d3/profile/Ferdi-1763/hero/44057278
// http://eu.battle.net/api/d3/profile/McleodNUS-2608/hero/56016042

// https://eu.api.battle.net/d3/profile/Ferdi-1763/hero/44057278?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm
// https://eu.api.battle.net/d3/profile/McleodNUS-2608/hero/56016042?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm

// https://eu.api.battle.net/d3/profile/Ferdi-1763/hero/44057278?locale=en_GB&callback=data&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm
// https://eu.api.battle.net/d3/profile/McleodNUS-2608/hero/56016042?locale=en_GB&callback=data&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm

// todos
// save url to localStorage - done
// find out how animations triggers work
// correct stats
