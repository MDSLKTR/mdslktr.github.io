var service = React.createClass({
    statics: {
        create: function (type, realm, battleTag, key ) {
            return new Promise(function (resolve) {
                var url,
                    apiKey = '?locale=en_GB&apikey=jrgy6zyyncxauzt2ub5m4f7zqg25fptm',
                    apiBase = '.api.battle.net/d3/profile/',
                    prefix = 'https://',
                    formatBattleTag = battleTag.replace(/#/g, '-'),
                    heroSeparator = '/hero/',
                    separator = '/',
                    toolTipBase = '.api.battle.net/d3/data/';

                switch ( type ) {
                    case 'heroes-list':
                        url = prefix + realm + apiBase.concat(formatBattleTag, separator, apiKey);
                        break;
                    case 'hero-data':
                        url = prefix + realm + apiBase.concat(formatBattleTag, heroSeparator, key, apiKey);
                        break;
                    case 'item-data':
                        url = prefix + realm + toolTipBase.concat(key, apiKey);
                        break;
                }

                resolve(url);
            });
        },
        get: function (url) {
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function () {
                    if (request.status === 200) {
                        resolve(request.response);
                    } else {
                        reject(Error(request.statusText));
                    }
                };
                request.send();
            });
        }
    },

    render: function () {}
});
