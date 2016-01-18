(function() {
    "use strict";

    var adminOnboardingController = function($rootScope, $scope, rest, $location, $document, onboardingService, $timeout, Upload, logger) {

        $scope.formValidationError = false;
        $scope.rejectFormValidationError = false;
        $scope.showRejectPopup = false;
        $scope.showMSGPopup = false;
        $scope.showApprovedMSGPopup = false;
        $scope.IsReject = false;
        $scope.updateOnboardingResp = false;
        $scope.isLoading = false;
        $scope.submitOnboardingForm = {};
        $scope.rejectReasonForm = {};
        $scope.alphabetCollection =  ['#','a', 'b', 'c', 'd', 'e', 'f',
                'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                't', 'u', 'v', 'w', 'x', 'y', 'z'
            ];
        var newSortDataOrder = "";
        $scope.app2ximg = '';
        $scope.app3ximg = '';
        $scope.headerPostData = angular.fromJson(sessionStorage.getItem('postJsonData'));

        var serviceUrl = window.location.protocol + '//' + window.location.host;
        var baseUrlObj = rest.configuration.baseUrl.split('/');
        
        $scope.basePath = baseUrlObj[0]+"//"+baseUrlObj[2]+"/"+baseUrlObj[3];
 $rootScope.getNotifs();
        $scope.viewOnboardApps = function() {
          var appId = $location.search()['appId'];
          $scope.isLoading = true;
          onboardingService.getAppDetails(appId).then(function(response) {
            $scope.isLoading = false;
            if(response){
              $scope.viewData = response;

              $scope.userId = $scope.viewData.id;
              $scope.applName = $scope.viewData.appName;
              $scope.appIcon2X = $scope.basePath+$scope.viewData.appIcon2X;
              $scope.appIcon3X = $scope.viewData.appIcon3X;
              $scope.appDesc = $scope.viewData.appDesc;
              $scope.appId = $scope.viewData.labelId;
              $scope.isAppTypes = $scope.viewData.appType;
              $scope.mobSchema = $scope.viewData.deeplnk;
              $scope.isAvailApp = $scope.viewData.isAppAvlbl;
              $scope.category = $scope.viewData.category;
              $scope.appSecurity = $scope.viewData.security;
              if($scope.viewData.goLiveDate){
                $scope.goLiveDate = moment(Date.parse($scope.viewData.goLiveDate)).format('MM/DD/YY HH:mm');
              }
              $scope.notification = $scope.viewData.isNotification;

              setTimeout(function(){
                $(".kpmg-one-selectbox").selectbox();
                if($scope.viewData.status == 'Approved' || $scope.viewData.status == 'Rejected'){
$('#type-app').attr("disabled", true);
$('#mobile-web').attr("disabled", true);
                  $('#appSecurity').selectbox("disable", true);
                  $("#category").selectbox("disable");
                }
              }, 200);
            }
          });
        };

          $scope.getAppAdmin = function(sortDataOrder) {
            $scope.alphabet = sortDataOrder;
            $scope.isLoading = true;
            if(sortDataOrder == '#'){
              newSortDataOrder = "";
            }else if(sortDataOrder != '#'){
              newSortDataOrder = sortDataOrder;
            } else {
              newSortDataOrder = "";
            }
            $scope.appAdminDetailsResp = "";
            $scope.headerAppAdmin = {"value": newSortDataOrder ? newSortDataOrder:"" };
                  onboardingService.getAppAdminDetails($scope.headerAppAdmin).then(function(response) {
                    $scope.isLoading = false;
                    if(response){
                      $scope.appAdminDetailsResp = response;
                    }
                  });
          };

          $scope.editAppDetails = function(appObj, appId, appType){
            $scope.isNotificationPopup = '';
            sessionStorage.setItem('apprData', JSON.stringify(appObj));
            sessionStorage.setItem('apprType', JSON.stringify(appType));
            $location.path("/editAppDetails").search('appId',appId);
          };

        /*
            * method is used for copy text to clipboard
        */
        $scope.copyToClipBoardResponse = false;
        $scope.copyDataToClipboard =  function(data) {
           var copyFrom = document.createElement("textarea");
           copyFrom.textContent = data;
           var body = document.getElementsByTagName('body')[0];
           body.appendChild(copyFrom);
           copyFrom.select();
           document.execCommand('copy');
           body.removeChild(copyFrom);
           if(copyFrom){
              $scope.copyToClipBoardResponse = true;
            }
           //this.flashMessage('over5');
        }

          $scope.mySplit = function(string, nb) {
              $scope.array = string.split(' - ');
              return $scope.result = $scope.array[nb];
          }

          $scope.isCurrentAlphabhet = function(currentAlphabhet) {
              return $scope.alphabet === currentAlphabhet;
          };

          $scope.getOnboardApps = function() {
              $scope.isLoading = true;
                onboardingService.getApprovalAppDetails($scope.headerPostData).then(function(response) {
                  $scope.isLoading = false;
                    $scope.approvalResponse = response;
                });
          };

          $scope.submitApprove = function(appData){
            $scope.isLoading = true;
              $scope.headerApproveRejectPostData = {"id":appData.id,"status":"Approved"};
              $scope.applicationData = appData;
                  onboardingService.adminApproveReject($scope.headerApproveRejectPostData).then(function(response) {
                    if(response.status == 'success'){
                      $scope.isLoading = false;
                      logger.logSuccess('"'+appData.appName+' succesfully approved');
                      $scope.showApprovedMSGPopup = true;
                      $scope.approvalResponse = response;
                      $("html, body").animate({ scrollTop: 0 }, 1000);
                    } else {
                      $scope.isLoading = false;
                      logger.logError('Error. Try after some time');
                    }
                  });
              //console.log(appData);
          };

          $scope.submitReject = function(){
              $scope.IsReject = true;
          };

          $scope.confirmReject = function(rejectReasonForm, appData){

            if(rejectReasonForm.$valid){
              $scope.isLoading = true;
              $scope.rejectReason = rejectReasonForm.rejectDesc.$modelValue;
              $scope.headerApproveRejectPostData = {"id":appData.id,"status":"Rejected", "reason":$scope.rejectReason};
              $scope.applicationData = appData;
                  onboardingService.adminApproveReject($scope.headerApproveRejectPostData).then(function(response) {
                    if(response.status == 'success'){
                      $scope.isLoading = false;
                      logger.logSuccess('"'+appData.appName+'" succesfully rejected');
                      $scope.showMSGPopup = true;
                      $scope.IsReject = false;
                      $scope.approvalResponse = response;
                      $("html, body").animate({ scrollTop: 0 }, 1000);
                    } else {
                      $scope.isLoading = false;
                      logger.logError('Error. Try after some time');
                    }
                  });
            } else {
              $scope.rejectFormValidationError = true;
            }
          };

          $scope.closeRejectPopup = function(){
              $scope.IsReject = false;
          };

          $scope.closeMsgPopup = function(){
            $scope.showMSGPopup = false;
            $location.path("/appApprovals");
          
          }


    $scope.appIcon2xError = false;
    $("#app2Icon").change(function () {
          var reader = new FileReader();
          reader.onload = onLoadFile;
          reader.readAsDataURL(this.files[0]);
          function onLoadFile(event) {
              var img = new Image();
              $scope.dummy2x = $('#app2Icon')[0].files[0].name;
              img.src = event.target.result;
              img.onload = function(){ 
	              if(img.width != 120 || img.height != 120 ) {
	                $scope.appIcon2xError = true;
	                $scope.$digest();
	              } else {
	                $scope.appIcon2xError = false;
	                $scope.$digest();                
	              }
          	  };
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
              img.src = event.target.result;
              img.onload = function(){ 
	              if(img.width != 180 || img.height != 180 ) {
	                $scope.appIcon3xError = true;
	                $scope.$digest();
	              } else {
	                $scope.appIcon3xError = false;
	                $scope.$digest();                
	              }
	          }
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
            if(myform.$valid == true ) {
              $scope.isLoading = true;
                var serverUrl = rest.configuration.baseUrl+'/admin/UI/updateOnBoardApp';
                var fd = new FormData();
                fd.append('id',myform.userId.$modelValue); // Reequired
                fd.append('appName',myform.applName.$modelValue); // Reequired
                if($('#app2Icon')[0].files[0]){
                  fd.append('appIcon2X',$('#app2Icon')[0].files[0]); // Reequired
                }
                if($('#app3Icon')[0].files[0]){
                  fd.append('appIcon3X',$('#app3Icon')[0].files[0]); // Reequired
                }

                if(myform.isAppTypes.$modelValue == 'Application'){
                  fd.append('appId',myform.appId.$modelValue);  // optional
                }
                fd.append('appDesc',myform.appDesc.$modelValue); // Required
                fd.append('appType',myform.isAppTypes.$modelValue); // Required
                fd.append('mobSchema',myform.mobSchema.$modelValue); // Required
                fd.append('isAppAvlbl',myform.isAvailApp.$modelValue); // Required
                if(myform.isAvailApp.$modelValue == 0) {
                  var ChangeFormat = moment(myform.goLiveDate.$modelValue,'MM/DD/YY HH:mm').format('YYYY-MM-DD HH:mm');
                  fd.append('goLiveDate',ChangeFormat+":00"); // Re
                }
                
                fd.append('category',myform.category.$modelValue); // Re
                if(myform.notification.$$rawModelValue == 1 ){
                  fd.append('notification',myform.notification.$$rawModelValue);
                }else{
                  fd.append('notification','0');
                  
                }
                fd.append('firstName',$scope.appUser.displayName.split(', ')[1]); // 
                fd.append('lastName',$scope.appUser.displayName.split(', ')[0]); //
                fd.append('userId',$scope.appUser.userId);// 
                fd.append('role',$scope.appUser.role); // 
                fd.append('security',myform.appSecurity.$modelValue); // Re
                $.ajax({
                  type: "PUT",
                  url: serverUrl,
                  data: fd,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function(data) {
                    if(data.status =='success'){
                      $scope.isLoading = false;
                      logger.logSuccess(data.msg);
                      $("html, body").animate({ scrollTop: 0 }, 1000);
                      $scope.$apply(function() {
                        $scope.updateOnboardingResp = true;
                      });
                    } else if(data.status =='failure'){
                      $scope.isLoading = false;
                      logger.logError(data.msg);
                      $scope.$apply(function() {
                        $scope.updateOnboardingResp = false;
                      });
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

        $scope.cancelUpdateOnsubmit = function(){
          $location.path("/onboardingsubmit").search('');
        };

        function init() {
            //$scope.submitServerResp = false;
            $scope.appUser = angular.fromJson(sessionStorage.getItem('userRoles'));
            $scope.viewOnboardApps();
            $scope.getOnboardApps();
            if($scope.appUser.role == "super admin"){
              $scope.getAppAdmin();
            }
        }

        init();
    };


    adminOnboardingController.$inject = ["$rootScope", "$scope","Restangular", "$location", "$document", "onboardingService", "$timeout", "Upload","logger"];
    angular.module("kpmgoneapp").controller("adminOnboardingController", adminOnboardingController);
}());
