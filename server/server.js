const express = require('express');
const dotenv = require('dotenv')
const {sequelize, User, Doctor,Patient, Appointment, Tag, Schedule, Symptom,Speciality,  } = require('./models');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', (req,res)=>{
    res.send('<h1>Server is Running </h1>')
})

app.post('/users', async(req,res)=>{
    const {email,password,role,contact,fullName} = req.body;
    console.log(req.body)
    try {
    const user = await User.create({fullName,email,password,role,contact});
    if (role==='doctor') {
        const doctor = await Doctor.create({userId : user.uuid});
    }
    else if (role==='patient') {
        const patient = await Patient.create({userId : user.uuid});
        console.log('patient created')
    }
    res.json(user);
    
    }catch(err) {
        console.log(err);
        return res.status(500).json({error : err, message : 'Something Went Wrong'})
    }
})

app.get('/everything', async(req,res)=>{
    try {
        const users = await User.findAll();
        const doctors = await Doctor.findAll({include : ['tags', 'specialities']});
        const patients = await Patient.findAll();
        const appointments  = await Appointment.findAll();
        const tags  = await Tag.findAll();
        const specialities  = await Speciality.findAll();
        const symptoms  = await Symptom.findAll();
        const schedules = await Schedule.findAll();
        res.json({users,doctors,patients,tags,specialities,symptoms,appointments,schedules});
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/appointment', async(req,res)=>{
    const {doctorId,patientId} = req.body;
    try {
    const newAppointment = await Appointment.create({doctorId, patientId});
    res.json(newAppointment);
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/symptoms', async(req,res)=>{
    const {title, patientId} = req.body;
    try {
        const newSymptom = await Symptom.create({patientId,title});
        res.json(newSymptom);
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/speciality', async(req,res)=>{
    const {title, doctorId} = req.body;
    try {
        const newSymptom = await Speciality.create({doctorId,title});
        res.json(newSymptom);
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})





const PORT =  process.env.PORT || 5000;
app.listen(PORT, async()=>{
    console.log(`Server Running on Port ${PORT}`);
    await sequelize.authenticate()
    console.log('Database Connected!')
})
