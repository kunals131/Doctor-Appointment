const { Appointment, User,Message } = require("../../models");
const { ifAppointmentExists } = require("../../utils/ifExists");


const createMessageHandler = async(req,res)=>{
    try {

    const {id} = req.params;
    const ifAppointment = ifAppointmentExists(id)
    if (!ifAppointment) return res.status(404).json({message : 'Appointment Not found!'});
    const {message} = req.body;
    const result = await Message.create({...message});
    res.json(result);
    }catch(err){
        console.log(err);
        return res.status(400).json({message : "Something went wrong!"})
    } 

}

const updateMessageHandler = async(req,res)=>{
    try {
        const {id} = req.params;
        const {changes} = req.body;
        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({message : 'Message Not found!'});
        await message.update(changes);
        const result =await message.save();
        res.json(result);
    }catch(err){
        console.log(err);
        return res.status(400).json({message : "Something went wrong!"})
    } 
}

module.exports = {updateMessageHandler}