/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodoDetailsCtrl = function ($scope, $rootScope) {
    
    $scope.todo = {};
};
    
TodoDetailsCtrl.$inject = ["$scope", "$rootScope"];

module.exports = TodoDetailsCtrl;