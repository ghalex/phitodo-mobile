/*jslint vars: true, plusplus: true, white: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        parse = require("parse"),
        m = angular.module("app.application", []);
    
    m.controller("ApplicationCtrl", require("./ApplicationCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("application", require("./Application.html"));
    }]);
    
    module.exports = m;
    
}());