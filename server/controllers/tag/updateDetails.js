const {Tag, Doctor} = require('../../models');
const { ifDoctorExists } = require('../../utils/ifExists');

const createTagHandler = async(req,res)=>{
    const {title,doctorId} = req.body;
    try {
        const doctor = await Doctor.findByPk(doctorId);
        const result = await doctor.createTag({title : title});
        res.json(result);
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

const removeTagHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        await Tag.destroy({
            where : {id}
        });
        res.json({
            message : 'Tag deleted successfully!'
        })
        
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

module.exports = {createTagHandler,removeTagHandler}