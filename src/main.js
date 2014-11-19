/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require('angular'),
    Framework7 = require('framework7'),
    settings = require('settings'),
    todos = require('todos');

// Init
var app = angular.module('app', [
    'app.todos',
    'app.settings'
]);

app.directive('include', function ($templateCache) {
    return {
        replace: true,
        restrict: 'A',
        template: function (element, attr) {
            return $templateCache.get(attr.include);
        },
        link: function (scope, element, attrs) {
        }
    };
});

app.factory('f7', function () {
    var f7 = new Framework7({modalTitle: 'TodoGmail'});
    return f7;
});

app.run(function (f7) {
    
});

// Start app
angular.bootstrap(document, ['app']);

// Exports
module.exports = app;
    
