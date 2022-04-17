const {Diagnosis, Patient} = require('../../models')

 const getDiagnosisReportsHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const diagnosis = await Diagnosis.findOne({
            where : {id},
            include : [{
                model : Patient,
                as: "patient",
                include: ["user"],
            }]
        });
        res.json(diagnosis);

    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!',error : err})
    }
}


module.exports = {getDiagnosisReportsHandler}