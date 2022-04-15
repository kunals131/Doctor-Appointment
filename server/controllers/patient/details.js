const {Patient, Appointment, Symptom, Record} = require('../../models');
const { ifPatientExists } = require('../../utils/ifExists');

const getAllDetailsHandler = async(req,res)=>{
    const id = req.params.id
    try {
        const patient = await Patient.findOne({
            where : {uuid : id},
            include : ['symptoms', 'appointments', 'user', 'medialRecords'],
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
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});

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

const getAppointedDoctors = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
        const appointments = await Appointment.findAll({
            where : {patientId : id},
            include : ['patient', 'doctor']
        });
        res.json(appointments.map(appointment=>appointment.doctor));
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getAllMedicalRecordsHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});

        const result = await Record.findAll({
            where : {patientId : id}
        });
        res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getAllSymptoms = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    
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

module.exports = {getAllDetailsHandler,getAllMedicalRecordsHandler, getAppointmentsHandler, getAllSymptoms,getAppointedDoctors};