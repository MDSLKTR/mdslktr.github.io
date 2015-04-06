var DataWrapper = React.createClass({
    displayName: 'DataWrapper',
    getInitialState: function () {
        return {
            skills: [],
            passives: [],
            stats: [],
            heroes: [],
            items: [],
            attributes: [],
            class: {},
            name: {},
            level: {},
            paragon: {},
            polling: true,
            url: '',
            itemUrl: '',
            battleTag: localStorage.getItem('battleTag'),
            apiKey: '?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm',
            profile: 'https://eu.api.battle.net/d3/profile/',
            itemIconLink: 'http://media.blizzard.com/d3/icons/items/large/', // icon + format .png,
            skillIconLink: 'http://media.blizzard.com/d3/icons/skills/64/',
            itemToolTipBase: 'https://eu.api.battle.net/d3/data/'
        };
    },

    loadHeroesData: function () {
        if (this.state.battleTag) {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/', this.state.apiKey)});
            $.ajax({
                url: this.state.url,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({heroes: data.heroes});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            //console.log('updated herolist');
            console.log(this.state.url);
        }
    },

    loadProfileData: function () {
        if (this.state.selected) {
            this.setState({url: this.state.profile.concat(this.state.battleTag.replace(/#/g, '-'), '/hero/', this.state.selected, this.state.apiKey)});
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
                    this.setState({items: data.items});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            //console.log('updated data');
            console.log(this.state.url);
        }
    },

    loadItemData: function (itemKey) {
            this.setState({item: itemKey});
            this.setState({itemUrl: this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey)});
            console.log(this.state.itemToolTipBase.concat(this.state.item, this.state.apiKey));
            $.ajax({
                url: this.state.itemUrl,
                dataType: 'jsonp',
                success: function (data) {
                    this.setState({attributes: data.attributes});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.state.url, status, err.toString());
                }.bind(this)
            });
            console.log('updated item');
            console.log(this.state.itemUrl);
    },

    componentWillMount: function () {
        this.loadHeroesData();
        setInterval(this.loadHeroesData, this.props.pollInterval);
        setInterval(this.loadProfileData, this.props.pollInterval);
        setInterval(this.checkAmu, this.props.pollInterval);
    },

    handleChange: function (e) {
        var input = e.target.value;
        this.setState({battleTag: input});
        localStorage.setItem('battleTag', input);
    },

    setSelect: function () {
        var newValue = this.refs.select.getDOMNode().value;
        this.setState({selected: newValue});
        this.loadProfileData();
        this.checkAmu();
    },

    checkAmu: function () {
        if (this.state.items.neck) {
            if (this.state.items.neck.name === 'Hellfire Amulet') {
                var hellfireAmu = this.state.items.neck.tooltipParams;
                this.loadItemData(hellfireAmu);
            } else {
                this.setState({attributes: []});
            }
        }
    },

    render: function () {
        var skillsState = this.state.skills,
            skills = [],
            passivesState = this.state.passives,
            passives = [],
            statsState = this.state.stats,
            stats = [],
            nameState = this.state.name,
            heroes = [],
            heroesState = this.state.heroes,
            classState = this.state.class,
            levelState = this.state.level,
            paragonState = this.state.paragon,
            itemsState = this.state.attributes,
            specialPassive = [],
            base = [],
            style = [],
            skillIconBaseUrl = this.state.skillIconLink;

        switch (classState) {
            case 'demon-hunter':
                style = {
                    backgroundImage: 'url("../../assets/images/dh.png")'
                };
                break;
            case 'witch-doctor':
                style = {
                    backgroundImage: 'url("../../assets/images/wd.png")'
                };
                break;
            case 'barbarian':
                style = {
                    backgroundImage: 'url("../../assets/images/barb.png")'
                };
                break;
            case 'crusader':
                style = {
                    backgroundImage: 'url("../../assets/images/crusader.png")'
                };
                break;
            case 'monk':
                style = {
                    backgroundImage: 'url("../../assets/images/monk.png")'
                };
                break;
            case 'wizard':
                style = {
                    backgroundImage: 'url("../../assets/images/wiz.jpg")'
                };
                break;
            default:
                style = {
                    backgroundImage: 'url("../../assets/images/empty.svg)'
                };
        }

        if (heroesState !== []) {
            heroes.push(React.DOM.option({key: heroesState.key, value: '', style: {display: 'none'}}, 'select hero'));
            heroesState.forEach(function (heroName) {
                heroes.push(React.DOM.option({
                    key: heroesState.key,
                    value: heroName.id
                }, '[' + heroName.class + '] ' + heroName.name + ' (id: ' + heroName.id + ')'));
            });
        }

        if (nameState !== [] && classState !== [] && levelState !== []) {
            base.push(React.DOM.div({key: nameState.key}, 'Name: ', nameState));
            base.push(React.DOM.div({key: classState.key}, 'Class: ', classState));
            base.push(React.DOM.div({key: levelState.key}, 'Level: ', levelState));
            if (paragonState !== []) {
                base.push(React.DOM.div({key: paragonState.key}, 'Paragon: ', paragonState));
            }
        }

        if (skillsState !== []) {
            skillsState.forEach(function (skillName) {
                var constructedLink,
                    runeType;
                if (skillName.rune) {
                    constructedLink = skillIconBaseUrl.concat(skillName.skill.icon);
                    switch (skillName.rune.type) {
                        case 'a':
                            runeType = {
                                backgroundPosition: '0 0'
                            };
                            break;
                        case 'b':
                            runeType = {
                                backgroundPosition: '0 25%'
                            };
                            break;
                        case 'c':
                            runeType = {
                                backgroundPosition: '0 49%'
                            };
                            break;
                        case 'd':
                            runeType = {
                                backgroundPosition: '0 73%'
                            };
                            break;
                        case 'e':
                            runeType = {
                                backgroundPosition: '0 97%'
                            };
                            break;
                    }
                    skills.push(React.DOM.div({key: skillsState.key, className: 'hasIcon'},
                            skillName.skill.name,
                            ' with ',
                            skillName.rune.name,
                            React.DOM.div({
                                key: skillsState.key,
                                className: 'icon-front',
                                style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                            }),
                            React.DOM.div({key: skillsState.key, className: 'icon-back', style: runeType}))
                    );
                } else if (skillName.skill) {
                    constructedLink = skillIconBaseUrl.concat(skillName.skill.icon);
                    skills.push(React.DOM.div({
                        key: skillsState.key,
                        className: 'hasIcon'
                    }, skillName.skill.name, React.DOM.div({
                        key: skillsState.key,
                        className: 'icon-front no-rune',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    })));
                }
            });
        }

        if (passivesState !== []) {
            passivesState.forEach(function (passiveName) {
                if (passiveName.skill) {
                    var constructedLink = skillIconBaseUrl.concat(passiveName.skill.icon);
                    passives.push(React.DOM.div({
                        key: passivesState.key,
                        className: 'hasIcon'
                    }, passiveName.skill.name, React.DOM.div({
                        key: passivesState.key,
                        className: 'icon',
                        style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                    })));
                }
            });
        }

        if (itemsState !== []) {
            if (itemsState.passive !== [] && itemsState.passive) {
                var hellfirePassiveLink = itemsState.passive[0].text.substring(9).replace(' passive.', '').replace(/ /g,'').toLowerCase(),
                    hellfirePassiveDisplay = itemsState.passive[0].text.substring(9).replace(' passive.', ''),
                    constructedLink;

                switch (classState) {
                    case 'demon-hunter':
                        constructedLink  = skillIconBaseUrl.concat('demonhunter_passive_', hellfirePassiveLink);
                        break;
                    case 'witch-doctor':
                        constructedLink  = skillIconBaseUrl.concat('witchdoctor_passive_', hellfirePassiveLink);
                        break;
                    case 'barbarian':
                        constructedLink  = skillIconBaseUrl.concat('barbarian_passive_', hellfirePassiveLink);
                        break;
                    case 'crusader':
                        constructedLink  = skillIconBaseUrl.concat('crusader_passive_', hellfirePassiveLink);
                        break;
                    case 'monk':
                        constructedLink  = skillIconBaseUrl.concat('monk_passive_', hellfirePassiveLink);
                        break;
                    case 'wizard':
                        constructedLink  = skillIconBaseUrl.concat('wizard_passive_', hellfirePassiveLink);
                        break;
                    default:
                        console.log('new class?');
                }
                specialPassive.push(React.DOM.div({key: itemsState.key, className: 'hasIcon'}, hellfirePassiveDisplay, ' (HA)', React.DOM.div({
                    key: itemsState.key,
                    className: 'icon',
                    style: {backgroundImage: 'url(' + constructedLink + '.png)'}
                })));
            }
        }

        if (statsState.life !== [] && statsState.damage !== [] && statsState.toughness !== [] && statsState.vitality !== []) {
            stats.push(React.DOM.div({key: statsState.key}, 'Life: ', statsState.life));
            stats.push(React.DOM.div({key: statsState.key}, 'Damage: ', statsState.damage));
            stats.push(React.DOM.div({key: statsState.key}, 'Toughness: ', statsState.toughness));

            if (classState === 'demon-hunter' || classState === 'monk') {
                stats.push(React.DOM.div({key: statsState.key}, 'Dexterity: ', statsState.dexterity));

            } else if (classState === 'witch-doctor' || classState === 'wizard') {
                stats.push(React.DOM.div({key: statsState.key}, 'Intelligence: ', statsState.intelligence));

            } else if (classState === 'barbarian' || classState === 'crusader') {
                stats.push(React.DOM.div({key: statsState.key}, 'Strength: ', statsState.strength));
            }
            stats.push(React.DOM.div({key: statsState.key}, 'Vitality: ', statsState.vitality));
        }

        return (
            React.DOM.div({className: 'd3-container'},
                React.DOM.div({className: 'd3-char-bg', style: style}),
                React.DOM.div({className: 'd3-api-url'},
                    React.DOM.input(
                        {
                            value: this.state.battleTag,
                            placeholder: 'NAME#1234',
                            onChange: this.handleChange
                        }
                    )
                ),
                React.DOM.div({className: 'd3-char-wrapper'},
                    React.DOM.select(
                        {
                            className: 'd3-chars',
                            ref: 'select',
                            value: this.state.selected,
                            onChange: this.setSelect
                        }, heroes
                    )
                ),
                React.DOM.div({className: 'panel-left'}, 'General', base),
                React.DOM.div({className: 'panel-bottom-left'}, 'Skills', skills),
                React.DOM.div({className: 'panel-bottom-right'}, 'Passives', passives, specialPassive),
                React.DOM.div({className: 'panel-right'}, 'Stats', stats)
            )
        );
    }
});

React.render(React.createElement(DataWrapper, {
        pollInterval: 2000
    }),
    document.getElementById('profile-data'));

// Ferdi#1763
// McleodNUS#2608


// todos
// save url to localStorage - done
// find out how animations triggers work
// correct stats
// <script src="http://us.battle.net/d3/static/js/tooltips.js"></script>
// https://eu.api.battle.net/d3/data/item/CmII7uHdNRIHCAQVtjA30B0yicdaHYQDodYdYJ4mRx29VYTTHT_yCdgdB16d0zCLGjiaA0AASANQElgEYJoDgAFGjQGfRZt_pQG9VYTTrQHegvzltQGgRZt_uAG6wuKqC8ABEhiTvcb8BVAAWAKgAdWb4uwOoAGVnfLhDqABk73G_AWgAcyPgPcBoAG-wY2rDw?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm
// http://media.blizzard.com/d3/icons/items/large/unique_chest_set_07_x1_demonhunter_male.png
