var through = require('through2');
var bower = require('bower');
var htmlparser = require("htmlparser2");

function parseHtml(params) {
	var parser = new htmlparser.Parser({
		onopentag: function (name, attribs) {
			if (name === "script" && attribs.type === "text/javascript") {
				console.log("JS! Hooray!");
			}
		},
		ontext: function (text) {
			console.log("-->", text);
		},
		onclosetag: function (tagname) {
			if (tagname === "script") {
				console.log("That's it?!");
			}
		}
	});
	parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
	parser.end();
}

function bowerInstall(params) {
	bower.commands
		.install(['jquery'], { save: true }, { /* custom config */ })
		.on('end', function (installed) {
		console.log(installed);
	});

}
function managedBower() {
	return through.obj(function (fileStream, enc, callback) {
		if (fileStream.isBuffer()) {
			var file = String(fileStream.contents);
			console.log(file);
			file += 'hihihi';
			fileStream.contents = new Buffer(file);
			callback(null, fileStream);
		}

		if (fileStream.isStream())
			callback('Stream not supported yet');
	});
}


module.exports = managedBower;