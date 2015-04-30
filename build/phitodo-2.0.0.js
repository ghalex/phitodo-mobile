/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 			/*globals hotAddUpdateChunk parentHotUpdateCallback document XMLHttpRequest __webpack_require__ "" + chunkId + "." + hotCurrentHash + ".hot-update.js" "" + hotCurrentHash + ".hot-update.json" */
/******/ 			function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 				hotAddUpdateChunk(chunkId, moreModules);
/******/ 				if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				var script = document.createElement("script");
/******/ 				script.type = "text/javascript";
/******/ 				script.charset = "utf-8";
/******/ 				script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 				if(typeof XMLHttpRequest === "undefined")
/******/ 					return callback(new Error("No browser support"));
/******/ 				try {
/******/ 					var request = new XMLHttpRequest();
/******/ 					var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 					request.open("GET", requestPath, true);
/******/ 					request.timeout = 10000;
/******/ 					request.send(null);
/******/ 				} catch(err) {
/******/ 					return callback(err);
/******/ 				}
/******/ 				request.onreadystatechange = function() {
/******/ 					if(request.readyState !== 4) return;
/******/ 					if(request.status === 0) {
/******/ 						// timeout
/******/ 						callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 					} else if(request.status === 404) {
/******/ 						// no update available
/******/ 						callback();
/******/ 					} else if(request.status !== 200 && request.status !== 304) {
/******/ 						// other failure
/******/ 						callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 					} else {
/******/ 						// success
/******/ 						try {
/******/ 							var update = JSON.parse(request.responseText);
/******/ 						} catch(e) {
/******/ 							callback(e);
/******/ 							return;
/******/ 						}
/******/ 						callback(null, update);
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		

/******/ 	
/******/ 	/*global "b1abf32d4b1b4512aee9" installedModules __webpack_require__ hotDownloadManifest hotDownloadUpdateChunk modules */
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "b1abf32d4b1b4512aee9"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				fn[name] = __webpack_require__[name];
/******/ 			}
/******/ 		}
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
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
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
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) { if(err) throw err; };
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0; { // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
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
/******/ 			hotRequestedFilesMap[chunkId] = true;
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
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(+id);
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) { if(err) throw err; };
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) { if(err) throw err; };
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = +id;
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
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
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
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
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
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
				__webpack_require__(2),
				__webpack_require__(4),
				__webpack_require__(3),
				__webpack_require__(5),
				__webpack_require__(6),
				__webpack_require__(7)
	        ]
	    };
	    
	}());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        Include = __webpack_require__(10),
	        m = angular.module("app.components", []);
	    
	    m.directive("include", Include);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true, white: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        m = angular.module("app.application", []);
	    
	    m.controller("ApplicationCtrl", __webpack_require__(11));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("application", __webpack_require__(16));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var angular = __webpack_require__(8),
	    m = angular.module("app.todos", []);

	m.controller("TodosCtrl", __webpack_require__(12));
	m.run(["$templateCache", function ($templateCache) {
	    $templateCache.put("todos", __webpack_require__(17));
	}]);

	module.exports = m;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        parse = __webpack_require__(9),
	        m = angular.module("app.login", []);
	    
	    m.controller("LoginCtrl", __webpack_require__(13));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("login", __webpack_require__(18));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        m = angular.module("app.lists", []);
	    
	    m.controller("ListsCtrl", __webpack_require__(14));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("lists", __webpack_require__(19));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        m = angular.module("app.userinfo", []);
	    
	    //m.controller("SmartListsCtrl", require("./SmartListsCtrl"));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("user-info", __webpack_require__(20));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console */

	(function () {
	    "use strict";
	    
	    var angular = __webpack_require__(8),
	        m = angular.module("app.smartlists", []);
	    
	    m.controller("SmartListsCtrl", __webpack_require__(15));
	    m.run(["$templateCache", function ($templateCache) {
	        $templateCache.put("smart-lists", __webpack_require__(21));
	    }]);
	    
	    module.exports = m;
	    
	}());

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Parse;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global require, module, console, angular */

	(function () {
	    "use strict";

	    var IncludeDirective = function ($http, $templateCache, $compile) {
	        
	        return {
	            
	            restrict: 'A',
	            link: function (scope, element, attributes) {
	            
	                var templateUrl = scope.$eval(attributes.include);

	                $http.get(templateUrl, {cache: $templateCache}).success(
	                    function (tplContent) {
	                        element.replaceWith($compile(tplContent)(scope));
	                    }
	                );
	            }
	        };
	    };

	    IncludeDirective.$inject = ["$http", "$templateCache", "$compile"];
	    
	    module.exports = IncludeDirective;
	    
	}());

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var TodosCtrl = function ($scope, $rootScope, $ionicSideMenuDelegate) {
	    
	    $scope.toggleMenu = function () {
	        $ionicSideMenuDelegate.toggleLeft();
	    };
	};
	    
	TodosCtrl.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate"];

	module.exports = TodosCtrl;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, console */

	(function () {
	    "use strict";
	    
	    var parse = __webpack_require__(9);
	    
	    var LoginCtrl = function ($scope, $rootScope, $state) {
	        
	        // region #Vars
	        
			$scope.error = false;
	        $scope.busy = false;
	        
	        // endregion
	        
	        // region #Public function
	        
	        $scope.login = function (user) {
	            
	            //var parseUser = new parse.User({username: user.email, password: user.password});
	            $state.go("todos");
	            
	        };
	        
	        // endregion
	    };
	    
	    LoginCtrl.$inject = ["$scope", "$rootScope", "$state"];
	    module.exports = LoginCtrl;
	    
	}());

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, console */

	(function () {
	    "use strict";
	    
	    var ListsCtrl = function ($scope, $rootScope) {
	        
	        // region #Vars
	        
	        $scope.lists = [];
	        $scope.selectedList = null;
	        $scope.currentUser = null;
	        $scope.todos = [];
	        
	        // endregion
	        
	        // region #Public Functions
	        
	        $scope.selectList = function (list) {
	            $rootScope.$broadcast('listSelected', list);
	            
	            $rootScope.$broadcast('smartListSelected', null);
	            $rootScope.$broadcast('todoSelected', null);
	        };
	        
	        $scope.editList = function (list) {
	            $rootScope.$broadcast('editList', list);
	        };
	        
	        $scope.newList = function () {
	            $rootScope.$broadcast('newList');
	        };
	        
	        $scope.deleteList = function (list) {
	            
	            /*$alert.open({
	                message: "Are you sure do you want to delete <br/> list <b>'" + list.attributes.title + "'</b> ?",
	                yes: function () {
	                    list.destroy().then(function () {
	                        $scope.todos.fetch();
	                        
	                        $rootScope.$broadcast('listSelected', null);
	                        $rootScope.$apply();
	                    });
	                }
	            });*/
	        };
	        
	        // endregion
	        
	        // region #Events
	        
	        $rootScope.$on('newLists', function (event, data) {
	            $scope.lists = data;
	        });
	        
	        $rootScope.$on('listSelected', function (event, data) {
	            $scope.selectedList = data;
	        });
	        
	        $rootScope.$on('userLogIn', function (event, data) {
	            $scope.currentUser = data;
	        });
	        
	        $rootScope.$on('newTodos', function (event, data) {
	            $scope.todos = data;
	        });
	        
	        // endregion
	    };
	    
	    ListsCtrl.$inject = ["$scope", "$rootScope"];
	    
	    module.exports = ListsCtrl;
	    
	}());

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint vars: true, plusplus: true */
	/*global module, require, console */

	(function () {
	    "use strict";
	    
	    var SmartListsCtrl = function ($scope, $rootScope) {
	        
	        // region #Vars
	        
	        $scope.todos = [];
	        $scope.selectedList = null;
	        $scope.selectedSmartList = null;
	        $scope.smartlists = [
	            {
	                id: 1,
	                title: 'Inbox',
	                icon: 'archive',
	                filter: function (todo) {
	                    return !todo.attributes.list;
	                }
	            },
	            {
	                id: 2,
	                title: 'Today',
	                icon: 'calendar',
	                filter: function (todo) {
	                    return todo.isToday() || todo.daysLeft() < 0;
	                }
	            },
	            {
	                id: 3,
	                title: 'Tomorrow',
	                icon: 'android-alarm-clock',
	                filter: function (todo) {
	                    return todo.isTomorrow();
	                }
	            },
	            {
	                id: 4,
	                title: 'Starred',
	                icon: 'android-star-half',
	                filter: function (todo) {
	                    return todo.attributes.isStarred;
	                }
	            }
	        ];
	        
	        // endregion
	        
	        // region #Public function
	        
	        $scope.count = function (todos, filter) {
	            return todos.filter(filter).filter(function (todo) { return !todo.get('isDone'); }).length;
	        };
	        
	        $scope.deselectAllLists = function () {
	            
	            // Deselect lists
	            $rootScope.$broadcast('listSelected', null);
	            $rootScope.$broadcast('smartListSelected', null);
	            
	            // Deselect todo
	            $rootScope.$broadcast('todoSelected', null);
	        };
	        
	        $scope.selectSmartList = function (list) {
	            
	            $scope.deselectAllLists();
	            
	            $scope.selectedSmartList = list;
	            $rootScope.$broadcast('smartListSelected', list);
	        };
	        
	        // endregion
	        
	        // region #Events
	        
	        $rootScope.$on('listSelected', function (event, data) {
	            $scope.selectedList = data;
	        });
	        
	        $rootScope.$on('smartListSelected', function (event, data) {
	            $scope.selectedSmartList = data;
	        });
	        
	        $rootScope.$on('newTodos', function (event, data) {
	            $scope.todos = data;
	        });
	        
	        // endregion
	    };
	    
	    SmartListsCtrl.$inject = ["$scope", "$rootScope"];
	    module.exports = SmartListsCtrl;
	    
	}());

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-tabs class=\"tabs-icon-top\" animation=\"slide-left-right\" ng-controller=\"ApplicationCtrl\">\r\n\r\n    <ion-tab title=\"Home\" icon=\"ion-home\">\r\n        <ion-nav-view name=\"home-tab\"></ion-nav-view>\r\n    </ion-tab>\r\n\r\n    <ion-tab title=\"Todo's\" icon=\"ion-calendar\">\r\n        <ion-nav-view name=\"todos-tab\">\r\n            <ion-view title=\"Todos\"></ion-view>\r\n        </ion-nav-view>\r\n    </ion-tab>\r\n    <ion-tab title=\"About\" icon=\"ion-help-buoy\">\r\n        <ion-nav-view></ion-nav-view>\r\n    </ion-tab>\r\n\r\n</ion-tabs>";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view title=\"Todos\" ng-controller=\"TodosCtrl\" class=\"todos-view\">\r\n    <ion-header-bar class=\"bar-positive\" align-title=\"left\">\r\n        <button class=\"button button-icon icon ion-navicon\" ng-click=\"toggleMenu()\"></button>\r\n        <h1 class=\"title\">Inbox</h1>\r\n    </ion-header-bar>\r\n    \r\n    <ion-content>\r\n        <ion-refresher on-refresh=\"doRefresh()\"></ion-refresher>\r\n\r\n        <div class=\"search list list-inset\">\r\n            <div class=\"item item-input\">\r\n                <i class=\"icon ion-plus-round placeholder-icon\"></i>\r\n                <input type=\"text\" placeholder=\"Add todo...\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"list list-inset\">\r\n\r\n            <ion-item class=\"item-divider\">\r\n                PhiTodo\r\n            </ion-item>\r\n\r\n            <ion-item>Butterfinger</ion-item>\r\n            <ion-item>Something</ion-item>\r\n            <ion-item>Oil</ion-item>\r\n\r\n            <ion-item class=\"item-divider\">\r\n                Work\r\n            </ion-item>\r\n\r\n            <ion-item>Do this</ion-item>\r\n            <ion-item>Work Todo!</ion-item>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ion-view title=\"Sign-In\" \r\n          class=\"login-view\" \r\n          ng-controller=\"LoginCtrl\">\r\n\t\r\n    <ion-content>\r\n\t\t\r\n        <div class=\"list\">\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Username</span>\r\n\t\t\t\t<input type=\"text\" ng-model=\"user.username\">\r\n\t\t\t</label>\r\n\t\t\t<label class=\"item item-input\">\r\n\t\t\t\t<span class=\"input-label\">Password</span>\r\n\t\t\t\t<input type=\"password\" ng-model=\"user.password\">\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t\r\n        <div class=\"padding\">\r\n\t\t\t<button class=\"button button-block button-positive\" ng-click=\"login(user)\">\r\n\t\t\t\tSign-In\r\n\t\t\t</button>\r\n\t\t\t<p class=\"text-center\">\r\n\t\t\t\t<a href=\"#/forgot-password\">Forgot password</a>\r\n\t\t\t</p>\r\n\t\t</div>\r\n        \r\n\t</ion-content>\r\n    \r\n</ion-view>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"lists-view\" ng-controller=\"ListsCtrl\">\r\n    \r\n    <div class=\"list\">\r\n        \r\n        <div class=\"item item-divider\">\r\n\t\t\tLists\r\n\t\t</div>\r\n\t\t\r\n        <div class=\"item\"\r\n             ng-repeat=\"list in lists.toArray()\"\r\n             ng-click=\"selectList(list)\"\r\n             ng-class=\"{active: list.id == selectedList.id}\">\r\n            \r\n\t\t\t<i class=\"color-box {{list.attributes.color}}\"></i>\r\n\t\t\t<span>{{list.attributes.title}}</span>\r\n\t\t\t\r\n        </div>\r\n        \r\n    </div>\r\n</div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"userinfo-view\">\r\n    <div class=\"list\">\r\n        \r\n\t\t<div class=\"item item-avatar\">\r\n\t\t\t<img ng-src=\"images/avatars/avatar0.png\">\r\n\t\t\t<h2>Ghiura Alexandru</h2>\r\n\t\t\t<p>ghalex@gmail.com</p>\r\n\t\t\t<button class=\"button button-icon icon ion-gear-a\"></button>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</div>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"smartlist-view\" ng-controller=\"SmartListsCtrl\">\r\n\t\r\n    <div class=\"list\">\r\n        \r\n\t\t<div class=\"item item-divider\">\r\n\t\t\tSmart Lists\r\n\t\t</div>\r\n\t\t\r\n        <div class=\"item\"\r\n             ng-click=\"deselectAllLists()\"\r\n             ng-class=\"{active: selectedList == null && selectedSmartList == null}\">\r\n            \r\n                <i class=\"icon ion-contrast\"></i>\r\n                <span>All</span>\r\n        </div>\r\n        \r\n        <div class=\"item\"\r\n             ng-repeat=\"list in smartlists\"\r\n             ng-click=\"selectSmartList(list)\"\r\n             ng-class=\"{active: selectedSmartList.id == list.id}\">\r\n            \r\n\t\t\t<i class=\"icon ion-{{list.icon}}\"></i>\r\n\t\t\t<span>{{list.title}}</span>\r\n\t\t\t\r\n        </div>\r\n        \r\n    </div>\r\n\t\r\n</div>";

/***/ }
/******/ ]);