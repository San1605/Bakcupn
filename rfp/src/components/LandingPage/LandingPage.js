import React from 'react';
import './LandingPage.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landing from '../../assets/images/landing1.png';
import profile from '../../assets/images/profile.svg';
import ct_logo from '../../assets/images/ct_logo.svg';
import CreateNewFilterModal from '../CreateNewFilterModal/CreateNewFilterModal';


const LandingPage = () => {
  let navigate = useNavigate();
  const [isModifyButtonClicked, setIsModifyButtonClicked] = useState(false);
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleModifyButtonClick = () => {
    setIsModifyButtonClicked(true);
    setIsCreateButtonClicked(false);
  };

  const handleCreateButtonClick = () => {
    setIsCreateButtonClicked(true);
    setIsModifyButtonClicked(false);
    // navigate('/home');
  };
  return (
    <div>
      <div className='landing_background'>
        <div className='landing_heading'>
          <img src={ct_logo} style={{ width: '5.5rem' }} alt="" className="ms-5 " />
          <img src={profile} style={{ width: '1.3rem' }} alt="" className="me-5" />
        </div>
        <div className='landing_div'>
          <div className='text mb-3'>
            <p className='heading_text mb-0 ms-3 '>Welcome to the Future of Intelligence: Explore the Power of Generative AI!</p>
          </div>
          {/* <div className='text heading_text mb-0'><p>Explore the Power of AI!</p></div> */}
          <div className='d-flex gap-4 mt-5'><button className='modify-btn' onClick={() => navigate("/modifyrfp")}>Modify an Existing RFP</button>
            <button className='modify-btn' onClick={() => {
              setShowFilterModal(true)
              // navigate("/home")
            }}>Create a new RFP</button>
          </div>
          <CreateNewFilterModal
            show={showFilterModal}
            onHide={() => {
              setShowFilterModal(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
