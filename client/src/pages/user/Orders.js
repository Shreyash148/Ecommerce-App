import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { UserMenu } from '../../components/UserMenu'
import axios from 'axios'

export const Orders = () => {
    const [orders,setOrders]= useState([])
    useEffect(()=>{
        const auth = JSON.parse(localStorage.getItem("auth"));
        const getOrders =async()=>{
            const res = await axios.get(`http://localhost:8080/orders/getOrders/${auth.user._id}`);
            if(res.data.success){
                setOrders(res.data.order);
            }else{
                console.log("something went wrong");
            }
        }
        getOrders();
    },[]);
  return (
    <Layout>
        <div className="dashboard">
            <UserMenu/>
            <div className="orders-area">
                {orders.length!==0?orders.map((e)=>{return(
                        <div className="order-box" key={e._id}>
                            <div className="order-top">
                                <div className="order-placed">
                                    <div>ORDER PLACED</div>
                                    <div>{new Date(e.createdAt).toDateString()}</div>
                                </div>
                                <div className="order-placed">
                                    <div>TOTAL</div>
                                    <div>Rs.{e.payment.transaction.amount}</div></div>
                            </div>
                            <div className="order-content">
                                <div className="order-status">
                                    {e.status}
                                </div>
                                {e.product.map((ele)=>{
                                    return(
                                <div className="ordered-product" key={ele}>
                                    <div className="item-img"><img alt="x" src={`http://localhost:8080/products/getphoto/${ele._id}`}/></div>
                                    <div className="item-content">
                                        <div className="card-content">
                                            <div className="first-line">{ele.name}<div className="price">Rs.{ele.price}</div></div>
                                            <div className="descri" style={{ textAlign: "left", paddingLeft: "1rem" }}>{ele.description.substring(0, 50)}...</div>
                                        </div>
                                    </div>
                                </div>)})}
                            </div>
                        </div>
                )}):<div className='head'>No orders</div>}
                    </div>
        </div>
    </Layout>
  )
}
