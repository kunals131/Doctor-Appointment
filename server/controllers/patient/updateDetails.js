const {Symptom, Patient} = require('../../models');
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
        const {body} = req;
        if (!patient)return res.status(404).json({message : 'Patient Not Found!'});
        if (body.isComplete) {
            patient.isComplete = body.isComplete;
        }
        const result = await patient.save();
        res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}


module.exports = {addSymptomHandler, updatePatientHandler,removeSymptomHandler}