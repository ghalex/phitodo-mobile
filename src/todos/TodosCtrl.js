/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var TodosCtrl = function ($scope) {
        
    $scope.todos = [
        {
            id: 1,
            isDone: false,
            title: "Send papers to Goteburg with ...."
        },
        {
            id: 2,
            isDone: false,
            title: "Todo 2, for more info"
        },
        {
            id: 3,
            isDone: false,
            title: "Load all mails with label @todo and ..."
        }
    ];
};
    
TodosCtrl.$inject = ["$scope"];

module.exports = TodosCtrl;