const { body } = require('express-validator');

const channelValidator = {};

channelValidator.createChannelValidator = [
	body('receptor').trim().not().isEmpty()

];


module.exports = channelValidator;