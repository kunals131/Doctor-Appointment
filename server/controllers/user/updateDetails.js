const {Doctor,Patient,User, Appointment,Payment, Speciality} = require('../../models');
const bcrypt = require('bcrypt');
const createAccessToken = require('../../utils/accessTokens');
const updateUserHandler = async(req,res)=>{
    const {id} = req.params;
    const {changes} = req.body;
    try {
        const foundUser = await User.findOne({
            where : {uuid : id},
            include : ['doctorDetails', 'patientDetails']
        }); 
        if (foundUser===null) return res.status(404).json({message : 'User Not Found!'});
        if(changes) {
             await foundUser.update(changes);
            const result= await foundUser.save();
            const accessToken = createAccessToken({
                foundUser
            });
            res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None',secure : true, maxAge: 24 * 60 * 60 * 1000 });
            return  res.json(result);

        }
        return res.json({message : 'Nothing Changed'});
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}

const changeProfilePictureHandler = async(req,res)=>{
    const {id} =req.params;
    const {image} = req.body;
    try {
    const foundUser = await User.findOne({
        where : {uuid : id},
        include : ['doctorDetails', 'patientDetails']
    }); 
    if (foundUser===null) return res.status(404).json({message : 'User Not Found!'});
    foundUser.img = image;
    const result = await foundUser.save();
    return res.json(result);
}catch(err) {
    console.log(err);
    return res.status(400).json({message : 'Something went wrong!', error : err});

}


}

const updatePasswordHandler = async(req,res)=>{
    const {id} = req.params;
    const {confirmPassword,password,currentPassword} = req.body;
    if (!confirmPassword || !password || !currentPassword) return res.status(400).json({message : 'Some Fields are missing'});
    if (confirmPassword!==password) return res.status(406).json({message : 'Passwords dont match'});
    try {
        const foundUser = await User.findByPk(id); 
        if (foundUser===null) return res.status(404).json({message : 'User Not Found!'});
        const match =await  bcrypt.compare(password,foundUser.password);
        if (!match) return res.status(406).json({message : 'Current Password is Incorrect'});
        foundUser.password = password;
        const result = await foundUser.save();
        res.json(result);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}

module.exports = {updateUserHandler,changeProfilePictureHandler, updatePasswordHandler}