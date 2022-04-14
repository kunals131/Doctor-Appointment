const {User} = require('../../models');
const bcrypt = require('bcrypt');
const createAccessToken = require('../../utils/accessTokens');


const loginHandler = async(req,res)=>{
    const {email,password} = req.body;
    if (!email || !password) res.status(406).json({message : 'Some fields are empty.'});
    try {
        const foundUser = await User.findOne({
            where : {email}
        })
        if (!foundUser) return res.status(406).json({message : 'Invalid Email Address or Password'});
        const passwordMatch = await bcrypt.compare(password,foundUser.getDataValue('password'));
        if (!passwordMatch) return res.status(406).json({message : 'Invalid Email Address or Password'});
        const accessToken = createAccessToken({
            uuid : foundUser.uuid,
            role : foundUser.role
        });
        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'None',secure : true, maxAge: 24 * 60 * 60 * 1000 });
        res.json(foundUser);
    }
    catch(err) {
        console.log(err);
        res.status(406).json({error : err, message : 'Something went wrong'});
    }
}

module.exports = loginHandler