import React, { useState } from 'react';
import styles from './loginForm.module.css'
import InputField from '../inputField/InputField';
import BackArrow from '../../assets/arrow-back.svg'
import Eye_open from '../../assets/eye-off.svg'
import Check from '../../assets/check-bold.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUser, setLoginScreenType, setUserEmail, setUserRegion, setUserRole } from '../../redux/actions';
import axios from 'axios'
import { baseUrl } from '../../config';
import { useNavigate } from 'react-router';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleForgot = () => {
        dispatch(setLoginScreenType("forgot"))
    }

    const handleLogin = () => {
        const FormData = require('form-data');
        let data = new FormData();

        data.append('user_email', email);
        data.append('user_password', password);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/Authentication`,
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.status_code === 500) return alert("Please Check Credencials")
                if (!response.data.data.Authentication) return alert("Please Check Password, and try again")
                // dispatch(setIsUser(true))
                dispatch(setUserEmail(response.data.data.user_email_id));
                dispatch(setUserRole(response.data.data.user_role));
                dispatch(setUserRegion(response.data.data.user_bunit_name));
                {
                    (response.data.data.user_role === 'user' && navigate("/user-chatbot/conversation")) ||
                    (response.data.data.user_role === 'admin' && navigate("/manage-users")) ||
                    (response.data.data.user_role === 'superadmin' && navigate("/super-admin-dashboard"))
                }
                localStorage.setItem("user-email",response.data.data.user_email_id)
                localStorage.setItem("user-role",response.data.data.user_role)
                localStorage.setItem("user-region",response.data.data.user_bunit_name)
                localStorage.setItem("token-count",response.data.data.token_count)
                let modifiedName = response.data.data?.user_name.replace("-", " ");
                localStorage.setItem("user-name",modifiedName)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className={styles.formHeader}>
                <span></span>
                <span className={styles.header}>
                    WELCOME
                </span>
                <span></span>
            </div>
            <InputField
                label={"Email"}
                type={"text"}
                dataSetter={value => setEmail(value)}
            />
            <div className={styles.passwordContainer}>
                <InputField
                    label={"Password"}
                    type={"password"}
                    dataSetter={value => setPassword(value)}
                />
                <span
                    className={styles.forgot}
                    onClick={handleForgot}
                >
                    Forgot password?
                </span>
            </div>
            <button
                className={styles.submitBut}
                onClick={handleLogin}
            >
                LOGIN
            </button>
        </>
    )
}

const ForgotPassword = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyCode, setVerifyCode] = useState(null)

    const handleBack = () => {
        dispatch(setLoginScreenType("login"))
    }

    const handleLogin = () => {
        const FormData = require('form-data');
        let data = new FormData();

        data.append('user_email', email);
        data.append('new_password', password);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/Password_change`,
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.data.email_id === email) {
                    dispatch(setLoginScreenType("login"))
                    alert("Login again with new Credential")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className={styles.formHeader}>
                <div
                    className={styles.backArrow}
                    onClick={handleBack}
                >
                    <img src={BackArrow} alt='Back' />
                </div>
                <span className={styles.header}>
                    Forgot Password
                </span>
                <span />
            </div>
            <InputField
                label={"Email"}
                type={"text"}
                dataSetter={value => setEmail(value)}
            />
            <InputField
                label={"New Password"}
                type={"password"}
                dataSetter={value => setPassword(value)}
            />
            <div className={styles.fieldContainer}>
                <span className={styles.label}>
                    Verification code
                </span>
                <div className={styles.inputfield}>
                    <input
                        type="password"
                        onChange={e => setVerifyCode(e.target.value)}
                    />
                    <div className={styles.inputButton}>
                        <img src={Check} alt='check' />
                        <img src={Eye_open} alt='eye' />
                    </div>
                </div>
            </div>
            <button
                className={styles.submitBut}
                onClick={handleLogin}
            >
                LOGIN
            </button>
        </>
    )
}

const LoginForm = () => {

    const screenType = useSelector(state => state.loginScreenType)

    return (
        <div className={styles.formContainer}>
            {screenType === "login" ?
                <Login /> :
                <ForgotPassword />
            }
        </div>
    );
};

export default LoginForm;