import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();


const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        authToken:""
    });
    useEffect(()=>{
        const parsedData = JSON.parse(localStorage.getItem("auth"))
        if(parsedData){
            setAuth({
                ...auth,
                user:parsedData.user,
                authToken:parsedData.authToken
            })
        }
        // eslint-disable-next-line 
    },[]);
  return (
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
  )
}
const useAuth =()=> useContext(AuthContext);
export {useAuth,AuthProvider};

