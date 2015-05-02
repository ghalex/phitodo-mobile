/*jslint vars: true, plusplus: true */
/*global module, require, console */

(function () {
    "use strict";
    
    var SettingsCtrl = function ($scope, $rootScope, $state, $ionicModal) {
        
        // region #Vars
    
        $scope.avatarModal = $ionicModal.fromTemplate(require("./SettingsAvatar.html"), {scope: $scope, animation: 'slide-in-up'});
        
        // endregion
        
        // region #Public function
        
        $scope.logout = function () {
            $state.go("login");
        };
        
        $scope.changeAvatar = function () {
            $scope.avatarModal.show();
        };
        
        // endregion
        
        // region #Events
        
        // endregion
    };
    
    SettingsCtrl.$inject = ["$scope", "$rootScope", "$state", "$ionicModal"];
    module.exports = SettingsCtrl;
    
}());