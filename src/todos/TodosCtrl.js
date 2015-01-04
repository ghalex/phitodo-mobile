/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, userInfo, google) {
        
    $scope.todos = [];
    
    $scope.reload = function () {
        
        /*google.loadLabels(userInfo.loginUser.id).then(function (labels) {
            console.log(labels);
        });*/
        
        google.loadTodos(userInfo.loginUser.id, []).then(function (todos) {
            $scope.todos = todos;
        });
    }
};
    
TodosCtrl.$inject = ["$scope", "userInfo", "google"];

module.exports = TodosCtrl;