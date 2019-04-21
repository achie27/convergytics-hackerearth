const mongoose = require('mongoose');

let empSchema = new mongoose.Schema({
	id : Number,
	name : String
});

module.exports = mongoose.model(
	'Employee', empSchema
);