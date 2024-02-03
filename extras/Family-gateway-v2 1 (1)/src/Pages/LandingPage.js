import React from 'react'
import landingpageImg from "../assets/images/landingpage.png";
import "../assets/css/landingpage.css";
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import logo from "../assets/images/celebal-logo.svg";

const LandingPage = () => {
    return (
        <>
            <Container fluid className='main-landing-div'>
                <div className='row'>
                    <div className='col-12 col-md-7'>
                        <div className='logo'>
                            <img className='app_logo' src={logo} alt='logo' />
                        </div>
                        <div className='landing-page-subdiv'>
                            <div className='dashboard'>
                                <div className='dashboard-heading pb-3'>Maximizing Customer <br /> Engagement through Personalized Segmentation Strategies</div>
                                <p className='text-secondary text_in_dashboard'>Segmenting customers based on geography, family dynamics, and product preferences leads to more effective marketing. Personalised strategies improve relevance, engagement, and sales.</p>
                                <div className='dashboard_button pt-4'>
                                    <Link to='/login' className='login_button'>Login</Link>
                                    <Link to='/signup' className='sign_up_button'>Signup</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-5 dashboard_image'>
                        <img className='dashboard_side_image' src={landingpageImg} alt='landingpageImg' />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default LandingPage