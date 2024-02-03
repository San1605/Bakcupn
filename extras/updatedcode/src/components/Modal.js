import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import "./transcript/transcript.css"
const SummaryModal = ({ setModals, Modals , chatSummary , tab,  person_wise_summary }) => {
    const [DataSummary , setDataSumary]  = useState(tab=="Description" ?chatSummary : (tab=="Customer Support" ? person_wise_summary.Agent.descriptive_summary : person_wise_summary.Customer.descriptive_summary ))
    const [ActiveTab , setActiveTab]  = useState(tab)

    const handleClose = () => setModals(false);
  
    return (
      <Modal centered size="lg" show={Modals} onHide={handleClose} className="showdescription">
        <Modal.Header closeButton >
        <h6 className='pt-1 fs-4 fw-bold'>{ActiveTab}</h6>
        </Modal.Header>
        <Modal.Body className='fs-6 fw-normal p-0 m-4' style={{textAlign:"justify"}}>
  <div className='py-0 px-4'>{DataSummary}</div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#E2F0F2" , Padding:".5rem"}}>
 <div className='w-100 d-flex gap-3 justify-left'>
    <button className= {` outline-none border-0 p-1 px-md-4 justify-content-center align-items-center  rounded-3 border border-primary bg-white ${ActiveTab == "Description" ? "d-none" : "null"}`} onClick={()=>{
        setDataSumary(chatSummary);
         setActiveTab("Description")
         }}>Description</button>
    <button className={` outline-none border-0 p-1 px-md-4 justify-content-center align-items-center  rounded-3 border border-primary bg-white ${ActiveTab == "Customer Support" ? "d-none" : "null"}`} onClick={()=>{setDataSumary(person_wise_summary.Agent.descriptive_summary); setActiveTab("Customer Support")}}>Customer Support</button>
    <button className={` outline-none border-0 p-1 px-md-4 justify-content-center align-items-center  rounded-3 border border-primary bg-white ${ActiveTab == "Customer" ? "d-none" : "null"}`} onClick={()=>{setDataSumary(person_wise_summary.Customer.descriptive_summary); setActiveTab("Customer")}}> Customer</button>
 </div>
        </Modal.Footer>
      </Modal>

    )
  }

  export default SummaryModal;
  