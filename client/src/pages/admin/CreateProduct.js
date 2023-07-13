import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { AdminMenu } from '../../components/AdminMenu'
import '../../styles/createProducts.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const CreateProduct = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [category, setCategories] = useState([]);
    const [product, setProduct] = useState({ name: "", desc: "", price: "", quantity: "", shipping: "",photo:"",category:""});
    const handleChange =(e)=>{
        if(e.target.name==="photo"){
            setProduct({...product,[e.target.name]:e.target.files[0]});
        }
        else{
            setProduct({...product,[e.target.name]:e.target.value});
        }
        
    }
    const handleSubmit =async()=>{
        const ProductForm = new FormData();
        ProductForm.append("name",product.name);
        ProductForm.append("description",product.desc);
        ProductForm.append("price",product.price);
        ProductForm.append("quantity",product.quantity);
        ProductForm.append("photo",product.photo);
        ProductForm.append("shipping",product.shipping);
        ProductForm.append("category",product.category);
        ProductForm.append("seller",auth.user._id);
        const res = await axios.post("http://localhost:8080/products/create",ProductForm);
        if(res.data.success){
            console.log(res.data.products);
            toast.success(res.data.message);
        }else{
            toast.error(res.data.message);
        }
    }
    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/category/getall");
            if (res.data.success) {
                setCategories(res.data.category);
            }
        } catch (error) {
            console.log("something went wrong");
        }
    }
    useEffect(() => {
        getCategories();
    }, [])
    return (
        <>
            <Layout>
                <div className='dashboard'>
                    <AdminMenu />
                    <div className='product-box'>
                        <h2>Create Product</h2>
                        <form onSubmit={()=>handleSubmit()}>
                            <select className='drop' name="category" onChange={handleChange}>
                                <option value='' className="option">Select Product Category</option>
                                {category.map((cat) =>
                                    <option value={cat._id} key={cat._id} className='option'>{cat.name}</option>
                                )
                                }
                            </select>
                            <label>
                            <div className='input upload'>
                                {product.photo?product.photo.name:"Upload Photo"}
                                <input type='file' accept="image/*" placeholder='Add Product Picture'name="photo" onChange={handleChange} hidden/>
                            </div>
                            </label>
                            <input type='text' className='input' placeholder='Enter Product Name' value={product.name} name="name"onChange={handleChange}/>
                            <textarea className='input' placeholder='Enter Product Description' value={product.desc} name="desc" onChange={handleChange}/>
                            <input type='number' className='input' placeholder='Enter Product Price' value={product.price} name="price" onChange={handleChange}/>
                            <input type='number' className='input' placeholder='Enter Quantity' value={product.quantity} name="quantity"  onChange={handleChange}/>
                            <select className='drop' name="shipping" onChange={handleChange}>
                                <option value='' className="option">Select Shipping</option>
                                <option value='true' className="option">Yes</option>
                                <option value='false' className="option">No</option>
                            </select>
                            <div className='submit'><button type='submit'>+ Add</button></div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
