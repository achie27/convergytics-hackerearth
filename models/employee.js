const mongoose = require('mongoose');

let empSchema = new mongoose.Schema({
	name : String
});

module.exports = mongoose.model(
	'Employee', empSchema
);