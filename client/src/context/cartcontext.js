import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState({
      user:"",
      cartItems:[]
    });
  return (
    <CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>
  )
}
const useCart = ()=> useContext(CartContext);

export {useCart,CartProvider};
