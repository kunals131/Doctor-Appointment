const {Symptom, Patient, Medication} = require('../../models');
const { ifPatientExists } = require('../../utils/ifExists');
const addSymptomHandler = async(req,res)=>{
    const id = req.params.id;
    const {title} = req.body;
    if (!title) return res.status(400).json({message : 'Enter a valid title'});

    try {
    const isExists = await ifPatientExists(id);
    if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    const newSymptom = await Symptom.create({title, patientId : id});
    res.json(newSymptom);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}
const removeSymptomHandler = async(req,res)=>{

    const {symptomId,id} = req.params;
    if (!symptomId) return res.status(400).json({message : 'Provide a valid id'});

    try {
    const isExists = await ifPatientExists(id);
    if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    await Symptom.destroy({
        where : {id : symptomId}
    })
    res.json({message : 'Deleted Successfully'})
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

const updatePatientHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const patient = await Patient.findByPk(id);
        const {changes} = req.body;
        if (!patient)return res.status(404).json({message : 'Patient Not Found!'});
        if (changes) {
            await patient.update(changes);
            const result = await patient.save();
            return res.json(result);
        }
        else {
            return res.json({message : 'No Changes'})
        }
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}

const addMedicationHandler = async(req,res)=>{
    const id = req.params.id;
    const {data} = req.body;
    if (!data) return res.status(400).json({message : 'Enter valid data'});

    try {
    const isExists = await ifPatientExists(id);
    if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    const newMedication = await Medication.create({patientId : id, ...data});
    res.json(newMedication);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

const deleteMedicationHandler = async(req,res)=>{
    const {medicationId,id} = req.params;
    if (!medicationId) return res.status(400).json({message : 'Provide a valid id'});

    try {
    const isExists = await ifPatientExists(id);
    if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    await Medication.destroy({
        where : {id : medicationId}
    })
    res.json({message : 'Deleted Successfully'})
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}

const updateMedicationHandler = async(req,res)=>{
    const {medicationId,id} = req.params;
    if (!medicationId) return res.status(400).json({message : 'Provide a valid id'});
    const {changes} = req.body;
    try {
    const isExists = await ifPatientExists(id);
    if (!isExists) return res.status(404).json({message : 'Patient Not Found!'});
    const med = await Medication.findOne({where : {id : medicationId}});
    if (!med) return res.status(404).json({message : 'Medication not founnd!'});
    await med.update(changes);
    const result = await med.save();
    res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}


module.exports = {addSymptomHandler,updateMedicationHandler,addMedicationHandler,deleteMedicationHandler, updatePatientHandler,removeSymptomHandler}