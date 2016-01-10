var skillDamageCollectorClass = React.createClass({
    displayName: 'skill-damage-collector',
    getInitialState: function () {
        return {
            itemCollection: [],
            itemCount: 0
        };
    },
    componentDidMount: function () {
        var self = this;
        EventSystem.subscribe('api.call.item.collection', function (data) {
            self.setState({
                itemCollection: data
            });
        });

        EventSystem.subscribe('api.call.skills', function (data) {
            self.setState({
                skills: data.actives
            });
        });

        EventSystem.subscribe('api.call.stats', function (data) {
            self.setState({
                generalStats: data.general
            });
        });

        EventSystem.subscribe('api.call.items', function (data) {
            self.setState({
                itemCount: data.count
            });
        });

        EventSystem.subscribe('api.try.collect', function (data) {
            if (self.state.itemCount === data) {
                self.collect();
            }
        });

        EventSystem.subscribe('api.call.collect', function () {
            self.collect();
        });
    },

    skillDmgSanitize: function (obj) {
        var calc = 0;
        var string = '';
        var combined = '';
        var skillDamageRaw = [];

        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {

                string = p.toString().slice(4);

                if (parseFloat(p)) {
                    calc = parseFloat(p) * parseFloat(obj[p]);
                }

                if (calc !== 0) {
                    combined += string + ' ' + Math.round(calc * 10000) / 100 + '%' + '<br>';
                    skillDamageRaw.push(calc + ' ' + string);
                }
            }
        }
        if (combined !== '') {
            this.setState({skillDmgRaw: skillDamageRaw});
            return combined;
        }
    },

    collect: function () {
        var that = this;

        if (!this.state.itemCollection || !this.state.skills || !this.state.generalStats ) {
            return;
        }
        return new Promise(function (resolve, reject) {
            Worker.create = function (workerJob) {
                var str = workerJob.toString();
                var blob = new Blob(
                    ['\'use strict\';\nself.onmessage =' + str],
                    {type: 'text/javascript'}
                );
                return window.URL.createObjectURL(blob);
            };

            var workerBlob = Worker.create(function (e) {
                var itemSlots = e.data.itemSlots,
                    skillDamage = e.data.skillDamage,
                    skills = e.data.skills,
                    className = e.data.className,
                    i,
                    k,
                    m,
                    p,
                    reducedValues = [],
                    skillPrefixMapping = [
                        ['demon-hunter', 'Power_Damage_Percent_Bonus#DemonHunter_'],
                        ['witch-doctor', 'Power_Damage_Percent_Bonus#Witchdoctor_'],
                        ['barbarian', 'Power_Damage_Percent_Bonus#Barbarian_'],
                        ['crusader', 'Power_Damage_Percent_Bonus#Crusader_'],
                        ['monk', 'Power_Damage_Percent_Bonus#Monk_'],
                        ['wizard', 'Power_Damage_Percent_Bonus#Wizard_']
                    ],
                    skillsPercentBonusNames = [],
                    skillsPercentBonusValues = [];

                skillDamage.value = 0;

                for (m = 0; m < skills.length; m++) {
                    if (skills[m].skill) {
                        for (p = 0; p < skillPrefixMapping.length; p++) {
                            if (skillPrefixMapping[p][0] === className) {
                                skillsPercentBonusNames.push(skillPrefixMapping[p][1] + skills[m].skill.name.replace(/ /g, ''));
                            }
                        }
                    }
                }

                for (i = 0; i < itemSlots.length; i++) {
                    if (itemSlots[i].attributesRaw) {
                        for (k = 0; k < skillsPercentBonusNames.length; k++) {
                            if (itemSlots[i].attributesRaw[skillsPercentBonusNames[k]]) {
                                if (Object.getOwnPropertyNames(itemSlots[i].attributesRaw[skillsPercentBonusNames[k]] === skillsPercentBonusNames[k])) {
                                    skillsPercentBonusValues.push(parseFloat(itemSlots[i].attributesRaw[skillsPercentBonusNames[k]].min) + skills[k].skill.name);
                                    reducedValues = skillsPercentBonusValues.reduce(function (p, c) {
                                        if (c in p) {
                                            p[c]++;
                                        } else {
                                            p[c] = 1;
                                        }
                                        return p;
                                    }, {});
                                }
                            }
                        }
                    }
                }

                // send results back to the main thread
                this.postMessage({
                    countedValues: reducedValues
                });

                // die
                this.close();
            });

            // create worker instance
            var worker = new Worker(workerBlob);

            worker.onmessage = function (e) {
                resolve();

                that.setState({
                    skillDmg: that.skillDmgSanitize(e.data.countedValues)
                }, function () {
                    EventSystem.publish('api.collect.skill-damage', that.state.skillDmg);
                });

                console.info('the web worker had a save journey');
            };

            // return a failure message if the worker didn't complete
            worker.onerror = function (e) {
                reject(Error(
                    'one of the workers had an horrible accident\n' +
                    e.message +
                    ' in line ' +
                    e.lineno)
                );
                this.terminate();
            };

            worker.postMessage({
                itemSlots: that.state.itemCollection,
                skillDamage: Stats.get('SkillDamage'),
                skills: that.state.skills,
                className: that.state.generalStats.class.value
            });
        });
    },

    render: function () {
        return (
            React.DOM.div({
                    style: {'display': 'none'}
                }, 'Skill Damage Worker'
            )
        );
    }
});

var skillDamageCollector = React.createFactory(skillDamageCollectorClass);
