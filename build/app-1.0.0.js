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

	var template = __webpack_require__(7),
	    controller = __webpack_require__(5),
	    angular = __webpack_require__(1),
	    m = null;
	    
	m = angular.module('app.settings', []);

	m.controller("SettingsCtrl", controller);
	m.run(function ($templateCache) {
	    $templateCache.put("settings-tab", template);
	});

	module.exports = m;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var template = __webpack_require__(8),
	    controller = __webpack_require__(6),
	    angular = __webpack_require__(1),
	    m = null;
	    
	m = angular.module('app.todos', []);

	m.controller("TodosCtrl", controller);
	m.run(function ($templateCache) {
	    $templateCache.put("todos-tab", template);
	});

	module.exports = m;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab\">\r\n    <div class=\"content-block\">\r\n        <p>Page 2</p>\r\n        <a href=\"#tab1\" class=\"tab-link\">Back</a>\r\n    </div>\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab active\">\r\n    \r\n    <form class=\"searchbar\">\r\n        <div class=\"searchbar-input\">\r\n            <input type=\"search\" placeholder=\"Search\" ng-model=\"searchText\">\r\n            <a href=\"#\" class=\"searchbar-clear\"></a>\r\n        </div>\r\n    </form>\r\n    \r\n    <div class=\"content-block\">\r\n        <p>Page 1</p>\r\n        <a href=\"#tab2\" class=\"tab-link\">GoTo: {{searchText}}</a>\r\n    </div>\r\n    \r\n</div>";

/***/ }
/******/ ])