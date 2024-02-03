import React, { useContext, useState } from "react";
import "./CelebalLogin.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Utils/MicrosoftLogin.js";
import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import Loader from "../../Utils/Loader/Loader.jsx"
import { useNavigate } from "react-router-dom";
import { globalActions } from "../../Context/GlobalActions.js";
import { loginBtnArrow, logoLogin, microsoftIcon } from "../../Assets/globalIcons.js";
import Banner from "../../Components/Banner/Banner.jsx";
import { encryptToken } from "../../Utils/encryptDecrypt.js";

function CelebalLogin(props) {
    const { loading, sendTokenToBackend, dispatch, getStaticData } = useContext(GlobalContext);
    const { instance, accounts } = useMsal();
    const isauth = useIsAuthenticated();
    const navigate = useNavigate();


    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
            console.log(e);
        });
    };

    const RequestProfileData = async () => {
        const request = {
            ...loginRequest,
            account: accounts[0],
        };
        await instance
            .acquireTokenSilent(request)
            .then(async (response) => {
                const usermail = {
                    email: `${accounts[0].username}`,
                };
                // const data = await sendTokenToBackend(encryptToken(response.accessToken));
                const data = await sendTokenToBackend(response.accessToken);
                localStorage.setItem("email", accounts[0].username);
                localStorage.setItem("role", data?.data?.role)
                localStorage.setItem("name", data?.data?.name)

                // localStorage.setItem("token", encryptToken(response.accessToken));
                // localStorage.setItem("token", response.accessToken);

                localStorage.setItem("token", data?.data?.token)
                localStorage.setItem("access", data?.data?.roles)
                // localStorage.setItem("refreshhere", response.idToken);
                dispatch({
                    type: globalActions.SET_USER_TYPE,
                    payload: data?.data?.role
                })
                try {
                    getStaticData()
                }
                catch (error) {
                    console.log(error)
                }

                navigate("/dashboard")

            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    useEffect(() => {
        if (isauth) {
            RequestProfileData();
        }
    }, [isauth]);

    // useEffect(() => {
    //     const { token, role, email, name } = localStorage;
    //     const allConditionsMet = token && role && email && name;
    //     if (allConditionsMet && role!=='user') {
    //         navigate("/lpmanagement");
    //     }
    // }, [])


    if (loading) {
        return <Loader />
    }
    return (
        <div className="celebalLogin" >
            <div className="collegeLoginLeft">
                <div className="loginLogo">
                    <img src={logoLogin} alt="" />
                </div>
                <div className="loginFormCelebal">
                    <div>
                        <div>Welcome to</div>
                        <div>Learning Management System</div>
                    </div>
                    <div className="loginBtnMicrosoft" onClick={handleLogin}>
                        <img src={microsoftIcon} alt="" />
                        <span>Sign In with Microsoft</span>
                        <img src={loginBtnArrow} alt="" />
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='collegeLoginRight'>
                <Banner type="simple" />
                <Banner type="reverse" />
            </div>
        </div>
    );
}
export default CelebalLogin;
