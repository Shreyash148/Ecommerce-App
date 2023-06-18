const express = require('express');
const Category = require('../models/categoryModel')
const slugify = require('slugify');
const formidable = require('express-formidable');
const Products = require('../models/productModel');
const fs = require('fs');
const { isAdmin } = require('../middlewares/authMiddleware');

const route = express.Router();

//create product
route.post('/create', isAdmin, formidable(),async (req, res) => {
        try {
            const { name, description, price, quantity, category } = req.fields;
            const { photo } = req.files;

            if (!name) { return res.send({ success: false, message: "Product Name is required" }) };
            if (!description) { return res.send({ success: false, message: "Product Description is required" }) };
            if (!price) { return res.send({ success: false, message: "Product Price is required" }) };
            if (!quantity) { return res.send({ success: false, message: "Product Quantity is required" }) };
            if (!category) { return res.send({ success: false, message: "Product Category is required" }) };
            const products = new Products({ ...req.fields, slug: slugify(name) })
            if (photo) {
                products.photo.data = fs.readFileSync(photo.path);
                products.photo.contentType = photo.type;
                products.photo.name= photo.name;
            }
            await products.save();
            return res.send({ success: true, message: "product created successfully", products });
        } catch (error) {
            return res.send({ success: false, message: "something went wrong", error });
        }
    });


//getall products
route.get('/getall', async (req, res) => {
    try {
        const products = await Products.find();
        return res.send({ success: true, products });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});

route.get('/getsellerData/:seller', async (req, res) => {
    try {
        const products = await Products.find({seller:req.params.seller});
        return res.send({ success: true, products });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});


//get specific product
route.get('/getone/:slug', async (req, res) => {
    try {
        const product = await Products.findOne({ slug : req.params.slug }).select("-photo");
        return res.send({ success: true, product });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});
route.get('/geteach/:id', async (req, res) => {
    try {
        const product = await Products.findOne({_id:req.params.id}).select("-photo");
        return res.send({ success: true, product });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});

//get photo
route.get('/getphoto/:id', async (req, res) => {
    try {
        const products = await Products.findById(req.params.id).select("photo");
        if(products.photo.data){
            res.set("Content-type",products.photo.contentType);
            return res.send(products.photo.data);
        }
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});


//update category
route.put('/update/:id', isAdmin, formidable(), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, category} = req.fields;
        const { photo } = req.files;

        if (!name) { return res.send({ success: false, message: "Product Name is required" }) };
        if (!description) { return res.send({ success: false, message: "Product Description is required" }) };
        if (!price) { return res.send({ success: false, message: "Product Price is required" }) };
        if (!quantity) { return res.send({ success: false, message: "Product Quantity is required" }) };
        if (!category) { return res.send({ success: false, message: "Product Category is required" }) };
        let products = await Products.findByIdAndUpdate(id, 
            { ...req.fields, 
                slug: slugify(name),
                photo:{
                    data:fs.readFileSync(photo.path),
                    contentType:photo.type,
                    name:photo.name
                }
        });
        return res.send({ success: true, products, message: "product updated successfully" });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});

//delete category
route.delete('/delete/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Products.findByIdAndDelete(id).then();
        return res.send({ success: true, products, message: "Product successfully deleted" });
    } catch (error) {
        return res.send({ success: false, message: "something went wrong", error });
    }
});

module.exports = route;