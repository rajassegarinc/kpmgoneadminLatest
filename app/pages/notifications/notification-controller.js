(function() {
    "use strict";

    var notificationController = function($rootScope, $scope, $filter, $http, rest, 
        $location, $document, notificationService, $q, $timeout,logger) {
        var ctrl = this;
        $scope.notification= {}; 
        $scope.futureNotifications = [];
        $scope.pastNotifications = [];
        $scope.notificationScope = [];
        $scope.userIdLists = [];
        $scope.date= '';
        $scope.formNotValid = false;
        $scope.notificationMembersList=[];
        $scope.notificationGoLiveDate='';
        $scope.createNotificationFilter = [];
        $scope.appAdminId = '';
        $scope.notificationSubject = '';
        $scope.notificationMessage = '';
        $scope.notificationGoLiveDate = '';
        $scope.isUpdate = false; 
        $scope.isConfirm = false;
        $scope.notificationId = '';
        $scope.currentNotificationId = '';
        $scope.notificationIndex = '';
        $scope.failedNotificationList = [];
        $scope.isLoading = true;
        $scope.isEmpty = false;
        $scope.allpastNotifications = [];
        $scope.pastOffset = 0;
        $scope.futureOffset = 0;

        var response = angular.fromJson(sessionStorage.getItem('userRoles'));
        if(response) {
            $scope._userId = response.userId;
            $scope._role = response.role;

            $scope.getAllNotificationFilter = {
                userId: $scope._userId,
                type: ''
            }
            $scope.getAllUsersNotificationFilter = {
                userId: $scope._userId,
                type: '',
                limit:20
            }
        }
 $rootScope.getNotifs();
        $scope.createNotificationFilter = [{
            userId: $scope._userId,
            subject: '',
            msg: '',
            golivedate: '',
            userids: {
                userIdList: [],
                adGroupList: [],
                distributionList: []
            }
        }];

        $scope.updateNotificationFilter = [{
            notificationId: '',
            userId: $scope._userId,
            subject: '',
            msg: '',
            golivedate: '',
            userids: {
                userIdList: [],
                adGroupList: [],
                distributionList: []
            }
        }];

        $scope.clearRequestForm = function() {
            $scope.isUpdate = false;            
            $scope.notificationSubject = '';
            $scope.notificationMessage = '';
            $scope.notificationGoLiveDate = '';
            $scope.notificationMembersList = '';
            $scope.adhocNotication.$setPristine();
           $scope.adhocNotication.$setUntouched();
        };

        $('#messageTxtBox').keypress(function(){
            var messageText =$(this).val();
             if(messageText.length > 149){
                $('#toast-container').remove();
            logger.logError("Message cannot exceed 150 characters.");
            }
        });

        $('#mynotificationSubject').keypress(function(){
            var messageText = $(this).val();
             if(messageText.length > 49){
                $('#toast-container').remove();
                logger.logError("Subject cannot exceed 50 characters.");
            }
        });
        //console.log($scope.createNotificationFilter);
        $scope.submitRequest = function() {
            if($scope.isUpdate) {
                $scope.updateNotifications();
                $scope.isUpdate = false;
            }
            else {
                $scope.createNotifications();
            }
        }

        
        $scope.createNotifications = function() {
            $scope.isLoading = true;
            $scope.createNotificationFilter[0].subject = '';
            $scope.createNotificationFilter[0].msg = '';
            $scope.createNotificationFilter[0].golivedate = '';
            $scope.createNotificationFilter[0].userids.userIdList = [];
            $scope.createNotificationFilter[0].userids.adGroupList = [];
            $scope.createNotificationFilter[0].userids.distributionList = [];

            $scope.createNotificationFilter[0].subject = $scope.notificationSubject;
            $scope.createNotificationFilter[0].msg = $scope.notificationMessage;
            var ChangeFormat = moment($scope.notificationGoLiveDate,'MM/DD/YY HH:mm').format('YYYY-MM-DD HH:mm');
            $scope.createNotificationFilter[0].golivedate = ChangeFormat+':00';
            
            var userids = {};
            var userIdList = [];
            var adGroupList = [];
            var distributionList = [];

           // console.log($scope.notificationMembersList);


            var userIdListCat = $filter('filter')($scope.notificationMembersList, {
                category: "userIdList"
            });
            

            angular.forEach(userIdListCat, function(value, key) {
                var userId = value.id;
                userId = userId.replace(/@kpmg.com+/i, '');
                $scope.createNotificationFilter[0].userids.userIdList.push(userId);
            });

            var adGroupList = $filter('filter')($scope.notificationMembersList, {
                category: "adGroupList"
            });

            angular.forEach(adGroupList, function(value, key) {
                $scope.createNotificationFilter[0].userids.adGroupList.push(value.id);
            });

            var distributionList = $filter('filter')($scope.notificationMembersList, {
                category: "distributionList"
            });

            angular.forEach(distributionList, function(value, key) {
                $scope.createNotificationFilter[0].userids.distributionList.push(value.id);
            });


            // $scope.isUpdate
            //console.log($scope.createNotificationFilter[0]);

            notificationService.createNotification($scope.createNotificationFilter[0]).then(function(response) {
				logger.logSuccess("Notification successfully created");
                $scope.getFutureNotifications();
                $scope.futureNotifications=$scope.notificationScope;
                $scope.isLoading = false;  
                $scope.clearRequestForm();
            },
            function(response){
                /*error*/
                $scope.isLoading = false;  
                logger.logError("Error. Try after some time");
            });
          
            
        };

        $scope.updateNotifications = function() {
            $scope.isLoading = true;  

            $scope.updateNotificationFilter[0].subject = '';
            $scope.updateNotificationFilter[0].msg = '';
            $scope.updateNotificationFilter[0].golivedate = '';
            $scope.updateNotificationFilter[0].userids.userIdList = [];
            $scope.updateNotificationFilter[0].userids.adGroupList = [];
            $scope.updateNotificationFilter[0].userids.distributionList = [];


            $scope.updateNotificationFilter[0].notificationId = $scope.notificationId; 
           // console.log($scope.updateNotificationFilter[0].notificationId);          
            $scope.updateNotificationFilter[0].subject = $scope.notificationSubject;
            $scope.updateNotificationFilter[0].msg = $scope.notificationMessage;

            var ChangeFormat = moment($scope.notificationGoLiveDate,'MM/DD/YY HH:mm').format('YYYY-MM-DD HH:mm');
            $scope.updateNotificationFilter[0].golivedate = ChangeFormat+':00';
            
            //console.log($scope.notificationMembersList);

            var userIdListCat = $filter('filter')($scope.notificationMembersList, {
                category: "userIdList"
            });

            var distributionListCat = $filter('filter')($scope.notificationMembersList, {
                category: "distributionList"
            });

            var adGroupsCat = $filter('filter')($scope.notificationMembersList, {
                category: "adGroupList"
            });

            var userids = {};
            var userIdList = [];
            var adGroupList = [];
            var distributionList = [];

            $scope.updateNotificationFilter[0].userids.userIdList= [];
            if(userIdListCat) {
                angular.forEach(userIdListCat, function(value, key) {                
                    if($scope.updateNotificationFilter[0].userids.userIdList.indexOf(value.id) == -1) {
                        var userId = value.id;
                        userId = userId.replace(/@kpmg.com+/i, '');
                        $scope.updateNotificationFilter[0].userids.userIdList.push(userId); 
                    }
                });
            }
            
            $scope.updateNotificationFilter[0].userids.adGroupList= [];
            if(adGroupsCat) {
                angular.forEach(adGroupsCat, function(value, key) {                
                    if($scope.updateNotificationFilter[0].userids.adGroupList.indexOf(value.id) == -1) {
                        $scope.updateNotificationFilter[0].userids.adGroupList.push(value.id); 
                    }
                });
            }
            
            $scope.updateNotificationFilter[0].userids.distributionList= [];
            if(distributionListCat) {
                angular.forEach(distributionListCat, function(value, key) {                
                    if($scope.updateNotificationFilter[0].userids.distributionList.indexOf(value.id) == -1) {
                        $scope.updateNotificationFilter[0].userids.distributionList.push(value.id);
                    }
                });
            }

           // console.log($scope.updateNotificationFilter[0]);
            notificationService.updateNotifications($scope.updateNotificationFilter[0]).then(function(response) {
				logger.logSuccess("Notification successfully updated");
                if( $( ".kpmg-one-past-note" ).hasClass( "active" ) ) {
                    $scope.getPastNotifications();
                    $scope.pastNotifications=$scope.notificationScope;
                } else {
                    $scope.getFutureNotifications();
                    $scope.futureNotifications=$scope.notificationScope;
                }
                $scope.isLoading = false;  
                $scope.clearRequestForm();
            },
            function(response){
                /*error*/
                $scope.isLoading = false;  
                logger.logError("Error. Try after some time");
            });
          
            
        };

        $scope.getPastNotifications = function() {
            $scope.futureOffset = 0;
            $scope.pastOffset = 0;
            $scope.isLoading = true;
            $scope.getAllNotificationFilter.type="past";
            notificationService.getNotification($scope.getAllNotificationFilter).then(function(response) {
                    $scope.pastNotifications = response.pastnotificationlist;
                    $scope.isLoading = false;
	            $scope.clearRequestForm();
            },function(response) {
                logger.logError("Error. No data");
                $scope.isLoading = false;
            }); 
        };

        $scope.getAllUsersNotifications = function(type) {
            if($rootScope.appUserResponse.role != 'super admin') {
                return false;
            }
            if( $( ".kpmg-one-past-note" ).hasClass( "active" ) ) {
                type = 'past';
            } else {
                type = 'future';
            }
            $scope.isLoading = true;
            $scope.getAllUsersNotificationFilter.type="past";
            if(type === 'past') {
                $scope.getAllUsersNotificationFilter.pastOffset = $scope.pastOffset;
            } else {
                $scope.getAllUsersNotificationFilter.futureOffset = $scope.futureOffset;
            }   
            notificationService.getAllNotification($scope.getAllUsersNotificationFilter).then(function(response) {
                    if(type === 'past') {
                        $scope.pastNotifications = $scope.pastNotifications.concat(response.pastnotificationlist);
                        $scope.pastOffset = $scope.getAllUsersNotificationFilter.pastOffset + 20;
                    } else {
                        $scope.futureNotifications = $scope.futureNotifications.concat(response.futurenotificationlist);
                        $scope.futureOffset = $scope.getAllUsersNotificationFilter.futureOffset + 20;
                    }
                    
                    $timeout(function() {
                        $scope.isLoading = false;    
                    }, 1000);
                    
            },function(response) {
                logger.logError("Looks like something went wrong. Please try again.");
                $scope.isLoading = false;
            }); 
        };

        $scope.getFutureNotifications = function() {
            $scope.futureOffset = 0;
            $scope.pastOffset = 0;
            $scope.isLoading = true;  
            $scope.getAllNotificationFilter.type="future";
            notificationService.getNotification($scope.getAllNotificationFilter).then(function(response) {
               // if(response.data) {                    
                    $scope.futureNotifications = response.futurenotificationlist;       
                    $scope.isLoading = false;  
	            $scope.clearRequestForm();
               //}       
            },function(response) {
                //alert(response.status);
                $scope.isLoading = false;
                logger.logError("Error. No data");
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

        $scope.editNotification = function(notificationId,event,$event) {
            $event.stopPropagation();
            $scope.formNotValid=false;
            $scope.clearRequestForm();
            $scope.isUpdate = true;      
            if(event == "future") {
                $scope.notificationScope = angular.copy($scope.futureNotifications);
            }
            else {
                $scope.notificationScope = angular.copy($scope.pastNotifications);
            }
            var id = notificationId;
            var found = $filter('filter')($scope.notificationScope, {
                notificationid: id
            }, true);
            $scope.notificationId = notificationId;
            if (found.length) {
                $scope.notificationMembersList=[];
                $scope.editNotificationObj = angular.copy(found[0]);
                $scope.notificationSubject = $scope.editNotificationObj.messagetitle;
                $scope.notificationMessage = $scope.editNotificationObj.messagedetails;
                //$scope.notification.notificationGoLiveDate = $scope.editNotificationObj.timestamp;
                $scope.notificationGoLiveDate = moment($scope.editNotificationObj.timestamp).format('MM/DD/YY HH:mm');
                var totalObj = {};
                totalObj.userIdList = [];

                //$scope.notification.notificationMembersList = [{"id": "vdeshmuk", "category": "userId"}];
                
                var obj = {
                    id : ''
                };


                console.log($scope.editNotificationObj);
                if($scope.editNotificationObj.userids.userIdList.length > 0) {
                    angular.forEach($scope.editNotificationObj.userids.userIdList, function(value, key) {
                        var obj = {};
                        obj.id = value + '@kpmg.com';
                        obj.category = 'userIdList';
                        totalObj.userIdList.push(obj);
                    });
                }

                if($scope.editNotificationObj.userids.adGroupList.length > 0) {
                    angular.forEach($scope.editNotificationObj.userids.adGroupList, function(value, key) {
                       var obj = {};
                        obj.id = value;
                        obj.category = 'adGroupList';
                        totalObj.userIdList.push(obj);
                    });
                }

                if($scope.editNotificationObj.userids.distributionList.length > 0) {
                    angular.forEach($scope.editNotificationObj.userids.distributionList, function(value, key) {
                       var obj = {};
                        obj.id = value;
                        obj.category = 'distributionList';
                        totalObj.userIdList.push(obj);
                    });
                }


                $scope.notificationMembersList = totalObj.userIdList;
                $scope.apply();   
            }

            var filter = {
                /*data for posting as parameter*/
            }

        };

        $scope.showFailedNotifications = function(notificationId) {
            var id = notificationId;
            $location.path("/failedNotification").search('notificationId', notificationId);
            
        };

        $scope.deleteNotification = function(notificationId,index) {
            $scope.isLoading = true;
            notificationService.deleteNotifications(notificationId).then(function(response) {
                // success full message
                $scope.getFutureNotifications();
                $scope.adhocNotication.$setPristine();
                $scope.clearRequestForm();
                logger.logSuccess("Notification successfully deleted");
                $scope.isConfirm = false;
                $scope.isLoading = false;
            },
            function() {
                $scope.isLoading = false;
                logger.logError("Error. Try after some time");
            });
        };


        $scope.getAllUserIds = function(query) {
            var lastestQuery = query;
            if((query.length > 2)) {   
            var deferred = $q.defer();
            $timeout(function() {
                notificationService.getMemeberIds(query).then(function(response) {
                    if(response) {
                        $scope.idLists = angular.copy(response);
                        var totalObj = {};
                        totalObj.userIdList = [];
                        if($scope.idLists.users.length > 0) {
                            angular.forEach($scope.idLists.users, function(value, key) {
                               var obj = {};
                                obj.id = value + '@kpmg.com';
                                obj.category = 'userIdList';
                                totalObj.userIdList.push(obj);
                            });
                        }
                        if($scope.idLists.adGroups.length > 0) {
                            angular.forEach($scope.idLists.adGroups, function(value, key) {
                               var obj = {};
                                obj.id = value;
                                obj.category = 'adGroupList';
                                totalObj.userIdList.push(obj);
                            });
                        }
                        if($scope.idLists.distributionList.length > 0) {
                            angular.forEach($scope.idLists.distributionList, function(value, key) {
                               var obj = {};
                                obj.id = value;
                                obj.category = 'distributionList';
                                totalObj.userIdList.push(obj);
                            });
                        }
                        if(totalObj.userIdList.length==0) {
                            $scope.isEmpty = true;
                        }
                        else {
                            $scope.isEmpty = false;
                        }
                        if( $('.select-search-list-item_input input').val() == query) {
                            deferred.resolve(totalObj.userIdList);
                        }
                    }
                    else {
                        logger.logError("No data found");
                    }
                },function(){
                    logger.logError("No data found");
                    deferred.reject();
                });
            }, 50);
            return deferred.promise;
            }
        };

          


        $scope.isValid = function (adhocNotificationForm) {
            if(adhocNotificationForm.$valid != true ) {
                $scope.formNotValid=true;
            }
            else {
                $scope.formNotValid=false;
            }

        };

        $scope.confirmDelete = function (notificationId,index) {
             $('#popup_adhoc_delete_notification').modal('show');
                $scope.currentNotificationId = notificationId;
                $scope.notificationIndex = index;
            
             //$scope.deleteNotification(notificationId,index);

            /* */

            
        };
        $scope.confirmed = function() {
            $('#popup_adhoc_delete_notification').modal('hide'); 
             $scope.deleteNotification($scope.currentNotificationId,$scope.notificationIndex);

            
        };


        function init() {
           $scope.getFutureNotifications();
        }

        init();
    };


    notificationController.$inject = ["$rootScope", "$scope","$filter","$http", "Restangular", "$location", '$document', 'notificationService', '$q', '$timeout','logger'];
    angular.module("kpmgoneapp").controller("notificationController", notificationController);
}());



