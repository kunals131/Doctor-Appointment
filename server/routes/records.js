const express = require('express');
const { getAllMedicalRecordsHandler, getMedicalRecordHandler } = require('../controllers/records/details');
const { createMedicalRecordHandler, updateRecordHandler, DeleteRecordHandler } = require('../controllers/records/updateDetails');


const router = express.Router();

router.get('/', getAllMedicalRecordsHandler);
router.post('/', createMedicalRecordHandler);
router.get('/:id/', getMedicalRecordHandler);
router.put('/:id/', updateRecordHandler);
router.delete('/:id/', DeleteRecordHandler);


module.exports = router