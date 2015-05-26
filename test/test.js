var expect = require('chai').expect;
var File = require('vinyl');
var fs = require('fs');
var managedBower = require('../index.js');

describe('Manage bower tests', function(){
	it('Simple example', function(done){
		var example = new File({
		  ced: 'test/',
		  base: 'test/examples/',
		  path: 'test/examples/simple.html',
		  contents: fs.readFileSync('test/examples/simple.html')
		});
		var stream = managedBower({});
		stream
			.on('data', function (data) {
				done();
			})
			.on('error', function(error){
				done(error);
			});
			
		stream.write(example);
	});
});