var app = angular.module("googlerecaptcha", []);
app.controller('captchaController', ['$scope', function ($scope) {
    $scope.showGoogleCaptcha = function (id) {
        if (captcha.captchaReq()) {  // this is check if captcha is already there
            captcha.showCaptcha(id);
        }
        else { 
            // if the already opened captcha is not answered do something here
            // generally if user clicks on submit button we show validations to answer the captcha
            alert('Prove you are not a robot');
        }
    };
}]);

var captcha = (function () {
    var hashMap_Captcha = [];
    var hashMap_Widget = [];   // to which container the captcha show be loaded

    var pushToHashMap_Captcha = function (id) {
        if (hashMap_Captcha[id] === undefined)
            return (hashMap_Widget[id] === undefined) ? true : false;
        return hashMap_Captcha[id];
    };

    var correctCaptcha = function (id, response) {
        var data = {
            captcha: { googleResponse: response }
        };
        if (true) { // ajax to validate the site key with secret key on server side
            hashMap_Captcha[id] = true;
        } else {
            alert("something wrong");
        }
    };

    var captchaCallback = function (id) {
        hashMap_Captcha[id] = false;
    };

    var showCaptcha = function (id) {
        try {
            var element = document.getElementById(id);
            if (hashMap_Widget[id] !== undefined) {
                hashMap_Captcha[id] = false;
                grecaptcha.reset(hashMap_Widget[id]);
            } else {
                var crrtCaptcha = correctCaptcha.bind(null, id);
                var cllbckCaptcha = captchaCallback.bind(null, id);
                
                hashMap_Widget[id] = grecaptcha.render(element, {
                    'sitekey': '****-*****', // place your site key here
                    'callback': crrtCaptcha,
                    'expired-callback': cllbckCaptcha
                });
            }
        }
        catch (ex) {
            alert("error loading captcha");
        }
        finally {
            pushToHashMap_Captcha(id);
        }
    };
    var captchaReq = function (id) {
        return pushToHashMap_Captcha(id);
    };
    return {
        showCaptcha: showCaptcha,
        captchaReq: captchaReq
    }
})();
