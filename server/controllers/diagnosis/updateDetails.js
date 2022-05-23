const {Diagnosis} = require('../../models')
const { ifPatientExists } = require('../../utils/ifExists');

 const createDiagnosisHandler = async (req,res)=>{
    const {disease, symptoms, patientId, title} = req.body;
    try {
        const ifPatient = await ifPatientExists(patientId);
        if (!ifPatient) return res.status(404).json({message : 'Patient Not Found!'});
        const result =await  Diagnosis.create({title,patientId, symptoms, disease})
        res.json(result);
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!',error : err})
    }
}

module.exports = {createDiagnosisHandler}