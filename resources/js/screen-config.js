var screenConfig = (function () {
    var dom = {},
        catchDom = function () {
            dom.transitionPanel = $('#app-transitions');
            dom.document = $(window);
        },
        suscribeEvents = function () {
            $(window).resize(reziseTransitionPanel)
        },
        reziseTransitionPanel = function (e) {
            //alert(dom.document.height() - 57);
                dom.transitionPanel.height(dom.document.height()-57)
            },        
        initialize = function () {
            catchDom();
            reziseTransitionPanel();
            suscribeEvents();
        };

    return {
        init: initialize
    }
})();


screenConfig.init();