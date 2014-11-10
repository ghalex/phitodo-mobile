/*jslint */
/*global module */

module.exports = {
	"entry": "./src/main.js",
	"output": {
		"path": "./build/",
		"filename": "sp-1.0.0.js"
	},
    "externals": {
        "angular": "angular",
        "jquery": "jQuery",
        "nprogress": "NProgress",
		"phi": "phi"
    },
	"resolve": {
		"alias": {},
		"modulesDirectories": ["src"]
	},
    "module": {}
};