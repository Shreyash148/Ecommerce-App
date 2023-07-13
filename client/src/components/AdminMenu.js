import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/admin.css'


export const AdminMenu = () => {
  return (
    <>
      <div>
        <h2 className='panel'>Admin Panel</h2>
        <div className='box'>
          <NavLink to="/dashboard/admin-category" className='box-item'>Manage Category</NavLink>
          <NavLink to="/dashboard/admin-product" className='box-item'>Create Product</NavLink>
          <NavLink to="/dashboard/admin-getproducts" className='box-item'>Manage Products</NavLink>
          <NavLink to="/dashboard/admin-orders" className='box-item'>Manage Orders</NavLink>
        </div>
      </div>
    </>
  )
}
