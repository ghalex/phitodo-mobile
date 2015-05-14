/*jslint plusplus: true */
/*global require, module, Parse */

(function () {
    'use strict';
    
    Parse.initialize("6xp02QoMB5WVH3pcDKEWMynFsapSc4N1AXYlD79s", "myl156ExVHtHwoZ5QD4J1W3vJeu5YSUE0sebe6Eg");
    
    module.exports = {
        modules: [
			require("components"),
			require("login"),
			require("todos"),
			require("todo-details"),
			require("lists"),
			require("user-info"),
			require("smart-lists"),
			require("settings")
        ]
    };
    
}());