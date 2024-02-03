import React from 'react'
import background_Image from "../assets/img/Group 3.svg"

const Header = () => {
  return (
    <div className='px-md-5 mx-md-4 px-3 mx-0'>
      <div className='row m-0 px-5' style={{backgroundImage:`url("${background_Image}")` , width:"100%" , backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}> 
          <div className='col-lg-3 col-md-6 col-12 px-md-4 py-md-5 px-1 py-4'>
              <h3 className='text-white'>An Education Based Web-portal for the South African Community</h3>
          </div>
      </div>
    </div>
  )
}

export default Header