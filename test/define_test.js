var assert = require("assert");
var helpers = require("./helpers");
var path = require("path");
var through = require("through2");

var ssr = require("../lib/index");

describe("Using can-define plain constructors", function(){
	this.timeout(10000);

	before(function(){
		this.render = ssr({
			config: "file:" + path.join(__dirname, "tests", "package.json!npm"),
			main: "define/index.stache!done-autorender"
		}, {
			strategy: 'safe',
		});
	});

	it("Returns a response", function(done){
		var response = through(function(buffer){
			var html = buffer.toString();
			var node = helpers.dom(html);

			var worked = node.getElementById("worked");

			assert.ok(worked, "rendered the page");
			done();
		});
		this.render("/test").pipe(response);
	});
});
