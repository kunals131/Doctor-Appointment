const express = require('express');
const dotenv = require('dotenv')
const http = require('http');
const {Server, Socket} = require('socket.io');

const {sequelize, User, Doctor,Patient, Appointment, Schedule, Symptom,Speciality,  } = require('./models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsConfig')
const cors = require('cors');
const credentials = require('./middlewares/credentials');
const SocketConfig = require('./socket');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET', 'POST'],
    },
})
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(credentials);

SocketConfig(io);


app.use('/api/auth/', require('./routes/auth'));
app.use('/api/patient/', require('./routes/patient'));
app.use('/api/doctor/', require('./routes/doctor'));
app.use('/api/diagnosis/', require('./routes/diagnosis'));
app.use('/api/appointments/', require('./routes/appointment'));

app.use('/api/schedule/', require('./routes/schedule'));
app.use('/api/records/', require('./routes/records'));

app.get('/', (req,res)=>{
    res.send('<h1>Server is Running </h1>')
})





app.get('/everything', async(req,res)=>{
    try {
        const users = await User.findAll({
            include : ['doctorDetails', 'patientDetails']
        });
        const doctors = await Doctor.findAll({include : ['tags', 'specialities']});
        const patients = await Patient.findAll({
            include : ['medicalRecords']
        });
        const appointments  = await Appointment.findAll();
        const tags  = await Tag.findAll();
        const specialities  = await Speciality.findAll();
        const symptoms  = await Symptom.findAll();
        const schedules = await Schedule.findAll();
        res.json({users,doctors,patients,specialities,symptoms,appointments,schedules});
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})






const PORT =  process.env.PORT || 5000;
server.listen(PORT, async()=>{
    console.log(`Server Running on  http://localhost:${PORT}`);
    await sequelize.authenticate()
    console.log('Database Connected!')
})
