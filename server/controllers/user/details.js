const {User, Doctor, Patient, Message} = require('../../models');

const getUserDetailsHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const foundUser = await User.findOne({
            where : {uuid : id},
            include : [{
                model : Doctor,
                as : 'doctorDetails',
                include : ['user', 'specialities']
            }, {
                model : Patient,
                as : 'patientDetails',
                include : ['user', 'medicalRecords', 'medications', 'symptoms']
            }]
        })
        if (!foundUser) return res.status(404).json({message : 'User not Found!'});
        return res.json(foundUser);


    }catch(err) {
        console.log(err);
        return res.status(400).json({error : err, message : 'Something went wrong!'});
    }
}

const getUserMessagesHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const messages = await Message.findAll({
            where : {to : id},
            include : ['sender', 'appointment'],
            order: [['createdAt', 'DESC']]
        });
        res.json(messages);
    }catch(err) {
        console.log(err);
        return res.status(400).json({error : err, message : 'Something went wrong!'});
    }
}

module.exports = {getUserDetailsHandler,getUserMessagesHandler}