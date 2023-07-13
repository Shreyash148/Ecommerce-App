const express = require('express');
const route = express.Router();
const Orders = require('../models/orderModel')
var braintree = require("braintree");
const { requireSignin } = require('../middlewares/authMiddleware');
const cartModel = require('../models/cartModel');
const productModel=require('../models/productModel');
const userModel = require('../models/userModel');

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});

route.get("/payment/token", async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(response);
            }
        })
    } catch (error) {
        return res.send({ success: false, message: "something went wrong" });
    }
});

route.post("/payment-createOrder", async (req, res) => {
        const { cart, nonce ,user} = req.body;
        let total = 0;
        cart.cartItems.map((i) => { total += i.price;});
        gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true
                }
            }).then(async(result) => {
                if (result.success) {
                    const order= new Orders({
                        product:cart.cartItems,
                        buyer:user,
                        payment:result
                    });
                    order.save();
                    const carts = await cartModel.findOneAndUpdate({user:cart.user},{cartItems:[]});
                    cart?.cartItems?.map(async(e)=>{
                        await productModel.findByIdAndUpdate(e._id,{quantity:e.quantity-1});
                    })
                    return res.send({success:true,carts,order});
                  } else {
                    res.send(result.message);
                  }
                }).catch(err =>res.send("very wrong"));

})

route.get("/getOrders/:buyer", async(req, res) => {
    try {
        const { buyer } = req.params;
        const order = await Orders.find({"buyer._id":buyer});
        res.send({ success: true, order });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong" });
    }
});
route.get("/getAdminOrders/:seller", async(req, res) => {
    try {
        const { seller } = req.params;
        let items=[];
        const order =await Orders.find();
        order.map((e)=>{
            let products=[];
            e.product.map((ele)=>{
                if(ele.seller===seller){
                    products.push(ele)
                }
            })
            if(products){
                let total=0;
                products.map(e=>total+=e.price);
                items.push({products,
                    buyer:e.buyer.address,
                    status:e.status,
                    orderDate:e.createdAt,
                    total,
                    payment:e.payment.success,
                    orderId:e._id
                });
            }
        })
        return res.send({ success: true, items });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong" });
    }
});

route.put("/update/:id",async(req,res)=>{
    try {
        const {status} = req.body;
        const update = await Orders.findByIdAndUpdate(req.params.id,{status:status},{new:true});
        return res.send({ success: true, update });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong" });
    }
})

module.exports = route;