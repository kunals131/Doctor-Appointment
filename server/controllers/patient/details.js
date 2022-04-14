const {Patient, Appointment, Symptom} = require('../../models');

const getAllDetailsHandler = async(req,res)=>{
    const id = req.params.id
    try {
        const patient = await Patient.findOne({
            where : {uuid : id},
            include : ['symptoms', 'appointments', 'user'],
        });
        if (!patient) return res.status(404).json({message : 'Patient Not Found!'});
        res.json(patient);
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

const getAppointmentsHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const appointments = await Appointment.findAll({
            where : {patientId : id},
            include : ['patient', 'doctor']
        });
        res.json(appointments);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getAllSymptoms = async(req,res)=>{
    const id = req.params.id;
    try {
        const symptoms = await Symptom.findAll({
            where : {patientId : id},
            include : ['patient']
        });
        res.json(symptoms);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

module.exports = {getAllDetailsHandler, getAppointmentsHandler, getAllSymptoms};