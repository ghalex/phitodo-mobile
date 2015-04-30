/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        m = angular.module("app.smartlists", []);
    
    m.controller("SmartListsCtrl", require("./SmartListsCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("smart-lists", require("./SmartLists.html"));
    }]);
    
    module.exports = m;
    
}());