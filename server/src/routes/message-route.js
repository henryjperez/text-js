const { Router } = require('express');
const router = Router();

const { getMessages, createMessage, deleteMessage } = require('../controllers/message.controller');
const { createMessageValidator } = require('../validation/message-validator');
const authentication = require('../authentication/web-token-authenticator');


router.route('/')
	.get(authentication, getMessages)
	.post(createMessageValidator, authentication, createMessage)
	.delete(authentication, deleteMessage);



module.exports = router;