import React, { useEffect, useState } from 'react'
import { AdminMenu } from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import '../../styles/createProducts.css'
import axios from 'axios'
import { EditModal } from '../../components/EditModal'
import { toast } from 'react-hot-toast'
export const Products = () => {
    const [productData, setProductData] = useState([]);
    const [id, setId] = useState("");
    const [show, setShow] = useState(false);
    const [Oneproduct, setOneProduct] = useState({});
    useEffect(() => {
        const getProducts = async () => {
            try {
                const auth = JSON.parse(localStorage.getItem('auth'));
                const res = await axios.get(`http://localhost:8080/products/getsellerData/${auth.user._id}`);
                if (res.data.success) {
                    setProductData(res.data.products);
                }
            }
            catch (error) {
                console.log("something went wrong ");
            }
        }
        getProducts();
    }, []);
    const handleDelete=async(id)=>{
        const res = await axios.delete(`http://localhost:8080/products/delete/${id}`);
        if(res.data.success){
            toast.success(res.data.message);
        }
        else{
            toast.error(res.data.message);
        }
    }
    return (
        <>
            <Layout>
                <div className='dashboard'>
                    <AdminMenu />
                    <div className='product-box'>
                        <h2 className='heading'>Manage Products</h2>
                        <div className="row">
                            {productData.map((ele) => <div className="card" key={ele._id}style={{height:"55vh"}}>
                                <div className="img"><img alt="x" src={`http://localhost:8080/products/getphoto/${ele._id}`} /></div>
                                <div className="card-content" style={{height:"20vh"}}>
                                    <div className="first-line"><li>{ele.name.substring(0,23)}..</li><div className="price">Rs.{ele.price}</div></div>
                                    <div className="descri"><i>{ele.description.substring(0, 40)}...</i></div>
                                    <div className="descri">Qty-left : <b>{ele.quantity}</b></div>
                                </div>
                                
                                    <div className="first-line">
                                        <button className='editp' onClick={() => { setShow(true); setOneProduct(ele); setId(ele._id); }}>Edit</button>
                                        <div className="price"><button className='deletep' onClick={()=>handleDelete(ele._id)}>Delete</button></div>
                                    </div>
                            </div>)}
                        </div>
                    </div>
                </div>
                {show && <EditModal id={id} products={Oneproduct} close={() => setShow(false)} mode="updateProduct" />}

            </Layout>
        </>
    )
}
