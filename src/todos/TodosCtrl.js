/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, $rootScope, $ionicSideMenuDelegate) {
    
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
};
    
TodosCtrl.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate"];

module.exports = TodosCtrl;