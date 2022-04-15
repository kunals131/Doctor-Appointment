const express = require('express');
const { getAllDetailsHandler, getAppointmentsHandler, getAllSymptoms, getAppointedDoctors, getAllMedicalRecordsHandler } = require('../controllers/patient/details');
const { addSymptomHandler, updatePatientHandler, removeSymptomHandler } = require('../controllers/patient/updateDetails');

const router = express.Router();

router.get('/:id/', getAllDetailsHandler);
router.get('/:id/appointments/', getAppointmentsHandler);
router.get('/:id/symptoms/', getAllSymptoms);
router.get('/:id/records/', getAllMedicalRecordsHandler);
router.post('/:id/symptoms', addSymptomHandler);
router.delete('/:id/symptoms/:symptomId', removeSymptomHandler);
router.get('/:id/appointeddoctors', getAppointedDoctors);
router.put('/:id/update', updatePatientHandler)



module.exports = router;