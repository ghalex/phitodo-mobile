/*jslint plusplus: true, node: true */
/*global require, module */

'use strict';

var angular = require('angular'),
    Framework7 = require('framework7'),
    settings = require('settings'),
    todos = require('todos');

// Init
var app = angular.module('app', ['ui.router', 'app.todos', 'app.settings']),
    f7 = new Framework7({modalTitle: 'TodoGmail'}),
    mainView = f7.addView('.view-main', {});

// Start app
angular.bootstrap(document, ['app']);

// Exports
module.exports = app;
    
