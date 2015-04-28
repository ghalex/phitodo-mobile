/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        parse = require("parse"),
        m = angular.module("app.login", []);
    
    m.controller("LoginCtrl", require("./LoginCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("login", require("./Login.html"));
    }]);
    
    module.exports = m;
    
}());