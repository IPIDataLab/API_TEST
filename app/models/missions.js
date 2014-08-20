// app/models/countries.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var MissionSchema	= new Schema({
	country: String,
	country_id: String,
	hq: String,
	mission: String,
	loc: {y: Number, x: Number}
});

var collectionName = 'missions';
module.exports		= mongoose.model('Mission', MissionSchema, collectionName);