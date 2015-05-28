# managed-bower
Mange bower dependencies with html tags

## Usage



#### HTML file tags

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

#### Javascript API

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
