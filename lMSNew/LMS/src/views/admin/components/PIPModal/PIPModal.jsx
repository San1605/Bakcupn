import React, { useContext, useState, useEffect } from 'react'
import "./PIPModal.css"
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from '../../../../context/GlobalState';
import { Bars } from 'react-loader-spinner'
import { CloseButton } from 'react-bootstrap';






const PIPModal = (props) => {
    const [type, setType] = useState(0);
    const { takeActionForPipHRBuddy } = useContext(GlobalContext)
    const takeActionForPIP = (type) => {
        takeActionForPipHRBuddy(
            props.EmployeeData.EmailID, type
        )
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='PIPRequestModalClass'
        >
            <Modal.Header>
                <Modal.Title style={{ fontSize: "18px", fontWeight: "400" ,color:"white"}}>
                    Initiate PIP
                </Modal.Title>
                <CloseButton
                    variant="white"
                    style={{ fontSize: "14px" }}
                    onClick={() => props.onHide()}
                />
                
            </Modal.Header>
            <Modal.Body>
                <div className='filterPopover'>
                    <div className='optionBox'>
                        <div className='employeeDetails'>
                            <div> <b>HRM ID :</b>  {props.EmployeeData.EmployeeID}</div>
                            <div> <b>Name :</b> {props.EmployeeData.Name}</div>
                            <div> <b>Department :</b> {props.EmployeeData.Department}</div>
                            <div> <b>Employment Type :</b> {props.EmployeeData.Employee_type}</div>

                        </div>
                        <div style={{ fontSize: "14px" }}> <b>Please select an action </b></div>
                        <div className='radioButtonInputPIP'>
                            <input
                                type="radio"
                                value={3}
                                name="pipReason"
                                checked={type === 3}
                                onChange={() => setType(3)} />
                            <label>Send Warning Mail</label>
                        </div>

                        <div className='radioButtonInputPIP'>
                            <input
                                type="radio"
                                value={2}
                                name="pipReason"
                                checked={type === 2}
                                onChange={() => setType(2)} />
                            <label>Initiate PIP</label>
                        </div>
                        <div className='radioButtonInputPIP'>
                            <input
                                type="radio"
                                value={1}
                                name="pipReason"
                                checked={type === 1}
                                onChange={() => setType(1)} />
                            <label>Cleared PIP</label>
                        </div>
                    </div>

                    <div className="downloadFilterButton">
                        <button className='downloadFilterButtonCancel'
                            onClick={() => props.onHide()}>Cancel</button>
                        <button
                            onClick={() => {
                                takeActionForPIP(type)
                                props.onHide()
                            }}
                            className='downloadFilterButtonExport' >Take Action</button>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}
export default PIPModal