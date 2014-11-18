/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var template = require("html-loader!./Settings.html"),
    controller = require("./SettingsCtrl.js"),
    angular = require("angular"),
    angularModule = null;
    
angularModule = angular.module('app.settings', []);

angularModule.controller("SettingsCtrl", controller);
angularModule.run(function ($templateCache) {
    $templateCache.put("settings", template);
});

module.exports = angularModule;