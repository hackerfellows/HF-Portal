var express = require('express');
var multer  = require('multer');
var app = express();

var Middleware = require('./middleware');

var models = require('../models');
var Companies = models.companies;
var Fellows = models.fellows;
var Tags = models.tags;
var Users = models.users;

var application_attributes = [
    'name',
    'website_url',
    'location',
    'industry',
    'primary_contact',
    'contact_email',
    'contact_phone',
    'map_url',
    'logo_url',
    'description',
    'age',
    'company_size',
    'value_prop',
    'whyHF',
    'developer_type',
    'devneeds0',
    'devneeds1',
    'devneeds2',
    'devneeds3',
    'devneeds4',
    'ideal_dev'
];
var profile_attributes = [
    'user_id',
    'name',
    'primary_contact',
    'location',
    'company_size',
    'industry',
    'bio',
    'description',
    'developer_type',
    'website_url',
    'image_url'
];
// Image Upload
// var upload = multer({ dest: './public/assets/images/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/images/profile');
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

    Companies.all({
        order: '"name" ASC',
        include: [
            { model: Tags },
            {
                model: Users,
                where: { accepted: 1 },
                required: true,
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
    }).then(function(companys) {
        res.send(companys);
    });
};



function getUnnaccepted(req, res) {
    Companies.all({
        where: {
            name: {ne: null}
        },
        order: '"name" ASC',
        attributes: application_attributes,
        include: [
            {
                model: Users,
                where: { accepted: 0 },
                required: true,
                attributes: ['id', 'email', 'userType']
            }
        ]
    }).then(function(companys) {
        res.send(companys);
    });
};


 
function getProfileByID(req, res){

    Companies.findOne({
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

    Companies.findOne({

        where: {
            user_id: req.params.user_id
        },
        include: [{
            model: Tags
        }]

    }).then(function(company) {

        company.user_id = req.body.user_id;
        company.name = req.body.name;
        company.primary_contact = req.body.primary_contact;
        company.location = req.body.location;
        company.company_size = req.body.company_size;
        company.industry = req.body.industry;
        company.bio = req.body.bio;
        company.description = req.body.description;
        company.developer_type = req.body.developer_type;
        company.website_url = req.body.website_url;

        company.image_url = req.body.image_url;

        company.save();

        // remove all tags, then re-add currently posted tags
        company.setTags(null).then(function() {
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
                                company.addTag(tagObj);
                            }
                            // else create and assign
                            else{
                                Tags.create({
                                    name: tag.name
                                }).then( function( tagObj ){
                                    company.addTag(tagObj);
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
    Companies.findOne({
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
    thing.name = req.body.name;
    thing.website_url = req.body.website_url;
    thing.location = req.body.location;
    thing.industry = req.body.industry;
    thing.primary_contact = req.body.primary_contact;
    thing.contact_email = req.body.contact_email;
    thing.contact_phone = req.body.contact_phone;
    thing.map_url = req.body.map_url;
    thing.logo_url = req.body.logo_url;
    thing.description = req.body.description;
    thing.age = req.body.age;
    thing.company_size = req.body.company_size;
    thing.value_prop = req.body.value_prop;
    thing.whyHF = req.body.whyHF;
    thing.developer_type = req.body.developer_type;
    if(req.body.devneeds !== undefined) {
        thing.devneeds0 = req.body.devneeds[0];
        thing.devneeds1 = req.body.devneeds[1];
        thing.devneeds2 = req.body.devneeds[2];
        thing.devneeds3 = req.body.devneeds[3];
        thing.devneeds4 = req.body.devneeds[4];
    }
    thing.ideal_dev = req.body.ideal_dev;

    console.log(req.body);

    Companies.update(
        thing,
        {
            where: { user_id: req.params.user_id }
        }).then(function(result){
            getApplicationByID(req, res);
        });
}
/*
function putApplicationById(req, res) {

    Companies.findOne({

        where: {
            user_id: req.params.user_id
        },
        attributes: application_attributes

    }).then(function(attributes) {
        // update the company application data here with the req body data
        attributes.name = req.body.name;
        attributes.website_url = req.body.website_url;
        attributes.location = req.body.location;
        attributes.industry = req.body.industry;
        attributes.primary_contact = req.body.primary_contact;
        attributes.contact_email = req.body.contact_email;
        attributes.contact_phone = req.body.contact_phone;
        attributes.map_url = req.body.map_url;
        attributes.logo_url = req.body.logo_url;
        attributes.description = req.body.description;
        attributes.age = req.body.age;
        attributes.company_size = req.body.company_size;
        attributes.value_prop = req.body.value_prop;
        attributes.whyHF = req.body.whyHF;
        attributes.developer_type = req.body.developer_type;
        if(req.body.devneeds !== undefined) {
            attributes.devneeds0 = req.body.devneeds[0];
            attributes.devneeds1 = req.body.devneeds[1];
            attributes.devneeds2 = req.body.devneeds[2];
            attributes.devneeds3 = req.body.devneeds[3];
            attributes.devneeds4 = req.body.devneeds[4];
        }
        attributes.ideal_dev = req.body.ideal_dev;

        attributes.save();

        res.json(attributes);
        //getApplicationByID(req, res);
    });

};
*/
module.exports = app;
