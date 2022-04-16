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
        const foundUser = await User.findByPk(decoded.uuid);
        res.json(foundUser);
    }
    catch(err) {
        console.log(err)
        return res.status(500).json("Internal server error");
    }   
}

module.exports = verifyAuthHandler;