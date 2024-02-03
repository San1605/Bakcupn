import React, { useState, useEffect, useRef } from 'react';
import "./CreateUserModal.css";

import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { baseUrl } from '../../config';

import adduserIconBlack from '../../assets/addUserIconBlack.svg';

const CreateUserModal = (props) => {
    // const [formData, setFormData] = useState([
    //     {
    //         emailUser: '',
    //         passwordUser: '',
    //         roleUser: '',
    //         tokenCountUser: '',
    //         validityUser: ''
    //     }
    // ]);
    const superRegion = useSelector(state => state.userRegion)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [region, setRegion] = useState('');
    const [tokenCount, setTokenCount] = useState(null);
    const [validity, setValidity] = useState('');

    const isFormValid = () => {
        if (email !== '' && password !== '' && role !== '' && tokenCount !== null && validity !== '') return true
        return false
    };

    const addMore = () => {
        if (isFormValid()) {

            let data = new FormData();
            data.append('super_user_B_unit', superRegion);
            data.append('user_email', email);
            data.append('user_password', password);
            data.append('user_role', role);
            data.append('user_B_unit', region);
            data.append('Token_count_allocation', tokenCount);
            data.append('last_valid_Date', validity);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/Create_user`,
                data: data
            };

            axios(config)
                .then((response) => {
                    if(response.data.data) {
                        alert("User Created successfully!!");
                        props.onHide();
                    } else {
                        alert("Please verify the details")
                        return
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert('Please fill in all fields before adding more data.');
        }
    };


    // useEffect(() => {
    //     if (!props.show) {
    //         setFormData([
    //             {
    //                 emailUser: '',
    //                 passwordUser: '',
    //                 roleUser: '',
    //                 tokenCountUser: '',
    //                 validityUser: ''
    //             }
    //         ]);
    //     }
    // }, [props.show]);
    // console.log(errorsArr, "error")

    // const AlwaysScrollToBottom = () => {
    //     const elementRef = useRef();
    //     useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }))
    //     return <div ref={elementRef} />;
    // };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='createUserModal'
        >
            <Modal.Header >
                <div className='modalheader'>
                    <img src={adduserIconBlack} alt='' />
                    <span>Create users</span>
                </div>
                <CloseButton
                    style={{ fontSize: "12px" }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div className='modalBodyForm'>
                        {/* {
                            formData?.map((formData, index) => ( */}
                                <div className='formBody'>
                                    <div className='formRow'>
                                        <span>Email Id</span>
                                        <div className='inputError'>
                                            <input
                                                type='email'
                                                required
                                                name="emailUser"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Password</span>
                                        <div className='inputError'>
                                            <input
                                                type='password'
                                                required
                                                name="passwordUser"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Role</span>
                                        <div className='inputError'>
                                            <input
                                                type='text'
                                                required
                                                name="roleUser"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Token Count</span>
                                        <div className='inputError'>
                                            <input
                                                type='number'
                                                required
                                                name="tokenCountUser"
                                                value={tokenCount}
                                                onChange={(e) => setTokenCount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Region</span>
                                        <div className='inputError'>
                                            <input
                                                type='text'
                                                required
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Validity</span>
                                        <div className='inputError'>
                                            <input
                                                type="date"
                                                required
                                                name="validityUser"
                                                value={validity}
                                                onChange={(e) => setValidity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            {/* ))
                        } */}
                        {/* <AlwaysScrollToBottom /> */}
                    </div>
                    <div className='buttonDiv'>
                        {/* <span onClick={() => addMore()}>Add more</span> */}
                        <button type="submit" onClick={addMore}>Save</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};
export default CreateUserModal;