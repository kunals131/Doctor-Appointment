const registerHandler = require('../controllers/auth/register');
const express = require('express');
const loginHandler = require('../controllers/auth/login');
const verifyAuthHandler = require('../controllers/auth/verify');

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/verify', verifyAuthHandler);

module.exports = router;