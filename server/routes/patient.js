const express = require('express');
const { getAllDetailsHandler, getAppointmentsHandler, getAllSymptoms } = require('../controllers/patient/details');

const router = express.Router();

router.get('/:id/', getAllDetailsHandler);
router.get('/:id/appointments/', getAppointmentsHandler);
router.get('/:id/symptoms/', getAllSymptoms);


module.exports = router;