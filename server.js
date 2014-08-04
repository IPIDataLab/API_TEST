// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express		= require('express'); 		// call express
var app			= express(); 				// define our app using express
var bodyParser  = require('body-parser');
var mongoose	= require('mongoose');		// Create connetion to mongodb
var connect		= mongoose.connect('mongodb://localhost:27017/pppDB');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// import models
var Country		= require('./app/models/country')
var Contribution = require('./app/models/contributions')

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// define routes for countries collection
router.route('/countries')
	// get all the countries (accessed at GET http://localhost:8080/api/countries)
	.get(function(req, res) {
		Country.find(function(err, countries) {
			if (err)
				res.send(err);

			res.send(countries);
		});
	});

// on routes that end in /countries/:country_id
// ----------------------------------------------------
router.route('/countries/:country_id')

	// get the country with a given ISO3 country id (accessed at GET http://localhost:8080/api/countries/:country_id)
	.get(function(req, res) {
		req.params.country_id = req.params.country_id.toUpperCase();
		return Country.find(req.params, function(err, country) {
			if(!err) {
				res.json(country);
			}else{
				return console.log(err);
			}
		});
	});

// define routes for contributions collection
router.route('/contributions')
	// get all the contributions (accessed at GET http://localhost:8080/api/contributions)
	.get(function(req, res) {
		Contribution.find(function(err, contributions) {
			if (err)
				res.send(err);

			res.send(contributions);
		});
	});

// on routes that end in /countries/:country_id
// ----------------------------------------------------
router.route('/contributions/:country')

	// get all the contributions from a given country (accessed at GET http://localhost:8080/api/contributions/:country)
	.get(function(req, res) {
		req.params.country = req.params.country.toUpperCase();
		return Contribution.find(req.params, function(err, contribution) {
			if(!err) {
				res.json(contribution);
			}else{
				return console.log(err);
			}
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);