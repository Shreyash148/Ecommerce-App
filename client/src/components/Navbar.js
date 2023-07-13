import React, { useEffect, useState } from 'react'
import '../styles/navbar.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/contextapi'
import axios from 'axios';

export default function Navbar() {
  const [auth, setAuth] = useAuth();
  const [category,setCategory]=useState();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      authToken: ""
    })
    localStorage.removeItem("auth");
  }
  useEffect(()=>{
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8080/category/getall");
        if (res.data.success) {
          setCategory(res.data.category);
        }
      } catch (error) {
        console.log("something went wrong");
      }
    }
    getCategory();
  },[])
  
  return (
    <>
      <div className='navbar'>
        <h3 className='brand'>E-Commerce App</h3>
        <ul className='page'>
          <NavLink to="/" className="link"><li>Home</li></NavLink>
          <div className="dropdown">
            <div className="link"><li>Category</li></div>
            <div className="dropdown-content">
            <NavLink to="/category" style={{ textDecoration: "none" }}><li>All Categories</li></NavLink>
              {category?.slice(0,8).map((e)=> 
              <div key={e._id}>
                <NavLink to={`/category/${e._id}`} style={{ textDecoration: "none" }}><li>{e.name}</li></NavLink>
              </div>)}
            </div>
          </div>
          <NavLink to="/cart" className="link"><li>Cart()</li></NavLink>
          {!auth.user ?
            (<>
              <NavLink to="/register" className="link"><li>Register</li></NavLink>
              <NavLink to="/login" className="link"><li>Login</li></NavLink>
            </>)
            : (<>
              <div className='dropdown'>
                <div className='link'><li>{auth?.user?.name}</li></div>
                <div className="dropdown-content">
                  <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} style={{ textDecoration: "none" }}><li>Dashboard</li></NavLink>
                  <NavLink to="/login" onClick={handleLogout} style={{ textDecoration: "none" }}><li>Logout</li></NavLink>
                </div>
              </div>
            </>)
          }
        </ul>
      </div>
    </>
  )
}
