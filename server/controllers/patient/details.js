const {Patient, Appointment, Diagnosis , Symptom, Record, Doctor, Medication} = require('../../models');
const { ifPatientExists } = require('../../utils/ifExists');

const getAllDetailsHandler = async(req,res)=>{
    const id = req.params.id
    try {
        const patient = await Patient.findOne({
            where : {uuid : id},
            include : ['symptoms', 'appointments', 'user', 'medicalRecords', 'medications'],
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
            include : [{
                model : Doctor,
                as : 'doctor',
                include : ['user']
            }, {
                model : Patient,
                as : 'patient',
                include : ['user']
            }]
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

const getAllPatientDiagnosisHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});

        const diagnoses = await Diagnosis.findAll({
            where : {patientId : id},
            include : ['patient']
        })
        res.json(diagnoses);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getMedicationsHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifPatientExists(id);
        if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});

        const medications = await Medication.findAll({
            where : {patientId : id},
            include : ['patient']
        })
        res.json(medications);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}
module.exports = {getAllDetailsHandler,getMedicationsHandler, getAllPatientDiagnosisHandler, getAllMedicalRecordsHandler, getAppointmentsHandler, getAllSymptoms,getAppointedDoctors};