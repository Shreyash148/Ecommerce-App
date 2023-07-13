import React, { useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'
import '../../styles/register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/contextapi'

export default function Login() {
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate()
  const [info, setInfo] = useState({ password: "", email: "" });
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  const handleLogin = async (e) => {
    e.preventDefault();
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: info.email,
        password: info.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({...auth,user:response.data.user,authToken:response.data.authToken});
        localStorage.setItem("auth",JSON.stringify(response.data));
        if(response.data.user.role===1){return navigate('/dashboard/admin');}
        else{return navigate('/dashboard/user');}
      }
      else {
        return toast.error(response.data.message);
      }

  }
  return (
    <>
      <Layout>
        <div className='container'>
          <form onSubmit={handleLogin}>
          <h1 style={{ marginBottom: "1.5rem" }}>Login Here</h1>
            <input type='text' className='input' placeholder='Email' value={info.email} onChange={handleInfo} name="email" required /><br />
            <input type='text' className='input' placeholder='Password' value={info.password} onChange={handleInfo} name="password" required /><br />
            <div className='submit'><button type='submit'>Login</button></div>
            <div className="forgot" onClick={()=>navigate("/forgot-password")}>forgot password?</div>
          </form>
        </div>
      </Layout>
    </>
  )
}
