const {Schedule, Appointment} = require('../../models');

const createScheduleHandler = async(req,res)=>{
    const {appointmentId, at, title} = req.body;
    if (!appointmentId || !at) res.status(404).json({message : 'some fields are missing'});
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) return res.json({message : 'Appointment doesnt exists!'});
        const result = await appointment.createSchedule({at, title});
        res.json(result);

    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}


const updateScheduleHandler = async(req,res)=>{
    const id = req.params.id;
    const {changes} = req.body;
    let isUpdate = false;
    try {
        const schedule =await Schedule.findByPk(id);
        if (!schedule) return res.status(400).json({message : 'Schedule was not found!'});
        await schedule.update(changes);
        const result = await schedule.save();
        return res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }

}

module.exports = {createScheduleHandler, updateScheduleHandler}