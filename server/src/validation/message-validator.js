const { body } = require('express-validator');

const messageValidator = {};

messageValidator.createMessageValidator = [
	// body('author').trim().not().isEmpty(),
	body('content').isLength({min: 1})

	];


module.exports = messageValidator;
