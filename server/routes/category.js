const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/categoryModel')
const slugify = require('slugify');
const { isAdmin } = require('../middlewares/authMiddleware');

const route = express.Router();

//create category
route.post('/create',isAdmin,
body('name',"Category name too short").isLength({min:3}),
async(req,res)=>{
    const {name} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send({success:false,message:errors.errors[0].msg});
    }
    const existingCategory = await Category.findOne({name});
    if(existingCategory){
        return res.send({success:false,message:"Category already exists"});
    }
    const category = new Category({name,slug:slugify(name)});
    await category.save();
    return res.send({success:true,message:"Category created",category})
});


//getall category
route.get('/getall',async(req,res)=>{
    try {
        const category = await Category.find();

        return res.send({success:true,category}); 
    } catch (error) {
        return res.send({success:false,message:"something went wrong",error});
    }
});
//get specific category
route.get('/getone/:id', async(req,res)=>{
    try {
        const category = await Category.findOne({_id:req.params.id});
    return res.send({success:true,category}); 
    } catch (error) {
        return res.send({success:false,message:"something went wrong",error});
    }
});


//update category
route.put('/update/:id',isAdmin, async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)}).then();
        return res.send({success:true,category,message:"category updated successfully"}); 
    } catch (error) {
        return res.send({success:false,message:"something went wrong",error});
    }
});

//delete category
route.delete('/delete/:id', isAdmin,async(req,res)=>{
    try {
        const {id}=req.params;
        const category = await Category.findByIdAndDelete(id);
        return res.send({success:true,category,message:"Category successfully deleted"}); 
    } catch (error) {
        return res.send({success:false,message:"something went wrong",error});
    }
});

module.exports = route;