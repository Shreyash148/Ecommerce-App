const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireSignin = async(req,res,next)=>{
    try {
    const decode= jwt.verify(req.headers.authorization,process.env.JWT_SEC);
     req.user=decode;
     const user = await User.findById(req.user.id);
     if(user.role===1){
        return res.send({
            success:false,
            message:"Unauthorised Access"
        });
    }
     next();   
    } catch (error) {
        res.send("error");
    }
}

const isAdmin = async (req,res,next)=>{
    try {
        const decode= jwt.verify(req.headers.authorization,process.env.JWT_SEC);
        req.user=decode;
        const user = await User.findById(req.user.id);
        if(user.role!==1){
            return res.send({
                success:false,
                message:"Unauthorised Access"
            });
        }
        else{
            next();
        }
    } catch (error) {
        res.send(error);
    }
}
module.exports = {requireSignin,isAdmin};

