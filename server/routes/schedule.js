const express = require('express');
const { getScheduleHandler } = require('../controllers/schedule/details');
const { createScheduleHandler, updateScheduleHandler } = require('../controllers/schedule/updateDetails');

const router = express.Router();

router.post('/', createScheduleHandler);
router.get('/:id', getScheduleHandler);
router.put('/:id', updateScheduleHandler);



module.exports = router;