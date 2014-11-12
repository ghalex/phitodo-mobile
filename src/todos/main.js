/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var template = require("html-loader!./Todos.html"),
    controller = require("./TodosCtrl.js"),
    angular = require("angular"),
    angularModule = null;
    
angularModule = angular.module('app.todos', []);

angularModule.controller("TodosCtrl", controller);
angularModule.run(function ($templateCache) {
    $templateCache.put("todos-template", template);
});

module.exports = angularModule;