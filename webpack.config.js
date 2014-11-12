/*jslint */
/*global module */

module.exports = {
	"entry": "./src/main.js",
	"output": {
		"path": "./build/",
		"filename": "app-1.0.0.js"
	},
    "externals": {
        "angular": "angular",
        "framework7": "Framework7",
        "cordova": "cordova"
    },
	"resolve": {
		"alias": {},
		"modulesDirectories": ["src"]
	},
    "module": {}
};