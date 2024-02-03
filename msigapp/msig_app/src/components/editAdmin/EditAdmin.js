import React, { useState } from 'react';
import styles from "./editAdmin.module.css";

import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

import { baseUrl } from '../../config';

import Calender from '../../assets/calendar.svg'
import Close from '../../assets/close.svg';

const EditAdmin = ({ show, onHide }) => {

    // const [isStatusActive, setIsStatusActive] = useState(true)

    const isStatusActive = useSelector(state => state.selectedStatus)
    const email = useSelector(state => state.selectedEmail)
    const userName = useSelector( state => state.selectedUser)
    const oldRole = useSelector(state => state.selectedRole)
    const oldValidity = useSelector(state => state.selectedValidity)
    const oldToken = useSelector(state => state.selectedToken)

    const [newValidity, setNewValidity] = useState('')
    const [newToken, setNewToken] = useState(null)
    const [newRole, setNewRole] = useState('')

    const handleSave = () => {
        let data = new FormData();
        
        data.append('user_email', email);
        data.append('New_token_count', newToken);
        data.append('new_last_day', newValidity);
        data.append('new_role', newRole);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/userupdate`,
            data: data
        };

        axios(config)
            .then((response) => {
                if(response.data.status_code === 200) {
                    alert("Updation Successful")
                    onHide()
                } else {
                    alert("Please verify the details")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Modal
            size="md"
            centered
            show={show}
        >
            <Modal.Body
                className={styles.container}
            >
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <span>{userName}</span>
                        <img
                            src={Close}
                            alt='X'
                            onClick={() => onHide()}
                        />
                    </div>
                    <span>{email}</span>
                </div>
                <div className={styles.statusSec}>
                    <span className={styles.secTitle}>
                        Status
                    </span>
                    <div
                        className={styles.statusSwitch}
                    // onClick={() => setIsStatusActive(!isStatusActive)}
                    >
                        {isStatusActive === "Active" ?
                            <>
                                <div className={styles.activeCircle} />
                                <span className={styles.switchText}>Active</span>
                            </>
                            :
                            <>
                                <span className={styles.switchText}>Inactive</span>
                                <div className={styles.activeCircle} />
                            </>
                        }
                    </div>
                </div>
                <div className={styles.difSec}>
                    <div className={styles.currentSec}>
                        <span className={styles.secTitle}>
                            Current validity
                        </span>
                        <div className={styles.inActiveContainer}>
                            {oldValidity}
                        </div>
                    </div>
                    <div className={styles.newSec}>
                        <span className={styles.secTitle}>
                            New validity
                        </span>
                        <div className={styles.calenderContainer}>
                            <DatePicker
                                className={styles.dateBox}
                                selected={newValidity}
                                onChange={(date) => setNewValidity(date)}
                                dateFormat="MM dd yyyy"
                            />
                            <img src={Calender} alt="Calendar" />
                        </div>
                    </div>
                </div>
                <div className={styles.difSec}>
                    <div className={styles.currentSec}>
                        <span className={styles.secTitle}>
                            Current token
                        </span>
                        <div className={styles.inActiveContainer}>
                            {oldToken}
                        </div>
                    </div>
                    <div className={styles.newSec}>
                        <span className={styles.secTitle}>
                            New token
                        </span>
                        <div className={styles.calenderContainer}>
                            <input type='number' value={newToken} onChange={e => setNewToken(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={styles.difSec}>
                    <div className={styles.currentSec}>
                        <span className={styles.secTitle}>
                            Current Role
                        </span>
                        <div className={styles.inActiveContainer}>
                            {oldRole}
                        </div>
                    </div>
                    <div className={styles.newSec}>
                        <span className={styles.secTitle}>
                            New Role
                        </span>
                        <div className={styles.calenderContainer}>
                            <select value={newRole} onChange={e => setNewRole(e.target.value)}>
                                <option value=""></option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </Modal.Body>
        </Modal >
    )
};
export default EditAdmin;