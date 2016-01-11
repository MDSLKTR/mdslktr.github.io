( function() {
    var bg = document.querySelector( '.d3-bg' ),
        animateDown = function() {
            TweenLite.fromTo(
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
}() );

//animatePanelsIn: function () {
//    this.setState({panelAnimationComplete: false});
//
//    TweenLite.fromTo(
//        panelLeft,
//        2,
//        {
//            x: panelLeftWidth * -1,
//            z: 0.01,
//            delay: 0.5
//        },
//        {
//            x: 0,
//            z: 0.01,
//            visibility: 'visible',
//            delay: 0.5,
//            ease: Back.easeOut.config(1.1),
//            onComplete: function () {
//                this.setState({panelAnimationComplete: true});
//
//                TweenLite.to(
//                    itemWrapper,
//                    2,
//                    {
//                        delay: 0.5,
//                        opacity: 1,
//                        visibility: 'visible'
//                    }
//                );
//
//                TweenLite.to(
//                    charBgWrapper,
//                    2,
//                    {
//                        delay: 0.5,
//                        opacity: 1,
//                        visibility: 'visible'
//                    }
//                );
//            }.bind(this)
//        }
//    );
//
//    TweenLite.fromTo(
//        panelRight,
//        2,
//        {
//            x: panelRightWidth,
//            z: 0.01,
//            delay: 0.5
//        },
//        {
//            x: 0,
//            ease: Back.easeOut.config(1.1),
//            z: 0.01,
//            visibility: 'visible',
//            delay: 0.5
//        }
//    );
//
//    TweenLite.fromTo(
//        panelBottomLeft,
//        2,
//        {
//            x: panelBottomLeftWidth * -1,
//            y: panelBottomLeftHeight,
//            delay: 0.5
//        },
//        {
//            x: 0,
//            y: 0,
//            ease: Back.easeOut.config(1.1),
//            z: 0.01,
//            visibility: 'visible',
//            delay: 0.5
//        }
//    );
//
//    TweenLite.fromTo(
//        panelBottomRight,
//        2,
//        {
//            x: panelBottomRightWidth,
//            y: panelBottomRightHeight,
//            delay: 0.5
//        },
//        {
//            x: 0,
//            y: 0,
//            ease: Back.easeOut.config(1.1),
//            z: 0.01,
//            visibility: 'visible',
//            delay: 0.5
//        }
//    );
//},
//
//animatePanelsOut: function () {
//    this.setState({panelAnimationComplete: false});
//
//    panelLeftWidth = panelLeft.offsetWidth;
//    panelRightWidth = panelRight.offsetWidth;
//    panelBottomLeftHeight = panelBottomLeft.offsetHeight;
//    panelBottomRightHeight = panelBottomRight.offsetHeight;
//    panelBottomLeftWidth = panelBottomLeft.offsetWidth;
//    panelBottomRightWidth = panelBottomRight.offsetWidth;
//
//    TweenLite.to(
//        itemWrapper,
//        0.25,
//        {
//            opacity: 0
//        }
//    );
//
//    TweenLite.to(
//        charBgWrapper,
//        0.25,
//        {
//            opacity: 0
//        }
//    );
//
//    TweenLite.to(
//        panelLeft,
//        1,
//        {
//            x: panelLeftWidth * -1,
//            z: 0.01,
//            delay: 0.5,
//            onComplete: function () {
//                this.setState({panelAnimationComplete: true});
//            }.bind(this)
//        }
//    );
//
//    TweenLite.to(
//        panelRight,
//        1,
//        {
//            x: panelRightWidth,
//            z: 0.01,
//            delay: 0.5
//        }
//    );
//
//    TweenLite.to(
//        panelBottomLeft,
//        1,
//        {
//            x: panelBottomLeftWidth * -1,
//            y: panelBottomLeftHeight,
//            delay: 0.5
//        }
//    );
//
//    TweenLite.to(
//        panelBottomRight,
//        1,
//        {
//            x: panelBottomRightWidth,
//            y: panelBottomRightHeight,
//            delay: 0.5
//        }
//    );
//},
//
//animateBonusPanelIn: function (panel, height, triggerStatCollector) {
//    TweenLite.to(
//        panel,
//        1.5,
//        {
//            y: 0,
//            z: 0.01,
//            visibility: 'visible',
//            ease: Power4.easeOut,
//            onComplete: function () {
//                this.setState({panelAnimationComplete: true});
//
//                if (triggerStatCollector === true) {
//                    this.triggerStatCollector();
//                }
//            }.bind(this)
//        }
//    );
//},
//
//animateBonusPanelOut: function (panel, height, dir) {
//    TweenLite.to(
//        panel,
//        1.5,
//        {
//            y: height * dir,
//            z: 0.01,
//            ease: Power4.easeOut,
//            onComplete: function () {
//                this.setState({panelAnimationComplete: true});
//            }.bind(this)
//        }
//    );
//},
