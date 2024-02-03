import React, { useState } from 'react'
import "./SideBar.css"
import logo from "../../assets/logo.svg"
import historyIcon from "../../assets/historyIcon.svg"
import Dots from "../../assets/dots.svg"
import profileIcon from "../../assets/profileIcon.svg"
import manageUserIcon from "../../assets/manageUserIcon.svg"
import { Link } from 'react-router-dom'
const SideBar = () => {
    const userSearchHistory = [
        'How to reverse a string in JavaScript?',
        'JavaScript array methods',
        'React component lifecycle React component lifecycleReact component lifecycleReact component lifecycle',
        'CSS flexbox tutorial',
        'HTML form validation',
        'JavaScript closure examples',
        'Web design best practices',
        'Responsive web design frameworks',
        'JavaScript async/await',
        'Frontend development tools',
    ];
    const [searchHistory,setSearchHistory] = useState(userSearchHistory)
    const addNewChat=()=>{
        setSearchHistory((prev)=>["New Chat",...prev])
    }

    return (
        <div className='SideBar'>
            <div className='upperPart'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='newChat' onClick={addNewChat}>
                    + New chat
                </div>
            </div>

            <div className="lowerPart">
                <div className="history">
                    <div className='historyText'>History</div>
                    <div className="historyItems">
                        {searchHistory?.map((item, index) => (
                            <div className='historyItemDiv' key={index}>
                                <img src={historyIcon} alt='' />
                                <span>{item}</span>
                            </div>
                        ))
                        }
                    </div>
                </div>

                <div className="SideBarBottom">
                     {/* show only when user is admin */}
                    <Link to={"/admin"}>
                        <div className="manageUser">
                            <img src={manageUserIcon} alt='' />
                            <span>Manage Users</span>
                        </div>
                    </Link>
                    <div className="profile">
                        <div className='profile-icon'>
                            <img src={profileIcon} alt='' />
                            <span>Joey Tribbiani</span>
                        </div>
                        <img src={Dots} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SideBar
