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

var profile_attributes = [
    'user_id',
    'first_name',
    'last_name',
    'university',
    'major',
    'bio',
    'interests',
    'description',
    'git_hub',
    'portfolio',
    'developer_type',
    'question',
    'answer',
    'image_url',
    'enabled',
    'accepted'
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
app.get('/', getAcceptedFellows);

function getAcceptedFellows(req, res) {

    Fellows.all({
        where: {
            accepted: 1
        },
        order: '"last_name" ASC',
        include: [
            { model: Tags },
            {
                model: Users,
                attributes: ['id', 'email', 'userType'],
                include: [
                     {
                        model: Users,
                        as: 'VotesFor',
                        attributes: ['id', 'email', 'userType'],
                        include: [{ model: Companies }]
                    },
                {
                    model: Users,
                    as: 'VotesCast',
                    attributes: ['id', 'email', 'userType'],
                    include: [{ model: Companies }]
                }]
            }
        ]
    }).then(function(fellows) {
        res.send(fellows);
    });
};


// GET /fellows/application - lists name and user_id of all applicants not accepted
app.get('/unaccepted', function getFellows(req, res) {
    Fellows.all({
        where: {
            first_name: {ne: null},
            accepted: 0
        },
        order: '"last_name" ASC',
        attributes: application_attributes,
        include: [
            {
                model: Users,
                attributes: ['id', 'email', 'userType']
            }
        ]
    }).then(function(fellows) {
        res.send(fellows);
    });
});


app.get('/profile/:user_id', getProfileByID);
 
function getProfileByID(req, res){

    Fellows.findOne({
        where: {
            user_id: req.params.user_id
        },
        attributes: profile_attributes,
        include: [
            {
                model: Tags
            },
            {
                model: Users,
                attributes: ['id', 'email', 'userType'],
                include: [
                     {
                        model: Users,
                        as: 'VotesFor',
                        attributes: ['id', 'email', 'userType'],
                        include: [{ model: Companies }]
                    },
                {
                    model: Users,
                    as: 'VotesCast',
                    attributes: ['id', 'email', 'userType'],
                    include: [{ model: Companies }]
                }]
            }
        ]
    }).then(function(attributes) {
        res.send(attributes);
    });
};


app.put('/profile/:user_id', function putFellow(req, res) {

    Fellows.findOne({

        where: {
            user_id: req.params.user_id
        },
        include: [{
            model: Tags
        }]

    }).then(function(fellow) {

        fellow.user_id = req.body.user_id;
        fellow.first_name = req.body.first_name;
        fellow.last_name = req.body.last_name;
        fellow.university = req.body.university;
        fellow.major = req.body.major;
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
        fellow.accepted = req.body.accepted;

        fellow.save();

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
        
        getProfileByID(req, res);
    });

});



// GET /fellows/application:id - get one fellow's full application data
app.get('/application/:user_id', getApplicationByID);

function getApplicationByID(req, res){

    //res.send('GET request - get a company record');
    Fellows.findOne({
        where: {
            user_id: req.params.user_id
        },
        attributes: application_attributes

    }).then(function(attributes) {
        res.send(attributes);
    });
};


// PUT /fellows/application:id - updates an existing fellow's application
app.put('/application/:user_id', function putFellow(req, res) {

    Fellows.findOne({

        where: {
            user_id: req.params.user_id
        }

    }).then(function(fellow) {
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

        //res.json({ success: true });
        getApplicationByID(req, res);
    });

});


module.exports = app;
