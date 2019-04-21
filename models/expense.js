const mongoose = require('mongoose');

let expenseSchema = new mongoose.Schema({
	amount : Number,
	type : String
});

module.exports = mongoose.model(
	'Expense', expenseSchema
);