(function () {
    var bg = document.querySelector('.d3-bg'),
        animateDown = function() {
            TweenMax.fromTo(
                bg,
                3,
                {
                    y: -100,
                    z: 0.01
                },
                {
                    y: 0,
                    z: 0.01
                }
            );
        };

    animateDown();
}());


