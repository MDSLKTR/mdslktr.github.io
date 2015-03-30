var DataWrapper = React.createClass({displayName: 'DataWrapper',
    getInitialState: function () {
        return {
            skills: [],
            passives: [],
            stats: [],
            heroes: [],
            class: {},
            name: {},
            level: {},
            paragon: {},
            polling: true,
            url: '',
            isHidden: false,
            //url: localStorage.getItem('url'),
            battleTag: localStorage.getItem('battleTag'),
            apiKey: '?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm',
            profile: 'https://eu.api.battle.net/d3/profile/',
            a: 'https://eu.api.battle.net/d3/profile/Ferdi-1763/hero/44057278?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm'
        };
    },

    loadProfileData: function() {
        var urlConstructor = this.state.profile.concat(this.state.battleTag, '/', this.state.apiKey);
        console.log(urlConstructor);
        this.setState({url: urlConstructor});
        $.ajax({
            url: this.state.url,
            dataType: 'jsonp',
            success: function (data) {
                this.setState({heroes: data.heroes});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({battleTag: 'invalid battletag'});
                console.log(this.state.url);
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
        console.log(this.state.heroes);
    },
    //
    //loadCommentsFromServer: function () {
    //    if (this.state.polling === true) {
    //        $.ajax({
    //            url: this.state.url,
    //            dataType: 'jsonp',
    //            success: function (data) {
    //                this.setState({name: data.name});
    //                this.setState({class: data.class});
    //                this.setState({level: data.level});
    //                this.setState({paragon: data.paragonLevel});
    //                this.setState({skills: data.skills.active});
    //                this.setState({passives: data.skills.passive});
    //                this.setState({stats: data.stats});
    //            }.bind(this),
    //            error: function (xhr, status, err) {
    //                console.error(this.state.url, status, err.toString());
    //            }.bind(this)
    //        });
    //        console.log('updated');
    //    }
    //},

    componentWillMount: function () {
        //this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    componentDidMount: function() {
    },

    handleChange: function(e) {
        var input =  e.target.value;
        this.setState({battleTag: input});
        //console.log(input);
        //this.setState({polling: true});
    },

    onEnter: function() {
        if (event.keyCode === 13) {
            this.loadProfileData();
            localStorage.setItem('battleTag', this.state.battleTag);
        }
    },

    clearAndFocusInput: function() {
        this.setState({polling: false});
        this.setState({battleTag: ''});
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
                backgroundImage: 'url("/assets/images/dh.jpg")'
            };
        } else if (classState === 'witch-doctor') {
            style = {
                backgroundImage: 'url("/assets/images/wd.png")'
            };
        } else {
            style = {
                backgroundImage: 'url("/assets/images/empty.svg")'
            };
        }

        base.push(React.DOM.li({key: nameState.key}, 'Name: ', nameState));
        base.push(React.DOM.li({key: classState.key}, 'Class: ', classState));
        base.push(React.DOM.li({key: levelState.key + paragonState.key}, 'Level: ', levelState));
        base.push(React.DOM.li({key: paragonState.key}, 'Paragon: ', paragonState));

        skillsState.forEach(function (skillName) {
            if (skillName.rune) {
                skills.push(React.DOM.li({key: skillsState.key}, skillName.skill.name, ' with ', skillName.rune.name));
            } else {
                skills.push(React.DOM.li({key: skillsState.key}, skillName.skill.name));
            }
        });

        passivesState.forEach(function (passiveName) {
            passives.push(React.DOM.li({key: passivesState.key}, passiveName.skill.name));
        });


        stats.push(React.DOM.li({key: statsState.key}, 'Life: ', statsState.life));
        stats.push(React.DOM.li({key: statsState.key}, 'Damage: ', statsState.damage));
        stats.push(React.DOM.li({key: statsState.key}, 'Toughness: ', statsState.toughness));


        var statsArray = [statsState.strength, statsState.dexterity, statsState.intelligence];
        if (classState === ('demon-hunter' || 'monk')) {
           stats.push(React.DOM.li({key: statsState.key}, 'Dexterity: ', statsState.dexterity));

        } else if (classState === ('witch-doctor' || 'wizard')) {
           stats.push(React.DOM.li({key: statsState.key}, 'Intelligence: ', statsState.intelligence));

        } else if (classState === ('barbarian' || 'crusader')) {
           stats.push(React.DOM.li({key: statsState.key}, 'Strength: ', statsState.strength));
        } else {
            console.log('new class?');
        }

        stats.push(React.DOM.li({key: statsState.key}, 'Vitality: ', statsState.vitality));

        return (
            React.DOM.div({className: 'd3-container'},
                React.DOM.div({className: 'd3-char-bg', key: classState.key + '-image', style: style}),
                React.DOM.div({className: 'd3-api-url' , onClick: this.clearAndFocusInput},
                    React.DOM.input(
                        {
                            value: this.state.battleTag,
                            onChange: this.handleChange,
                            onKeyPress: this.onEnter
                        }
                    )
                ),
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
