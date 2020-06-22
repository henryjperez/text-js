require('dotenv').config(); // environment variable
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const userCtrl = {};


userCtrl.createUser = async (req, res, next) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
		const error = new Error('Validation went wrong.');
		error.statusCode = 422;
		throw error;

		}
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		
		const newUser = new User ({
			username,
			email,
			password: hashedPassword

		});
		await newUser.save();

		const token = jwt.sign(
			{
				username: newUser.username,
				user_id: newUser._id.toString()
			},
			process.env.SECRET_TWO,
			{ expiresIn: '5h' }

		);

		res.status(201).json({
			server_message: 'User created!!',
			token,
			username: newUser.username,
			user_id: newUser._id

		});

	} catch(e) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);

	}

};


userCtrl.userLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const userLogin = await User.findOne({ username });

		if (!userLogin) {
			const error = new Error('A user with this name could not be found.');
			error.statusCode = 401;
			throw error;

		}
		const comparison = await bcrypt.compare(password, userLogin.password);
		if (!comparison) {
			const error = new Error('Wrong password.');
			error.statusCode = 401;
			throw error;

		}
		const token = jwt.sign(
			{
				username: userLogin.username,
				user_id: userLogin._id.toString()
			},
			process.env.SECRET_TWO,
			{ expiresIn: '5h' }

		);
		res.status(200).json({
			server_message: 'Happy Hacking',
			token,
			username: userLogin.username,
			user_id: userLogin._id

		});

	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);

	}

};


module.exports = userCtrl;