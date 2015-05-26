# managed-bower
Mange bower dependencies with html tags

## Usage

#### HTML file tags

```html
<html>
	<head>
		<script type="text/javascript" mamaged-bower name="jquery" src="/bower_component/jquery/jquery.min.js"></script>
	</head>
	<body>
		
	</body>
</html>
```

#### Javascript API
```javascript
var managedBower = require('managed-bower');
var example = new File({
	  ced: 'test/',
	  base: 'test/examples/',
	  path: 'test/examples/simple.html',
	  contents: fs.readFileSync('test/examples/simple.html')
	});
var stream = managedBower({});
stream.write(example);
```
