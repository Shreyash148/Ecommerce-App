import React from 'react'
import Layout from '../../components/Layout'
import '../../styles/admin.css'
import { AdminMenu } from '../../components/AdminMenu'
import { useAuth } from '../../context/contextapi'

export default function AdminDashboard() {
  const [auth,setAuth]=useAuth()
  return (
    <>
      <Layout>
        <div className='dashboard'>
          <AdminMenu />
          <div className='adminInfo'>
            <pre>
            <div className='info'>Admin Name    :     {auth.user.name}</div>
            <div className='info'>Email         :     {auth.user.email}</div>
            <div className='info'>Address       :     {auth.user.address}</div>
            <div className='info'>Phone No.     :     {auth.user.contactNumber}</div></pre>
          </div>
        </div>
      </Layout>
    </>
  )
}
