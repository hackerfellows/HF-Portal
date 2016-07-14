var express = require('express');
var multer  = require('multer');
var app = express();

var Middleware = require('./middleware');

var models = require('../models');
var Fellows = models.fellows;
var Companies = models.companies;
var Tags = models.tags;
var Users = models.users;

var application_attributes = [
    'first_name',
    'last_name',
    'university',
    'major',
    'graduation',
    'hometown',
    'phone',
    'residentUSA',
    'description',
    'dreamjob',
    'resumeURL',
    'coolthings',
    'referral',
    'whyHF',
    'MIimpact',
    'developer_type',
    'devskills',
    'achievements',
    'involvements',
    'git_hub',
    'comments'
];

// Image Upload
// var upload = multer({ dest: './public/assets/images/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/images/profile/');
    },
    filename: function (req, file, cb) {

        var ext = "." + file.mimetype.split('/')[1];
        var file_name = file.fieldname + "_"+ Date.now() + ext;
        cb(null, file_name);

    }
});
var upload = multer({ storage: storage });

// GET /fellows - get all fellows
app.get('/', function getFellows(req, res) {

    Fellows.all({

        where: {

            first_name: {ne: null},
            enabled: 1
        },
        order: '"last_name" ASC',
        include: [{
            model: Tags
        }]

    }).then(function(fellows) {

        res.send(fellows);
    });

});

// GET /fellows - get all fellows
app.get('/users', function getFellows(req, res) {

    // @TODO - This eager loads
    Fellows.all({

        order: '"last_name" ASC',
        include: [{

            model: Tags
        },{

            model: Users,
            attributes: ['id', 'email', 'userType'],
            include: [{

                model: Users,
                as: 'VotesFor',
                attributes: ['id', 'email', 'userType'],
                include: [{

                    model: Companies
                }]
            },
            {

                model: Users,
                as: 'VotesCast',
                attributes: ['id', 'email', 'userType'],
                include: [{

                    model: Companies
                }]
            }]

        }]

    }).then(function(fellows) {

        res.send(fellows);
    });

});

// GET /fellows/:id - get one fellow
app.get('/:id', function getFellow(req, res){

    //res.send('GET request - get a company record');
    Fellows.findOne({

        where: {
            id: req.params.id
        },
        include: [{
            model: Tags
        }]

    }).then(function(fellow) {

        res.send(fellow);
    });
});

// GET /fellows/user_id/:id - get one fellow by user_id
app.get('/user_id/:user_id', function getFellow(req, res){

    //res.send('GET request - get a company record');
    Fellows.findOne({

        where: {
            user_id: req.params.user_id
        },
        include: [{

            model: Tags

        },{
            model: Users
        }]

    }).then(function(fellow) {

        res.send(fellow);
    });
});

// POST /fellows - create a new fellow record
// ** Create a new fellow and fetch relations -- admin page expects certain data
app.post('/', Middleware.isAdmin, function postFellow(req, res) {

    Fellows.create({

        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        //university: req.body.university,
        //major: req.body.major,
        bio: req.body.bio,
        interests: req.body.interests,
        description: req.body.description,
        git_hub: req.body.git_hub,
        portfolio: req.body.portfolio,
        developer_type: req.body.developer_type,
        question: req.body.question,
        answer: req.body.answer,
        image_url: req.body.image_url,
        enabled: req.body.enabled

    }).then(function( fellow ) {

        // get loaded fellow obj
        Fellows.findOne({

            where: {
                id: fellow.id
            },
            include: [{
                model: Tags
            },{
                model: Users,
                attributes: ['id', 'email', 'userType'],
                include: [{

                    model: Users,
                    as: 'VotesFor',
                    attributes: ['id', 'email', 'userType'],
                    include: [{

                        model: Companies
                    }]
                },
                {

                    model: Users,
                    as: 'VotesCast',
                    attributes: ['id', 'email', 'userType'],
                    include: [{

                        model: Companies
                    }]
                }]
            }]

        }).then(function(fellow) {

            res.send(fellow);
        });

    });

});


