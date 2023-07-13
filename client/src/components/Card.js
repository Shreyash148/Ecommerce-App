import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const Card = (props) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const handleCart = async (e) => {
       try {
        let mycart =cart.cartItems;
        if(e.length!==0)mycart.push(e);
        setCart({ ...cart, cartItems: mycart });
        const res = await axios.post("http://localhost:8080/cart/add", {
            user: cart.user,
            cartItem: cart.cartItems
        })
        if (res.data.success) {
            console.log("product added to cart")
            toast.success("product added to cart");
        }
       } catch (error) {
        console.log("something wrong");
       }
    }

    return (
        <div className="row">
            {props.item?.map((ele) => <div className="card" key={ele._id}>
                <div onClick={() => navigate(`/product/${ele.slug}`)}>
                    <div className="img"><img alt="x" src={`http://localhost:8080/products/getphoto/${ele._id}`} /></div>
                    <div className="card-content">
                        <div className="first-line"><li>{ele.name.substring(0,23)}</li><div className="price">Rs.{ele.price}</div></div>
                        <div className="descri">{ele.description.substring(0,50)}...</div>
                    </div>
                </div>
                <div className='buttons'>
                    <button className='addcart' onClick={() => handleCart(ele)}>Add to Cart</button>
                </div>
            </div>)}
        </div>
    )
}
