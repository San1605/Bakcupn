import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.svg"
const Navbar = () => {
  return (
    <div className='Navbar'>
        <img className='navbarImg' src={logo} alt='logo'/>
    </div>
  )
}

export default Navbar
