const {User,Doctor,Patient} = require('../../models');
const bcrypt = require('bcrypt');

const registerHandler = async(req,res)=>{
    const {email,password,confirmPassword,contact,role,fullName} = req.body;
    if (!email || !password || !confirmPassword || !contact || !role || !fullName) return res.status(400).json({message : 'Some Fields are missing'});
    if (confirmPassword!==password) return res.status(400).json({message : 'Confirm Password doesnt match password'});
    try {
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser = await User.create({email,password : hashedPassword,contact,role,fullName});
        let additionalDetails = {};
        if (newUser.role==='patient') {
            additionalDetails = await Patient.create({userId : newUser.uuid});
        }
        else if (newUser.role==='doctor') {
            additionalDetails = await Doctor.create({userId : newUser.uuid});
        }
        console.log(newUser)
        res.json({userDetails : newUser, additionalDetails});
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message : 'Something Went Wrong', error : err});
    }
}

module.exports = registerHandler;