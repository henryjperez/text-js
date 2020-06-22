const socketCallBack = socket => {
	console.log('The socket ==> ' + socket.id + ' <== has connected');
	

	socket.on('login', (user_id) =>{ //DEV ONLY -security flaw
		socket.join(user_id);
		console.log('socket: ' + socket.id + " joined to: " + user_id);

	} );

	socket.on('join', (channel_id) => {
		socket.join(channel_id);
		console.log('socket: ' + socket.id + " joined to the channel id: " + channel_id);
	});

	socket.on('leave', channel_id => {
		socket.leave(channel_id);
		console.log('socket: ' + socket.id + " leaves the channel id: " + channel_id)

	})

	socket.on('disconnect', () => console.log("==> " + socket.id + " disconnected"))

};


module.exports = socketCallBack;