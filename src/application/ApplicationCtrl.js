/*jslint vars: true, plusplus: true */
/*global module, require, Parse */

(function () {
    "use strict";
    
    var ApplicationCtrl = function ($scope, $rootScope, $state) {

        $scope.currentUser = null;
		
        // region #Public Functions        
        // endregion
        
        // region #Events
		
        $rootScope.$on('userLogIn', function (event, data) {
            $scope.currentUser = data;
            $scope.$apply();
        });
        
        // endregion
    };
    
    ApplicationCtrl.$inject = ["$scope", "$rootScope", "$state"];
    module.exports = ApplicationCtrl;
    
}());