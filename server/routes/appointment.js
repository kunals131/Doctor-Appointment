const express = require('express');
const { getAppointmentHandler, getAppointmentSchedulesHandler } = require('../controllers/appointment/details');
const { createAppointmentHandler, updateAppointmentHandler } = require('../controllers/appointment/updateDetails');

const router = express.Router();

router.get('/:id', getAppointmentHandler );
router.put('/:id', updateAppointmentHandler );
router.get('/:id/schedules', getAppointmentSchedulesHandler);

router.post('/', createAppointmentHandler);

module.exports = router;