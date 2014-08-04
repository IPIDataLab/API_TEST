// app/models/contributions.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var Contributions = new Schema({
	civpol : Number,
	troops : Number,
	ip : Number,
	fpu: Number,
	mission : String,
	eom : Number,
	tot : Number,
	gender : {
		ip_f : Number,
		ip_m : Number,
		eom_f : Number,
		eom_m : Number,
		civpol_f : Number,
		civpol_m : Number,
		troops_f : Number,
		troops_m : Number,
		fpu_f : Number,
		fpu_m : Number,
		tot_f : Number,
		tot_m : Number
	},
	num_missions : Number
});

var ContributionSchema	= new Schema({
	country_string : String,
	country : String,
	region : String,
	date : String,
	contributions : [Contributions],
	continent : String
});

var collectionName = 'contributions';
module.exports		= mongoose.model('contribution', ContributionSchema, collectionName);