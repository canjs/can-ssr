var debug = require("can-zone/debug");
var fs = require("fs");

module.exports = function(/*doc, */timeoutZone){
	var modal = fs.readFileSync(__dirname + "/modal.html", "utf8");
	var infoh = fs.readFileSync(__dirname + "/info.html", "utf8");

	return function(data){
		return {
			beforeTimeout: function(){
				var doc = data.document;
				var info = data.debugInfo || [];

				var div = doc.createElement("div");
				div.setAttribute("id", "done-ssr-debug");
				div.innerHTML = modal;

				var modalBody = div.getElementById("ssr-modal-body");
				info.forEach(function(d){
					var div = doc.createElement("div");
					div.innerHTML = infoh.replace("{{title}}", d.task);

					div.getElementsByTagName("pre")[0].appendChild(
						doc.createTextNode(d.stack)
					);

					modalBody.appendChild(div);
				});

				doc.body.appendChild(div);

				data.html = doc.documentElement.outerHTML;
			},

			plugins: [debug(timeoutZone)]
		};
	};
};
