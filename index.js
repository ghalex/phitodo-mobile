/*jslint vars: true, plusplus: true */
/*global $, angular, Parse, console, cordova, phonegap, Framework7 */

(function () {
    'use strict';
    
	$(document).ready(function () {
		
		var app = angular.module('app', [
            'ionic',
			
			'app.application',
			'app.login',
			'app.todos'
        ]);
		
		app.config(function ($stateProvider, $provide, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "login"
                })
                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "application"
                })
                .state('app.home', {
                    url: "/home",
                    views: {
                        'home-tab': {
                            templateUrl: "todos"
                        }
                    }
                });
            
            $urlRouterProvider.otherwise("/app/home");

        });
		
        angular.bootstrap(document, ['app']);
	});
}());