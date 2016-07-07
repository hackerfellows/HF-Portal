var express = require('express');

//So each of these is a seperate app kinda, and you handle the subroutes based on wherever this is registered
// in the main app.
var app = express();


//Example: whatever/api/v2/users/
app.get('/', function (req, res) {
	res.send('Hello World! With double fancy. and new things');
});


module.exports = app;
