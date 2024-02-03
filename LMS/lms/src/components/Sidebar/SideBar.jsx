import React from 'react'
import "./SideBar.css"
import logo from "../../assets/logo.png"
import sidebarImg from "../../assets/sidebarImg.png"
import { Link } from 'react-router-dom'
const SideBar = () => {
    return (
        <div className='sidebar'>
            <Link to={"/"}>
                <div className='logoDiv'>
                    <img src={logo} alt="" />
                </div>
            </Link>

            <Link to={"/"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span >Dashboard</span>
                </div>
            </Link>

            <Link to={"/alllearningpath"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>learning Paths</span>
                </div>
            </Link>

            <Link to={"/profile"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>My Profile</span>
                </div>
            </Link>
            <Link to={"/communitychat"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>Chat</span>
                </div>
            </Link>

            <Link to={"/nestedcomments"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>Nested</span>
                </div>
            </Link>
            <Link to={"/games"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>Games</span>
                </div>
            </Link>
            <Link to={"/loginMicrosoft"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>Login Microsoft</span>
                </div>
            </Link>
            <Link to={"/uploadexcel"}>
                <div className='sideDiv'>
                    <img src={sidebarImg} alt="" />
                    <span>Upload Excel</span>
                </div>
            </Link>

        </div>
    )
}

export default SideBar
