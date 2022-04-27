const { ifDoctorExists, ifPatientExists, ifAppointmentExists } = require("../../utils/ifExists");
const {Appointment} = require('../../models');
const { Op } = require("sequelize");

const createAppointmentHandler = async(req,res)=>{
    const {patientId, doctorId} = req.body;
    if (!patientId || !doctorId) return res.status(400).json({message : 'Some fields are missing'});
    
    try {
        const ifDoc = await ifDoctorExists(doctorId)
        const ifPatient = await ifPatientExists(patientId);
        if (!ifDoc || !ifPatient) return res.status(400).json({message : 'Invalid Request : Doctor or patient doesnt exists'});
        const ifAppointment = await Appointment.findOne({
            where : {
                [Op.and] : [{doctorId, patientId}]
            }
        });
        if (ifAppointment) return res.status(400).json({message : 'Appointment already exists!'});
        const newAppointment = await Appointment.create({doctorId,patientId});
        res.json(newAppointment);

    }catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Something went wrong!", error: err });
      }
}

const updateAppointmentHandler = async(req,res)=>{
    const {id} = req.params;
    const {title,state} = req.body;
    try {
    const appointment =await  Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({message : 'Appointment not found!'});
    let isUpdate = false;
    if (title) {
        appointment.title = title;
        isUpdate = true;
    }
    if (state) {
        appointment.state = state; 
        isUpdate = true;
    }
    if (!isUpdate)  return res.json({message : 'Nothing updated'});
    const result  = await appointment.save();
    res.json(result);
    }catch(err) {
        console.log(err);
        return res
        .status(400)
        .json({ message: "Something went wrong!", error: err });

    }

}

const createScheduleHandler = async(req,res)=>{
    const {id : appointmentId} = req.params;
        const {data} = req.body;
        console.log(req.body)
        if (!appointmentId || !data.at) res.status(404).json({message : 'some fields are missing'});
        try {
            const appointment = await Appointment.findByPk(appointmentId);
            if (!appointment) return res.json({message : 'Appointment doesnt exists!'});
            const result = await appointment.createSchedule(data);
            res.json(result);
    
        }catch(err) {
            console.log(err);
            return res.status(400).json({message : 'Something went wrong!', error : err});
        }
}



module.exports = {createAppointmentHandler, updateAppointmentHandler,createScheduleHandler};