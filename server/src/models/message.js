const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
	author: {
		type: String,
		require: true,

	},
	content: {
		type: String,
		require: true
		
	},
	date: {
		type: Date,
		default: Date.now
		
	},
	channel: {
		type: Schema.Types.ObjectId,
		ref: 'Channel',
		require: true

	}

}, {
	timestamps: true

});

module.exports = model('Message', messageSchema);
