// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express		= require('express'); 		// call express
var app			= express(); 				// define our app using express
var bodyParser  = require('body-parser');
var mongoose	= require('mongoose');		// Create connection to mongodb

// configuration
var connect		= mongoose.connect('mongodb://localhost:27017/pppDB');
var port = process.env.PORT || 8080; 		// set our port
var prefix = '/ppp_api';					// route prefix

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// import models
var Country			= require('./app/models/countries')
var Contribution 	= require('./app/models/contributions')
var Mission 		= require('./app/models/missions')
var Aggregate 		= require('./app/models/aggregates')


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Serving up ' + req.url);
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.jsonp({ message: 'hooray! welcome to our api!' });	
});

// test mongoose query route using contribution collection
router.route('/search')
	// search contributions based on query params (accessed at GET http://localhost:8080/ppp_api/search?...)

	//GET REQUEST
	.get(function(req, res) {
		
		//Parses query to return main query terms
		function parseQuery(req) {
			var mainQuery = {};
			for(key in req.query) {
				mainQuery[key] = req.query[key];
			}
			delete mainQuery.date;
			return mainQuery;
		}

		//Parses query to return date query
		function getDateQuery(req) {
			if('date' in req.query) {
				var dateQuery = req.query.date;
			}
			return dateQuery;
		}

		//Get's array of countries that match main query terms
		function getCountryArray(query) {
			var query = Country.find(query, 'country_id');
			return query;
		}

		var mainQuery = parseQuery(req);
		var dateQuery = getDateQuery(req);


		//ASSING QUERY TO VARIABLE
		var queryArray = getCountryArray(mainQuery);

		//EXECUTE QUERY
		queryArray.exec(function(err,countries){
			//INITIALIZE EMPTY ARRAY
			var countries = [];
			//ERR CATCHING
			if(err)
				return console.log(err);
			//ITERATE THROUGH EACH QUER RESULT AND ADD ID TO ARRAY
			countries.forEach(function(country){
				countries.push(country.country_id);
			});

			Contribution.find({country : {$in : countries}}, function(err, contribution) {
				if(!err) {
					res.jsonp(contribution);
				}else{
					return console.log(err);
				}
			});
		});
	});


// define routes for countries collection
router.route('/countries')
	// get all the countries (accessed at GET http://localhost:8080/ppp_api/countries)
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

	// get the country with a given ISO3 country id (accessed at GET http://localhost:8080/ppp_api/countries/:country_id)
	.get(function(req, res) {
		req.params.country_id = req.params.country_id.toUpperCase();
		Country.find(req.params, function(err, country) {
			if(!err) {
				res.jsonp(country);
			}else{
				return console.log(err);
			}
		});
	});

// define routes for contributions collection
router.route('/contributions')
	// get all the contributions (accessed at GET http://localhost:8080/ppp_api/contributions)
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

	// get all the contributions from a given country (accessed at GET http://localhost:8080/ppp_api/contributions/:country)
	.get(function(req, res) {
		req.params.country = req.params.country.toUpperCase();
		Contribution.find(req.params, function(err, contribution) {
			if(!err) {
				res.jsonp(contribution);
			}else{
				return console.log(err);
			}
		});
	});
/////////////////////////////////////
///DEFINE A ROUTE THAT RETURNS AN ARRAY
///ALL COUNTRIES THAT HAVE CONTRIBUTED
///TO PEACEKEEPING
/////////////////////////////////////

// define routes for missions collection
router.route('/missions')
	// get all the missions (accessed at GET http://localhost:8080/ppp_api/missions)
	.get(function(req, res) {
		Mission.find(function(err, missions) {
			if (err)
				res.send(err);
			res.send(missions);
		});
	});

// on routes that end in /missions/:mission_id
// ----------------------------------------------------
router.route('/missions/:mission')

	// get the country with a given ISO3 country id (accessed at GET http://localhost:8080/ppp_api/missions/:mission)
	.get(function(req, res) {
		req.params.mission = req.params.mission.toUpperCase();
		Mission.find(req.params, function(err, mission) {
			if(!err) {
				res.jsonp(mission);
			}else{
				return console.log(err);
			}
		});
	});

/////////////////////////////////////
///DEFINE A ROUTE THAT RETURNS AN ARRAY
///ALL MISSIONS
/////////////////////////////////////

// define routes for missions collection
router.route('/aggregates')
	// get all the missions (accessed at GET http://localhost:8080/ppp_api/missions)
	.get(function(req, res) {
		Aggregate.find(function(err, aggregate) {
			if (err)
				res.send(err);
			res.jsonp(aggregate);
		});
	});

// Define aggregate route for each type
// ----------------------------------------------------
router.route('/aggregates/:cont_type')

	// get all the contributions from a given country (accessed at GET http://localhost:8080/ppp_api/aggregates/:cont_type)
	.get(function(req, res) {
		req.params.cont_type = req.params.cont_type.toLowerCase();
		Aggregate.find(req.params, function(err, aggregate) {
			if(!err) {
				res.jsonp(aggregate);
			}else{
				return console.log(err);
			}
		});
	});

/////////////////////////////////////
///DEFINE A ROUTE THAT RETURNS AN ARRAY
///CONTRIBUTION TYPES
/////////////////////////////////////


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(prefix, router);

// START THE SERVER
// =============================================================================
app.listen(port, function() {
	console.log('Magic happens at http://localhost:'+port+prefix+'/');
});

