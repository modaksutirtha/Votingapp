const jwt=require('jsonwebtoken');
//require('dotenv').config();
const jwtauthmiddleware=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token)return res.status(401).json({error:'unauthorised'});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:'invalid user'});
    }
}

const generatetoken=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET);
}
module.exports={jwtauthmiddleware,generatetoken};