# managed-bower
Mange bower dependencies with html attributes.

## Usage

#### Gulp

This is not fully compliment gulp plugin, but it follows most of the guidelines.

The files are pipe without modification, so you can just drop it to the pipeline at any stage.

```js
var managedBower = require('managed-bower');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
    .pipe(managedBower({directory: 'install/packages/here'}))
		// .pipe(minifyHTML()) // the file are pipe without modification
    .pipe(gulp.dest('./dist/'))
});
```


#### HTML

Just add ```managed-bower``` attribute to the ```<script>``` element to make the magic happen.

You also need to provide the bower package name under ```name``` attribute.

Example:
```html
<html>
	<head>
		<script type="text/javascript" managed-bower name="jquery" src="vendors/jquery/jquery.min.js"></script>
		<script type="text/javascript" managed-bower name="lodash" src="vendors/lodash/lodash.min.js"></script>
	</head>
	<body>
	</body>
</html>
```

#### Javascript

Require the module, invoke it with ```config``` object, and then stream you files to it.

The ```config``` object is passed on as is to bower install command, the most useful option is ```{ directory : 'install/packages/here' }``` but feel free to consult [bower docs](http://bower.io/docs/api/#programmatic-api).

Example:
```javascript
var managedBower = require('managed-bower');
var File = require('vinyl');

var example = new File({
  ced: 'test/',
  base: 'test/examples/',
  path: 'test/examples/multi.html',
  contents: fs.readFileSync('test/examples/multi.html')
});
//pass on configuration object to bower
var stream = managedBower({directory: 'test/examples/vendors'});
stream
	.on('data', function (results) {
		//array of bower results, will be empty object if already installed
	})
	.on('error', function(error){
		//handel error
	});
stream.write(example);
```
