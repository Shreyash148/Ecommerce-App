import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { UserMenu } from '../../components/UserMenu'
import axios from 'axios';
import "../../styles/admin.css"
import { useAuth } from '../../context/contextapi';
import { toast } from 'react-hot-toast';

export const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [info, setInfo] = useState({
        name: auth.user.name,
        password: "",
        email: auth.user.email,
        phoneNo: auth.user.contactNumber,
        address: auth.user.address,
        answer: auth.user.answer
    });
    const handleInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/auth/updateUser", {
            id: auth.user._id,
            name: info.name.length===0?auth.user.name:info.name,
            email: info.email.length===0?auth.user.email:info.email,
            contactNumber: info.phoneNo.length===0?auth.user.contactNumber:info.phoneNo,
            address: info.address.length===0?auth.user.address:info.address,
            answer: info.answer.length===0?auth.user.answer:info.answer,
            password: info.password.length===0?auth.user.password:info.password,
        })
        if (response.data.success) {
            setAuth({...auth, user:response.data.updated});
            localStorage.setItem("auth",JSON.stringify(auth));
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }
    return (
        <Layout>
            <div className="dashboard">
                <UserMenu />
                <div className='adminInfo margin'>
                    <form onSubmit={handleSubmit}>
                        <h1 style={{ marginBottom: "1.5rem" }}>Update Profile</h1>
                        <input type='text' className='input' placeholder='Name' value={info.name} name="name" onChange={handleInfo} /><br />
                        <input type='email' className='input' placeholder='Email' value={info.email} name="email" onChange={handleInfo}  /><br />
                        <input type='text' className='input' placeholder='Address' value={info.address} name="address" onChange={handleInfo} /><br />
                        <input type='tel' className='input' placeholder='Phone No.' value={info.phoneNo} name="phoneNo" onChange={handleInfo} /><br />
                        <input type='text' className='input' placeholder='What is your favorite sports?' value={info.answer} name="answer" onChange={handleInfo} /><br />
                        <input type='password' className='input' placeholder='Password' value={info.password} name="password" onChange={handleInfo}/><br />
                        <div className='submit'><button type='submit' >Update</button></div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
