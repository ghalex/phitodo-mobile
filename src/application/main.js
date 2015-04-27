/*jslint vars: true, plusplus: true, white: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        parse = require("parse"),
        m = angular.module("app.application", []);
    
    m.controller("ApplicationCtrl", require("./ApplicationCtrl"));
    m.run(["$templateCache", "$rootScope", "$state", "$timeout", "f7", function ($templateCache, $rootScope, $state, $timeout, f7) {
        
        $templateCache.put("application", require("./Application.html"));
        
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams) {

                var user = parse.User.current();
            
                switch (toState.name) {
                    
                    case "signup":
                    break;
                        
                    case "login":
                        
                        // If we have a login user
                        // redirect to application
                        if (user) {
                            $timeout(function () {
                                $state.go("application");
                            });
                        }
                        
                    break;                        
                        
                    case "application":
                        
                        // if we are not login
                        // we must redirect to login
                        if (!user) {
                            event.preventDefault();

                            $timeout(function () {

                                // save current route so after login we can
                                // restore application to the same route
                                $state.redirect = {};
                                $state.redirect.params = toParams;
                                $state.redirect.state = toState.name;

                                // go to login
                                $state.go("login");

                            }, 100);
                            
                            return;
                        }
						
						// Init Framework7
						f7.addView(".view-main");
						console.log("Framework7 intialized.");
                            
                    break;
                }
            });
        
    }]);
    
    module.exports = m;
    
}());