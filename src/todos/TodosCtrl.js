/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, $rootScope, google) {
        
    $scope.done = function (todo) {
        todo.isDone = !todo.isDone;
        $rootScope.loading = true;
        
        google.updateTodo($rootScope.user.id, todo.id).then(function () {
            $scope.reload();
        });
    };
    
    $scope.findTodo = function (todo) {
        var i = 0;
        
        for (i = 0; i < $scope.todos.length; i++) {
            if (todo.id === $scope.todos[i].id) {
                return todo;
            }
        }
        
        return null;
    };
    
    $scope.reload = function () {
        
        $rootScope.loading = true;
        
        google.loadTodos($rootScope.user.id, []).then(function (todos) {
            
            $rootScope.todos = todos;
            $rootScope.loading = false;
        });
    };
    
    $rootScope.$on('appReady', function () {
        $scope.reload();
    });
};
    
TodosCtrl.$inject = ["$scope", "$rootScope", "google"];

module.exports = TodosCtrl;