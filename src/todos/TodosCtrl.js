/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, $rootScope, $ionicSideMenuDelegate, $timeout) {
    
    
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
    
    $scope.newTodo = function (title) {
      
        var todo = {
            attributes: {
                "title": title,
                "isDone": false
            }
        };
        
        
        $scope.todos.push(todo);
    };
    
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.doneTodo = function (todo) {
        todo.attributes.isDone = !todo.attributes.isDone;
    };
    
    $scope.isDone = function (todo) {
        return todo.attributes.isDone;
    };
    
    $scope.doRefresh = function () {
        $timeout(function () {
          
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            
        }, 1000);
    };
};
    
TodosCtrl.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate", "$timeout"];

module.exports = TodosCtrl;