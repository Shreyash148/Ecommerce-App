import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import "../../styles/cart.css";
import { useCart } from '../../context/cartcontext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/contextapi';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react"

export const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  const handleCart = async (e) => {
    try {
      let mycart = cart.cartItems;
      mycart.splice(e, 1);
      setCart({ ...cart, cartItems: mycart });
      const res = await axios.post("http://localhost:8080/cart/add", {
        user: cart.user,
        cartItem: mycart
      })
      console.log(cart);
      if (res.data.success) {
        setAuth({ ...auth });
        console.log("product removed from cart")
        toast.success("product removed from cart");
      }
    } catch (error) {
      console.log("something went wrong")
    }
  }
  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("auth"))
    if (parsedData) {
      const load = async () => {
        const res = await axios.get(`http://localhost:8080/cart/getall/${parsedData.user._id}`)
        setCart({
          ...cart,
          user: parsedData.user._id,
          cartItems: res.data.cart
        });
        console.log(cart);
      }
      load();
    }
    // eslint-disable-next-line
  }, [])

  const total = () => {
    let tot = 0;
    if (cart.cartItems.length !== 0) {
      cart.cartItems.map((ele) =>
        tot = tot + ele.price
      );
      return tot;
    }
  }
  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await axios.get("http://localhost:8080/orders/payment/token")
        setClientToken(res.data?.clientToken);
      } catch (error) {
        console.log("something went wrong ");
      }
    }
    getClient();
  }, [auth?.authToken]);
  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      const { nonce } = await instance.requestPaymentMethod();
      const {data}= await axios.post("http://localhost:8080/orders/payment-createOrder",
        {
          nonce,
          cart,
          user:auth.user
        });
        
        navigate("/dashboard/user-orders");
        toast.success("Payment Done Successfully");
    } catch (error) {
      console.log("something went wrong");
    }
  }
  return (
    <Layout>
      {cart.cartItems.length !== 0 ? <div className="cart-box">
        <div className='cart-content'>
          <h2>Cart Items</h2>
          {cart.cartItems.map((ele, i) => ele ? <div className="cart-item" key={i}>
            <div className="item-img"><img alt="x" src={`http://localhost:8080/products/getphoto/${ele._id}`} /></div>
            <div className="item-content">
              <div className="card-content">
                <div className="first-line">{ele.name}<div className="price">Rs.{ele.price}</div></div>
                <div className="descri" style={{ textAlign: "left", paddingLeft: "1rem" }}>{ele.description.substring(0, 50)}...</div>
              </div>
            </div>
            <div className="remove"><button onClick={() => handleCart(i)}>Remove</button></div>
          </div> : "")}
        </div>
        <div className="summary-box">
          <div className="summary-head">Cart Summary</div>
          <div className="summary-content">
            <div className="summary-list flex">
              <li>Total Amount </li><li><b>Rs.{total()}</b></li>
            </div>
            {auth?.authToken ?
              <>
                <div className="summary-list">
                  <div className="flex">
                    <li>Delivery Address  </li><li><b>{auth.user.address}</b></li>
                  </div>
                  <div onClick={() => { auth.user.role === 1 ? navigate("/dashboard/admin") : navigate("/dashboard/user-profile") }} className='change'>update address</div>
                </div>
                <hr />
                <div className="checkout">
                  {!clientToken || !cart.cartItems?.length ? ("") :
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken
                        }}
                        onInstance={instance => setInstance(instance)} />
                      <button onClick={handlePayment} > Make Payment</button>

                    </>}
                </div>

              </>
              : <>
                <hr />
                <div className="checkout">
                  <button onClick={() => navigate("/login")}>Please Login </button>
                </div>
              </>
            }
          </div>
        </div>
      </div>

        : <h2 style={{ textAlign: "center", margin: "2rem" }}>Cart Empty</h2>}
    </Layout >
  )
}

