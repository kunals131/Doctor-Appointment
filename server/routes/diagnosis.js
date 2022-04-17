const express = require('express');
const { getDiagnosisReportsHandler } = require('../controllers/diagnosis/details');
const { createDiagnosisHandler } = require('../controllers/diagnosis/updateDetails');

const router = express.Router();

router.get('/:id', getDiagnosisReportsHandler);
router.post('/', createDiagnosisHandler);


module.exports = router;