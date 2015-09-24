var path = require('path');

var compression = require('compression');
var express = require('express');

var middleware = require('../middleware');
var xhr = require('./xhr');
require('./websocket');
var proxy = require('./proxy');
var os = require('os');

module.exports = function (options) {
	var app = express()
		.use(compression())
		.use(xhr());

	if (options.configure) {
		options.configure(app);
	}

	if (options.proxy) {
		var apiPath = options.proxyTo || '/api';
		if(apiPath.charAt(0) !== '/') {
			apiPath = '/' + apiPath;
		}

		app.use(apiPath, proxy(options.proxy));
	}

	var system = options.system || {};
	system.liveReloadHost = os.hostname();

	// Old API
	if(options.main) {
		system.main = options.main;
	}

	app.use(express.static(path.join(options.path)))
		.use(middleware(system, options));

	return app;
};
