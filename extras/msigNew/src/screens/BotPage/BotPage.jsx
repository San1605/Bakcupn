import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import "./BotPage.css"
import { Outlet } from 'react-router-dom'
const BotPage = () => {
    return (
        <div className='BotPage'>
            <SideBar />
            <Outlet />
        </div>
    )
}
export default BotPage