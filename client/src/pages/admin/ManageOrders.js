import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { AdminMenu } from '../../components/AdminMenu'
import '../../styles/orders.css'
import axios from 'axios'

export const ManageOrders = () => {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("");
    const getOrderDetails = async () => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const { data } = await axios.get(`http://localhost:8080/orders/getAdminOrders/${auth.user._id}`);
        if (data.success) {
            setItems(data.items);
        }
    }
    const handleStatus = async(x,y)=>{
        setStatus({...status,[y.target.name]:y.target.value});
        const {data} = await axios.put(`http://localhost:8080/orders/update/${x}`,{status:y.target.value});
        console.log(status);
    }
    useEffect(() => {
        getOrderDetails();
    }, []);
    return (
        <>
            <Layout>
                <div className='dashboard'>
                    <AdminMenu />
                    <div className="manage-box">
                        <table>
                            <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Order Date</th>
                                <th>Product Name</th>
                                <th>Order Status</th>
                                <th>Delivery Address</th>
                                <th>Delivery Date</th>
                                <th>Payment Status</th>
                            </tr></thead>
                            <tbody>
                            {items?.slice(0).reverse().map((e, k = 0) =>
                                e.products.map((p) => {
                                    return (
                                       
                                        <tr key={p._id}>
                                            <td>{k += 1}</td>
                                            <td>{new Date(e.orderDate).toDateString()}</td>
                                            <td>{p.name}</td>
                                            <td><select className='status-drop' name={k} value={status===""?e.status:status[k]} onChange={(v)=>handleStatus(e.orderId,v)}>
                                                <option value='Not Processed' className="option">Not Processed</option>
                                                <option value='Processing' className="option">Processing</option>
                                                <option value='Shipping' className="option">Shipping</option>
                                                <option value='Delivered' className="option">Delivered</option>
                                                <option value='Cancelled' className="option">Cancelled</option>
                                            </select></td>
                                            <td>{e.buyer}</td>
                                            <td>{e.status==="Delivered" ? new Date().toDateString(): "Not yet delivered"}</td>
                                            <td>{e.payment ? "paid" : "Not Paid"}</td>
                                        </tr>
                                    )
                                })
                            )
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
