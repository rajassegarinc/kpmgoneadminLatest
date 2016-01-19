(function() {
    "use strict";
    var myApp = angular.module('kpmgoneapp', ['ngRoute','restangular','oi.select','ngResource', 'hljs', 'gettext','ui.bootstrap.datetimepicker','ngFileUpload','ngSanitize','numberDirective']);
    /**
     * AngularJS default filter with the following expression:oi.select
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */


    myApp.filter('moment', function () {
      return function (input, momentFn) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
      };
    });



    myApp.filter('propsFilter', function() {
      return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
          var keys = Object.keys(props);
            
          items.forEach(function(item) {
            var itemMatches = false;

            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      };
    });

    myApp.config(function($routeProvider){
      $routeProvider
      .when("/",  {
          templateUrl: "app/pages/notifications/adhoc-template.html",
          controller: "notificationController"
        })
        .when("/appApprovals",  {
          templateUrl: "app/pages/onboardings/app-approval-template.html",
          controller: "onboardingController"
        })
        .when("/viewAppDetails",  {
          templateUrl: "app/pages/onboardings/view-approval-template.html",
          controller: "adminOnboardingController"
        })
        .when("/editAppDetails",  {
          templateUrl: "app/pages/onboardings/edit-onboarding-template.html",
          controller: "adminOnboardingController"
        })
        .when("/appAdmin",  {
          templateUrl: "app/pages/onboardings/app-admin-template.html",
          controller: "adminOnboardingController"
        })
        .when("/onboardedapp",  {
          templateUrl: "app/pages/onboardings/onboardedapp-template.html",
          controller: "onboardingController"
        })
        .when("/rejectededapp",  {
          templateUrl: "app/pages/onboardings/rejectedapp-template.html",
          controller: "onboardingController"
        })
        .when("/onboardingsubmit",  {
          templateUrl: "app/pages/onboardings/submit-onboarding-template.html",
          controller: "onboardingController"
        })
        .when("/adhoc",  {
          templateUrl: "app/pages/notifications/adhoc-template.html",
          controller: "notificationController"
        })
        .when("/notifications",  {
          templateUrl: "app/pages/notifications/notification-template.html",
          controller: "notificationController",
        })
        .when("/failedNotification", {
          templateUrl: "app/pages/notifications/failed-notification-template.html",
          controller: "failedNotificationController",
        })
        .when("/analytics",  {
          templateUrl: "app/pages/notifications/analytics-template.html",
          controller: "notificationController"
        })
        .otherwise({
          redirectTo: "/"
        });
    });

    var serviceUrl = window.location.protocol + '//' + window.location.hostname+(window.location.port ? ':'+window.location.port: '');
    var apiBaseUrl;
    

/*    if(serviceUrl.search('http://localhost') != -1){
       apiBaseUrl = "http://02502-dev.photoninfotech.com/kpmg_one/v1.0/";
    }
    else {
      //apiBaseUrl = serviceUrl;  
      apiBaseUrl = "http://usamzapd2064.us.kworld.kpmg.com/kpmg_one/v1.0/"     
    }*/

    myApp.constant('hostDetails', {
       // KPMG dev
      //apiUrl: "http://useomlxn00006.nix.us.kworld.kpmg.com:8080/kpmg_one/v1.0/"
     // apiUrl: "https://useomlxn00006.nix.us.kworld.kpmg.com:8443/kpmg_one/v1.0/"
     // apiUrl: "https://lab-kpmgone-dev.us.kworld.kpmg.com/kpmg_one/v1.0/"

      //qa
     //apiUrl: "https://useomlxn00008.nix.us.kworld.kpmg.com:8443/kpmg_one/v1.0/"
     // apiUrl: "http://useomlxn00008.nix.us.kworld.kpmg.com:8080/kpmg_one/v1.0/"
      
     //uat
      //apiUrl:"https://useomlxu00019.nix.us.kworld.kpmg.com/kpmg_one/v1.0/"

      
      /*local api url*/

      apiUrl: "http://172.16.60.87:8080/KPMGRestful/v1.0/"
      //apiUrl: "http://02502-dev.photoninfotech.com/kpmg_one/v1.0/"
      
    });
     
    myApp.config(['$httpProvider', 'RestangularProvider', 'hostDetails',
        function($httpProvider, RestangularProvider, hostDetails) {
            $httpProvider.defaults.useXDomain = true;

            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/x-www-form-urlencoded' };

            $httpProvider.defaults.headers.put['Content-Type'] =
                'application/json; charset=UTF-8';

            $httpProvider.defaults.headers.post['Content-Type'] =
                'application/json; charset=UTF-8';

             RestangularProvider.setDefaultHttpFields({
                'cache': false
            });
            RestangularProvider.setBaseUrl(hostDetails.apiUrl);
        }
    ]);

    myApp.factory('logger', [
      function() {
        var logIt;
        toastr.options = {
          "closeButton": true,
          "positionClass": "toast-bottom-right",
          "timeOut": "3000"
        };
        logIt = function(message, type) {
          return toastr[type](message);
        };
        return {
          log: function(message) {
            logIt(message, 'info');
          },
          logWarning: function(message) {
            logIt(message, 'warning');
          },
          logSuccess: function(message) {
            logIt(message, 'success');
          },
          logError: function(message) {
            logIt(message, 'error');
          }
        };
      }
    ]);

    
    myApp.constant('env', 'dev');
    myApp.constant('dev', {
        userRoles: {
          getRoles: 'adServices/getRole'
        },
        onboardings: {
            getAppDetails: 'admin/UI/OnBoardedApp',
            getOnboarding: 'admin/UI/OnBoardedApps',
            addRequest: 'updateOnBoardApp',
            adminApproveReject: 'admin/UI/ApproveReject'
        },
        adminOnboardings: {
            getAppAdmin: 'appDiscovery/getOnboardedUsers'
        },
        
        appuserdetails: {
            appuser: 'mockJson/appuser.json'
        },
        notifications: {
          getNotificationList: "adhocNotification/getNotifications",
          getAllNotificationList: "adhocNotification/getAllNotifications",
          admemberlist: 'adServices/searchEmail',
          //admemberlist: 'mockJson/admember_list.json',
          createNotification: 'adhocNotification/create',
          deleteNotification: 'adhocNotification/delete',
          updateNotification: 'adhocNotification/update',
          failedNotification: 'adhocNotification/failedNotification'
        }
      });

}());


