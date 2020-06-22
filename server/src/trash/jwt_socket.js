require('dotenv').config(); // environment variable
const jwt = require('jsonwebtoken');

async function jwt_socket(token) {
	try {
		if (!token) {
			const error = new Error('Sorry, you are not authorized!');
			error.statusCode = 401;
			throw error;

		}
		decodedToken = await jwt.verify(token, process.env.SECRET_TWO);
		console.log("perro token ====>" + decodedToken + "<==== token perro");

		if (!decodedToken) {
			const error = new Error('Sorry, you need a JSON web token!');
			error.statusCode = 401;
			throw error

		}

		return decodedToken;

	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);
	}
}


module.exports = jwt_socket;