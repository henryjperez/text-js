const jwt_socket = require('./jwt_socket');


const socketIo = async (socket) => {
	try {
		console.log('It works!!!');

		socket.on('join', ({ token, channel }) => {
			const decodedToken = jwt_socket(token);

			if (decodedToken.statusCode) {
				throw decodedToken;
			}
			console.log('joined');

		});

	} catch(error) {
		// statements
		console.log("Error handling ==>" + error + "<=== Error handling");
		const statusCode = error.statusCode || 500;
		const { name, message } = error;

		res.status(statusCode).json({ server_message: name + " => " + message });
	}

}

module.exports = socketIo;