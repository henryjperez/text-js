const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
		trim: true,
		unique: true

	},
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true

	},
	password: {
		type: String,
		require: true

	},
	picture: {
		type: String
	},
	channels: [{
		type: Schema.Types.ObjectId,
		ref: 'Channel'

	}]

}, {
	timestamps: true
	
});




module.exports = model('User', userSchema);
