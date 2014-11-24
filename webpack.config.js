/*jslint */
/*global module */

module.exports = {
	"entry": "./src/main.js",
	"output": {
		"path": "./build/",
		"filename": "app-1.0.0.js",
        "libraryTarget": "var",
        "library": "PhiApp"
	},
    "externals": {
        "angular": "angular",
        "framework7": "Framework7",
        "cordova": "cordova",
        "jquery": "jQuery",
        "gapi": "gapi"
    },
	"resolve": {
		"alias": {},
		"modulesDirectories": ["src"]
	},
    "module": {}
};