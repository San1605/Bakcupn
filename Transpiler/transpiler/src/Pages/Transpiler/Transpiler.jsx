import React from 'react'
import "./Transpiler.css"
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'

import { Outlet } from 'react-router-dom'
const Transpiler = () => {
  return (
    <div className='transpiler'>
      <Navbar/>
      <div className='tranpileContainer'>
        <Sidebar/>
        <Outlet/> 
      </div>
    </div>
  )
}
export default Transpiler