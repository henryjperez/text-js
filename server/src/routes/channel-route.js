const { Router } = require('express');
const router = Router();

const { getChannel, createChannel } = require('../controllers/channel.controller');
const { createChannelValidator } = require('../validation/channel-validator');
const { createMessageValidator } = require('../validation/message-validator');

const authentication = require('../authentication/web-token-authenticator');


router.route('/')
	.get(authentication, getChannel)
	.post(createChannelValidator, authentication, createChannel)



module.exports = router;