const express = require('express');
const mongoose = require('mongoose');
const sessions = require('express-session');

const Expense = require('./models/expense');
const Employee = require('./models/employee');

const PORT = 5000;
const ObjectId = mongoose.Types.ObjectId;

let app = express();
let ms = sessions.MemoryStore;

app.use(express.json());

app.use(sessions({
	name : "convergytics",
	secret : "a secret!",
	resave : true,
	saveUninitialized : true,
	store : new ms()
}));


app.post('/api/expense', (req, res) =>{
	let data = req.body.data;
	for(let emp of data.employees){
		let empObj = new Employee({name : emp});
		let expense = new Expense({
			amount : parseFloat(data.expense) * parseFloat(data.share),
			type : data.type,
			employee : empObj,
			status : 'unprocessed'
		})

		expense.save(expense, (err, savedObject) => {
			if(err){
				res.status(500).end();
				return console.error(err);
			}
		});
	}
	res.end();
});


app.post('/api/expense/bulk', (req, res) => {
	let data = req.body.data;
	for(let obj of data){
		let empObj = new Employee({name : obj[0]});
		let expense = new Expense({
			amount : parseFloat(obj[1]),
			type : obj[2],
			employee : empObj,
			status : 'unprocessed'
		})

		expense.save(expense, (err, savedObject) => {
			if(err){
				res.status(500).end();
				return console.error(err);
			}
		});
	}
	res.end();
});


app.get('/api/expense', (req, res) => {
	Expense.find((err, expenses) => {
		if(err){
			res.status(500).end();
		} else {
			console.log(expenses);
			res.json({
				data : expenses
			});
		}
	});
});


app.post('/api/checkKey', (req, res) => {
	if(req.body.key == 'convergytics'){
		req.session.auth = 1;
		res.json({
			auth : 1
		});	
	} else {
		req.session.auth = 0;
		res.json({
			auth : 0
		});
	}
});


app.put('/api/update', (req, res) => {
	if(req.session.auth === 1){
		Expense.update({
			_id : ObjectId(req.body.id)
		}, {
			$set : {
				status : 'processed'
			}
		}, (err, resu) => {
			if(err){
				res.status(500).end();
			} else {
				res.end();
			}
		});
	} else {
		res.status(401).end();
	}
});


let server = app.listen(PORT, () => {
	console.log("Server started.");

	mongoose.connect('mongodb://localhost/convergytics', (err) => {
		if(err){
			server.close();
			console.log("Closing");
			return;
		}
		console.log("Database link established.");
	});

});
