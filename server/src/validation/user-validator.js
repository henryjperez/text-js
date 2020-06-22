const { body } = require('express-validator');
const User = require('../models/user');

const userValidator = {};

userValidator.createUserValidator = [
	body('username').trim().not().isEmpty(),
	body('email')
		.isEmail()
		.withMessage('Please, enter a valid e-mail.')
		.custom((value, { req }) => {
			return User.findOne({ email: value })
			.then(userDoc => {
				if (userDoc) {
					return Promise.reject('This e-mail address already exists.');

				}

			})

		})
		.normalizeEmail(),
	body('password').isLength({min: 4})

];


module.exports = userValidator;