const {Patient, Doctor} = require('../models');


const ifPatientExists = async (id)=>{
    const patient = await Patient.findOne({
        where : {uuid : id},
    });
    if (!patient) return false;
    return true;

}

const ifDoctorExists = async (id)=>{
    const doctor = await Doctor.findOne({
        where : {uuid : id},
    });
    if (!doctor) return false;
    return true;
}

module.exports = {ifPatientExists, ifDoctorExists}