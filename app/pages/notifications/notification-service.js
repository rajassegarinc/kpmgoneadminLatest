(function () {
    "use strict";
    angular.module("kpmgoneapp").factory('notificationService', ["Restangular","dev","$http", function(rest, dev, $http) {
      var serviceApi = {};
      serviceApi.getSystemIP = function(){
        return $.get('http://jsonip.com');
      };

      serviceApi.getNotification = function(filter){
        return rest.one(dev.notifications.getNotificationList).customPOST(filter);
         //return $http.get(dev.notifications.getNotificationList);
      };


      serviceApi.getMemeberIds = function(query){
        var filter= {
          userId: query
        };
        return rest.one(dev.notifications.admemberlist).customPOST(filter);
        //return $http.get(dev.notifications.admemberlist);  // To be changed

      };

      serviceApi.createNotification = function(filter) {
        //var jsonObj = JSON.stringify(filter);
        return rest.one(dev.notifications.createNotification).customPOST(filter);
      };

      serviceApi.deleteNotifications = function(filter) {        
        /*var filter= {
          userId: filter
        };*/
        return rest.one(dev.notifications.deleteNotification+"/"+filter).remove();
      };
      //updateNotification

      serviceApi.updateNotifications = function(filter) {
        //var jsonObj = JSON.stringify(filter);
        return rest.one(dev.notifications.updateNotification).customPUT(filter);
      };


        return serviceApi;
    }]);
}());