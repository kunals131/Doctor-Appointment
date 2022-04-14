const express = require('express');
const dotenv = require('dotenv')
const {sequelize, User, Doctor,Patient, Appointment, Tag, Schedule, Symptom,Speciality,  } = require('./models');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))







app.use('/api/auth/', require('./routes/auth'));

app.get('/', (req,res)=>{
    res.send('<h1>Server is Running </h1>')
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






const PORT =  process.env.PORT || 5000;
app.listen(PORT, async()=>{
    console.log(`Server Running on  http://localhost:${PORT}`);
    await sequelize.authenticate()
    console.log('Database Connected!')
})
