const logoutHandler = (req,res)=>{
    res.cookie('jwt', '0', { httpOnly: true, sameSite: 'None',secure : true, maxAge: -1 });
    return res.sendStatus(200);
}

module.exports = logoutHandler