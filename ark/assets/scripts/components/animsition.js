(function($){
// Animsition
var Animsition = function() {
    "use strict";

    // Handle Animsition Function
    var handleAnimsitionFunction = function() {
        if( /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10 ){
            // IE < 10
            $('.animsition').removeClass('animsition');
            return;
        }
        $(document).ready(function() {
            //$('.animsition').css('opacity', 1);
            $(".animsition").animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                // loadingInner: '', // e.g '<img src="loading.svg" />'
                timeout: false,
                timeoutCountdown: 0,
                onLoadEvent: true,
                browser: [
                    'animation-duration',
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    '-o-animation-duration'
                    ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body',
                transition: function(url){ window.location.href = url; }
            });
        });
    }

    return {
        init: function() {
            handleAnimsitionFunction(); // initial setup for animsition function
        }
    }
}();

$(document).ready(function() {
    Animsition.init();
});
})(jQuery);
