
module.exports = function(grunt){

	grunt.initConfig({
		copy: {
			toTest: {
				files: [{
					expand: true,
					src:["node_modules/can/**"],
					dest: "test/tests/",
					filter: "isFile"
				}, {
					expand: true,
					src:["node_modules/jquery/**"],
					dest: "test/tests/",
					filter: "isFile"

				}, {
					expand: true,
					src:["node_modules/done-autorender/**"],
					dest: "test/tests/",
					filter: "isFile"
				}, {
					expand: true,
					src:["node_modules/can-zone/**"],
					dest: "test/tests/",
					filter: "isFile"
				}, {
					expand: true,
					src:["node_modules/can-wait/**"],
					dest: "test/tests/node_modules/done-autorender/",
					filter: "isFile"
				}]
			},
			tojQuery: {
				files: [{
					expand: true,
					src:["node_modules/can/**"],
					dest: "test/tests/jquery/",
					filter: "isFile"
				}, {
					expand: true,
					src:["node_modules/jquery/**"],
					dest: "test/tests/jquery/",
					filter: "isFile"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["copy"]);
};
