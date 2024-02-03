import React, { useContext, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import './login.css';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { GlobalContext } from '../../context/GlobalState';
import AdaniLogo from '../../assets/images/adani-logo.svg';

const Login = () => {
    const {loginFunction} = useContext(GlobalContext);
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const handlePasswordChange = (evnt) => {
        setPassword(evnt.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    return (
        <>
            <Container fluid className='login-container'>
                <div className='login-main-div'>
                    <Row>
                        <Col lg={6} md={12} sm={12}>
                            <div className='login-left-side'>
                                <div className='login-form'>
                                    <img src={AdaniLogo} alt="adani logo" className='adani-login'/>
                                    <p>Hello 👋</p>
                                    <h3>Sign In</h3>
                                    <Form>
                                        <Form.Group className="mb-4" controlId="ControlInput1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter your email ID" onChange={(e) => setEmailAddress(e.target.value)} autoComplete="on"/>
                                        </Form.Group>
                                        <Form.Group className="mb-4 password-group" controlId="ControlInput2">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type={passwordType} onChange={handlePasswordChange} value={password} placeholder="Enter password" autoComplete="on"/>
                                            <div className="input-group-btn">
                                                <button type='button' onClick={togglePassword}>
                                                    {passwordType === "password" ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                            </div>
                                        </Form.Group>

                                        <button type='button' className='login-button mt-2' onClick={() => loginFunction(emailAddress, password)}>Login</button>
                                    </Form>

                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12} sm={12} className='login-right-side-mb'>
                            <div className='login-right-side'>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default Login