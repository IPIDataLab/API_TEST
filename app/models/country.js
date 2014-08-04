// app/models/countries.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var CountrySchema	= new Schema({
	country: String,
	country_id: String,
	capital: String,
	loc: {y: Number, x: Number},
	continent: String,
	un_region: String,
	un_bloc: String,
	p5g4a3: String,
	sadc: Boolean,
	eac: Boolean,
	oic: Boolean,
	g8: Boolean,
	uma: Boolean,
	au: Boolean,
	comesa: Boolean,
	eu: Boolean,
	cen_sad: Boolean,
	ecowas: Boolean,
	asean: Boolean,
	gcc: Boolean,
	g20: Boolean,
	oecd: Boolean,
	eccas: Boolean,
	shanghai: Boolean,
	nam: Boolean,
	cis: Boolean,
	g77: Boolean,
	nato: Boolean,
	oas: Boolean,
	igad: Boolean,
	arab_league: Boolean
});

var collectionName = 'countries';
module.exports		= mongoose.model('Country', CountrySchema, collectionName);