const express = require('express');

const Expense = require('./models/expense');
const Employee = require('./models/employee');

const PORT = 9090;
let app = express();

app.use(express.json());

app.post('/addexpense', (req, res) => {
	
});