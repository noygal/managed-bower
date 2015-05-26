var expect = require('chai').expect;
var File = require('vinyl');
var fs = require('fs');
var del = require('del');
var managedBower = require('../index.js');

describe('Manage bower tests', function(){
	this.timeout(10000);
	it('Simple example', function(done){
		var example = new File({
		  ced: 'test/',
		  base: 'test/examples/',
		  path: 'test/examples/simple.html',
		  contents: fs.readFileSync('test/examples/simple.html')
		});
		var stream = managedBower({directory: 'test/examples/vendors'});
		stream
			.on('data', function (data) {
				done();
			})
			.on('error', function(error){
				done(error);
			});
			
		stream.write(example);
	});
	it('Multiple example', function(done){
		var example = new File({
		  ced: 'test/',
		  base: 'test/examples/',
		  path: 'test/examples/multi.html',
		  contents: fs.readFileSync('test/examples/multi.html')
		});
		var stream = managedBower({directory: 'test/examples/vendors'});
		stream
			.on('data', function (data) {
				done();
			})
			.on('error', function(error){
				done(error);
			});
			
		stream.write(example);
	});
	afterEach(function(){
		del.sync('test/examples/vendors');
	});
});