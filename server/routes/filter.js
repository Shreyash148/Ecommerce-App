const express = require('express');
const route = express.Router();
const Products = require('../models/productModel')
const Category = require('../models/categoryModel');

route.post('/getproducts', async (req, res) => {
    try {
        const { checked, radio } = req.body;
        console.log(req.body);
    let args = {};
    if (checked.length > 0) {
        args.category = checked;
    }
    if (radio.length > 0) {
        args.price = { $gte: radio[0], $lte: radio[1] }
    }
    const filters = await Products.find(args);
        return res.send({success:true,filters});
    } catch (error) {
        return res.send({success:false,message:"something went wrong"});
    }
});

route.post("/getsearched",async(req,res)=>{
    try {
        const {search} =req.body;
        const catSearch = await Category.find({name:{$regex : '.*'+ search + '.*' }});

        const searched = await Products.find({$or:[{name:{$regex : '.*'+ search + '.*' }},{description:{$regex : '.*'+ search + '.*' }},{category:catSearch.map(e=>e._id)}]});
        return res.send({success:true,searched});
    } catch (error) {
        return res.send({success:false,message:"something went wrong"});
    }
});

route.post("/suggestion/:cat",async(req,res)=>{
    try {
        const {id}=req.body;
        let similar = await Products.find({category:req.params.cat}) ;
        similar = similar.filter((a,i)=>{return a._id.toString()!==id&&i<5});
        return res.send({success:true,similar});
    } catch (error) {
        return res.send({success:false,message:"something went wrong"});
    }
});

route.post("/category-product/:slug",async(req,res)=>{
    try {
        const category = await Category.findById(req.params.slug);
        const products = await Products.find({category:category._id});
        return res.send({success:true,category,products});
    } catch (error) {
        return res.send({success:false,message:"something went wrong"});
    }
})

module.exports = route;