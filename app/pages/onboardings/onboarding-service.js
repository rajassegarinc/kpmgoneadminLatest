(function () {
    "use strict";
    angular.module("kpmgoneapp").factory('onboardingService', ["Restangular","dev","$http", function(rest, dev,$http) {
        var serviceApi = {};

       serviceApi.getSystemIP = function(){
            return $.get('http://jsonip.com');
       };

       serviceApi.getApprovalAppDetails = function(postData){ 
           return rest.one(dev.onboardings.getOnboarding).customPOST(postData);
       };
       serviceApi.addRequest = function(postData){
           return rest.one(dev.onboardings.addRequest).customPUT(postData);
       }
       serviceApi.adminApproveReject = function(postData){
        return rest.one(dev.onboardings.adminApproveReject).customPUT(postData);
       }
       serviceApi.getAppAdminDetails = function(postData){
            return rest.one(dev.adminOnboardings.getAppAdmin).customPOST(postData);
       }
       serviceApi.viewOnboardAppDetails = function(postData){
           return rest.one(dev.onboardings.addRequest).customPUT(postData);
       };
       serviceApi.getAppDetails = function(appId){
           return rest.one(dev.onboardings.getAppDetails+'/'+appId).get();
       };
        return serviceApi;
    }]);
}());