var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var passport = require('passport');


//Import handelers for each thing
var models = require('./nodeCode/models');
var fellows = require('./nodeCode/routes/fellows');
var companies = require('./nodeCode/routes/companies');
var tags = require('./nodeCode/routes/tags');
var votes = require('./nodeCode/routes/votes');
var users = require('./nodeCode/routes/users');


var models = require('./nodeCode/models');

var app = express();

// This must be done before passport is initialized
app.use(require('express-session')({
   secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());


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
app.use('/api/v2/fellows', fellows);
app.use('/api/v2/companies', companies);
app.use('/api/v2/tags', tags);
app.use('/api/v2/votes', votes);
app.use('/api/v2/users', users);


//Also serve static files
app.use(express.static('public'));



/** Server Startup **/
try{
    models.sequelize.sync().then(function () {
        // check for and create admin user if not present
        models.users.findOne({

            where: {
                email: {

                    ilike: 'admin@hackerfellows.com'
                }
            }

        }).then( function( user ){

            if( user === null ) {

                bcrypt.genSalt(10, function(err, salt) {

                    bcrypt.hash( 'password', salt, function(err, hash) {

                        models.users.create({

                            email: 'admin@hackerfellows.com',
                            password: hash,
                            userType: 'Admin'

                        }).then(function(user) {

                            console.log( "Default user admin@hackerfellows.com" );

                        });
                    });
                });

            }
        });

        //Start http server
        var server = app.listen(app.get('port'), function createServer() {
            var host = server.address().address;
            var port = server.address().port;
            console.log("HFPortal app listening at http://%s:%s", host, port);
        });
    });

}
catch(err) {
    console.log("goodbye world, I'm crashing");
    console.log(err);
    exit(1);
}