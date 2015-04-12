(function () {

    function pageLoadAnimation(element, property) {
        var el = document.getElementById(element);
        console.log(document.getElementById(element));
        console.log(property);

        document.addEventListener('DOMContentLoaded' , function() {
            el.style.willChange = property;
        }, false);
        el.addEventListener('webkitAnimationEnd', function() {
            el.style.willChange = 'unset';
        }, false);
        el.addEventListener('animationend', function() {
            el.style.willChange = 'auto';
        }, false);
    }

    pageLoadAnimation('d3-bg', 'transform, filter');
    pageLoadAnimation('panel-left', 'transform, content');
    pageLoadAnimation('panel-right', 'transform, content');
    pageLoadAnimation('panel-bottom-left', 'transform, content');
    pageLoadAnimation('panel-bottom-right', 'transform, content');

}());
