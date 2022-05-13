const { Appointment, User,Message } = require("../../models");

const getMessagesHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await Message.findAll({
            where : {appointmentId : id},
            include : ['form', 'to']
        })
        return res.json(result);
    }catch(err) {
        console.log(err);
    }
}

module.exports = {getMessagesHandler}