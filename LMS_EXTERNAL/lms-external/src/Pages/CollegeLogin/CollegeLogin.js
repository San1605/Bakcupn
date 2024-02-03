import React, { useEffect, useState } from 'react'
import { ct_login__4x, logoLogin, sampleImg } from '../../Assets/globalIcons';
import "./CollegeLogin.css"
import LoginPasswords from '../../Components/LoginComponents/LoginPasswords';
import UpdatePasswords from '../../Components/LoginComponents/UpdatePasswords';
import ForgotPasswords from '../../Components/LoginComponents/ForgotPasswords';
import OtpScreen from '../../Components/LoginComponents/OtpScreen';
import NewPasswords from '../../Components/LoginComponents/NewPasswords';
import Banner from '../../Components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
const CollegeLogin = () => {
    const [currentForm, setCurrentForm] = useState("login")
    const [arr, setArr] = useState(Array.from({ length: 10 }).fill(0));
    const navigate = useNavigate();
    let formToRender;
    switch (currentForm) {
        case 'login':
            formToRender = <LoginPasswords
                currentForm={currentForm}
                setCurrentForm={setCurrentForm} />;
            break;
        case 'updatePassword':
            formToRender = <UpdatePasswords
                currentForm={currentForm}
                setCurrentForm={setCurrentForm} />;
            break;
        case 'forgotPassword':
            formToRender = <ForgotPasswords
                currentForm={currentForm}
                setCurrentForm={setCurrentForm} />;
            break;
        case 'otp':
            formToRender = <OtpScreen
                currentForm={currentForm}
                setCurrentForm={setCurrentForm} />;
            break;
        case 'newPassword':
            formToRender = <NewPasswords
                currentForm={currentForm}
                setCurrentForm={setCurrentForm} />;
            break;
        default:
            formToRender = null;
    }

    // useEffect(() => {
    //     const { token, role, email } = localStorage;
    //     const allConditionsMet = token && role && email;
    //     if (allConditionsMet && role==="user") {
    //         navigate("/courses");
    //     }
    // }, [])


    return (
        <div className="CollegeLogin" >

            <div className='collegeLoginLeft'>
                <div className="loginLogo">
                    <img src={logoLogin} alt="" />
                </div>
                {formToRender}
                <div></div>
            </div>
            <div className='collegeLoginRight'>
                <Banner type="simple" arr={arr} />
                <Banner type="reverse" arr={arr} />
            </div>

        </div>
    )
}
export default CollegeLogin