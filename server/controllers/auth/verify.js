const { verify } = require("jsonwebtoken");
const {User} = require('../../models');

const verifyAuthHandler = async (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) {
        return res.sendStatus(406);
    }
    const token = cookies.jwt;
    try {
        const decoded = verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        const user = await User.findByPk(decoded.uuid);
        res.json({user,dataId : decoded.dataId, role : decoded.role, state : true});
    }
    catch(err) {
        console.log(err)
        return res.status(500).json("Internal server error");
    }   
}

module.exports = verifyAuthHandler;