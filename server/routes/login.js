const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');


route.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.send({success:false,message:'Invalid details'});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.send({success:false,message:'Invalid details'});
    }
    const check = await bcrypt.compare(password,user.password);
    const authToken = await jwt.sign({id:user._id},process.env.JWT_SEC,{expiresIn:"7d"});
    if(check){
        return res.send({success:true,message:"Login successful",authToken,user});
    }
    else{
        return res.send({success:false,message:'Invalid details'});
    }

});


module.exports = route