/*jslint vars: true, plusplus: true */
/*global $, angular, Parse, console, cordova, phonegap, Framework7 */

(function () {
    'use strict';
    
	$(document).ready(function () {
		
		var app = angular.module('app', [
            'ionic',
			
			'app.components',
			'app.application',
			'app.login',
			'app.todos',
			'app.userinfo',
			'app.lists',
			'app.smartlists'
			
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
                });
            
            $urlRouterProvider.otherwise("/login");

        });
		
        angular.bootstrap(document, ['app']);
	});
}());