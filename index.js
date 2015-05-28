var through = require('through2');
var bower = require('bower');
var htmlparser = require('htmlparser2');
var Promise = require('es6-promise').Promise;

function parseHtml(file, config) {
	var promises = [];
	var parser = new htmlparser.Parser({
		onopentag: function (name, attribs) {
			if (name === 'script' && attribs['managed-bower'] === '') {
				promises.push(bowerInstall(attribs.name, config));
			}
		}
	});
	parser.write(file);
	parser.end();
	return Promise.all(promises);
}

function bowerInstall(name, config) {
	return new Promise(function (resolve, reject) {
		bower.commands
			.install([name], { save: false }, config)
			.on('error', function (error) {
			reject(error);
		})
			.on('end', function (installed) {
			resolve(installed);
		});
	});
}

function managedBower(config) {
	config = config || {};
	return through.obj(function (fileStream, enc, callback) {
		if (fileStream.isBuffer()) {
			var file = String(fileStream.contents);
			parseHtml(file, config)
				.then(function (results) {
//				console.log(results);
				callback(null, fileStream);
			})
			.catch(function (error) {
//				console.log(error);				
				callback(error);	
			});
			//fileStream.contents = new Buffer(file);
		}

		if (fileStream.isStream())
			callback('Stream not supported yet');
	});
}


module.exports = managedBower;