import React, { useState } from 'react'
import "./Sidebar.css"
import codeAnalysis from "../../assets/codeAnalysis.svg"
import convertor from "../../assets/convertor.svg"
import testing from "../../assets/testing.svg"
import SidebarImg from "../../assets/SidebarImg.png"
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const [selected,setSelected]=useState("convertor");

    return (
        <div className='Sidebar'>
            <div className='sidebarItemsDiv'>
                <Link to={"/transpile/convertor"}>
                <div className={`sidebarItem ${selected==='code'?"selectedSidebarItem":""}`} onClick={()=>setSelected("code")}>
                    <img src={codeAnalysis} alt="" />
                    <span className={`${selected==='code'?"selectedSidebarItemSpan":""}`}>Code Analysis</span>
                </div>
                </Link>
                <Link to={"/transpile/convertor"}>
                <div className={`sidebarItem ${selected==='convertor'?"selectedSidebarItem":""}`} onClick={()=>setSelected("convertor")}>
                    <img src={convertor} alt="" />
                    <span className={`sidebarSpan ${selected==='convertor'?"selectedSidebarItemSpan":""}`}>Convertor</span>
                </div>
                </Link>
                <Link to={"/transpile/convertor"}>
                <div className={`sidebarItem ${selected==='testing'?"selectedSidebarItem":""}`} onClick={()=>setSelected("testing")}>
                    <img src={testing} alt="" />
                    <span className={`sidebarSpan ${selected==='testing'?"selectedSidebarItemSpan":""}`}>Testing</span>
                </div>
                </Link>
            </div>
            <div className='sidebarImg'>
                <img src={SidebarImg} alt="group"  />
            </div>
        </div>
    )
}

export default Sidebar
