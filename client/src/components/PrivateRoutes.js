import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/contextapi';
import axios from 'axios';
import { Spinner } from './Spinner';

export default function PrivateRoutes() {
    const [ok,setOk]=useState();
    const [auth,setAuth]=useAuth();

    useEffect(()=>{
        const authCheck=async()=>{
            const res = await axios('http://localhost:8080/user-auth',{
                headers:{
                    'Authorization':auth?.authToken
                }
            })
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.authToken)authCheck();
    },[auth?.authToken])
  return (
    ok?<div><Outlet/></div>:<Spinner/>
  )
}
