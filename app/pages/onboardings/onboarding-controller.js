(function() {
    "use strict";

    var onboardingController = function($rootScope, $scope, rest, $location, $document, onboardingService, $timeout, Upload, logger,$route) {
        $scope.formValidationError = false;
        $scope.rejectFormValidationError = false;
        $scope.IsReject = false;
        $scope.showRejectPopup = false;
        $scope.showMSGPopup = false;
        $scope.validFormSubmit = false;
        $scope.submitOnboardingForm = {};
        $scope.rejectReasonForm = {};
        $scope.submitServerResp = false;
        $scope.isLoading = false;
        $scope.headerPostData = angular.fromJson(sessionStorage.getItem('postJsonData'));

        $scope.getOnboardApps = function() {
          $scope.isLoading = true;
            onboardingService.getApprovalAppDetails($scope.headerPostData).then(function(response) {
              $scope.isLoading = false;
              if(response){
                $scope.approvalResponse = response;

              }
            });
        };
 $rootScope.getNotifs();
    $scope.appIcon2xError = false;
    $("#app2Icon").change(function () {
          var reader = new FileReader();
          reader.onload = onLoadFile;
          reader.readAsDataURL(this.files[0]);
          function onLoadFile(event) {
              var img = new Image();
              $scope.dummy2x = $('#app2Icon')[0].files[0].name;
              img.onload = function(){ 
                   var imgWidth = img.width;
                  var imgHeight =img.height;                  
                  if(imgWidth != 120 || imgHeight != 120 ) {
                    $scope.appIcon2xError = true;
                    $scope.$digest();
                  } else {
                    $scope.appIcon2xError = false;
                    $scope.$digest();                
                  }
              };
              img.src = event.target.result;
              /*if(img.width != 120 || img.height != 120 ) {
                $scope.appIcon2xError = true;
                $scope.$digest();
              } else {
                $scope.appIcon2xError = false;
                $scope.$digest();                
              }*/
          }
        });

        $scope.appIcon3xError = false;
        $("#app3Icon").change(function () {
          var reader = new FileReader();
          reader.onload = onLoadFile;
          reader.readAsDataURL(this.files[0]);
          function onLoadFile(event) {
              var img = new Image();
              $scope.dummy3x = $('#app3Icon')[0].files[0].name;
		img.onload = function(){
                  // image  has been loaded
                  var imgWidth = img.width;
                  var imgHeight =img.height;
                  
                  if(imgWidth != 180 ||  imgHeight != 180 ) {
                    $scope.appIcon3xError = true;
                    $scope.$digest();
                  } else {
                    $scope.appIcon3xError = false;
                    $scope.$digest();                
                  }
              };
              img.src = event.target.result;
              //console.log(img.width); console.log(img.height);
             /* if(img.width != 180 || img.height != 180 ) {
                $scope.appIcon3xError = true;
                $scope.$digest();
              } else {
                $scope.appIcon3xError = false;
                $scope.$digest();                
              }*/
          }
        });

        $scope.$watch('files', function (files) {
            $scope.formUpload = false;
            if (files != null) {
              if (!files.length) {
                $timeout(function () {
                  $scope.files = files = [files];
                });
                return;
              }
              for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (f) {
                  if (!f.$error) {
                    $scope.upload(f);
                  }
                })(files[i]);
              }
            }
          });


          $scope.submitRequest = function (myform) {
            $scope.formUpload = true;
            if((myform.$valid == true) && ($scope.appIcon2xError != true) && ($scope.appIcon3xError != true)) {
              $scope.isLoading = true;
                var serverUrl = rest.configuration.baseUrl+'/admin/UI/updateOnBoardApp';
                var fd = new FormData();

                fd.append('appName',myform.applName.$modelValue); // Reequired
                fd.append('appIcon2X',$('#app2Icon')[0].files[0]); // Reequired
                fd.append('appIcon3X',$('#app3Icon')[0].files[0]); // Reequired

                if(myform.isAppTypes.$modelValue == 'Application'){
                  fd.append('appId',myform.appId.$modelValue);  // optional
                }
                fd.append('appDesc',myform.appDesc.$modelValue); // Required
                fd.append('appType',myform.isAppTypes.$modelValue); // Required
                fd.append('mobSchema',myform.mobSchema.$modelValue); // Required
                fd.append('isAppAvlbl',myform.isAvailApp.$modelValue); // Required
                if(myform.isAvailApp.$modelValue == 0) {
                  var ChangeFormat = moment(myform.goLiveDate.$modelValue,'MM/DD/YY HH:mm').format('YYYY-MM-DD HH:mm');
                  fd.append('goLiveDate',ChangeFormat+':00'); // Re
                }
                
                fd.append('category',myform.category.$modelValue); // Re
                if(myform.notification.$$rawModelValue == undefined){
                  fd.append('notification','0');
                }else{
                  fd.append('notification',myform.notification.$$rawModelValue);
                }
                fd.append('firstName',$scope.appUser.displayName.split(', ')[1]); // 
                fd.append('lastName',$scope.appUser.displayName.split(', ')[0]); //
                fd.append('userId',$scope.appUser.userId);// 
                fd.append('role',$scope.appUser.role); // 
                fd.append('security',myform.appSecurity.$modelValue); // Re
                console.log(fd.appIcon2X);
                $.support.cors = true;
                $.ajax({
                  type: "PUT",
                  url: serverUrl,
                  data: fd,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function(data) {
                    $scope.isLoading = false;
                    if(data.status =='success'){
                      logger.logSuccess(data.msg);
                      $("html, body").animate({ scrollTop: 0 }, 1000);
                      $scope.$apply(function() {
                        $scope.resetFormOnSucess('clearData');
                      });
                    } else if(data.status =='failure'){
                      $scope.isLoading = false;
                      logger.logError(data.msg);
                    }
                  },
                  error: function(data) {
                    $scope.isLoading = false;
                    logger.logError(data.msg);
                  }
                });
            } else { 
                $scope.isvalid_form_error=true;
            }
        };

        $scope.validFormSubmitPopupClose = function(){
            $scope.validFormSubmit = false;
        }

        $scope.resetFormOnSucess = function(respData){
          $scope.submitServerResp = false;
          $route.reload();
        }

          $scope.viewAppDetails = function(appObj, appType){
            $location.path("/viewAppDetails").search('appId',appObj.id );
          };

          $scope.closeRejectPopup = function(){
              $scope.IsReject = false;
          };

          $scope.closeMsgPopup = function(){
            $scope.showMSGPopup = false;
            $location.path("/appApprovals");
          }


        function init() {
            $scope.appUser = angular.fromJson(sessionStorage.getItem('userRoles'));
            if($scope.appUser.role == 'super admin'){
                $scope.getOnboardApps();
            }
        }

        init();
    };


    onboardingController.$inject = ["$rootScope", "$scope","Restangular", "$location", "$document", "onboardingService", "$timeout", "Upload","logger","$route"];
    angular.module("kpmgoneapp").controller("onboardingController", onboardingController);
}());



