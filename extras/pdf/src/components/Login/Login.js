import React, {useState} from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import background from '../../assets/images/background.png';
import logo from '../../assets/images/logo.svg';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('');
      return;
    }
    if (email === 'admin@celebaltech.com' && password === '1234567') {
      setError('');
      navigate('/landingpage');
    } else {
      setError('Invalid email or password.');
    }
  };


    return (
        <div className="row m-0 d-flex" style={{ height: "100vh" }}>
            <div className="column col-lg-6 col-md-12">
                    <div className="login-cards">
                        <div className="login-main-card ">
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={logo} style={{ width: '10rem' }} alt="" className=" mb-3" />
                                <p className='login'>Login </p>
                            </div>  
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label className="required">Email address</label>
                                    <br />
                                    <input
                                        name="Emailaddress"
                                        type="text"
                                        placeholder="Enter your email "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="input-container mt-3">
                                    <label className="required">Password</label>
                                    <br />
                                    <input
                                        name="LastName"
                                        type="text"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="error">{error}</div>}
                            {/* </form> */}
                            <div className='d-flex mt-3 align-items-center justify-content-between'>
                                <div className="d-flex align-items-center cursor-pointer forget"><input
                                    type="checkbox"
                                    name="lsRememberMe"
                                    className=" mb-1 cursor-pointer "
                                />

                                    <label className=" mb-1 ms-1" style={{ fontSize: '12px', fontWeight: '500' }} >Remember me</label>
                                </div>
                                <div className="forgot-password"  >Forgot Password?</div>
                            </div>
                            <button
                                className="login-btn mb-1 mt-4 text-nowrap"
                                // onClick={() => navigate("/landingpage")}
                            >
                                Login
                            </button>
                            </form>
                        <div className='mt-3' style={{ fontSize: '12px', fontWeight: '500' }}>Don’t have an account ? Sign up <a className='forgot-password'>here</a></div>
                        </div>
                    </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex p-0 " style={{ height: "100%" }}>
                <div className='loginBackground'></div>
            </div>
        </div>
    )
}

export default Login