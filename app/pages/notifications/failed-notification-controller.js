(function() {
    "use strict";

    var failedNotificationController = function($rootScope, $scope, $filter, $http, rest, $location, $routeParams, $document, notificationService,logger) {
        $scope.pastNotifications = {};
        $scope.failedNotification = [];
         $scope.isLoading = true;
        var response = angular.fromJson(sessionStorage.getItem('userRoles'));
        if(response) {
            $scope._userId = response.userId;
            $scope._role = response.role;

            $scope.getAllNotificationFilter = {
                userId: $scope._userId,
                type: 'past'
            }
        }
 $rootScope.getNotifs();
        $scope.getNotifications = function() {
            notificationService.getNotification($scope.getAllNotificationFilter).then(function(response) {
                if(response) {
                    $scope.isLoading = false;
                    $scope.pastNotifications = response.pastnotificationlist;
                    $scope.getFailedNotification();
                }       
            },function(response) {
                $scope.isLoading = false;
                logger.logError("No data");
            });
        };

        $scope.$watch('isLoading', function(newValue, oldValue) {
            if(newValue==true) {
                $('body').css('overflow', 'hidden')
            }
            else {
                 $('body').css('overflow', 'auto')
            }
        });

        /*
            * method is used for copy text to clipboard
        */
        $scope.copyDataToClipboard =  function(data) {
           var copyFrom = document.createElement("textarea");
           copyFrom.textContent = data;
           var body = document.getElementsByTagName('body')[0];
           body.appendChild(copyFrom);
           copyFrom.select();
           document.execCommand('copy');
           body.removeChild(copyFrom);
           this.flashMessage('over5');
        }



        $scope.exportData = function (userIds,fileName) {
          var userId = '';
        angular.forEach(userIds, function(value, key) {
          userId += '<tr><td>'+value+'</td></tr>';
        });
          var htmlTemp =  "<table>"+
                          "<thead>"+
                                  " <tr>"+
                                       "<th>User Ids</th>"+
                                   "</tr>"+
                               "</thead>"+
                               "<tbody>"+userId
                                  +
                               "</tbody>"+
                           "</table>";
          var blob = new Blob([htmlTemp], {
                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          saveAs(blob, fileName+".xls");
        };

        $scope.getFailedNotification = function() {
          $scope.param = $location.search();
          $scope.fnObj = [];
          var foundObj = $filter('filter')( $scope.pastNotifications, {
                notificationid: $scope.param.notificationId
          }, true);

          
          

          $scope.failedNotification = foundObj[0];
          
        };

        function init() {
          $scope.getNotifications();          
        }
        init();
    };


    failedNotificationController.$inject = ["$rootScope", "$scope","$filter","$http", "Restangular", "$location", '$routeParams', '$document', 'notificationService', 'logger'];
    angular.module("kpmgoneapp").controller("failedNotificationController", failedNotificationController);
}());
