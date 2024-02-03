import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile1 from '../../assets/images/profile1.svg';
import ct_logo from '../../assets/images/ct_logo.svg';
import log_out from '../../assets/images/log-out.svg';
import profile_icon from '../../assets/images/profile_icon.svg';
import './Profile.css';

const Profile = () => {
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState('saved');

 const toggleTable = (tab) => {
   setActiveTab(tab);
 }
  return (
    <div> <div className='landing_heading'>
    <img src={ct_logo} style={{ width: '5.5rem' }} alt="" className="ms-5 " />
    <img src={profile1} style={{ width: '1.3rem' }} alt="" className="me-5 cursor-pointer" />
    </div>
    <div className="row m-0 d-flex" >
    <div className="column sidebar col-3 m-0 p-0">
      <div className="mt-3">
       <b className='ms-5 pb-3'>Hi, John</b>
       <p className='ms-5 mt-4 rfp-text1'>Modify existing rfp</p>
       <p className='ms-5 rfp-text1'>Create a new RFP</p>
        </div>
        <div >
        <p className="logout ms-4"  onClick={() => navigate("/")}>Logout<img src={log_out} alt='' className="ms-2" style={{ width: '1rem', height:'1rem' }}/></p>
      </div> 
        </div>
        <div className="column col-9 ps-2 p-0">
        <p className='pt-3 ps-4 rfp_text'>My profile </p>
        <div className='d-flex'>
        <img src={profile_icon} className='mt-1 ms-4' />
        <div className='d-flex flex-column'>
        <div className='pt-4 ps-4 rfp_text'>John Walker</div>
        <div className='pt-3 ps-4 rfp-text1 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum </div>
        {/* <div className='ps-4 rfp-text1'> pulvinar tortor eget sem consectetur sodales. </div> */}
        </div>
        </div>
        <div className='profile_header mt-3 px-5'>
        <div  className={`ms-5 profile_tab ${activeTab === 'saved' ? 'active-tab' : ''}`}
              onClick={() => toggleTable('saved')}>Saved RFPs</div> 
        <div className={`ms-5 profile_tab ${activeTab === 'downloaded' ? 'active-tab' : ''}`}
              onClick={() => toggleTable('downloaded')}>Downloaded RFPs. </div> 
        <div className={`ms-5 profile_tab ${activeTab === 'history' ? 'active-tab' : ''}`}
              onClick={() => toggleTable('history')}>History </div> 
        </div>
        {
          activeTab === 'saved' ? console.log("table for active") : activeTab === 'downloaded' ? console.log("table for download") : console.log("table for history")
        }
        <div className='table-div'>
        <table className='mt-4 mx-3'>
  <tr >
    <th className=' profile_header1 text-nowrap'>S. No. </th>
    <th className='profile_header1 text-nowrap'>RFP Name </th>
    <th className='profile_header1 text-nowrap'>Last modified  </th>
  </tr>
  <tr className='hovers'>
    <td>1.</td>
    <td>
      <div className='d-flex flex-column '><div><b>Name</b></div>
      <div className='rfp_text2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
     </td>
    <td className='rfp_text2'>8/12/2022</td>
  </tr>
  <tr  className='hovers'>
    <td>2.</td>
    <td>
      <div className='d-flex flex-column '><div><b>Name</b></div>
      <div className='rfp_text2'>Vestibulum pulvinar tortor eget sem consectetur sodales. Phasellus maximus condimentum erat, sed vehicula libero posuere cursus.</div>
      </div>
     </td>
    <td className='rfp_text2'>4/8/2023</td>
  </tr>
  <tr  className='hovers'>
    <td>3.</td>
    <td>
      <div className='d-flex flex-column '><div><b>Name</b></div>
      <div className='rfp_text2'>Nunc sit amet volutpat nisi. Etiam aliquet, dolor vitae placerat egestas, mauris sem condimentum ante, vel varius urna est a diam. Fusce vitae dolor nisl. Nullam eget porttitor nisl. Curabitur lacinia nibh ac odio convallis semper. Sed sit amet lacus maximus, mattis dolor vel, feugiat dui.</div>
      </div>
     </td>
    <td className='rfp_text2'>6/7/2022</td>
  </tr>
</table>
</div>
        </div>
    </div>
    </div>
  )
}

export default Profile