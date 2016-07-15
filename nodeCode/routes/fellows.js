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
    'image_url'
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
    var thing = {};

    thing.user_id = req.body.user_id;
    thing.first_name = req.body.first_name;
    thing.last_name = req.body.last_name;
    thing.university = req.body.university;
    thing.major = req.body.major;
    thing.bio = req.body.bio;
    thing.interests = req.body.interests;
    thing.description = req.body.description;
    thing.git_hub = req.body.git_hub;
    thing.portfolio = req.body.portfolio;
    thing.developer_type = req.body.developer_type;
    thing.question = req.body.question;
    thing.answer = req.body.answer;
    thing.image_url = req.body.image_url;

    Fellows.update(
        thing,
        {
            where: { user_id: req.params.user_id }
        }).then(function(result){
            // remove all tags, then re-add currently posted tags
            Fellows.findOne({
                where: {
                    user_id: req.params.user_id
                }
            }).then(function(fellow) {
                fellow.setTags(null).then(function() {
                    var count=-1;
                    if (Array.isArray(req.body.tags)) {
                        req.body.tags.forEach(function ( tag ) {
                            if( typeof tag.name !== "undefined" ) {
                                (count === -1 ? 1 : count++);
                                console.log(count);
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
                                    count--;
                                });
                            }
                        });
                        while(count !== 0);//BUSY WAIT LIKE A DUMBASS
                    }
                    getProfileByID(req, res);
                    
                });
                
            });
        });
}


//
/*
        where: {
            user_id: req.params.user_id
        },
        include: [{
            model: Tags
        }]

    }).then(function(fellow) {


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
*/


function getApplicationByID(req, res){

    //res.send('GET request - get a fellow record');
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
    var thing = {};
    thing.first_name       = req.body.first_name;
    thing.last_name        = req.body.last_name;
    thing.university       = req.body.university;
    thing.major            = req.body.major;
    thing.graduation       = req.body.graduation;
    thing.hometown         = req.body.hometown;
    thing.phone            = req.body.phone;
    thing.residentUSA      = req.body.residentUSA;
    thing.description      = req.body.description;
    thing.dreamjob         = req.body.dreamjob;
    thing.resumeURL        = req.body.resumeURL;
    thing.coolthings       = req.body.coolthings;
    thing.referral         = req.body.referral;
    thing.whyHF            = req.body.whyHF;
    thing.MIimpact         = req.body.MIimpact;
    thing.developer_type   = req.body.developer_type;
    thing.devskills        = req.body.devskills;
    thing.achievements     = req.body.achievements;
    thing.involvements     = req.body.involvements;
    thing.git_hub          = req.body.git_hub;
    thing.comments         = req.body.git_hub;

    Fellows.update(
        thing,
        {
            where: {user_id: req.params.user_id }
        }).then(function(result){
            getApplicationByID(req, res);
        });
}


module.exports = app;
