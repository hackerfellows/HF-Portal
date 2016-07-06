var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.send('Hello World! With double fancy. and new things');
});
app.get('/file', function (req, res) {
	res.sendFile('/srv/hf/public/index.html');
});

var port = 5000;
app.listen(port, function () {
	console.log('Example app listening on port' + port);
});
