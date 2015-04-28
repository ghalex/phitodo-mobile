/*jslint vars: true, plusplus: true */
/*global module, require, console */

(function () {
    "use strict";
    
    var parse = require("parse");
    
    var LoginCtrl = function ($scope, $rootScope, $state) {
        
        // region #Vars
        
		$scope.error = false;
        $scope.busy = false;
        
        // endregion
        
        // region #Public function
        
        $scope.login = function (user) {
            
            var parseUser = new parse.User({username: user.email, password: user.password});
            $state.go("app.home");
            
        };
        
        // endregion
    };
    
    LoginCtrl.$inject = ["$scope", "$rootScope", "$state"];
    module.exports = LoginCtrl;
    
}());