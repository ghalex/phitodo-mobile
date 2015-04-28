/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true */
	/*global require, module, Parse */

	(function () {
	    'use strict';
	    
	    Parse.initialize("6xp02QoMB5WVH3pcDKEWMynFsapSc4N1AXYlD79s", "myl156ExVHtHwoZ5QD4J1W3vJeu5YSUE0sebe6Eg");
	    
	    module.exports = {
	        modules: [
				__webpack_require__(1),
				__webpack_require__(2)
	        ]
	    };
	    
	}());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true, white: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(3),
	        parse = __webpack_require__(4),
	        m = angular.module("app.application", []);
	    
	    m.controller("ApplicationCtrl", __webpack_require__(5));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("application", __webpack_require__(7));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(3),
	        parse = __webpack_require__(4),
	        m = angular.module("app.login", []);
	    
	    m.controller("LoginCtrl", __webpack_require__(6));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("login", __webpack_require__(8));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Parse;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, Parse */

	(function () {
	    "use strict";
	    
	    var ApplicationCtrl = function ($scope, $rootScope, $state) {

	        $scope.currentUser = null;
			
	        // region #Public Functions        
	        // endregion
	        
	        // region #Events
			
	        $rootScope.$on('userLogIn', function (event, data) {
	            $scope.currentUser = data;
	            $scope.$apply();
	        });
	        
	        // endregion
	    };
	    
	    ApplicationCtrl.$inject = ["$scope", "$rootScope", "$state"];
	    module.exports = ApplicationCtrl;
	    
	}());

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, console */

	(function () {
	    "use strict";
	    
	    var parse = __webpack_require__(4);
	    
	    var LoginCtrl = function ($scope, $rootScope, $state) {
	        
	        // region #Vars
	        
			$scope.error = false;
	        $scope.busy = false;
	        
	        // endregion
	        
	        // region #Public function
	        
	        $scope.login = function (user) {
	            
	            var user = new parse.User({username: user.email, password: user.password});
	            $state.go("application");
	            
	        };
	        
	        // endregion
	    };
	    
	    LoginCtrl.$inject = ["$scope", "$rootScope", "$state"];
	    module.exports = LoginCtrl;
	    
	}());

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view class=\"pane application-view\" ng-controller=\"ApplicationCtrl\">\r\n\t<ion-header-bar class=\"bar-positive\">\r\n\t\t<h1 class=\"title\"><b>Phi</b>Todo</h1>\r\n\t</ion-header-bar>\t\r\n\t\r\n\t<ion-tabs class=\"tabs-background-positive tabs-color-light\">\r\n\t\t\r\n\t\t<ion-tab title=\"Home\" icon=\"ion-home\">\r\n\t\t\t<ion-nav-view name=\"home-tab\" class=\"pane\">\r\n\t\t\t\t<ion-content>\r\n\t\t\t\t\t<ion-refresher on-refresh=\"doRefresh()\"></ion-refresher>\r\n\r\n\t\t\t\t\t<div class=\"list list-inset\">\r\n\r\n\t\t\t\t\t\t<ion-item class=\"item-divider\">\r\n\t\t\t\t\t\t\tPhiTodo\r\n\t\t\t\t\t\t</ion-item>\r\n\r\n\t\t\t\t\t\t<ion-item>Butterfinger</ion-item>\r\n\t\t\t\t\t\t<ion-item>Something</ion-item>\r\n\t\t\t\t\t\t<ion-item>Oil</ion-item>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class=\"list list-inset\">\r\n\r\n\t\t\t\t\t\t<ion-item class=\"item-divider\">\r\n\t\t\t\t\t\t\tWork\r\n\t\t\t\t\t\t</ion-item>\r\n\r\n\t\t\t\t\t\t<ion-item>Do this</ion-item>\r\n\t\t\t\t\t\t<ion-item>Work Todo!</ion-item>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</ion-content>\r\n\t\t\t</ion-nav-view>\r\n\t\t</ion-tab>\r\n\t\t\r\n\t\t\r\n\t\t<ion-tab title=\"Todo's\" icon=\"ion-calendar\"></ion-tab>\r\n\t\t<ion-tab title=\"About\" icon=\"ion-help-buoy\"></ion-tab>\r\n\t\t\r\n\t</ion-tabs>\r\n</ion-view>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view class=\"login-view\" ng-controller=\"LoginCtrl\">\r\n\t<ion-content>\r\n\t\t<div class=\"list\">\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Username</span>\r\n\t\t\t\t<input type=\"text\" ng-model=\"user.username\">\r\n\t\t\t</label>\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Password</span>\r\n\t\t\t\t<input type=\"password\" ng-model=\"user.password\">\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t<div class=\"padding\">\r\n\t\t\t<button class=\"button button-block button-positive\" ng-click=\"login(user)\">\r\n\t\t\t\tSign-In\r\n\t\t\t</button>\r\n\t\t\t<p class=\"text-center\">\r\n\t\t\t\t<a href=\"#/forgot-password\">Forgot password</a>\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-view>";

/***/ }
/******/ ]);