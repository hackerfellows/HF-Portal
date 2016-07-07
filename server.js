var express = require('express');
var bodyParser = require('body-parser');


//Import handelers for each thing
var users = require('./nodeCode/users.js');



var app = express();


//Set app port
console.log("Setting port: ");
app.set('port', (process.env.PORT || 5000));
console.log('Port set: ' + app.get('port'));



/** This makes getting Posted Data from req.body work */
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


//Set api route handelers
app.use('/api/v2/users', users);


//Also serve static files
app.use(express.static('public'));



/** Server Startup **/
try{
	var server = app.listen(app.get('port'), function createServer() {
		var host = server.address().address;
		var port = server.address().port;
		console.log("HFPortal app listening at http://%s:%s", host, port);
	});

}
catch(err) {
	console.log("goodbye world, I'm crashing");
	console.log(err);
	exit(1);
}
