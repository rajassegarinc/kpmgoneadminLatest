(function() {
    "use strict";
    angular.module("kpmgoneapp").directive('headerDir', ['headerService', function(headerService) {
        return {
            restrict: 'AE',
            templateUrl: 'app/core/header-template.html',
            controller: "headerController"
        }
    }]);
}());
