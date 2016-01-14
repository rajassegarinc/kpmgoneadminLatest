(function () {
    "use strict";
    angular.module("kpmgoneapp").factory('headerService', ["Restangular","dev","$http", function(rest, dev,$http) {
        var serviceApi = {};

        /*serviceApi.getUserId = function() {
        	//return rest.one(dev.appuserdetails.appuser).get();
            return $http.get(dev.user.getUser);
        };*/
       serviceApi.getApprovalAppDetails = function(postData){ 
           return rest.one(dev.onboardings.getOnboarding).customPOST(postData);
       };
       
        serviceApi.getRoles = function(filter) {
            return rest.one(dev.userRoles.getRoles).customPOST(filter);
        };

       serviceApi.getAppUserDetails = function(){
            //return rest.one(dev.appuserdetails.appuser).get();
       };

        return serviceApi;
    }]);
}());