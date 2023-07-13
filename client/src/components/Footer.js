import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <><hr />
      <div className='footer'>
        <table><tbody className='row'>
          <tr>
            <td className='list'>
              <NavLink to="/admin-register" style={{ color: "white", textDecoration: "none" }}>
                <li>Partner with us </li>
              </NavLink>
              <li>About Us </li>
              <li>Help Center</li>
            </td>
            <td className='list' >
              <li><b>Follow Us</b></li>
              <li>Instagram </li>
              <li>Facebook</li>
            </td>
            <td className='list'>
              <li><b>Contact Us</b></li>
              <li>smshendkar3@gmail.com</li>
              <li>+91 7517674499</li>
            </td>
          </tr>
        </tbody></table>
        <div style={{ padding: "0rem 3rem 0rem 3rem" }}>
          <hr />
          <div className="copyright">2023 copyright : Ecommerce.com</div>
        </div></div>
    </>
  )
}
