/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var $ = require('jquery'),
    angular = require('angular'),
    Framework7 = require('framework7'),
    settings = require('settings'),
    services = require('services'),
    todos = require('todos');


var PhiApp = function () {
    
    /** Create AngularJS app **/
    this.angularApp = angular.module('app', ['app.todos', 'app.settings', 'app.services']);
    
    /** Include directive **/
    this.angularApp.directive('include', function ($templateCache) {
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
    
    /** F7 factory **/
    this.angularApp.factory('f7', function () {
        var f7 = new Framework7({modalTitle: 'TodoGmail'});
        f7.addView('.main-view', {});

        return f7;
    });
    
    this.angularApp.run(function (f7, google, $q) {
    
        /*$q.all([google.login(), google.loadAPIs()]).then(function () {

            google.getUserInfo().then(function (user) {
                $('.loading-overlay').remove();
            });

        });*/
        
        google.login().then(function () {
            $('.loading-overlay').remove();
        });
    });
    
    /** Starting point **/
    this.start = function () {
        angular.bootstrap(document, ['app']);
    };
};

// Exports
module.exports = PhiApp;
    
