const { verify } = require("jsonwebtoken");
const {User} = require('../../models/user');

const verifyAuthHandler = (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.token) {
        return res.sendStatus(406);
    }
    const token = cookies.token;
    try {
        const decoded = verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = User.findByPk(decoded.uuid);
        res.json({user,dataId : decoded.dataId, role : decoded.role, state : true});
    }
    catch(err) {
        return res.sendStatus(406);
    }   
}

module.exports = verifyAuthHandler;