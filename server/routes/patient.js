const express = require('express');
const { getAllDetailsHandler,getMedicationsHandler, getAppointmentsHandler, getAllSymptoms, getAppointedDoctors, getAllMedicalRecordsHandler, getAllPatientDiagnosisHandler } = require('../controllers/patient/details');
const { addSymptomHandler,addMedicationHandler,deleteMedicationHandler, updatePatientHandler, removeSymptomHandler, updateMedicationHandler } = require('../controllers/patient/updateDetails');

const router = express.Router();

router.get('/:id/', getAllDetailsHandler);
router.get('/:id/appointments/', getAppointmentsHandler);
router.get('/:id/symptoms/', getAllSymptoms);
router.get('/:id/records/', getAllMedicalRecordsHandler);
router.post('/:id/symptoms', addSymptomHandler);
router.delete('/:id/symptoms/:symptomId', removeSymptomHandler);
router.get('/:id/appointeddoctors', getAppointedDoctors);
router.put('/:id/', updatePatientHandler)
router.get('/:id/diagnoses', getAllPatientDiagnosisHandler);

router.get('/:id/medications', getMedicationsHandler)
router.delete('/:id/medications/:medicationId', deleteMedicationHandler);
router.put('/:id/medications/:medicationId', updateMedicationHandler);
router.post('/:id/medications', addMedicationHandler);



module.exports = router;