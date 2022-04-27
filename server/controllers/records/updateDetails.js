const {Patient, Record} = require('../../models');



const createMedicalRecordHandler = async(req,res)=>{
    const {data} = req.body;
    
    try {
        const patient = await Patient.findByPk(data.patientId);
        if (!patient) return res.json({message : 'Patient doesnt exists!'});
        const result = await Record.create(data);
        return res.json(result);    
    }
    catch(err) {
        console.log(err);
        return res.status(404).json({message : 'Something went wrong!', error : err});
    }
}

const DeleteRecordHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const result = await Record.destroy({
            where : {id}
        });
        return res.json(result);

    } catch(err) {
        console.log(err);
        return res.status(404).json({message : 'Something went wrong!', error : err});
    }
}

const updateRecordHandler = async(req,res)=>{
    const {id} = req.params;
    const {file,remark,title} = req.body;
    try {
        const result = await Record.findByPk(id);
        if (!result) return res.status(404).json({message : 'Record was not found!'});
        if (file) result.file = file;
        if (title) result.title = title;
        if (remark) result.remark = remark;
        const result2 = await result.save();
        res.json(result2);
        
    } catch(err) {
        console.log(err);
        return res.status(404).json({message : 'Something went wrong!', error : err});
    }
}

module.exports = {createMedicalRecordHandler,DeleteRecordHandler, updateRecordHandler}