// PUT /fellows/:id - updates an existing fellow record
app.put('/:id', Middleware.isLoggedIn, function putFellow(req, res) {

    Fellows.findOne({

        where: {
            id: req.params.id
        },
        include: [{
            model: Tags
            //where: { state: Sequelize.col('project.state') }
        }]

    }).then(function(fellow) {

        var currentUser = req.user;
        if( currentUser.userType !== 'Admin' ) {

            if (fellow.user_id !== currentUser.id) {

                res.send('Unauthorized');
                return;
            }
        }

        fellow.user_id = req.body.user_id;
        fellow.first_name = req.body.first_name;
        fellow.last_name = req.body.last_name;
        //fellow.university = req.body.university;
        //fellow.major = req.body.major;
        fellow.bio = req.body.bio;
        fellow.interests = req.body.interests;
        fellow.description = req.body.description;
        fellow.git_hub = req.body.git_hub;
        fellow.portfolio = req.body.portfolio;
        fellow.developer_type = req.body.developer_type;

        fellow.question = req.body.question;
        fellow.answer = req.body.answer;

        fellow.image_url = req.body.image_url;
        fellow.enabled = req.body.enabled;

        fellow.save();

        //console.log( req.body.tags );

        // remove all tags, then re-add currently posted tags
        fellow.setTags(null).then(function() {


            if (Array.isArray(req.body.tags)) {

                req.body.tags.forEach(function ( tag ) {

                    if( typeof tag.name !== "undefined" ) {

                        Tags.findOne({

                            where: {
                                name: {

                                    ilike: tag.name
                                }
                            }

                        }).then(function (tagObj) {

                            // if tag found assign
                            if( tagObj ){

                                fellow.addTag(tagObj);
                            }
                            // else create and assign
                            else{

                                Tags.create({

                                    name: tag.name

                                }).then( function( tagObj ){

                                    fellow.addTag(tagObj);
                                });
                            }
                        });
                    }
                });
            }

        });

        res.send(fellow);
    });

});

// DELETE /fellows/:id - deletes an existing fellow record
app.delete('/:id', Middleware.isAdmin, function deleteFellow(req, res) {
    Fellows.findOne({
        where: { id: req.params.id }
    }).then(function(fellow) {
        fellow.destroy();
        res.send("Fellow Deleted");
    });
});


// GET /fellows/applications - lists all application data
app.get('/applications', function getFellows(req, res) {

    Fellows.all({

        // change this so it only requests certain columnts
        // (might have to just get all the columns but handle returning certain
        // columns in the callback)
        where: {

            first_name: {ne: null},
            enabled: 1
        },
        order: '"last_name" ASC',
        attributes: application_attributes

    }).then(function(fellows) {

        res.send(fellows);
    });

});


// GET /fellows/application:id - get one fellow's application data
app.get('/:id', function getFellow(req, res){

    //res.send('GET request - get a company record');
    Fellows.findOne({

        where: {
            id: req.params.id
        },
        attributes: application_attributes

    }).then(function(attributes) {
        res.send(attributes);
    });
});

// PUT /fellows/application:id - updates an existing fellow's application
app.put('/application/:id', Middleware.isLoggedIn, function putFellow(req, res) {

    Fellows.findOne({

        where: {
            id: req.params.id
        }

    }).then(function(fellow) {

        // make sure they're either the proper user or an admin
        var currentUser = req.user;
        if( currentUser.userType !== 'Admin' ) {

            if (fellow.user_id !== currentUser.id) {

                res.send('Unauthorized');
                return;
            }
        }
 
        // update the fellow application data here with the req body data
        fellow.first_name       = req.body.first_name;
        fellow.last_name        = req.body.last_name;
        fellow.university       = req.body.university;
        fellow.major            = req.body.major;
        fellow.graduation       = req.body.graduation;
        fellow.hometown         = req.body.hometown;
        fellow.phone            = req.body.phone;
        fellow.residentUSA      = req.body.residentUSA;
        fellow.description      = req.body.description;
        fellow.dreamjob         = req.body.dreamjob;
        fellow.resumeURL        = req.body.resumeURL;
        fellow.coolthings       = req.body.coolthings;
        fellow.referral         = req.body.referral;
        fellow.whyHF            = req.body.whyHF;
        fellow.MIimpact         = req.body.MIimpact;
        fellow.developer_type   = req.body.developer_type;
        fellow.devskills        = req.body.devskills;
        fellow.achievements     = req.body.achievements;
        fellow.involvements     = req.body.involvements;
        fellow.git_hub          = req.body.git_hub;
        fellow.comments         = req.body.git_hub;

        fellow.save();

        res.send(fellow);
    });

});

//app.put('/set_flags', function putFlags(req, res) {
//    Fellows.all

module.exports = app;
