// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express		= require('express'); 		// call express
var app			= express(); 				// define our app using express
var bodyParser  = require('body-parser');
var mongoose	= require('mongoose');		// Create connetion to mongodb
mongoose.connect('mongodb://node:node@localhost:27017');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// import models
var Country		= require('./app/models/country')

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
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {

		Country.find(function(err, countries) {
			if (err)
				res.send(err);

			res.json(countries);
		});
	});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);