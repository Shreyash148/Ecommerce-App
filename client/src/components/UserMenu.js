import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/admin.css'


export const UserMenu = () => {
  return (
    <>
      <div>
        <h2 className='panel'>User Panel</h2>
        <div className='box'>
          <NavLink to="/dashboard/user-profile" className='box-item'>Profile</NavLink>
          <NavLink to="/dashboard/user-orders" className='box-item'>Orders</NavLink>
        </div>
      </div>
    </>
  )
}
