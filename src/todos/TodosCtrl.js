/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, $rootScope, $ionicSideMenuDelegate) {
    
    
    $scope.todos = [
        {
            attributes: {
                "title": "Welcome to PhiTodo!",
                "isDone": false
            }
        },
        {
            attributes: {
                "title": "Do this today!",
                "progress": "30",
                "isStarred": true,
                "isDone": false
            }
        },
        {
            attributes: {
                "title": "This is a done todo, for today.",
                "isDone": true
            }
        }
    ];
    
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.doneTodo = function (todo) {
        todo.attributes.isDone = !todo.attributes.isDone;
    };
    
    $scope.isDone = function (todo) {
        return todo.attributes.isDone;
    };
};
    
TodosCtrl.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate"];

module.exports = TodosCtrl;