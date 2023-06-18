const mongoose = require('mongoose');
const express = require('express');
const Cart = require('../models/cartModel');
const route = express.Router();

route.post("/add", async (req, res) => {
    const { user, cartItem } = req.body;
    if (user !== "") {
        const existUserCart = await Cart.findOne({ user });
        if (existUserCart) {
            const update = await Cart.findOneAndUpdate({ user }, { cartItems: cartItem });
            return res.send({ success: true, update });
        }
        else {
            const products = new Cart({
                user: user,
                cartItems: cartItem
            })
            products.save();
            return res.send({ success: true, products });
        }
    }
    else {
        return res.send({ success: false });
    }
});
route.get("/getall/:user", async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.user });
        return res.send({ success: true, cart: cart.cartItems });
    } catch (error) {
        return res.send({success:false});
    }
});


module.exports = route;