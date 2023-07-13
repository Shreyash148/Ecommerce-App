import React, { useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'
import '../../styles/register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [info, setInfo] = useState({ newPassword: "", email: "",answer:"" });
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", {
        email: info.email,
        answer:info.answer,
        newPassword: info.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login'); 
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }

  }
  return (
    <>
      <Layout>
        <div className='container'>
          <form onSubmit={handleReset}>
          <h1 style={{ marginBottom: "1.5rem" }}>Reset password</h1>
            <input type='text' className='input' placeholder='Email' value={info.email} onChange={handleInfo} name="email" required /><br />
            <input type='text' className='input' placeholder='What is your favourite sports' value={info.answer} onChange={handleInfo} name="answer" required /><br />
            <input type='text' className='input' placeholder='New Password' value={info.newPassword} onChange={handleInfo} name="newPassword" required /><br />
            <div className='submit'><button type='submit'>Reset</button></div>
          </form>
        </div>
      </Layout>
    </>
  )
}
