<?php snippet('header') ?>
<div class="d3">
    <div class="header-center">D3 API</div>
    <div class="header-left">General</div>
    <div class="header-right">Uncorrected Stats</div>
    <div class="header-bottom-left">Skills & Runes</div>
    <div class="header-bottom-right">Passives</div>
    <div id="profile-data"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://fb.me/react-with-addons-0.13.1.js"></script>
    <script src="/assets/js/react-magic-move.js"></script>
    <script src="/assets/js/updateData.js"></script>
<!--    <script>-->
<!--        function callApi(){-->
<!--            return $.ajax({-->
<!--                url:            'http://eu.battle.net/api/d3/profile/Ferdi-1763/hero/44057278',-->
<!--                data:           {something: true},-->
<!--                dataType:       'jsonp',-->
<!--                contentType:    'application/json'-->
<!--            });-->
<!--        }-->
<!---->
<!--        function getJson() {-->
<!--            callApi()-->
<!--                .done(function(data){-->
<!--                    var passive = 'Ballistics',-->
<!--                        lifePercentBonus = 25,-->
<!--                        dmgPercentAmp = 45,-->
<!--                        dmgRed = -4,-->
<!--                        toughnessAmp = 12.5,-->
<!--                        name  =  'Name: ' + data.name,-->
<!--                        classn =  'Class: ' + data.class,-->
<!--                        level =  'Level: ' + data.level,-->
<!--                        plevel =  'Paragon Level: ' + data.paragonLevel,-->
<!--                        skillSet = [],-->
<!--                        passiveSet = [],-->
<!--                        statsSet = [];-->
<!--                    for(i=0; i< data.skills.active.length; i++){-->
<!--                        var skillName =  data.skills.active[i].skill.name;-->
<!--                        if (data.skills.active[i].rune !== undefined) {-->
<!--                            var runeName = data.skills.active[i].rune.name;-->
<!--                            skillSet[i] = '<li>';-->
<!--                            skillSet[i] += skillName + ' with ' + runeName;-->
<!--                            skillSet[i] += '</li>';-->
<!--                        }else {-->
<!--                            skillSet[i] = '<li>';-->
<!--                            skillSet[i] += skillName;-->
<!--                            skillSet[i] += '</li>';-->
<!--                        }-->
<!--                    }-->
<!--                    for(i=0; i< data.skills.passive.length; i++){-->
<!--                        var passiveName =  data.skills.passive[i].skill.name;-->
<!--                        passiveSet[i] = '<li>';-->
<!--                        passiveSet[i] += passiveName;-->
<!--                        passiveSet[i] += '</li>';-->
<!--                    }-->
<!--                    if (data.items.neck.name === 'Hellfire Amulet') {-->
<!--                        passiveSet[i] = '<li>';-->
<!--                        passiveSet[i] += passive + ' (HA)';-->
<!--                        passiveSet[i] += '</li>';-->
<!--                    }-->
<!---->
<!---->
<!--                    statsSet[0] =  'HP: ' + (data.stats.life + (data.stats.life * lifePercentBonus / 100));-->
<!--                    statsSet[1] =  'Damage: ' + (data.stats.damage + (data.stats.damage * dmgPercentAmp / 100)) + ' (' + (data.stats.damage + (data.stats.damage * dmgRed / 100)) + ') ';-->
<!--                    statsSet[2] =  'Toughness: ' + (data.stats.toughness + (data.stats.toughness * toughnessAmp / 100));-->
<!--                    statsSet[3] =  'Dexterity: ' + data.stats.dexterity;-->
<!--                    statsSet[4] =  'Vitality: ' + data.stats.vitality;-->
<!--                    for(i=0; i< 5; i++){-->
<!--                        $('#stats').append('<li>' + statsSet[i]+ '</li>');-->
<!--                    }-->
<!--                    $('#name').text(name);-->
<!--                    $('#class').text(classn);-->
<!--                    $('#level').text(level);-->
<!--                    $('#plevel').text(plevel);-->
<!--                    $('#skills').html(skillSet);-->
<!--                    $('#passives').html(passiveSet);-->
<!--                })-->
<!--        }-->
<!--        var timeout = setTimeout(function() {-->
<!--            getJson();-->
<!--        }, 1000);-->
<!--    </script>-->
</div>

<?php snippet('footer') ?>
