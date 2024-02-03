import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import '../assets/css/summary-card.css';
import SummaryModal from './Modal';

const ChatDescription = ({ currentTime, audioTotalTime, chatSummary, person_wise_summary, isProgress }) => {
  const [Modal, setModal] = useState(false);
  const [Tab, settab] = useState("Description");
  return (
    <div className='overall-summary position-relative'>
      <Tabs defaultActiveKey="Description" id="uncontrolled-tab-example" className="mb-2" onSelect = {(selectedIndex)=>{
        settab(selectedIndex)
      }}>
        <Tab eventKey="Description" title="Description" >
          <div onClick={() => settab("Description")}>{
            !isProgress && audioTotalTime <= currentTime && chatSummary ? chatSummary.short_summary : "Call in progress..."
          }</div>
        </Tab>
        <Tab eventKey="Customer Support" title="Customer Support"  >
          <div onClick={() => settab("Customer Support")}>
            {
              !isProgress && audioTotalTime <= currentTime && person_wise_summary ? person_wise_summary.Agent.short_summary : "Call in progress..."
            }
          </div>
        </Tab>
        <Tab eventKey="Customer" title="Customer">
          <div onClick={() => settab("Customer")}>

            {
              !isProgress && audioTotalTime <= currentTime && person_wise_summary ? person_wise_summary.Customer.short_summary : "Call in progress..."
            }
          </div>
        </Tab>
      </Tabs>
      <button type="button" onClick={() => setModal(true)} className='position-absolute end-0 p-1 px-2 justify-content-center align-items-center rounded-2 outline-none border-0 text-white fs-6 fw-normal' style={{ backgroundColor: "#00829B", top: "2px" }} >Show Description</button>
      {Modal === true &&
        <SummaryModal tab={Tab} Modals={Modal} setModals={setModal} chatSummary={chatSummary.descriptive_summary} person_wise_summary={person_wise_summary} />
      }

    </div>
  )
}

export default ChatDescription