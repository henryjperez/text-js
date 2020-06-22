const { Router } = require('express');
const router = Router();

const { createUserValidator } = require('../validation/user-validator');
const { createUser, userLogin } = require('../controllers/user.controller');


router.route('/signup')
	.post(createUserValidator, createUser);

router.route('/login')
	.post(userLogin)


module.exports = router;