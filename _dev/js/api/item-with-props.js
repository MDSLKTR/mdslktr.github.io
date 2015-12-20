var itemWithPropsClass = React.createClass({
    loadItemDataWithProps: function (itemKey, left) {
        var self = this,
            type = 'item-data';

        service.create(type, this.state.realm, this.state.battleTag, itemKey).then(function (url) {
            service.get(url).then(function (response) {
                var data = JSON.parse(response);

                if (self.state.debugMode) {
                    console.log(data);
                }

                switch (data.type.id) {
                    case 'Ring':
                        if (left) {
                            self.setState({ringItemLeft: data});
                        } else {
                            self.setState({ringItemRight: data});
                        }
                        break;
                    case 'Quiver':
                    case 'CrusaderShield':
                    case 'Shield':
                    case 'Orb':
                    case 'Source':
                    case 'Mojo':
                        self.setState({offItem: data});
                        break;
                    case 'Dagger':
                    case 'Sword':
                    case 'Mace':
                    case 'Axe':
                    case 'FistWeapon':
                    case 'MightyWeapon1H':
                    case 'Flail1H':
                    case 'HandXbow':
                    case 'Bow':
                    case 'Wand':
                    case 'Staff':
                        self.setState({offItem: data});
                        break;
                }
            });
        });
    },

    render: function () {}
});

var itemWithProps = React.createFactory(itemWithPropsClass);
