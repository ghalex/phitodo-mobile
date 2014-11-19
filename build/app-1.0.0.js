/******/ (function(modules) { // webpackBootstrap
/******/ 	this["webpackHotUpdate"] = 
/******/ 			function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 				hotAddUpdateChunk(chunkId, moreModules);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadUpdateChunk(chunkId) {
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				script.type = 'text/javascript';
/******/ 				script.charset = 'utf-8';
/******/ 				script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadManifest(callback) {
/******/ 				if(typeof XMLHttpRequest === "undefined")
/******/ 					return callback(new Error("No browser support"));
/******/ 				try {
/******/ 					var request = new XMLHttpRequest();
/******/ 					request.open("GET", __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json", true);
/******/ 					request.send(null);
/******/ 				} catch(err) {
/******/ 					return callback(err);
/******/ 				}
/******/ 				request.onreadystatechange = function() {
/******/ 					if(request.readyState !== 4) return;
/******/ 					if(request.status !== 200 && request.status !== 304) {
/******/ 						callback();
/******/ 					} else {
/******/ 						try {
/******/ 							var update = JSON.parse(request.responseText);
/******/ 						} catch(e) {
/******/ 							callback();
/******/ 							return;
/******/ 						}
/******/ 						callback(null, update);
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "df93cfe97ec8212b6c25";
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParent = 0;
/******/ 	
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		var fn = function(request) {
/******/ 			if(installedModules[request] && installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 				installedModules[request].parents.push(moduleId);
/******/ 			if(me && me.children.indexOf(request) < 0)
/******/ 				me.children.push(request);
/******/ 			hotCurrentParent = moduleId;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		fn.e = function(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		for(var name in __webpack_require__)
/******/ 			fn[name] = __webpack_require__[name];
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 				else for(var i = 0; i < dep.length; i++)
/******/ 					hot._acceptedDependencies[dep[i]] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else for(var i = 0; i < dep.length; i++)
/******/ 					hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			setApplyOnUpdate: function(applyOnUpdate) {
/******/ 				hotApplyOnUpdate = applyOnUpdate;
/******/ 			},
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			}
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		var oldStatus = hotStatus;
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function hotCheck(callback) {
/******/ 		callback = callback || function(err) { if(err) throw err };
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0; {
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		for(var moduleId in moreModules) {
/******/ 			hotUpdate[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				outdatedModules.push(+id);
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(callback) {
/******/ 		callback = callback || function(err) { if(err) throw err };
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		for(var id in hotUpdate) {
/******/ 			outdatedModules.push(+id);
/******/ 		}
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module || module.hot._selfAccepted)
/******/ 				continue;
/******/ 			if(module.hot._selfDeclined) {
/******/ 				hotSetStatus("abort");
/******/ 				return callback(new Error("Aborted because of self decline: " + moduleId));
/******/ 			}
/******/ 			if(moduleId === 0) {
/******/ 				hotSetStatus("abort");
/******/ 				return callback(new Error("Aborted because of bubbling"));
/******/ 			}
/******/ 			for(var i = 0; i < module.parents.length; i++) {
/******/ 				var parentId = module.parents[i];
/******/ 				var parent = installedModules[parentId];
/******/ 				if(parent.hot._declinedDependencies[moduleId]) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId));
/******/ 				}
/******/ 				if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 				if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 					if(!outdatedDependencies[parentId]) outdatedDependencies[parentId] = [];
/******/ 					if(outdatedDependencies[parentId].indexOf(moduleId) >= 0) continue;
/******/ 					outdatedDependencies[parentId].push(moduleId);
/******/ 					continue;
/******/ 				}
/******/ 				delete outdatedDependencies[parentId];
/******/ 				outdatedModules.push(parentId);
/******/ 				queue.push(parentId);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push(moduleId);
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j]
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 					if(child.parents.length === 0 && child.hot && child.hot._disposeHandlers && child.hot._disposeHandlers.length > 0) {
/******/ 						// Child has dispose handlers and no more references, dispose it too
/******/ 						queue.push(child.id);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			var module = installedModules[moduleId];
/******/ 			var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 			for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 				var dependency = moduleOutdatedDependencies[j];
/******/ 				var idx = module.children.indexOf(dependency);
/******/ 				if(idx >= 0) module.children.splice(idx, 1);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in hotUpdate) {
/******/ 			modules[moduleId] = hotUpdate[moduleId];
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			var module = installedModules[moduleId];
/******/ 			var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 			var callbacks = [];
/******/ 			for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 				var dependency = moduleOutdatedDependencies[i];
/******/ 				var cb = module.hot._acceptedDependencies[dependency];
/******/ 				if(callbacks.indexOf(cb) >= 0) continue;
/******/ 				callbacks.push(cb);
/******/ 			}
/******/ 			for(var i = 0; i < callbacks.length; i++) {
/******/ 				var cb = callbacks[i];
/******/ 				try {
/******/ 					cb(outdatedDependencies);
/******/ 				} catch(err) {
/******/ 					if(!error)
/******/ 						error = err;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var moduleId = outdatedSelfAcceptedModules[i];
/******/ 			hotCurrentParent = moduleId;
/******/ 			__webpack_require__(moduleId);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(undefined),
/******/ 			parents: [hotCurrentParent],
/******/ 			data: hotCurrentModuleData[undefined],
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	return hotCreateRequire(0)(0);
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

	var template = __webpack_require__(8),
	    controller = __webpack_require__(6),
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

	var template = __webpack_require__(7),
	    controller = __webpack_require__(5),
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

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var TodosCtrl = function ($scope) {
	        
	    $scope.todos = [
	        {
	            id: 1,
	            isDone: false,
	            title: "Send papers to Goteburg with ...."
	        },
	        {
	            id: 2,
	            isDone: false,
	            title: "Todo 2, for more info"
	        },
	        {
	            id: 3,
	            isDone: false,
	            title: "Load all mails with label @todo and ..."
	        }
	    ];
	};
	    
	TodosCtrl.$inject = ["$scope"];

	module.exports = TodosCtrl;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab active\">\r\n    \r\n    <form class=\"searchbar no-margin\">\r\n        <div class=\"searchbar-input\">\r\n            <input type=\"search\" placeholder=\"Search\" ng-model=\"searchText\">\r\n            <a href=\"#\" class=\"searchbar-clear\"></a>\r\n        </div>\r\n    </form>\r\n    \r\n    <div class=\"scroll-block searchbar-through\">\r\n    \r\n        <div class=\"list-block inset\">\r\n            <ul>\r\n                <li>\r\n                    <a href=\"#\" class=\"item-link list-button\">Sample: {{searchText}}</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"list-block inset\">\r\n            <div class=\"list-group\">\r\n            <ul>\r\n                <li class=\"list-group-title\">ghalex@gmail.com</li>\r\n                <li class=\"swipeout\">\r\n                    <div class=\"swipeout-content item-content\">\r\n                        <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-title\">Item title</div>\r\n                            <div class=\"item-after\">#richard,  #np</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"swipeout-actions-right\">\r\n                        <a href=\"#\" class=\"bg-red\">Delete</a>\r\n                    </div>\r\n                </li>\r\n                <li class=\"swipeout\">\r\n                    <div class=\"swipeout-content item-content\">\r\n                        <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-title\">Item with badge</div>\r\n                            <div class=\"item-after\"><span class=\"badge\">5</span></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"swipeout-actions-right\">\r\n                        <a href=\"#\" class=\"bg-red\">Delete</a>\r\n                    </div>\r\n                </li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-done-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title strike\">Item title</div>\r\n                        <div class=\"item-after\">#inbox</div>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"list-block inset\">\r\n            <div class=\"list-group\">\r\n            <ul>\r\n                <li class=\"list-group-title\">aghiura@tibco.com</li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title\">Mail from \"aa@b\" to this</div>\r\n                        <div class=\"item-after\"><span class=\"badge\">1</span></div>\r\n                    </div>\r\n                </li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title\">Another task</div>\r\n                        <div class=\"item-after\"><span class=\"badge\">5</span></div>\r\n                    </div>\r\n                </li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title\">Do this \"today\"</div>\r\n                        <div class=\"item-after\"><span class=\"badge\">5</span></div>\r\n                    </div>\r\n                </li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title\">Buy some cards</div>\r\n                        <div class=\"item-after\"><span class=\"badge\">5</span></div>\r\n                    </div>\r\n                </li>\r\n                <li class=\"item-content\">\r\n                    <div class=\"item-media\"><i class=\"icon checkbox-icon\"></i></div>\r\n                    <div class=\"item-inner\">\r\n                        <div class=\"item-title\">Item with badge</div>\r\n                        <div class=\"item-after\"><span class=\"badge\">5</span></div>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n            </div>\r\n        </div>\r\n    \r\n    </div>\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab\">\r\n    <div class=\"content-block\">\r\n        <p>Page 2</p>\r\n        <a href=\"#tab1\" class=\"tab-link\">Back</a>\r\n    </div>\r\n</div>";

/***/ }
/******/ ])