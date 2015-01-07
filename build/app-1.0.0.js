var PhiApp =
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

	var $ = __webpack_require__(1),
	    angular = __webpack_require__(2),
	    Framework7 = __webpack_require__(3),
	    settings = __webpack_require__(4),
	    services = __webpack_require__(5),
	    todos = __webpack_require__(6);


	var PhiApp = function () {
	    
	    /** Create AngularJS app **/
	    this.angularApp = angular.module('app', ['app.todos', 'app.settings', 'app.services']);
	    
	    /** Include directive **/
	    this.angularApp.directive('include', function ($templateCache) {
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
	    
	    /** F7 factory **/
	    this.angularApp.factory('f7', function () {
	        var f7 = new Framework7({modalTitle: 'TodoGmail'});
	        f7.addView('.main-view', {});

	        return f7;
	    });
	    
	    this.angularApp.run(function (f7, google, $q, $rootScope) {
	    
	        $q.all([google.login(), google.loadAPIs()]).then(function () {

	            google.getUserInfo().then(function (user) {
	                
	                $rootScope.todos = [];
	                $rootScope.loading = false;
	                $rootScope.user = user;
	                $rootScope.$broadcast('appReady');
	                
	                $('.loading-overlay').remove();
	                
	                
	            });

	        });
	        
	        //google.login().then(function () {
	        //    $('.loading-overlay').remove();
	        //});
	    });
	    
	    /** Starting point **/
	    this.start = function () {
	        angular.bootstrap(document, ['app']);
	    };
	};

	// Exports
	module.exports = PhiApp;
	    


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Framework7;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var template = __webpack_require__(13),
	    controller = __webpack_require__(8),
	    angular = __webpack_require__(2),
	    m = null;
	    
	m = angular.module('app.settings', []);

	m.controller("SettingsCtrl", controller);
	m.run(function ($templateCache) {
	    $templateCache.put("settings-tab", template);
	});

	module.exports = m;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var angular = __webpack_require__(2),
	    googleService = __webpack_require__(9),
	    deviceService = __webpack_require__(10),
	    m = null;
	    
	m = angular.module('app.services', []);

	m.service("google", googleService);
	m.service("device", deviceService);

	module.exports = m;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var template = __webpack_require__(12),
	    controller = __webpack_require__(7),
	    angular = __webpack_require__(2),
	    m = null;
	    
	m = angular.module('app.todos', []);

	m.controller("TodosCtrl", controller);
	m.run(function ($templateCache) {
	    $templateCache.put("todos-tab", template);
	});

	module.exports = m;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var TodosCtrl = function ($scope, $rootScope, google) {
	        
	    $scope.done = function (todo) {
	        todo.isDone = !todo.isDone;
	        $rootScope.loading = true;
	        
	        google.updateTodo($rootScope.user.id, todo.id).then(function () {
	            $scope.reload();
	        });
	    };
	    
	    $scope.findTodo = function (todo) {
	        var i = 0;
	        
	        for (i = 0; i < $scope.todos.length; i++) {
	            if (todo.id === $scope.todos[i].id) {
	                return todo;
	            }
	        }
	        
	        return null;
	    };
	    
	    $scope.reload = function () {
	        
	        $rootScope.loading = true;
	        
	        google.loadTodos($rootScope.user.id, []).then(function (todos) {
	            
	            $rootScope.todos = todos;
	            $rootScope.loading = false;
	        });
	    };
	    
	    $rootScope.$on('appReady', function () {
	        $scope.reload();
	    });
	};
	    
	TodosCtrl.$inject = ["$scope", "$rootScope", "google"];

	module.exports = TodosCtrl;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true */
	/*global require, module */

	'use strict';

	var SettingsCtrl = function ($scope) {

	};
	    
	SettingsCtrl.$inject = ["$scope"];

	module.exports = SettingsCtrl;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true, vars: true */
	/*global require, module */

	'use strict';

	var GoogleService = function ($q, device) {
	    
	    var PROJECT_ID      = 'todo-gmail-1986',
	        CLIENT_ID       = '1070900723620-n6pf5q8ha6tfart5rkr6eaavqf1cvu7e.apps.googleusercontent.com',
	        CLIENT_SECRET   = 'RL4Y12AkuDlr3wiQ3BzoNKrO',
	        API_KEY         = 'AIzaSyCEbDkQOJR626_SWtkpZM1ridtbossk40Y',
	        API_KEY_ANDROID = 'AIzaSyCZbZTd4-gStEiCUys-6mai6-atO0yRZKU',
	        REDIRECT_URI    = 'http://localhost',
	        SCOPE           = 'https://www.googleapis.com/auth/gmail.modify',
	        gapi = __webpack_require__(11),
	        $ = __webpack_require__(1);
	    
	    var $log = $('.log');
	    
	    /**
	     * Sign In with google on the phone 
	     * using InAppBrowser
	     *
	     * @param success
	     * @param error
	     */
	    this.phonegapLogin = function (success, error) {
	            
	        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
	            client_id: CLIENT_ID,
	            redirect_uri: REDIRECT_URI,
	            response_type: 'code',
	            scope: SCOPE
	        });

	        //Open the OAuth consent page in the InAppBrowser
	        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no'),
	            deferred = $q.defer();

	        $(authWindow).on('loadstart', function (e) {

	            var url = e.originalEvent.url;
	            var code = /\?code=(.+)$/.exec(url);
	            var error = /\?error=(.+)$/.exec(url);

	            if (code || error) {
	                authWindow.close();
	            }

	            if (code) {

	                $.post('https://accounts.google.com/o/oauth2/token', {
	                    code: code[1],
	                    client_id: CLIENT_ID,
	                    client_secret: CLIENT_SECRET,
	                    redirect_uri: REDIRECT_URI,
	                    grant_type: 'authorization_code'
	                }).done(function (data) {

	                    gapi.client.setApiKey(API_KEY_ANDROID);
	                    gapi.auth.setToken(data);

	                    deferred.resolve(data);

	                });
	            } else if (error) {
	                deferred.reject(error);
	            }
	        });
	        
	//        var deferred = $q.defer();
	//        
	//        phonegapi.signIn({
	//            client_id: CLIENT_ID,
	//            client_secret: CLIENT_SECRET,
	//            scope: SCOPE,
	//            callback: function(error, tokens) {
	//                
	//                if (error) {
	//                    $log.append("error");
	//                } else {
	//                    $log.append("success");
	//                    deferred.resolve(tokens);
	//                }
	//            }
	//        });
	//        
	//        return deferred.promise;
	    };
	      
	    /**
	     * Sign In usig gapi
	     */
	    this.browserLogin = function () {

	        var deferred = $q.defer();
	        
	        gapi.client.setApiKey(API_KEY);
	        gapi.auth.authorize({
	            client_id: CLIENT_ID,
	            scope: SCOPE,
	            immediate: false
	        }, function (authResult) {
	            if (authResult && !authResult.error) {
	                deferred.resolve(authResult);
	            } else {
	                deferred.reject(authResult);
	            }
	        });
	        
	        return deferred.promise;
	    };
	    
	    /**
	     * Choose 'browserLogin' or 'phonegapLogin' depending
	     * on the platform.
	     */
	    this.login = function () {
	        
	        if (!device.isPhonegap()) {
	            return this.browserLogin();
	        } else {
	            return this.phonegapLogin();
	        }
	    };
	    
	    /**
	     * Load user information, like
	     * email, display name, etc...
	     */
	    this.getUserInfo = function () {
	        if (!gapi.client.oauth2) {
	            throw new Error('OAuth2 api not loaded!');
	        }
	        
	        var deferred = $q.defer();
	        
	        gapi.client.oauth2.userinfo.get().execute($.proxy(function (resp) {
	            
	            this.user = {};
	            this.user.id = resp.id;
	            this.user.email = resp.email;
	            this.user.displayName = resp.family_name + " " + resp.given_name;
	            this.user.picture = resp.picture;
	            
	            deferred.resolve(this.user);
	            
	        }, this));
	        
	        return deferred.promise;
	    };
	    
	    /**
	     * Load all Google Api's required.
	     */
	    this.loadAPIs = function () {
	        var gmailPromise = $q.defer(),
	            oAuthPromise = $q.defer(),
	            all;
	                
	        gapi.client.load('gmail', 'v1', function () {
	            gmailPromise.resolve(gapi);
	        });
	        
	        gapi.client.load('oauth2', 'v2', function () {
	            oAuthPromise.resolve(gapi);
	        });
	        
	        all = $q.all([gmailPromise.promise, oAuthPromise.promise]);
	        
	        return all;
	    };
	    
	    this.loadTodos = function (userId, labels) {
	        
	        var i = 0,
	            todos = [],
	            deferred = $q.defer(),
	            request = gapi.client.gmail.users.messages.list({'userId': userId, 'labelIds': ['Label_41']});
	      
	        request.execute(function (result) {
	            
	            if (result.messages) {
	                for (i = 0; i < result.messages.length; i++) {

	                    gapi.client.gmail.users.messages.get({'userId': userId, 'id': result.messages[i].id, 'format': 'metadata'}).execute(function (todo) {
	                        todos.push({
	                            id: todo.id,
	                            subject: todo.payload.headers[12].value,
	                            from: todo.payload.headers[10].value,
	                            date: todo.payload.headers[15].value,
	                            snippet: todo.snippet
	                        });

	                        if (todos.length === result.messages.length) {
	                            deferred.resolve(todos);
	                        }
	                    });
	                }
	            } else {
	                deferred.resolve([]);
	            }
	        });
	        
	        return deferred.promise;
	    };
	    
	    this.loadLabels = function (userId) {
	        
	        var deferred = $q.defer(),
	            request = gapi.client.gmail.users.labels.list({'userId': userId});
	        
	        request.execute(function (result) {
	            deferred.resolve(result.labels);
	        });
	        
	        return deferred.promise;
	    };
	    
	    this.updateTodo = function (userId, messageId) {
	        var deferred = $q.defer(),
	            request = gapi.client.gmail.users.messages.modify({'userId': userId, 'id': messageId, 'removeLabelIds': ['Label_41']});
	        
	        request.execute(function (result) {
	            deferred.resolve(result);
	        });
	        
	        return deferred.promise;
	    };
	};
	    
	GoogleService.$inject = ['$q', 'device'];

	module.exports = GoogleService;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*jslint plusplus: true, node: true, vars: true */
	/*global require, module, cordova, phonegap */

	'use strict';

	var DeviceService = function () {
	    
	    this.isPhonegap = function () {
	        return (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined');
	    };
	};
	    
	DeviceService.$inject = [];

	module.exports = DeviceService;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = gapi;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab\" ng-controller=\"TodosCtrl\">\r\n    \r\n    <form class=\"searchbar no-margin\">\r\n        <div class=\"searchbar-input\">\r\n            <input type=\"search\" placeholder=\"Search\" ng-model=\"searchText\">\r\n            <a href=\"#\" class=\"searchbar-clear\"></a>\r\n        </div>\r\n    </form>\r\n    \r\n    <div class=\"scroll-block toolbar-through\">\r\n    \r\n        <div class=\"list-block inset\">\r\n            <ul>\r\n                <li>\r\n                    <a href=\"#\" class=\"item-link list-button\" ng-click=\"reload()\">\r\n                        <div ng-show=\"loading\" class=\"todos-preloader\"><span class=\"preloader\"></span></div>\r\n                        <label>Click to reload</label>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"list-block inset\">\r\n            \r\n            <div class=\"list-group\">\r\n                <ul>\r\n                    <li class=\"list-group-title\">ghalex@gmail.com</li>\r\n                    \r\n                    <li class=\"item-content todo\" ng-repeat=\"todo in todos\">\r\n                        <div class=\"item-media\" ng-click=\"done(todo)\">\r\n                            <i ng-class=\"{'checkbox-done-icon': todo.isDone}\" class=\"icon checkbox-icon\"></i>\r\n                        </div>\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-title\" ng-class=\"{'strike':todo.isDone}\">\r\n                                <div>{{todo.subject}}</div>\r\n                                <div class=\"todo-snippet\">{{todo.snippet}}</div>\r\n                            </div>\r\n                            <div class=\"item-after\"></div>\r\n                        </div>\r\n                    </li>\r\n                    \r\n                    <li ng-show=\"todos.length == 0\">\r\n                        <div class=\"center padding5x\">No todos! Hurray !</div>\r\n                    </li>\r\n                    \r\n                    \r\n                </ul>\r\n            </div>\r\n            \r\n        </div>\r\n    \r\n    </div>\r\n</div>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"tab\" ng-controller=\"SettingsCtrl\">\r\n    <div class=\"profile-block\">\r\n        <div class=\"profile-image\"><img ng-src=\"{{user.picture}}\"></div>\r\n        <div class=\"profile-title\">{{user.displayName}}</div>\r\n        <div class=\"profile-email\">{{user.email}}</div>\r\n    </div>\r\n\r\n    <div class=\"home-block\">\r\n\r\n        <div class=\"scroll-block toolbar-through\">\r\n            <!--General list-->\r\n            <div class=\"list-block inset\">\r\n                <ul>\r\n                    <li class=\"list-group-title\">General</li>\r\n                    <li class=\"item-content align-left item-link\">\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-media\">\r\n                                <i class=\"icon icon-normal color-icon\"></i>\r\n                            </div>\r\n                            <div class=\"item-title\">Theme Color</div>\r\n                            <div class=\"item-after\">\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"item-content align-left item-link\">\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-media\">\r\n                                <i class=\"icon icon-normal image-icon\"></i>\r\n                            </div>\r\n                            <div class=\"item-title\">Background</div>\r\n                            <div class=\"item-after\">\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <!--More list-->\r\n            <div class=\"list-block inset\">\r\n                <ul>\r\n                    <li class=\"list-group-title\">More</li>\r\n                    <li class=\"item-content align-left item-link\">\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-media\">\r\n                                <i class=\"icon icon-normal help-icon\"></i>\r\n                            </div>\r\n                            <div class=\"item-title\">Support</div>\r\n                            <div class=\"item-after\"></div>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"item-content align-left item-link\">\r\n                        <div class=\"item-inner\">\r\n                            <div class=\"item-media\">\r\n                                <i class=\"icon icon-normal users-icon\"></i>\r\n                            </div>\r\n                            <div class=\"item-title\">About us</div>\r\n                            <div class=\"item-after\"></div>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";

/***/ }
/******/ ])