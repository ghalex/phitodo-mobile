/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require("angular"),
    googleService = require("./GoogleService.js"),
    deviceService = require("./DeviceService.js"),
    m = null;
    
m = angular.module('app.services', []);

m.service("google", googleService);
m.service("device", deviceService);

module.exports = m;