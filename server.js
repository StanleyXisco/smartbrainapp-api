const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())
const database = {
	users: [
	{
		id: '123',
		name: 'Stanley',
		email: 'gistextra@gmail.com',
		entries: 0,
		password: 'stockbond',
		joined: new Date()
	},
	{
		id: '124',
		name: 'Xisco',
		email: 'xiscotech@gmail.com',
		entries: 0,
		password: 'stockover',
		joined: new Date()
	}],
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('Please check the login details');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		password: password,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('no such user');
	}
})

app.put('/image', (req, res) =>{
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('no such user');
	}
})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})