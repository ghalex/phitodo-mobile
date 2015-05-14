/*jslint vars: true, plusplus: true */
/*global $, angular, Parse, console, cordova, phonegap, Framework7 */

(function () {
    'use strict';
    
	$(document).ready(function () {
		
		var app = angular.module('app', [
            'ionic',
            'ionic.contrib.drawer',
			'angular.filter',
            
            'ui.keypress',
            'ui.event',
            
			'app.components',
			'app.login',
			'app.todos',
			'app.tododetails',
			'app.userinfo',
			'app.lists',
			'app.smartlists',
			'app.settings'
			
        ]);
		
		app.config(function ($stateProvider, $provide, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "login"
                })
                .state('todos', {
                    url: "/todos",
                    templateUrl: "todos"
                })
                .state('settings', {
                    url: "/settings",
                    templateUrl: "settings"
                });
            
            $urlRouterProvider.otherwise("/login");

        });
		
        angular.bootstrap(document, ['app']);
	});
}());