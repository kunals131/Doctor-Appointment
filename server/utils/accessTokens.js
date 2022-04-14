
const jwt = require('jsonwebtoken');

const createAccessToken = (data,expTime='5m')=>{
    const accessToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET, {expiresIn : expTime});
    return accessToken;
}

module.exports = createAccessToken;