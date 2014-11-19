/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var template = require("html-loader!./Todos.html"),
    controller = require("./TodosCtrl.js"),
    angular = require("angular"),
    m = null;
    
m = angular.module('app.todos', []);

m.controller("TodosCtrl", controller);
m.run(function ($templateCache) {
    $templateCache.put("todos-tab", template);
});

module.exports = m;