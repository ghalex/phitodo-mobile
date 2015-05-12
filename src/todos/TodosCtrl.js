/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, $rootScope, $ionicSideMenuDelegate, $timeout, $ionicModal) {
    
    
    // region Fields
    
    $scope.newTodo = {};
    $scope.todoModal = $ionicModal.fromTemplate(require("./NewTodo.html"), {scope: $scope, animation: 'slide-in-up'});
    $scope.todos = [
        {
            attributes: {
                "title": "Welcome to PhiTodo!",
                "progress": 0,
                "isStarred": false,
                "isDone": false
            }
        },
        {
            attributes: {
                "title": "Do this today!",
                "progress": 30,
                "isStarred": true,
                "isDone": false
            }
        },
        {
            attributes: {
                "title": "This is a done todo, for today.",
                "progress": 0,
                "isStarred": false,
                "isDone": true
            }
        }
    ];
    
    // endregion
    
    $scope.doneTodos = function () {
        var todos = $scope.todos.concat();
        return todos.filter(function (todo) { return todo.attributes.isDone; });
    };
    
    $scope.filteredTodos = function () {
        var todos = $scope.todos.concat();
        
        return todos.filter(function (todo) {
            
            if (todo.attributes.isDone) {
                return false;
            }
            
            return true;
        });
    };
    
    $scope.newTodo = function () {
        $scope.todoModal.show();
    };
    
    $scope.saveTodo = function () {
        
        var todo = {
            attributes: {
                "title": $scope.newTodo.title,
                "isDone": false
            }
        };
        
        
        $scope.todos.push(todo);
        $scope.newTodo.title = "";
        
        $scope.todoModal.hide();
    };
    
    $scope.toggleMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.selectTodo = function (todo) {
        //$ionicSideMenuDelegate.toggleRight();
        $scope.openDrawer();
    };
    
    $scope.doneTodo = function (todo) {
        todo.attributes.isDone = !todo.attributes.isDone;
    };
    
    $scope.starTodo = function (todo, $event) {
        todo.attributes.isStarred = !todo.attributes.isStarred;
    };
    
    $scope.doRefresh = function () {
        $timeout(function () {
          
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            
        }, 1000);
    };
};
    
TodosCtrl.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate", "$timeout", "$ionicModal"];

module.exports = TodosCtrl;