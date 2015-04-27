/*jslint vars: true, plusplus: true */
/*global $, angular, Parse, console, cordova, phonegap, Framework7 */

(function () {
    'use strict';
    
	var Device = {};
	
	Device.onReady = function (callback) {
		if (Device.isPhonegap()) {
			document.addEventListener('deviceready', callback, false);
		} else {
			window.onload = callback();
		}
	};
	
	Device.isPhonegap = function () {
		return (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined');
	};
	
    Device.onReady(function () {
        
        var app = angular.module('app', [
            'ngResource',
            'ngAnimate',
            'angular.filter',
            
            'ui.router',
            'ui.event',
            'ui.keypress'
			
        ]);
                
		app.factory('f7', function () {
			var f7 = new Framework7();
			return f7;
		});
		
        app.run(function ($http, $rootScope, $timeout, $state, f7) {
			
			f7.addView('.main-view');
			console.log("app ready");
        });

        angular.bootstrap(document, ['app']);

    });
}());