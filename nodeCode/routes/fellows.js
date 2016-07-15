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





app.get('/', getAccepted);

app.get('/unaccepted', getUnnaccepted);

app.get('/profile/:user_id', getProfileByID);

app.put('/profile/:user_id', putProfileById)

app.get('/application/:user_id', getApplicationByID);

app.put('/application/:user_id', putApplicationById);





function getAccepted(req, res) {

    Fellows.all({
        order: '"last_name" ASC',
        include: [
            { model: Tags },
            {
                model: Users,
                attributes: ['id', 'email', 'userType'],
                where: { accepted: 1 },
                required: true,
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



function getUnnaccepted(req, res) {
    Fellows.all({
        where: {
            first_name: {ne: null}
        },
        order: '"last_name" ASC',
        attributes: application_attributes,
        include: [
            {
                model: Users,
                where: { accepted: 0 },
                required: true,
                attributes: ['id', 'email', 'userType']
            }
        ]
    }).then(function(fellows) {
        res.send(fellows);
    });
};


 
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



function putProfileById(req, res) {

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

};



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



function putApplicationById(req, res) {

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

};


module.exports = app;
