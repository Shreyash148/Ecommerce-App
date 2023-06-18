const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{  
        data:Buffer,
        contentType:String,
        name:{
            type:String
        }
    },
    shipping:{
        type:Boolean,
        required:true
    },
    seller:{
        type:mongoose.ObjectId,
        ref:'Users',
        required:true
    }
});

module.exports = mongoose.model("Product",productModel);