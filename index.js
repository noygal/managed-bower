var through = require('through2');
function managedBower() {
	return through.obj(function(file, enc, callback){
		console.log(String(file.contents));
		callback(null, String(file.contents));
	});
}


module.exports = managedBower;