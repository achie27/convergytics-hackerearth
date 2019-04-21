const mongoose = require('mongoose');
const Employee = require('./employee');

let expenseSchema = new mongoose.Schema({
	amount : Number,
	type : String,
	employee : Employee.schema,
	status : String
});

module.exports = mongoose.model(
	'Expense', expenseSchema
);