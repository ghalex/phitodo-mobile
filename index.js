/*jslint vars: true, plusplus: true */
/*global $, angular, Parse, console, cordova, phonegap, Framework7 */

(function () {
    'use strict';
    
	$(document).ready(function () {
		
		var app = angular.module('app', [
            'ionic',
			
			'app.application',
			'app.login'
        ]);
		
		app.config(function ($stateProvider, $provide, $urlRouterProvider) {

            $stateProvider
                .state("application", {
                    url: "/application",
                    templateUrl: "application"
                })
				.state("login", {
                    url: "/login",
                    templateUrl: "login"
                });

        });
		
        angular.bootstrap(document, ['app']);
	});
}());