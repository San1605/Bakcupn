import React, { useState, useEffect, useRef } from 'react';
import "./CreateUserModal.css";
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import adduserIconBlack from '../../assets/addUserIconBlack.svg';

const CreateUserModal = (props) => {
    const [formDataArr, setFormData] = useState([
        {
            emailUser: '',
            passwordUser: '',
            roleUser: '',
            tokenCountUser: '',
            validityUser: ''
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newFormData = [...formDataArr];
        newFormData[index] = {
            ...newFormData[index],
            [name]: value
        }
        setFormData(newFormData);
    };

    const isFormValid = () => {
        const lastFormData = formDataArr[formDataArr.length - 1];
        return Object.values(lastFormData).every(value => value !== '');
    };

    const addMore = () => {
        if (isFormValid()) {
            setFormData((prevFormDataArr) => [
                ...prevFormDataArr,
                {
                    emailUser: '',
                    passwordUser: '',
                    roleUser: '',
                    tokenCountUser: '',
                    validityUser: ''
                }
            ]);
        } else {
            alert('Please fill in all fields before adding more data.');
        }
    };


    useEffect(() => {
        if (!props.show) {
            setFormData([
                {
                    emailUser: '',
                    passwordUser: '',
                    roleUser: '',
                    tokenCountUser: '',
                    validityUser: ''
                }
            ]);
        }
    }, [props.show]);
    // console.log(errorsArr, "error")

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }))
        return <div ref={elementRef} />;
    };

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
                <form onSubmit={handleSubmit} autoComplete='off' >
                    <div className='modalBodyForm'>
                        {
                            formDataArr?.map((formData, index) => (
                                <div className='formBody' key={index}>
                                    <div className='formRow'>
                                        <span>Email Id</span>
                                        <div className='inputError'>
                                            <input
                                                type='email'
                                                required
                                                name="emailUser"
                                                value={formData.emailUser}
                                                onChange={(e) => handleInputChange(e, index)}
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
                                                value={formData.passwordUser}
                                                onChange={(e) => handleInputChange(e, index)}
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
                                                value={formData.roleUser}
                                                onChange={(e) => handleInputChange(e, index)} />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Token Count</span>
                                        <div className='inputError'>
                                            <input
                                                type='number'
                                                required
                                                name="tokenCountUser"
                                                value={formData.tokenCountUser}
                                                onChange={(e) => handleInputChange(e, index)} />
                                        </div>
                                    </div>
                                    <div className='formRow'>
                                        <span>Validity</span>
                                        <div className='inputError'>
                                            <input
                                                type="date"
                                                required
                                                name="validityUser"
                                                value={formData.validityUser}
                                                onChange={(e) => handleInputChange(e, index)} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <AlwaysScrollToBottom />
                    </div>
                    <div className='buttonDiv'>
                        <span onClick={() => addMore()}>Add more</span>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};
export default CreateUserModal;