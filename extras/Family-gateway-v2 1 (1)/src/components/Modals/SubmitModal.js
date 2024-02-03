import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import closeBtn from './img/close.svg';
import Home from './img/home.svg';
import Home1 from './img/home-1.svg';
import Place1 from './img/place-1.svg';
import Place from './img/place-2.svg';
import './modals.css';

const SubmitModal = ({ show, onHide, hierarchyToggle, setHierarchyToggle, submitCustomerData }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='filter-modal'
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <img onClick={() => onHide()} className='close-icon' src={closeBtn} alt="closeBtn" />
                <div className='submit-filter-div'>
                    <h6>Choose how you wish to filter the list:</h6>
                    <Row>
                        <Col xs={6}>
                            <div className={`filter ${hierarchyToggle === "household" ? "selected" : ""}`} onClick={() => setHierarchyToggle("household")}>
                                <div className='image1'><img src={hierarchyToggle === "locality" ? Home1 : Home} alt='img11' /></div>
                                <p>Household</p>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className={`filter ${hierarchyToggle === "locality" ? "selected" : ""}`} onClick={() => setHierarchyToggle("locality")}>
                                <div className='image1'><img src={hierarchyToggle === "household" ? Place1 : Place} alt='place' /></div>
                                <p>Locality</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="pt-2 pb-3">
                        <Col xs={6}><button className='cancel-btn' onClick={() => onHide()}>Cancel</button></Col>
                        <Col xs={6}><button className='submit-btn' onClick={() => submitCustomerData()}>Submit</button></Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SubmitModal