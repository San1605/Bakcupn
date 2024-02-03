import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logoHome.svg';
import Vector from '../../assets/vector.svg';
import Vector1 from '../../assets/vector1.svg';


const Login = ({setIsAuthenticated}) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter credentials to login');
            return;
        }
        if (email === 'admin@celebaltech.com' && password === '1234567') {
            setIsAuthenticated(true);
            setError('');
            navigate('/transpile/convertor');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="row m-0 p-0 d-flex" style={{ height: "100vh" }}>
            <div className="back-image column ms-0 ps-0 col-lg-5 col-md-12">
                <div className='position-relative'>
                    <img src={logo} style={{ width: '6rem' }} alt="" className=" ms-3 mt-3" />

                    <div className='login-height d-flex flex-column '>
                        {/* <img src={logo} style={{ width: '10rem' }} alt="" className=" mb-3" /> */}
                        <p className='login ms-5 mt-4'>Login </p>
                        <p className='details ms-5'>Please enter the following details to login</p>
                    </div>
                    <div className='login-height1 '> </div>
                    <div className="login-cards">
                        <div className="login-main-card ">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label className="required">Email Id</label>
                                    <br />
                                    <input
                                        name="Emailaddress"
                                        type="text"
                                        placeholder="Enter your email "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="input-container mt-1">
                                    <label className="required">Password</label>
                                    <br />
                                    <input
                                        name="LastName"
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="error">{error}</div>}
                                {/* </form> */}
                                {/* <div className='d-flex mt-3 align-items-center justify-content-between'>
                                <div className="d-flex align-items-center cursor-pointer forget"><input
                                    type="checkbox"
                                    name="lsRememberMe"
                                    className=" mb-1 cursor-pointer "
                                />

                                    <label className=" mb-1 ms-1" style={{ fontSize: '12px', fontWeight: '500' }} >Remember me</label>
                                </div>
                                <div className="forgot-password"  >Forgot Password?</div>
                            </div> */}
                                <button
                                    className="login-btn mb-1 mt-4 text-nowrap"

                                >
                                    Login
                                </button>
                            </form>
                            <div className='mt-3 d-flex align-items-center justify-content-center' style={{ fontSize: '14px', fontWeight: '500' }}>Don’t have an account  <a className='forgot-password ps-1'> Register Now</a></div>
                        </div>
                        <div className='vector '><img src={Vector} alt='' /></div>
                        <div className='vector1 '><img src={Vector1} alt='' /></div>
                    </div>
                </div>
            </div>
            <div className="col-lg-7 d-none d-lg-flex p-0 " style={{ height: "100%" }}>
                <div className='loginBackground'></div>
            </div>
        </div>
    )
}

export default Login