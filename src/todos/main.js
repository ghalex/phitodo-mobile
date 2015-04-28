/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require("angular"),
    m = angular.module("app.todos", []);

m.controller("TodosCtrl", require("./TodosCtrl"));
m.run(["$templateCache", function ($templateCache) {
    $templateCache.put("todos", require("./Todos.html"));
}]);

module.exports = m;