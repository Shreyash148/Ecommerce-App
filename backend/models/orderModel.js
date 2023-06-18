const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
    product:[{
        type:Object,
        required:true
    }],
    buyer:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed","Processing","Shipping","Delivered","Cancelled"]
    },
    payment:{}
},{timestamps:true});

module.exports = mongoose.model("Orders",orderModel);