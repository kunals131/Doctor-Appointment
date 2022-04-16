const registerHandler = require('../controllers/auth/register');
const express = require('express');
const loginHandler = require('../controllers/auth/login');
const verifyAuthHandler = require('../controllers/auth/verify');
const logoutHandler = require('../controllers/auth/logout');

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/verify', verifyAuthHandler);
router.get('/logout', logoutHandler);

module.exports = router;