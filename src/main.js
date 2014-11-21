/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require('angular'),
    Framework7 = require('framework7'),
    settings = require('settings'),
    services = require('services'),
    todos = require('todos');

// Init
var app = angular.module('app', [
    'app.todos',
    'app.settings',
    'app.services'
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
    
    f7.addView('#view-1', {});
    f7.addView('#view-2', {});
    
    return f7;
});

app.run(function (f7, google, $q) {
    
    /*$q.all([google.login(), google.loadAPIs()]).then(function () {
        
        google.getUserInfo().then(function (user) {
            console.log(user);
        });
        
    })*/
});

// Start app
angular.bootstrap(document, ['app']);

// Exports
module.exports = app;
    