angular.module('numberDirective', []).directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});

(function(window, angular, undefined) {'use strict';
    var agl = angular || {};
    var ua  = navigator.userAgent;

    agl.ISFF     = ua.indexOf('Firefox') != -1;
    agl.ISOPERA  = ua.indexOf('Opera') != -1;
    agl.ISCHROME = ua.indexOf('Chrome') != -1;
    agl.ISSAFARI = ua.indexOf('Safari') != -1 && !agl.ISCHROME;
    agl.ISWEBKIT = ua.indexOf('WebKit') != -1;

    agl.ISIE   = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    agl.ISIE6  = ua.indexOf('MSIE 6') > 0;
    agl.ISIE7  = ua.indexOf('MSIE 7') > 0;
    agl.ISIE8  = ua.indexOf('MSIE 8') > 0;
    agl.ISIE9  = ua.indexOf('MSIE 9') > 0;
    agl.ISIE10 = ua.indexOf('MSIE 10') > 0;
    agl.ISOLD  = agl.ISIE6 || agl.ISIE7 || agl.ISIE8 || agl.ISIE9; // MUST be here

    agl.ISIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
    agl.ISIE10UP = agl.ISIE10 || agl.ISIE11UP;
    agl.ISIE9UP  = agl.ISIE9 || agl.ISIE10UP;

})(window, window.angular);


