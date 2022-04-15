const allowedOrigins =   [
    'http://localhost:3000',
    'http://localhost:5000',
]
const corsOptions = {
    origin : (origin,callback)=>{
        if (allowedOrigins.indexOf(origin)!=-1 || !origin) {
            callback(null,true);
        }
        else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus : 200,
    credentials : true
}

module.exports = corsOptions;