import React from 'react';
import './modals.css';
import { Col, Modal, Row } from 'react-bootstrap';
import closeBtn from './img/close.svg';
import DummyImg from '../../assets/images/dummy.png';

const RecommendationsModal = ({ show, onHide, recommendProducts }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='recommend-modal'
        >
            <Modal.Body>
                <img onClick={() => onHide()} className='close-icon' src={closeBtn} alt="closeBtn" />
                <div className='product-list'>
                    <h5>Recommended Products</h5>
                    <Row className='mt-3'>
                        {
                            recommendProducts.length > 0 ?
                                recommendProducts.map((product, index) => {
                                    return (
                                        <Col lg={3} md={4} sm={6} key={index}>
                                            <div className="box">
                                                {product.Discount && <div className='discount-price'>₹ {product.Discount} Off</div>}
                                                <img src={product.URL_image} alt="img" />
                                                <h6 className='heading-text'>{product.Product_Name}</h6>
                                                <div className="box-content">
                                                    <h6>{product.Product_Name}</h6>
                                                    <p>{product.Description}</p>
                                                    <h6>₹ {(product.Price - product.Discount)} <span> {product.Discount && "₹ " + product.Price}</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                                : "No product"}
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RecommendationsModal