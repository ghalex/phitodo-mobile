/*jslint vars: true, plusplus: true */
/*global require, module, console */

(function () {
    "use strict";
    
    var angular = require("angular"),
        m = angular.module("app.settings", []);
    
    m.controller("SettingsCtrl", require("./SettingsCtrl"));
    m.run(["$templateCache", function ($templateCache) {
        $templateCache.put("settings", require("./Settings.html"));
    }]);
    
    module.exports = m;
    
}());