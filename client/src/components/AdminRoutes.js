import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/contextapi'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Spinner } from './Spinner';

export const AdminRoutes = () => {
    const [auth, setauth] = useAuth();
    const [ok, setOk] = useState();
    
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth?.authToken;
        axios.defaults.headers.common['Content-Type'] = "application/json";
        const authCheck = async () => {
            const res = await axios("http://localhost:8080/admin-auth")
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if(auth?.authToken)authCheck();
    }, [auth?.authToken]);
    return (
        ok?<div><Outlet/></div>:<Spinner/>
    )
}


