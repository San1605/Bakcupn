import React, { useEffect, useMemo, useState } from 'react';
import './dashboard.css';
import Navbar from '../../components/Navbar';
import { Col, Container, Row, Table, Form } from 'react-bootstrap';
import userIcon from '../../assets/images/users.svg';
import manIcon from '../../assets/images/man.svg';
import womanIcon from '../../assets/images/woman.svg';
import Pagination from '../../components/Pagination/Pagination';
import SubmitModal from '../../components/Modals/SubmitModal';
import { Bars } from 'react-loader-spinner';
import { apiUrl } from '../../apiUrl';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ selectedIds, setSelectedIds, hierarchyToggle, setHierarchyToggle, setClustures }) => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [submitModal, setSubmitModal] = useState(false);
    const itemsPerpgae = 10;
    const navigate = useNavigate();

    useEffect(() => {
        if (customers.length > 0) {
            setPageCount(Math.ceil(customers.length / itemsPerpgae));
        }
    }, [customers])

    const currentCustomerData = useMemo(() => {
        let firstPageIndex = 0;
        let lastPageIndex = firstPageIndex + itemsPerpgae;
        if (currentPage) {
            firstPageIndex = (currentPage - 1) * itemsPerpgae;
            lastPageIndex = firstPageIndex + itemsPerpgae;
        }
        return customers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customers]);

    const selectNunselectIds = (event) => {
        var selectIds_arr = [...selectedIds];
        if (event.target.checked) {
            selectIds_arr = [...selectedIds, parseInt(event.target.value)];
        } else {
            selectIds_arr.splice(selectedIds.indexOf(parseInt(event.target.value)), 1);
        }
        setSelectedIds(selectIds_arr);
    }

    const selectAllIds = (event) => {
        var allIds_arr = [...selectedIds];
        if (event.target.checked) {
            let checkboxIds = [];
            customers && customers.map((item) => {
                checkboxIds.push(item[0]);
            })
            allIds_arr = checkboxIds;
        } else {
            allIds_arr = [];
        }
        setSelectedIds(allIds_arr);
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${apiUrl}/home`).then((response) => {
            if (response.status === 200) {
                setCustomers(response.data);
            } else {
                toast.error("Something went wrong.")
            }
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(false);
            toast.error("Something went wrong.")
        });
    }, [])

    const submitCustomerData = () => {
        if(hierarchyToggle){
            const toastId = toast.loading("Please wait...");

            var data = JSON.stringify({
                "toggle": hierarchyToggle,
                "ids": selectedIds
            });

            var config = {
                method: 'post',
                url: `${apiUrl}/submit`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
            .then((response) => {
                toast.dismiss(toastId);
                if (response.status === 200) {
                    const rdata = JSON.parse(response.data);
                    let myArray = [];
                    for (var i in rdata) {
                        const cExtractData = JSON.parse(rdata[i]);
                        if(hierarchyToggle === "household" && cExtractData.length > 0){
                            i = cExtractData[0].household_label ? cExtractData[0].household_label : i;
                        } else if(hierarchyToggle === "locality" && cExtractData.length > 0){
                            i = cExtractData[0].locality_label ? cExtractData[0].locality_label : i;
                        }
                        myArray.push({ clustureId: parseInt(i), clusturedata: cExtractData });
                    }
                    setClustures(myArray);
                    navigate("/customers")
                }
            }).catch(error => {
                toast.dismiss(toastId);
                console.log(error);
                toast.error("Something went wrong.")
            });
        } else {
            toast.error("Please select a option")
        }
    }


    return (
        <>
            <Navbar type={1}/>
            <div className='dashboard-main-div'>
                <Container fluid>
                    <div className='page-heading'>
                        <img src={userIcon} alt="users" /> Customers
                    </div>
                    <div className='customer-list-div'>
                        <Row>
                            <Col xs={6}><div className='selected-nums'>{selectedIds.length} Selected</div></Col>
                            <Col xs={6}><button className='submit-btn'
                                disabled={selectedIds.length > 0 ? false : true}
                                onClick={() => setSubmitModal(true)}
                            >Submit</button></Col>
                        </Row>

                        <div className='customer-table table-responsive'>
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{ maxWidth: "25px" }}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={customers.length > 0 && customers.length === selectedIds.length ? true : false}
                                                onChange={(e) => selectAllIds(e)}
                                            />
                                        </th>
                                        <th style={{ minWidth: "150px" }}>Contact Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th style={{ maxWidth: "250px", minWidth: "150px" }}>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentCustomerData.length > 0 ? currentCustomerData.map((customer, index) => {
                                            const isChecked = selectedIds.includes(customer[0]);
                                            // console.log(isChecked, customer, "nn")
                                            return (
                                                <tr key={index}>
                                                    <td style={{ maxWidth: "25px" }}>
                                                        <Form.Check
                                                            type="checkbox"
                                                            onChange={(e) => selectNunselectIds(e)}
                                                            value={customer[0]}
                                                            checked={isChecked}
                                                        />
                                                    </td>
                                                    <td className='user-name'>
                                                        <img src={customer[2] === "Male" ? manIcon : womanIcon} alt='manIcon' />
                                                        {customer[1]}
                                                    </td>
                                                    <td>{customer[3]}</td>
                                                    <td>{customer[7]}</td>
                                                    <td style={{ maxWidth: "250px" }}>{customer[4]}</td>
                                                </tr>
                                            )
                                        }) : <tr><td colSpan={5}>
                                            <div className='d-flex justify-content-center'>
                                                {
                                                    isLoading ?
                                                        <Bars
                                                            height="50"
                                                            width="50"
                                                            color="#FEB546"
                                                            ariaLabel="bars-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />
                                                        : <h6 className='py-1 mb-0'>No Customer.</h6>
                                                }
                                            </div>
                                        </td></tr>
                                    }

                                </tbody>
                            </Table>
                        </div>
                        <div className='pagination-main-div'>
                            <Pagination setCurrentPage={setCurrentPage} setPageCount={setPageCount} pageCount={pageCount} currentPage={currentPage} />
                        </div>
                    </div>
                </Container>
            </div>
            <SubmitModal show={submitModal} onHide={() => setSubmitModal(false)} submitCustomerData={submitCustomerData} hierarchyToggle={hierarchyToggle} setHierarchyToggle={setHierarchyToggle} />
        </>
    )
}

export default Dashboard