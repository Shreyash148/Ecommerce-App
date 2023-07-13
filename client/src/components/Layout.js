import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster} from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}) {
  const styles={
      display:"flex",
      minHeight: "70vh",
      flexDirection: "column",
      backgroundImage: "white",
      width:"100%"
  }
  return (
    <>
    <Navbar /> 
    <main style={styles}>
      <Toaster/>
      {children}
      </main>
    <Footer/>
    </>
  )
}
