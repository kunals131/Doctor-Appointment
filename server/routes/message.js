
const express = require('express');
const { updateMessageHandler } = require('../controllers/message/updateDetails');

const router = express.Router();

router.put('/:id', updateMessageHandler);


module.exports = router;

