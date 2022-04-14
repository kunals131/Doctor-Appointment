const {Patient, Doctor,Appointment} = require('../models');


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
const ifAppointmentExists = async (id)=>{
    const appointment = await Appointment.findOne({
        where : {id : id},
    });
    if (!appointment) return false;
    return true;
}

module.exports = {ifPatientExists, ifDoctorExists, ifAppointmentExists}