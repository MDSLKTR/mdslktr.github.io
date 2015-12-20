var EventSystem = (function() {
    var self = this;

    self.queue = {};

    return {
        publish: function (event, data) {
            var queue = self.queue[event];

            if (typeof queue === 'undefined') {
                return false;
            }

            queue.forEach(function (event) {
                (event)(data);
            });

            return true;
        },
        subscribe: function(event, callback) {
            if (typeof self.queue[event] === 'undefined') {
                self.queue[event] = [];
            }

            self.queue[event].push(callback);
        },
        unsubscribe: function(event) {
            self.queue[event] = [];
        }
    };
}());
