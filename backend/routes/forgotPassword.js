const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

route.post('/forgot-password',async(req,res)=>{
    try {
        const {email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.send({success:false,message:'Invalid details'});
        }
        const user = await User.findOne({email,answer});
        if(!user){
            return res.send({success:false,message:'Invalid details'});
        }
        
        const salt = await bcrypt.genSalt(10);
        let secPwd = await bcrypt.hash(newPassword, salt);
    
        await User.findByIdAndUpdate(user._id,{password:secPwd}).then(()=>{
            res.send({success:true,message:"Password reset successfully"});
        });
        
    } catch (error) {
        res.send({success:false,message:'something went wrong'});
    }
    
});


module.exports = route