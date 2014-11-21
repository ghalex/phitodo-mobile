/*jslint plusplus: true, node: true, vars: true */
/*global require, module, cordova, phonegap */

'use strict';

var DeviceService = function () {
    
    this.isPhonegap = function () {
        return (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined');
    };
};
    
DeviceService.$inject = [];

module.exports = DeviceService;