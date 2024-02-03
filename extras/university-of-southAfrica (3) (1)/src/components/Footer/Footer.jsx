import React from 'react'
import logo from "../../assets/img/logo.svg";
import download from "../../assets/img/download (23) 1.svg";

const Footer = () => {
  return (
    <div className='pb-3'>
        <div style={{height: "5px", backgroundImage: "linear-gradient(to right,red ,orange, yellow,green , blue)"}}></div>
        <div className='px-md-5 mx-md-4 px-2 mx-2'>
            <img width='60px' className='py-2' src={logo} alt='.' />
            <img width='120px' className='ps-4 py-2' src={download} alt='.'/>
        </div>
    </div>
  )
}

export default Footer