import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import "./Layout.css"



const Layout = ({ children }) => {
    return (
        <div className='App'>
            <Sidebar/>
            <div className='Layout'>
                <Navbar />
                <div className='children'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
