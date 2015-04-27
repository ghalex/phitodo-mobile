/*jslint */
/*global module, require */

var webpack = require("webpack");

module.exports = {
	"entry": "./src/main.js",
	"output": {
		"path": "./build/",
		"filename": "phitodo-2.0.0.js"
	},
    "externals": {
        "angular": "angular",
        "parse": "Parse",
        "jquery": "jQuery"
    },
	"resolve": {
		"alias": {},
		"modulesDirectories": ["src"]
	},
    "plugins": [
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    "module": {
        loaders: [
            { test: /\.html$/, loader: "html-loader" }
        ]
    }
};