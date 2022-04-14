const {Appointment} = require('../../models');


const getAppointmentHandler = (req,res)=>{
    const {id} =req.params;
    try {
        const appointment = Appointment.findOne({
            where : {id},
            include : ['schedules', 'doctor', 'patient']
        });
        if (!appointment) return res.status(404).json({message : 'No appointment found.'})
        res.json(appointment);
    }catch(err) {
        console.log(err);
        res.status(400).json({message : 'Something went wrong', error : err});
    }
}

module.exports = {getAppointmentHandler};
