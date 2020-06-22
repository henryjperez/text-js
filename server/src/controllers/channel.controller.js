const { validationResult } = require('express-validator');
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');
const io = require('../io');

const channelCtrl = {};

channelCtrl.getChannel = async (req, res, next) => {
	try {
		// put a validation result of the get request In HERE
		const userChannels = await User.findById(req.user_id)
			.populate({
				path: 'channels',
				select: '_id',
				populate: {
					path: 'users',
					select: 'username'
				}
			})
			.select('channels');


		if (!userChannels) {
			const error = new Error('The channels were not found, are you a new user?');
			error.statusCode = 404;
			throw error;
		}



		function sendNecesary(userChannels) { // filtering the data to send
			let theChannels = [];

			for (var i = userChannels.channels.length - 1; i >= 0; i--) {

				for (let j = userChannels.channels[i].users.length - 1; j >= 0; j--) {
					
					if (userChannels.channels[i].users[j].username !== req.username) {
						let chnl = {
							channel_username: userChannels.channels[i].users[j].username,
							channel_id: userChannels.channels[i]._id
						};
						theChannels.push(chnl);

					}

				}

			}
			return theChannels;
		}


		// sending the channel's id, and the user that is not the petitioner.
		res.status(201).json({
			server_message: "Here you go!",
			channels_id: sendNecesary(userChannels)
		});


	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);
	}

};





channelCtrl.createChannel = async (req, res, next) => {
	try {
		const errors = await validationResult(req); //adding validation response
		if (!errors.isEmpty()) {
			const error = new Error('Sorry, validation failed');
			error.statusCode = 422;
			throw error;		

		}
		const { content, date, receptor } = req.body;
		const senderFound = await User.findById(req.user_id);
		const receptorFound = await User.findOne({ username: receptor });
		
		if (!receptorFound || !senderFound) {
			const error = new Error('A user with this name could not be found.');
			error.statusCode = 401;
			throw error;

		}
		const newMessage = new Message ({
			author: req.username,
			content,
			date

		});
		const newChannel = new Channel ({
			users: [req.user_id, receptorFound._id],
			messages: [newMessage]

		});
			
		senderFound.channels.push(newChannel);
		receptorFound.channels.push(newChannel);

		await newMessage.save();
		await newChannel.save();
		await senderFound.save();
		await receptorFound.save();
		// use the Promise.all() in here

		io.getIO().to(receptorFound._id).emit('new-channel', {channel_username: req.username, channel_id: newChannel._id });

		res.status(201).json({
				server_message: "Channel created",
				channel: {
					channel_username: receptor,
					channel_id: newChannel._id
				}

		});

	} catch(err) {
		if (!err.statusCode) {
			err.statusCode = 500;
				
		}
		next(err);

	}

};


module.exports = channelCtrl;