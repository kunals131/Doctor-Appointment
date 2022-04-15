const {Patient, Record} = require('../../models');

const getAllMedicalRecordsHandler = async(req,res)=>{
    const {patientId} = req.body;
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) return res.status(404).json({message : 'Patient was not found!'});
        const result = await Record.findAll({
            where : {patientId}
        })
        res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong', error : err});

    }
}

const getMedicalRecordHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const record = await Record.findByPk(id);
        if (!record) return res.status(404).json({message : 'Record not found!'});
        return res.json(record);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong', error : err});

    }
}


module.exports = {getAllMedicalRecordsHandler, getMedicalRecordHandler}