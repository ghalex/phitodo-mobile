/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var angular = __webpack_require__(1),
	    Framework7 = __webpack_require__(2),
	    settings = __webpack_require__(3),
	    todos = __webpack_require__(4);

	// Init
	var app = angular.module('app', [
	    'app.todos',
	    'app.settings'
	]);

	app.directive('includePage', function (f7, $templateCache) {
	    return {
	        replace: true,
	        restrict: 'A',
	        template: function (element, attr) {
	            return $templateCache.get(attr.includePage);
	        },
	        link: function (scope, element, attrs) {
	            f7.mainView.initialPages.push(element[0]);
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
	    


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Framework7;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var template = __webpack_require__(8),
	    controller = __webpack_require__(6),
	    angular = __webpack_require__(1),
	    angularModule = null;
	    
	angularModule = angular.module('app.settings', []);

	angularModule.controller("SettingsCtrl", controller);
	angularModule.run(function ($templateCache) {
	    $templateCache.put("settings", template);
	});

	module.exports = angularModule;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var template = __webpack_require__(7),
	    controller = __webpack_require__(5),
	    angular = __webpack_require__(1),
	    angularModule = null;
	    
	angularModule = angular.module('app.todos', []);

	angularModule.controller("TodosCtrl", controller);
	angularModule.run(function ($templateCache) {
	    $templateCache.put("todos", template);
	});

	module.exports = angularModule;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"page\" data-page=\"todos\">\r\n    <div class=\"page-content\">\r\n        <div class=\"content-block\">\r\n            <p>Page 1</p>\r\n            <a href=\"#settings\">GoTo</a>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"page cached\" data-page=\"settings\">\r\n    <div class=\"page-content\">\r\n        <div class=\"content-block\">\r\n            <p>Page 2</p>\r\n            <a href=\"#todos\" class=\"back\">Go Back</a>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }
/******/ ])