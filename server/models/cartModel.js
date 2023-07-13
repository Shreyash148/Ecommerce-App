const mongoose =require('mongoose');

const cartModel = new mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        ref:'Users',
        required:true
    },
    cartItems:[
        {
            type:Object,
            required:true
        }
    ]
});

module.exports= mongoose.model("Cart",cartModel);