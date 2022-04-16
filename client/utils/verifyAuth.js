import { verify } from "jsonwebtoken";

export const verifyAuthentication = (req)=>{
    if (req.headers?.cookie) {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        try {
            const decodedData = verify(token,process.env.ACCESS_TOKEN_SECRET);
            return {state : true, decodedData : decodedData.foundUser}
        }catch(err) {
            return {state : false}
        }
    }
    return false;
}



