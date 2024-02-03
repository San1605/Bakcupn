import React, { useEffect, useState } from 'react';
import '../Dashboard/dashboard.css';
import Navbar from '../../components/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import arrowLeft from '../../components/Pagination/img/left-arrow.svg';
import { useNavigate } from 'react-router-dom';
import manIcon from '../../assets/images/man.svg';
import womanIcon from '../../assets/images/woman.svg';
import LocationIcon from './img/location.svg';
import MailIcon from './img/mail.svg';
import MobileIcon from './img/mobile.svg';
import RecommendationsModal from '../../components/Modals/RecommendationsModal';
import FamilyHierarchyModal from '../../components/Modals/FamilyHierarchyModal';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { apiUrl } from '../../apiUrl';

const CustomerFilterPage = ({ clustures, hierarchyToggle }) => {
    const naviagate = useNavigate();
    const [recommendModal, setRecommendModal] = useState(false);
    const [familyHierarchyModal, setFamilyHierarchyModal] = useState(false);
    const [hierarchyData, setHierarchyData] = useState({});
    const [recommendProducts, setRecommendProducts] = useState([]);

    useEffect(() => {
        if(!clustures){
            naviagate("/dashboard");
        }
    } ,[])

    const viewHierarchy  = (id) => {
        const toastId = toast.loading("Please wait...");
        var data = JSON.stringify({
            "label": parseInt(id)
        });

        var config = {
            method: 'post',
            url: `${apiUrl}/hierarchy`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config).then((response) => {
            toast.dismiss(toastId);
            if (response.status === 200) {
                console.log(response.data, "response.data")
                setHierarchyData(response.data)
                setFamilyHierarchyModal(true);
            } else {
                toast.error("Something went wrong.")
            }
        }).catch(error => {
            console.log(error);
            toast.dismiss(toastId);
            toast.error("Something went wrong.")
        });
    }

    const viewRecommendProducts = (id) => {
        const toastId = toast.loading("Please wait...");
        var data = JSON.stringify({
            "toggle": hierarchyToggle,
            "label": parseInt(id)
        });
        var config = {
            method: 'post',
            url: `${apiUrl}/recommendations`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setRecommendModal(true);
                    console.log(response.data)
                    setRecommendProducts(response.data);
                }
                toast.dismiss(toastId);
            })
            .catch(function (error) {
                toast.dismiss(toastId);
                console.log(error);
            });
    }

    return (
        <>
            <Navbar type={1}/>
            <div className='dashboard-main-div'>
                <Container fluid>
                    <div className='page-heading'>
                        <button className='back-btn' onClick={() => naviagate("/dashboard")}><img src={arrowLeft} alt="back" /> Back</button>
                    </div>
                    <div className='household-list'>
                    {clustures && clustures.map((clusture, index) => {
                            return (
                                <div className='household-row' key={index}>
                                    <Row>
                                        <Col lg={10} md={8} xs={12}>
                                            <div className='household-left'>
                                                <h4>{hierarchyToggle === "household" ? "Household" : "Locality"} {clusture.clustureId}</h4>
                                                {hierarchyToggle === "household" && <div className='address customer-p'><img src={LocationIcon} alt="LocationIcon" /> {clusture.clusturedata.length > 0 ? clusture.clusturedata[0].Address : "-"}</div>}
                                                <Row className='customer-row'>
                                                    {clusture.clusturedata && clusture.clusturedata.map((customer, index) => {
                                                        return (
                                                            <Col lg={4} md={6} xs={12} className='col-1' key={index}>
                                                                <div className='household-customer'>
                                                                    <h5><img src={customer.Gender === "Male" ? manIcon : womanIcon} alt="manIcon" /> {customer.Name}</h5>
                                                                    <div className='customer-p'><div className='img-icon'><img src={MobileIcon} alt="MobileIcon" width="10px" /></div> {customer.Mobile}</div>
                                                                    <div className='customer-p'><div className='img-icon'><img src={MailIcon} alt="MailIcon" width="14px" /></div> {customer.Email}</div>
                                                                    {hierarchyToggle === "locality" && <div className='customer-p'><div className='img-icon'><img src={LocationIcon} alt="LocationIcon" width="14px" /></div> {customer.Address}</div> }
                                                                </div>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col lg={2} md={4} xs={12}>
                                            <button className='submit-btn' onClick={() => viewRecommendProducts(clusture.clustureId)}>Recommendations</button>
                                            {hierarchyToggle === "household" && <button className='cancel-btn mt-4' onClick={() => viewHierarchy(clusture.clustureId)}>Family Hierarchy</button>}
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </div>
            <RecommendationsModal recommendProducts={recommendProducts} show={recommendModal} onHide={() => setRecommendModal(false)} />
            <FamilyHierarchyModal hierarchyData={hierarchyData} show={familyHierarchyModal} onHide={() => setFamilyHierarchyModal(false)} />
        </>
    )
}

export default CustomerFilterPage