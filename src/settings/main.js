/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var template = require("html-loader!./Settings.html"),
    controller = require("./SettingsCtrl.js"),
    angular = require("angular"),
    m = null;
    
m = angular.module('app.settings', []);

m.controller("SettingsCtrl", controller);
m.run(function ($templateCache) {
    $templateCache.put("settings-tab", template);
});

module.exports = m;