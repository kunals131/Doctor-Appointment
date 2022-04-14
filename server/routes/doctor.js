const express = require('express');
const {getAllDetailsHandler, getAppointmentsHandler, getAppointedPatientsHandler, getAllSpecialitiesHandler, getTagsHandler} = require('../controllers/doctor/details');
const { addSpecialityHandler, updateDoctorHandler, addTagHandler, removeTagHandler, removeSpecialityHandler } = require('../controllers/doctor/updateDetails');

const router = express.Router();



router.get('/:id/', getAllDetailsHandler);
router.put('/:id/', updateDoctorHandler);


router.get('/:id/appointments/', getAppointmentsHandler);
router.get('/:id/specialities/', getAllSpecialitiesHandler);
router.post('/:id/specialities/', addSpecialityHandler);
router.delete('/:id/specialities/:specialityId', removeSpecialityHandler);
router.get('/:id/allpatients/', getAppointedPatientsHandler);
router.get('/:id/tags/', getTagsHandler)
router.post('/:id/tags/', addTagHandler)
router.delete('/:id/tags/:tagId', removeTagHandler)

// router.post('/:id/symptoms', addSymptomHandler);
// router.get('/:id/appointeddoctors', getAppointedDoctors);
// router.put('/:id/update', updatePatientHandler)



module.exports = router;