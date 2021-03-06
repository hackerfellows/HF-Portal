var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var passport = require('passport');
var Sequelize = require('sequelize');
var PassportLocalStrategy = require('passport-local').Strategy;

var models = require('../models');
var Fellows = models.fellows;
var Companies = models.companies;
var Tags = models.tags;
var Users = models.users;
var FellowTag = models.fellow_tag;
var CompanyTag = models.company_tag;
var Votes = models.votes;


var Middleware = require('./middleware');

/** User Auth - Passport **/

passport.use(new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        Users.findOne({
            where: {
                email: {
                    ilike: email
                }
            }
        }).then(function (user) {
            if (user === null) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            if ( bcrypt.compareSync( password, user.password) ) {
                return done(null, user);
            }
            return done(null, false, { message: 'Incorrect credentials.' });
        });
    }
));

passport.serializeUser(function( user, done ) {
    done(null, {
        id: user.id,
        email: user.email,
        userType: user.userType
    });
});

passport.deserializeUser(function( user, done ) {
    models.users.findOne({
        where: {
            'id': user.id
        }
    }).then(function (user) {
        if (user === null) {
            done(new Error('Wrong user id.'));
        }
        done(null, user);
    });
});

/** User Routes **/

app.get( '/:user_id/votes', Middleware.isLoggedIn, function( req, res ){
    Users.scope('public').findOne({
        where: {
            id: req.params.user_id
        },
        include: [
            { model: Users, as: 'VotesFor' },
            { model: Users, as: 'VotesCast' }
        ]
    }).then(function(user) {
        var results = {
            votesFor: user.VotesFor,
            votesCast: user.VotesCast
        };
        res.send(results);
    });
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var errJSON = {
            success: false,
            message: 'Invalid username or password.'
        };
        if (err || !user) {
            return res.json(errJSON);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(errJSON);
            }
            return res.json({
                success: true,
                user: req.session.passport.user
            });
        });
    })(req, res, next);
});


// Check to see if a user is currently logged in, if so return their info
app.get('/confirm-login', function (req, res) {
    var ret = {};
    var retStatus = -42;
    var user = req.user;
    console.log(user);
    if( user !== undefined ) {
        ret.success = true;
        ret.user = user.dataValues;
        ret.user.password = undefined;
        retStatus = 200;
    }else{
        ret.success = false;
        ret.user = null;
        retStatus = 401;
    }
    res.status(retStatus).json( ret );
});


// Log user out
app.get( '/logout', Middleware.isOwnerOrAdmin, function( req, res ){
    req.logout();
    res.end();
});


// Create a new user
app.post('/create', function createUser(req, res) {
    // check if a user with the same email doesn't already exist
    Users.findOne({
        where: {
            email: {
                ilike: req.body.email
            }
        }
    }).then(function(user) {
        if( user === null ) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    Users.create({
                        email: req.body.email,
                        password: hash,
                        userType: req.body.userType
                    }).then(function(user) {
                        //No reason to return password to client, and this is clearly the best way
                        //to prevent this.
                        if(req.body.userType === 'Fellow') {
                            Fellows.create({
                                user_id : user.id
                            }).then(function(fellow) {
                                user.dataValues.password = undefined;
                                res.send(user.dataValues);
                            });
                        }
                        else if(req.body.userType === 'Company') {
                            Companies.create({
                                user_id : user.id
                            }).then(function(company) {
                                user.dataValues.password = undefined;
                                res.send(user.dataValues);
                            });
                        }
                    });
                });
            });
        }else{
            res.status(400).send({ error: 'Email already exists' });
        }
    });
});


// DELETE /users/ - Deletes a user
app.delete('/:user_id', Middleware.isAdmin, function (req, res) {
    Users.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(function(user) {
        if( user !== null ){
            //Now find all their associated data and delete it

            //Delete user if exists
            Fellows.findOne({
                where: { user_id: req.params.user_id }
            }).then(function(fellow) {
                if(fellow !== null){
                    //Find and delete fellow_tags
                    FellowTag.destroy({
                        where: { fellow_id: fellow.id }
                    });
                    fellow.destroy();
                    //Find and delete votes
                    Votes.destroy({
                        where: Sequelize.or(
                            {voter_id: user.id},
                            {votee_id: user.id}
                        )
                    }).then(function() {
                        user.destroy();
                    });
                }
            });

            //Delete company if exists
            Companies.findOne({
                where: { user_id: req.params.user_id }
            }).then(function(company) {
                if(company !== null){
                    //Find and delete company_tags
                    CompanyTag.destroy({
                        where: { company_id: company.id }
                    });
                    company.destroy();
                    //Find and delete votes
                    Votes.destroy({
                        where: Sequelize.or(
                            {voter_id: user.id},
                            {votee_id: user.id}
                        )
                    }).then(function() {
                        user.destroy();
                    });
                }
            });


            res.send({success: true});
        }
        else{
            res.status(400).json({success: false, error: 'User not found'});
        }
    });
});

app.put('/flags/:user_id', Middleware.isAdmin, function putFlagsByID(req, res) {
    console.log("put user/flags/" + req.params.user_id);
    Users.findOne({
        where: {
            id: req.params.user_id
        },
    }).then(function(user) {
        
        var flagsSet = {};
        if (req.body.hasOwnProperty("application_past_due")) {
            user.application_past_due = req.body.application_past_due;
            flagsSet.application_past_due = true;
        }
        if (req.body.hasOwnProperty("vote_enabled")) {
            user.vote_enabled = req.body.vote_enabled;
            flagsSet.vote_enabled = true;
        }
        if (req.body.hasOwnProperty("application_state")) {
            user.application_state = req.body.application_state;
            flagsSet.application_state = true;
        }
        if (req.body.hasOwnProperty("profile_enabled")) {
            user.profile_enabled = req.body.profile_enabled;
            flagsSet.profile_enabled = true;
        }
        if (Object.keys(flagsSet).length > 0) {
            user.save();
            res.json({success: true, data: flagsSet});
        } else {
            res.status(400).json({success: false, error: 'No Flags Passed'});
        }
    });

});
app.get('/flags/:user_id', Middleware.isAdmin, function getFlagsByID(req, res) {
    Users.findOne({
        where: {
            id: req.params.user_id
        },
        attributes: ['application_past_due', 'vote_enabled', 'application_state', 'profile_enabled']
    }).then(function(user) {
        res.json({success: user !== null, data: user});
    });
});

//This is after flags because put /flags was interpreted as flags as user_id
app.put('/:user_id', Middleware.isAdmin, function putUser(req, res) {
    Users.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(function(user) {
        user.email = req.body.email;
        user.save();

        if( req.body.password !== undefined && req.body.password.length > 0 ){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    user.password = hash;
                    user.save();
                });
            });
        }
        else{
            res.send(user);
        }
    });
});
module.exports = app;
