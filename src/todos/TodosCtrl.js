/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope, userInfo, google) {
        
    $scope.todos = [];
    
    $scope.done = function (todo) {
        todo.isDone = !todo.isDone;
        
        google.updateTodo(userInfo.loginUser.id, todo.id).then(function () {
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
        
        return null
    };
    
    $scope.reload = function () {
        
        google.loadTodos(userInfo.loginUser.id, []).then(function (todos) {
            
//            var tmp = $scope.todos.concat(),
//                i = 0;
//            
//            for (i = 0; i < todos.length; i++) {
//                if (!$scope.findTodo(todos[i])) {
//                    tmp.push(todos[i])
//                }
//            }
            
            $scope.todos = todos;
        });
    };
};
    
TodosCtrl.$inject = ["$scope", "userInfo", "google"];

module.exports = TodosCtrl;