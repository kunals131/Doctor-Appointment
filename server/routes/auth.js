const registerHandler = require('../controllers/auth/register');
const express = require('express');

const router = express.Router();

router.post('/register', registerHandler);

module.exports = router;