var through = require('through2');
function managedBower() {
	return through.obj(function(fileStream, enc, callback){
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