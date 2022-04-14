
const express = require('express');


const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;