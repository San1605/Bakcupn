import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./LogoutComponent.css"
import { logoutIcon } from '../../Assets/globalIcons'
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';
import toast from 'react-hot-toast';
import { globalActions } from '../../Context/GlobalActions';
const LogoutComponent = ({ show, setShow }) => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const { sendTokenToBackend, dispatch } = useContext(GlobalContext)
    const [showRoles, setShowRoles] = useState(false);
    const roles = localStorage.getItem("access")?.split(',')

    const handleLogin = async (switchedRole) => {
        const toastId = toast.loading("Please wait we are switching role")
        try {
            const data = await sendTokenToBackend(localStorage.getItem("token"), switchedRole);
            localStorage.setItem("role", data?.data?.role);
            localStorage.setItem("token", data?.data?.token);
            localStorage.setItem("email", data?.data?.emailId);
            localStorage.setItem("role", data?.data?.role);
            localStorage.setItem("name", data?.data?.name);
            localStorage.setItem("access", data?.data?.roles)
            dispatch({
                type: globalActions.SET_USER_TYPE,
                payload: data?.data?.role,
            });
            toast.dismiss(toastId);
            toast.success("Role Switched");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }

    };


    const handleLogout = () => {
        if (localStorage.getItem("role") === "user") {
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            setShow(false)
            navigate("/");
        } else {
            setShow(false)
            localStorage.clear();
            instance.logoutRedirect({
                postLogoutRedirectUri: "/admin",
                mainWindowRedirectUri: "/admin",
            });
        }
    };


    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [])

    const handleDocumentClick = (e) => {
        if (
            !document.getElementById('profileIcon')?.contains(e.target) &&
            !document.getElementById('logoutComponent')?.contains(e.target)) {
            setShow(false);
        }
    };


    return (
        <div className='logoutComponent' id='logoutComponent'>
            <div className='UserName'>
                <div>{localStorage.getItem("name")}</div>
                <div>{localStorage.getItem("email")}</div>
                {roles?.length > 1 && localStorage.getItem("role") !== 'user' && <div onClick={() => setShowRoles(!showRoles)}>Switch Role</div>}
                {
                    roles?.length > 1 && localStorage.getItem("role") !== 'user' && showRoles &&
                    <div>
                        {roles?.map((item, index) => (
                            <span onClick={() => handleLogin(item)} key={index}>{item}</span>
                        ))}
                    </div>
                }

                {/* {
                    localStorage.getItem("role") !== 'user' &&
                    <select className='switchSelect'>
                        <option hidden>Switch Role</option>
                        {
                            roles?.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))
                        }
                    </select>
                } */}
            </div>
            <div className='logoutComponentButton' onClick={() => handleLogout()}>
                <div>Logout</div>
                <img src={logoutIcon} alt='' />
            </div>
        </div>
    )
}

export default LogoutComponent
