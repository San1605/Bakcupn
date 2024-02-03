import React, { useContext, useEffect, useState } from 'react';
import "./Navbar.css";
import { profile, backIcon, notification, hamburgerIcon } from "../../Assets/globalIcons";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LogoutComponent from '../LogoutComponent/LogoutComponent';
import { GlobalContext } from '../../Context/GlobalContext';
import StudentProfile from '../../Views/User/Components/StudentProfile/StudentProfile';

const Navbar = ({ type, setCollapseSideBar, collapseSideBar, overlayState, setOverlayState }) => {
    const { id1 } = useParams();
    const location = useLocation();
    const { ct_roles } = useContext(GlobalContext)
    const path = location.pathname.split('/').pop();
    const navigate = useNavigate();
    const [headingNavbar, setHeadingNavbar] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    useEffect(() => {
        const setNavbarHeading = () => {
            if (location.pathname.includes("lpmanagement")) {
                setHeadingNavbar('Learning Path Management');
                return;
            }
            const pathMappings = {
                dashboard: 'Dashboard',
                rolemanagement: 'Role Management',
                colleges: 'Colleges',
                lpmanagement: 'Learning Path Management',
                events: 'Event & Calendar',
                help: 'Help & Support',
                notifications: 'Notifications',
                learn: 'UI/UX Course',
                courses: 'Courses Enrolled',
                communitychat: "Community Chat",
                feedback:"Students's Feedback"
            };

            setHeadingNavbar(pathMappings[path] || '');
        };

        setNavbarHeading();
    }, [location.pathname, path]);
    const handleImageError = (e) => {
        e.target.src = profile;
    };

    return (
        <div className='Navbar'>
            <div className='navbarheading'>
                {type === "collapse" ? (
                    <img
                        id="hamburger-icon"
                        style={{
                            width: '18px',
                            height: '18px',
                            marginRight: '5px',
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setOverlayState(!overlayState);
                            setCollapseSideBar(!collapseSideBar);
                        }}
                        src={hamburgerIcon}
                        alt=''
                    />
                ) : (
                    ((id1 && headingNavbar !== "Learning Path Management") || headingNavbar === "Notifications") && (
                        <img
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)}
                            src={backIcon}
                            alt='back'
                        />
                    )
                )}
                <span>{(id1 && headingNavbar !== "Learning Path Management") ? id1 : headingNavbar}</span>
            </div>
            <div className='navbarIconsDiv'>
                <div className='notificationDiv' onClick={() => navigate("/notifications")}>
                    <img src={notification} alt='' />
                    <div className='notificationCount'>5</div>
                </div>
                <img id='profileIcon'
                    style={{ height: "32px", width: "32px", cursor: "pointer", borderRadius: "50%" }}
                    onClick={() => {
                        if (localStorage.getItem('role') === 'user') {
                            setShowProfile(!showProfile)
                        }
                        else {
                            setShowLogout(!showLogout)
                        }

                    }}
                    src={ct_roles.includes(localStorage.getItem("role")) ? `https://storagefortimetrigger.blob.core.windows.net/profile/${localStorage.getItem("email")?.split("@")[0]}.jpg` : profile}
                    onError={handleImageError}
                    alt=''
                />
            </div>
            {showLogout && <LogoutComponent
                show={showLogout}
                setShow={setShowLogout} />}
            {
                showProfile && <StudentProfile
                    show={showProfile}
                    setShow={setShowProfile}
                />
            }
        </div>
    );
};
export default Navbar;