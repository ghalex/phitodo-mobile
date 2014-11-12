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
	    settings = __webpack_require__(4),
	    todos = __webpack_require__(3);

	// Init
	var app = angular.module('app', ['ui.router', 'app.todos', 'app.settings']),
	    f7 = new Framework7({modalTitle: 'TodoGmail'}),
	    mainView = f7.addView('.view-main', {});

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
	    
	angularModule = angular.module('app.todos', []);

	angularModule.controller("TodosCtrl", controller);
	angularModule.run(function ($templateCache) {
	    $templateCache.put("todos-template", template);
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
	    
	angularModule = angular.module('app.settings', []);

	angularModule.controller("SettingsCtrl", controller);
	angularModule.run(function ($templateCache) {
	    $templateCache.put("settings-template", template);
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

	module.exports = "<div>\r\n    <div class=\"page-content\">\r\n        <div class=\"content-block\">\r\n            <div>\r\n                <a href=\"#tab1\" class=\"button tab-link\">Back</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\r\n    <form class=\"searchbar\">\r\n        <div class=\"searchbar-input\">\r\n            <input type=\"search\" placeholder=\"Search\" class=\"\">\r\n            <a href=\"#\" class=\"searchbar-clear\"></a>\r\n        </div>\r\n    </form>\r\n    \r\n    <div class=\"page-content\">\r\n        <div class=\"content-block\">\r\n            <div id=\"login\">\r\n                <a href=\"#\">Google Sign In!</a>\r\n                <a href=\"#tab2\" class=\"button button-big button-fill tab-link\">Settings</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }
/******/ ])