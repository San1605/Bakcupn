import React from 'react'
import Navbar from '../../components/NavBar/Navbar'
import SideBar from '../../components/Sidebar/SideBar'
import { Outlet } from 'react-router-dom'
import "./Home.css"
const Home = () => {
    return (
        <div className='home'>
            <SideBar />
            <div className="ContainerDiv">
                <Navbar />
                <Outlet />
            </div>

        </div>
    )
}
export default Home