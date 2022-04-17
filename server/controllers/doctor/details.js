const {Doctor,Patient, Appointment,Payment, Speciality, Tag} = require('../../models');
const { ifDoctorExists } = require('../../utils/ifExists');


const getAllDetailsHandler = async(req,res)=>{
    const id = req.params.id
    try {
        const doctor = await Doctor.findOne({
            where : {uuid : id},
            include : ['specialities', 'appointments', 'user', 'tags'],
        });
        if (!doctor) return res.status(404).json({message : 'Patient Not Found!'});
        res.json(doctor);
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

const getAppointmentsHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifDoctorExists(id);
        if (!isExists) return res.status(404).json({message : 'Doctor Not Found!'});

        const appointments = await Appointment.findAll({
            where : {doctorId : id},
            order : [['createdAt', 'DESC']],
            include : [{
                model : Doctor,
                as : 'doctor',
                include : ['user']
            }, {
                model : Patient,
                as : 'patient',
                include : ['user']
            }]
        });
        res.json(appointments);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getAppointedPatientsHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifDoctorExists(id);
        if (!isExists) return res.status(404).json({message : 'Doctor Not Found!'});
        const appointments = await Appointment.findAll({
            where : {doctorId : id},
            include : ['patient', 'doctor']
        });
        res.json(appointments.map(appointment=>appointment.patient));
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

const getTagsHandler = async(req,res)=>{
    const id = req.params.id;

    const isExists = await ifDoctorExists(id);
    if (!isExists) return res.status(404).json({message : 'Doctor Not Found!'});

    try {
    const tags = await Tag.findAll({
        where : {doctorId : id},
        include : ['doctor']
    });
    res.json(tags);
}catch(err) {
    console.log(err);
    return res.status(400).json({message : 'Something went wrong!', error : err});
}
}



const getAllSpecialitiesHandler = async(req,res)=>{
    const id = req.params.id;
    try {
        const isExists = await ifDoctorExists(id);
        if (!isExists) return res.status(404).json({message : 'Doctor Not Found!'});
    
        const specialities = await Speciality.findAll({
            where : {doctorId : id},
            include : ['doctor']
        });
        res.json(specialities);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}


const getAllCountsHandler = async(req,res)=>{
    const {id} =req.params;
    try {
        const doctor = await Doctor.findOne({
            where : {uuid : id},
            include : ['user', 'payments', 'appointments']
        })
        if (!doctor) return res.status(404).json({message : 'Doctor Not Found!'});
        return res.json({
            totalPatients : doctor.appointments.length,
            totalRevenue : 0,
            profileViews : Math.floor(Math.random()*doctor.appointments.length + 0)
        })

        

    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});

    }
}

module.exports = {getTagsHandler,getAllDetailsHandler, getAppointmentsHandler,getAllCountsHandler,getAllSpecialitiesHandler,getAppointedPatientsHandler};
