const express = require('express');
const { getAllDetailsHandler, getAppointmentsHandler, getAllSymptoms, getAppointedDoctors } = require('../controllers/patient/details');
const { addSymptomHandler, updatePatientHandler } = require('../controllers/patient/updateDetails');

const router = express.Router();

router.get('/:id/', getAllDetailsHandler);
router.get('/:id/appointments/', getAppointmentsHandler);
router.get('/:id/symptoms/', getAllSymptoms);
router.post('/:id/symptoms', addSymptomHandler);
router.get('/:id/appointeddoctors', getAppointedDoctors);
router.put('/:id/update', updatePatientHandler)



module.exports = router;