# managed-bower
Mange bower dependencies with html tags

# Usage

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
