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
				__webpack_require__(3),
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
	    
	    var angular = __webpack_require__(4),
	        m = angular.module("app.application", []);
	    
	    m.controller("ApplicationCtrl", __webpack_require__(7));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("application", __webpack_require__(10));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var angular = __webpack_require__(4),
	    m = angular.module("app.todos", []);

	m.controller("TodosCtrl", __webpack_require__(6));
	m.run(["$templateCache", function ($templateCache) {
	    $templateCache.put("todos", __webpack_require__(9));
	}]);

	module.exports = m;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(4),
	        parse = __webpack_require__(5),
	        m = angular.module("app.login", []);
	    
	    m.controller("LoginCtrl", __webpack_require__(8));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("login", __webpack_require__(11));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Parse;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var TodosCtrl = function ($scope, $rootScope) {
	};
	    
	TodosCtrl.$inject = ["$scope", "$rootScope"];

	module.exports = TodosCtrl;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, console */

	(function () {
	    "use strict";
	    
	    var parse = __webpack_require__(5);
	    
	    var LoginCtrl = function ($scope, $rootScope, $state) {
	        
	        // region #Vars
	        
			$scope.error = false;
	        $scope.busy = false;
	        
	        // endregion
	        
	        // region #Public function
	        
	        $scope.login = function (user) {
	            
	            var parseUser = new parse.User({username: user.email, password: user.password});
	            $state.go("app.home");
	            
	        };
	        
	        // endregion
	    };
	    
	    LoginCtrl.$inject = ["$scope", "$rootScope", "$state"];
	    module.exports = LoginCtrl;
	    
	}());

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view title=\"Home\" ng-controller=\"TodosCtrl\" class=\"bg-image\">\r\n    <ion-content has-header=\"true\">\r\n        <ion-refresher on-refresh=\"doRefresh()\"></ion-refresher>\r\n\r\n        <div class=\"search-bar\">\r\n            <div class=\"item item-input-inset\">\r\n                <label class=\"item-input-wrapper\" id=\"search-input\">\r\n                    <i class=\"icon ion-search placeholder-icon\"></i>\r\n                    <input type=\"text\" placeholder=\"Search\" ng-model=\"query\" ng-change=\"search()\">\r\n                </label>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"list list-inset\">\r\n\r\n            <ion-item class=\"item-divider\">\r\n                PhiTodo\r\n            </ion-item>\r\n\r\n            <ion-item>Butterfinger</ion-item>\r\n            <ion-item>Something</ion-item>\r\n            <ion-item>Oil</ion-item>\r\n\r\n            <ion-item class=\"item-divider\">\r\n                Work\r\n            </ion-item>\r\n\r\n            <ion-item>Do this</ion-item>\r\n            <ion-item>Work Todo!</ion-item>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-tabs class=\"tabs-icon-top\" animation=\"slide-left-right\" ng-controller=\"ApplicationCtrl\">\r\n\r\n    <ion-tab title=\"Home\" icon=\"ion-home\">\r\n        <ion-nav-view name=\"home-tab\"></ion-nav-view>\r\n    </ion-tab>\r\n\r\n    <ion-tab title=\"Todo's\" icon=\"ion-calendar\">\r\n        <ion-nav-view name=\"todos-tab\">\r\n            <ion-view title=\"Todos\"></ion-view>\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n    <ion-tab title=\"About\" icon=\"ion-help-buoy\">\r\n        <ion-nav-view></ion-nav-view>\r\n    </ion-tab>\r\n\r\n</ion-tabs>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view title=\"Sign-In\" class=\"login-view\" ng-controller=\"LoginCtrl\">\r\n\t<ion-content has-header=\"true\">\r\n\t\t<div class=\"list\">\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Username</span>\r\n\t\t\t\t<input type=\"text\" ng-model=\"user.username\">\r\n\t\t\t</label>\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Password</span>\r\n\t\t\t\t<input type=\"password\" ng-model=\"user.password\">\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t<div class=\"padding\">\r\n\t\t\t<button class=\"button button-block button-positive\" ng-click=\"login(user)\">\r\n\t\t\t\tSign-In\r\n\t\t\t</button>\r\n\t\t\t<p class=\"text-center\">\r\n\t\t\t\t<a href=\"#/forgot-password\">Forgot password</a>\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-view>";

/***/ }
/******/ ]);