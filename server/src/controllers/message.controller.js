const { validationResult } = require('express-validator');
const Message = require('../models/message');
const Channel = require('../models/channel');
const User = require('../models/user');
const io = require('../io');
const messageCtrl = {}; //setting an empty object to fill it and export it.



messageCtrl.getMessages = async (req, res, next) => {
	try {
		// put a validation result of the get request In HERE
		const channelMessages = await Channel.findById(req.headers.channel_id)
			.populate('messages', '-__v -createdAt -updatedAt')
			.select('users');

		if (!channelMessages) {
			const error = new Error('This channel does not exist... yet ;)');
			error.statusCode = 404;
			throw error;
		}

		// making sure that the user that made the GET request belongs to the channel
		// using an array method, "find()" to the users ids embedded on the channel
		if ( !channelMessages.users.find(search => search == req.user_id) ) {
			const error = new Error("You don't have access to this chat.");
			error.statusCode = 422;
			throw error;

		}

		res.status(201).json({
			server_message: "Here are your messages",
			messages: channelMessages.messages
		});
		
	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);
	}

};



messageCtrl.createMessage = async (req, res, next) => {
	try {
		const errors = await validationResult(req); //validation response in case of errors
		if (!errors.isEmpty()) {
			const error = new Error('Sorry, validation failed!');
			error.statusCode = 422;
			throw error;		

		}
		const { content, channel_id  } = req.body;
		const newMessage = new Message ({
			author: req.username,
			content

		});
			await newMessage.save();
			const channelFound = await Channel.findById(channel_id);

			if (!channelFound) {
				const error = new Error('This channel does not exist... yet ;)');
				error.statusCode = 404;
				throw error;
			}

			// making sure that the user that made the POST request belongs to the channel
			// using an array method, "find()" to the users ids embedded on the channel
			if ( !channelFound.users.find(search => search == req.user_id) ) {
				const error = new Error("You don't have access to this chat.");
				error.statusCode = 422;
				throw error;

			}

			channelFound.messages.push(newMessage);
			await channelFound.save();




			io.getIO().to(channel_id).emit('new-message', newMessage );

			
			res.status(201).json({
				server_message: "Message received",
				message: newMessage

			});
			
	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);

	}

};




messageCtrl.deleteMessage = async (req, res, next) => { // Xperimental method
	try {
		// put the validation results here
		const { message_id } = req.body;

		if (!message_id) { // DEV add the validation to do this part
			const error = new Error('The message could not be identified.');
			error.statusCode = 404;
			throw error;
		}

		const messageFound = await Message.find({ _id: message_id, author: req.username });
		console.log(messageFound); // DEV

		if (!messageFound) {
			const error = new Error('Not such message was found to delete');
			error.statusCode = 404;
			throw error;
		}
		
		res.status(201).json({ server_message: "The message was deleted successfully!" });

	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);

	}

}




module.exports = messageCtrl;
