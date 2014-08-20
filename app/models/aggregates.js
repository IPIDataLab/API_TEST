// app/models/aggregates.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var Month = new Schema({
	date : String,
	value : Number,
	male : Number,
	female : Number
});

var AggregateSchema	= new Schema({
	cont_type : String,
	values : [Month]
});

var collectionName = 'aggregates';
module.exports		= mongoose.model('aggregates', AggregateSchema, collectionName);