/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        m = angular.module("app.lists", []);
    
    m.controller("ListsCtrl", require("./ListsCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("lists", require("./Lists.html"));
    }]);
    
    module.exports = m;
    
}());