(function() {
    "use strict";

    var headerController = function($rootScope, $scope,  $location, headerService, onboardingService,logger) {
        $scope.isNotificationPopup = '';  
        $rootScope.userName=[];
        $scope.userLastName='';
        $rootScope.getNotifs = function(){
$scope.appUsers = angular.fromJson(sessionStorage.getItem('postJsonData'));
                headerService.getApprovalAppDetails($scope.appUsers).then(function(response) {
                    if(response){
                        $scope.pendingNotificationResp = response.pending;
                        $scope.approvedNotificationResp = response.approved;
                        $scope.rejectNotificationResp = response.rejected;
                        $scope.pendingNotificationRespError = false;
                        $scope.approvedNotificationRespError = false;
                        $scope.rejectNotificationRespError = false;
                        $scope.notificationData = response;
                    }
                });

}
        $scope.getRoles = function () {
            $('#getRolesButton').hide();
            $('#loadingPleaseWait').show();
            var userJson = {'userId' : $scope.networkId}
            headerService.getRoles(userJson).then(
                function(response) {
                    $('.kpmg-one-body-wrapper').show();
                    if(response) {
                        if( $scope.role != 'error' &&  $scope.role != '' &&  $scope.role != 'null' &&  $scope.role != undefined) {
                            response.role = $scope.role;
                        }

                        if(response.role == 'employee') {
                            $('#loadingPleaseWait').hide();
                            $('#getRolesButton').show();
                            logger.logError('Sorry you dont have access. Please check with network team.');
                            return false;
                        }
                        $scope.isLoadingHead = false;
                        response.userId = $scope.networkId;
                        $scope.userName= response.displayName;
                        $scope.userRole= response.role;
                        $scope.userId= response.userId;
                        $scope.userName = $scope.userName.split(',');
                        $rootScope.userName = { 
                            firstName: $scope.userName[1],
                            lastName: $scope.userName[0]
                        } 
                        sessionStorage.setItem('userRoles', JSON.stringify(response));
                        sessionStorage.setItem('appUserData', JSON.stringify(response));
                        $rootScope.appUserResponse = response;
                        $rootScope.appUserResponse.role.toLowerCase();
                        var postDataJson = {};
                        postDataJson.userId = response.userId;
                        if($rootScope.appUserResponse.role == 'super admin') {
                            postDataJson.role = 'Super Admin';
                        } else {
                            postDataJson.role = 'Admin';
                        }
                        sessionStorage.setItem('postJsonData', JSON.stringify(postDataJson));
                        $('#myModal').modal('hide'); 
                        if($rootScope.appUserResponse.role == 'super admin'){
                            $location.path("/appApprovals");
                            window.location.reload();
                        } else {
                            $location.path("/onboardingsubmit");
                            window.location.reload();
                        }
                    } else {
                        $('#loadingPleaseWait').hide();
                        $('#getRolesButton').show();
                        logger.logError('Server is down, Please try again after sometime.');
                        return false;
                        var response = {
                            "displayName": "Deshmukh, Vivek",
                            "role": "super admin"
                        }
                        response.userId = $scope.networkId;
                        $scope.userName= response.displayName;
                        $scope.userRole= response.role;
                        $scope.userId= response.userId;
                        $scope.userName = $scope.userName.split(',');
                        $rootScope.userName = { 
                            firstName: $scope.userName[1],
                            lastName: $scope.userName[0]
                        } 
                        sessionStorage.setItem('userRoles', JSON.stringify(response));
                        sessionStorage.setItem('appUserData', JSON.stringify(response));
                        $rootScope.appUserResponse = response;
                        $rootScope.appUserResponse.role.toLowerCase();
                        var postDataJson = {};
                        postDataJson.userId = response.userId;
                        if($rootScope.appUserResponse.role == 'super admin') {
                            postDataJson.role = 'Super Admin';
                        } else {
                            postDataJson.role = 'Admin';
                        }
                        sessionStorage.setItem('postJsonData', JSON.stringify(postDataJson));
                    }
                    $('#myModal').modal('hide'); 
                    if($rootScope.appUserResponse.role == 'super admin'){
                        $location.path("/appApprovals");
                        window.location.reload();
                    } else {
                        $location.path("/onboardingsubmit");
                        window.location.reload();
                    }


                },
                function (error) {
                    $('#loadingPleaseWait').hide();
                    $('#getRolesButton').show();
                    logger.logError('Server is down, Please try again after sometime.');
                    return false;
                    $('.kpmg-one-body-wrapper').show();
                    var response = {
                        "displayName": "Deshmukh, Vivek",
                        "role": "super admin"
                    }

                    response.userId = $scope.networkId;
                    $scope.userName= response.displayName;
                    $scope.userRole= response.role;
                    $scope.userId= response.userId;
                    $scope.userName = $scope.userName.split(',');
                    $rootScope.userName = { 
                        firstName: $scope.userName[1],
                        lastName: $scope.userName[0]
                    } 
                    sessionStorage.setItem('userRoles', JSON.stringify(response));
                    sessionStorage.setItem('appUserData', JSON.stringify(response));
                    $rootScope.appUserResponse = response;
                    $rootScope.appUserResponse.role.toLowerCase();
                    var postDataJson = {};
                    postDataJson.userId = response.userId;
                    if($rootScope.appUserResponse.role == 'super admin') {
                        postDataJson.role = 'Super Admin';
                    } else {
                        postDataJson.role = 'Admin';
                    }
                    sessionStorage.setItem('postJsonData', JSON.stringify(postDataJson));
                    $('#myModal').modal('hide'); 
                    if($rootScope.appUserResponse.role == 'super admin'){
                        $location.path("/appApprovals");
                        window.location.reload();
                    } else {
                        $location.path("/onboardingsubmit");
                        window.location.reload();
                    }


                }
            );
        }

        $scope.getOnboardApps = function() {
                $rootScope.is_disabled_form = false;
/*                if( ($rootScope.appUserResponse.role == 'SuperAdmin' || $rootScope.appUserResponse.role == 'super admin' || $rootScope.appUserResponse.role == 'Super Admin') && $location.path() == '/'){
                    $location.path("/appApprovals");
                } else {
                    $location.path("/onboardingsubmit");
                }*/
                /*
                headerService.getAppUserDetails().then(function(response) {
                	if(response.data){
                    	$rootScope.appUserResponse = response.data;
                        sessionStorage.setItem('appUserData', JSON.stringify(response.data));
                        if(response.data.userType == 'SuperAdmin'){
                            $rootScope.is_disabled_form = false;
                        } else {
                            $rootScope.is_disabled_form = false;
                        }

                        //for landing page
                        if(response.data.userType == 'SuperAdmin' && $location.path() == '/'){
                            $location.path("/appApprovals");
                        } else if(response.data.userType == 'BusinessAdmin' && $location.path() == '/'){
                            $location.path("/onboardingsubmit");
                        }
                	}
                });
                */
                headerService.getApprovalAppDetails(postDataJson).then(function(response) {
                    if(response){
                        $scope.pendingNotificationResp = response.pending;
                        $scope.approvedNotificationResp = response.approved;
                        $scope.rejectNotificationResp = response.rejected;
                        $scope.notificationData = response;
                    }
                });
        };
        $scope.NotificationFilter = function(filterType){
            $scope.pendingNotificationResp = ''; 
            $scope.approvedNotificationResp = ''; 
            $scope.rejectNotificationResp = '';
            $scope.pendingNotificationRespError = false;
            $scope.approvedNotificationRespError = false;
            $scope.rejectNotificationRespError = false;

            if(filterType == 'pending'){
                $scope.pendingNotificationResp = $scope.notificationData.pending;
                if($scope.pendingNotificationResp.length == 0){
                    $scope.pendingNotificationRespError = true;
                }
            } else if(filterType == 'approved'){
                $scope.approvedNotificationResp = $scope.notificationData.approved;
                if($scope.approvedNotificationResp.length == 0){
                    $scope.approvedNotificationRespError = true;
                }
            } else if(filterType == 'rejected'){ 
                $scope.rejectNotificationResp = $scope.notificationData.rejected;
                if($scope.rejectNotificationResp.length == 0){
                    $scope.rejectNotificationRespError = true;
                } 
            }
        };

        $scope.isActive = function (viewLocation) { 
             var active = (viewLocation === $location.path());
             return active; 
        };

        $scope.showNotification = function(popupstate){
            $scope.appUsers = angular.fromJson(sessionStorage.getItem('postJsonData'));
                headerService.getApprovalAppDetails($scope.appUsers).then(function(response) {
                    if(response){
                        $scope.pendingNotificationResp = response.pending;
                        $scope.approvedNotificationResp = response.approved;
                        $scope.rejectNotificationResp = response.rejected;
                        $scope.pendingNotificationRespError = false;
                        $scope.approvedNotificationRespError = false;
                        $scope.rejectNotificationRespError = false;
                        $scope.notificationData = response;
                    }
                });

            if(popupstate == 'active'){
                $scope.isNotificationPopup = '';
                    /*$scope.pendingNotificationResp = $scope.notificationData.pending;
                    $scope.approvedNotificationResp = $scope.notificationData.approved; 
                    $scope.rejectNotificationResp = $scope.notificationData.rejected; */
            } else {
                $scope.isNotificationPopup = 'active';
            }
        };

          $scope.headerViewAppDetails = function(appObj, appId, appType){
            $scope.isNotificationPopup = '';
            sessionStorage.setItem('apprData', JSON.stringify(appObj));
            sessionStorage.setItem('apprType', JSON.stringify(appType));
            $location.path("/editAppDetails").search('appId',appId);
          };
$(document).on("click", function (e) {

    if(!$(e.target).hasClass('kpmg-one-notifications') && $(e.target).closest('.kpmg-one-notification-panel').length == 0 && $scope.isNotificationPopup == 'active'){     
    $scope.$apply(function () {
            $scope.isNotificationPopup = '';
        });     
    }
});


        function init() {
            if(angular.ISOLD) {
                $('#IEOLD').modal('show');
                return false;
            }            
            if(sessionStorage.userRoles) {
                var response = angular.fromJson(sessionStorage.getItem('userRoles'));
                $scope.appUser = response
                $scope.userName= response.displayName;
                $scope.userRole= response.role;
                $scope.userName = $scope.userName.split(',');
                $rootScope.userName = { 
                    firstName: $scope.userName[1],
                    lastName: $scope.userName[0]
                } 
                $rootScope.appUserResponse = response;
                //$scope.getOnboardApps();
            } else {
                if( $('#nID').val() == '' || $('#nID').val() == undefined || $('#nID').val() == 'null') {
                    $('.kpmg-one-body-wrapper').hide();
                    $('#myModal').modal('show'); 
                } else {
                    var splitEmail = $('#nID').val().split('@');
                    if($('#role')) {
                        var role = $('#role').val();
                        $scope.role = role;
                    }
                    $scope.networkId = splitEmail[0];
                    $scope.isLoadingHead = true;
                    $scope.getRoles();
                }
            }
        };
        init();
    };


    headerController.$inject = ["$rootScope", "$scope","$location", "headerService", "onboardingService","logger"];
    angular.module("kpmgoneapp").controller("headerController", headerController);
}());


$(document).on("keydown", function (e) {
    if (e.which === 8 && (e.target.id =='datepickerTimePicker') ) {
        e.preventDefault();
    }
});

