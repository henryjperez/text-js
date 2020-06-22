require('dotenv').config(); // environment variable

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const authHeader = req.get('Authorization');
	
		if (!authHeader) {
			const error = new Error('Sorry, you are not authorized!');
			error.statusCode = 401;
			throw error;

		}
		const token =  authHeader.split(' ')[1];

		decodedToken = await jwt.verify(token, process.env.SECRET_TWO);

		if (!decodedToken) {
			const error = new Error('Sorry, you need a JSON web token!');
			error.statusCode = 401;
			throw error

		}
		req.user_id = decodedToken.user_id;
		req.username = decodedToken.username;
		next();

	} catch(err) {
		next(err);

	}

};