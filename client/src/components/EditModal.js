import React, { useEffect, useState } from 'react'
import '../styles/EditModal.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const EditModal = (props) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [name, setName] = useState("");
  const [category, setCategories] = useState([]);
  const [product, setProduct] = useState({ ...props.products });
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] ? e.target.files[0] : props.product.photo });
    }
    else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  }
  const updateProduct = async (e) => {
    e.preventDefault();
    const ProductForm = new FormData();
    ProductForm.append("name", product.name);
    ProductForm.append("description", product.description);
    ProductForm.append("price", product.price);
    ProductForm.append("quantity", product.quantity);
    ProductForm.append("photo", product.photo);
    ProductForm.append("shipping", product.shipping);
    ProductForm.append("category", product.category);
    ProductForm.append("seller",auth.user._id);
    const res = await axios.put(`http://localhost:8080/products/update/${props.products._id}`, ProductForm);
    if (res.data.success) {
      console.log(res.data.products);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }
  const handleUpdate = async () => {
    const res = await axios.put(`http://localhost:8080/category/update/${props.id}`, { name });
    if (res.data.success) {
      toast.success(res.data.message);
      props.close()
    }
    else {
      toast.error(res.data.message);
    }
  }
  useEffect(() => {
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
    getCategories();
  }, [])
  return (
    <>
      <div className="modal-container">
        {props.mode === "category" ?
          <div className="modal-cat">
            <div className='close' onClick={props.close}>X</div>
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <h2>Update Category</h2>
                <input type='text' className='input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter category Name' />
                <div className='submit'><button type='submit'>Update</button></div>
              </form></div></div>
          : ""}
        {props.mode === "updateProduct" ?
          <div className="modal">
            <div className='close' onClick={props.close}>X</div>
            <div className="modal-content">
              <form onSubmit={updateProduct}>
                <h2 style={{ padding: "1rem" }}>Update Product</h2>
                <select className='drop' name="category" onChange={handleChange} value={product.category}>
                  <option value='' className="option">Select Product Category</option>
                  {category.map((cat) =>
                    <option value={cat._id} key={cat._id} className='option'>{cat.name}</option>
                  )
                  }
                </select>
                <label>
                  <div className='input upload' style={{ padding: "1rem" }}>
                    {product.photo ? product.photo.name : "Upload Photo"}
                    <input type='file' accept="image/*" placeholder='Add Product Picture' name="photo" onChange={handleChange} hidden />
                  </div>
                </label>
                <input type='text' className='input' placeholder="Enter Product Name" value={product.name} name="name" onChange={handleChange} />
                <textarea rows="5" className='input' placeholder="Enter Product Description" value={product.description} name="description" onChange={handleChange} />
                <input type='number' className='input' placeholder='Enter Product Price' value={product.price} name="price" onChange={handleChange} />
                <input type='number' className='input' placeholder='Enter Quantity' value={product.quantity} name="quantity" onChange={handleChange} />
                <select className='drop' name="shipping" onChange={handleChange} value={product.shipping}>
                  <option value='' className="option">Select Shipping</option>
                  <option value='true' className="option">Yes</option>
                  <option value='false' className="option">No</option>
                </select>
                <div className='submit'><button type='submit'>Update</button></div>
              </form>
                  {JSON.stringify(product)}
            </div>
          </div>
          : ""}
      </div>
    </>
  )
}
