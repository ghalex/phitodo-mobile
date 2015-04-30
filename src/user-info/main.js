/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        m = angular.module("app.userinfo", []);
    
    //m.controller("SmartListsCtrl", require("./SmartListsCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("user-info", require("./UserInfo.html"));
    }]);
    
    module.exports = m;
    
}());