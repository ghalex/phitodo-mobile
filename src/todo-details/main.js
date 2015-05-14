/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require("angular"),
    m = angular.module("app.tododetails", []);

m.controller("TodoDetailsCtrl", require("./TodoDetailsCtrl"));
m.run(["$templateCache", function ($templateCache) {
    $templateCache.put("todo-details", require("./TodoDetails.html"));
}]);

module.exports = m;