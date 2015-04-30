/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        Include = require("./Include"),
        m = angular.module("app.components", []);
    
    m.directive("include", Include);
    
    module.exports = m;
    
}());