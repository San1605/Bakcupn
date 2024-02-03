import React, { useEffect, useState } from 'react';
import styles from './userProfile.module.css'

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import format from 'date-fns/format';

import Calendar from '../../components/calendar/Calendar';

import { baseUrl } from '../../config';

import Back from '../../assets/arrow-back.svg'
import DPic from '../../assets/profileIcon.svg'
import Down from '../../assets/arrow-down.svg'
import PrevInActive from '../../assets/previous-inactive.svg'
import NextActive from '../../assets/next-active.svg'
import Pen from '../../assets/pen-edit.svg'
import UserImg from "../../assets/userIcon.svg"
import BotImg from "../../assets/roboIcon.svg"

import EditAdmin from '../../components/editAdmin/EditAdmin';
import { setConversationId, setSelectedCardData, setSelectedEmail, setSelectedRole, setSelectedStatus, setSelectedToken, setSelectedUser, setSelectedValidity } from '../../redux/actions';
import CardSlider from '../../components/cardSlider/CardSlider';

const Pagination = () => {

    return (
        <div className={styles.paginationContainer}>
            <img src={PrevInActive} alt='Prev' />
            <span className={styles.paginationText}>
                1-10 of 230
            </span>
            <img src={NextActive} alt='Next' />
        </div>
    )
}

const ChatFragment = ({ chatData }) => {
    return (
        <div className={styles.messageContainer}>
            {chatData?.map((item, index) =>
                <div key={index} className={item?.role === "user" ? styles.userDiv : styles.roboDiv}>
                    <div className={item?.role === 'user' ? styles.messageUser : styles.messageBot}>
                        <img className={item?.role === 'user' ? styles.messageUserImg : styles.messageBotImg} src={item?.role === "user" ? UserImg : BotImg} alt='' />
                        <span className={item?.role === 'user' ? styles.messageUserSpan : styles.messageBotSpan} >{item?.text}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

const UserProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const superEmail = localStorage.getItem("user-email")
    const userEmail = useSelector(state => state.selectedEmail)
    const userName = useSelector(state => state.selectedUser)
    const userRole = useSelector(state => state.selectedRole)
    const userStatus = useSelector(state => state.selectedStatus)
    const userValidity = useSelector(state => state.selectedValidity)
    const userToken = useSelector(state => state.selectedToken)
    const cardData = useSelector(state => state.selectedCardData)

    const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [active, setActive] = useState(-1);
    const [editVisible, setEditVisible] = useState(false);
    const [roleDate, setRoleDate] = useState('');
    const [validityDate, setValidityDate] = useState('');
    const [tokenDate, setTokenDate] = useState('');
    const [tokenEmail, setTokenEmail] = useState('');
    const [roleEmail, setRoleEmail] = useState('');
    const [validityEmail, setValidityEmail] = useState('');
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

    const [conversation, setConversation] = useState({})

    const month = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    }

    const handleEditProfile = () => {
        setEditVisible(true)
    }

    useEffect(() => {
        let data = new FormData();
        data.append('super_email_id', superEmail);
        data.append('email_id', userEmail);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/get_data`,
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.status_code === 453) {
                    setConversation({})
                    return
                }
                dispatch(setSelectedCardData({}))
                setConversation(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        let data = new FormData();
        data.append('email_id', userEmail);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/user_change`,
            data: data
        };

        axios(config)
            .then((response) => {
                setRoleDate(response.data.data.role_date);
                setRoleEmail(response.data.data.role_email_id);
                setValidityDate(response.data.data.last_day_date);
                setValidityEmail(response.data.data.last_day_email_id);
                setTokenDate(response.data.data.soft_limit_date);
                setTokenEmail(response.data.data.soft_limit_email_id);
            })
            .catch((error) => {
                console.log(error);
            });
    })

    useEffect(() => {
        let data = new FormData();
        data.append('user_email', userEmail);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/userData`,
            data: data
        };

        axios(config)
            .then((response) => {
                dispatch(setSelectedUser(response.data.data.data.user_name))
                dispatch(setSelectedRole(response.data.data.data.role))
                dispatch(setSelectedValidity(response.data.data.data.user_last_day))
                dispatch(setSelectedStatus(response.data.data.data.status))
                dispatch(setSelectedToken(response.data.data.data.token))
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const dateFormater = date => {

        let temp = date.toString().split(" ")

        let newDate = temp[2] + '-' + month[(temp[1])] + '-' + temp[3]
        return newDate
    }

    const handleDateSelect = (date, type) => {
        if (type === 'from') {
            setFromDate(date)
            if(date === null) return
            if (toDate) {
                let data = new FormData();
                data.append('super_email_id', superEmail);
                data.append('email_id', userEmail);
                data.append('time_start', format(date, "yyyy-MM-dd"))
                data.append('time_end', format(toDate, "yyyy-MM-dd"))

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${baseUrl}/get_data`,
                    data: data
                };

                axios(config)
                    .then((response) => {
                        if (response.data.status_code === 453) {
                            setConversation({})
                            return
                        }
                        setConversation(response.data.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setToDate(date)
            if(date === null) return
            if (fromDate) {
                let data = new FormData();
                data.append('super_email_id', superEmail);
                data.append('email_id', userEmail);
                data.append('time_start', format(fromDate, "yyyy-MM-dd"))
                data.append('time_end', format(date, "yyyy-MM-dd"))

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${baseUrl}/get_data`,
                    data: data
                };

                axios(config)
                    .then((response) => {
                        if (response.data.status_code === 453) {
                            setConversation({})
                            return
                        }
                        setConversation(response.data.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }

    const handleBack = () => {
        dispatch(setSelectedUser(''))
        dispatch(setSelectedEmail(''))
        dispatch(setSelectedRole(''))
        dispatch(setSelectedValidity(''))
        dispatch(setSelectedStatus(''))
        navigate(-1)
    }

    return (
        <div className={styles.container}>
            <EditAdmin
                show={editVisible}
                onHide={() => setEditVisible(false)}
            />
            <div className={styles.header}>
                <div className={styles.backButton} onClick={handleBack}>
                    <img src={Back} alt='Left' />
                </div>
                <span className={styles.headerHeading}>
                    manage users {'>  '}
                    <span className={styles.profileName}>
                        {userName}
                    </span>
                </span>
            </div>
            <div className={styles.profileSection}>
                <div className={styles.profileHeader}>
                    <div className={styles.userProfile}>
                        <div className={styles.displayPic}>
                            <img src={DPic} alt='dpic' />
                        </div>
                        <div className={styles.profileDetail}>
                            <div className={styles.primaryDetail}>
                                <div className={styles.nameSection}>
                                    <span className={styles.userName}>
                                        {userName}
                                    </span>
                                    <img src={Pen} alt='Pen' onClick={handleEditProfile} />
                                </div>
                                <span className={styles.userEmail}>
                                    {userEmail}
                                </span>
                                <span className={styles.userType}>
                                    {userRole}
                                </span>
                            </div>
                            <div className={styles.secondaryDetail}>
                                <div className={styles.detailTile}>
                                    <span className={styles.tileTitle}>
                                        Validity
                                    </span>
                                    <span className={styles.tileValue}>
                                        {userValidity}
                                    </span>
                                </div>
                                <div className={styles.detailTile}>
                                    <span className={styles.tileTitle}>
                                        Current Token count
                                    </span>
                                    <span className={styles.tileValue}>
                                        {userToken}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.statusValue}>
                                {userStatus}
                            </div>
                        </div>
                    </div>
                    <div className={styles.historySection}>
                        <span className={styles.historyHeader}>History</span>
                        <div className={styles.historyDetails}>
                            <span>Last validity updated : {validityDate}</span>
                            <span>Validity updated by : {validityEmail} </span>
                            <span>Token updated : {tokenDate}</span>
                            <span>Token updated by : {tokenEmail} </span>
                            <span>Role updated  : {roleDate} </span>
                            <span>Role updated by : {roleEmail} </span>
                        </div>
                    </div>
                </div>
                <CardSlider />
                <div className={styles.conversationSec}>
                    <div className={styles.conversationHeader}>
                        <span className={styles.conversationHeading}>
                            Conversation
                        </span>
                        <div className={styles.convRight}>
                            <Calendar
                                label={"From"}
                                setSelectedDate={value => handleDateSelect(value, "from")}
                                selectedDate={fromDate}
                            />
                            <Calendar
                                label={"To"}
                                setSelectedDate={value => handleDateSelect(value, "to")}
                                selectedDate={toDate}
                            />
                        </div>
                    </div>
                    <div className={styles.conversationList}>
                        <div className={styles.listItemHeader}>
                            <span className={styles.itemSno}>
                                S No.
                            </span>
                            <div className={styles.itemDetailHeader}>
                                <div className={styles.itemDate}>
                                    Date
                                </div>
                                <div className={styles.itemTitle}>
                                    Title
                                </div>
                                <div className={styles.itemType}>
                                    Type
                                </div>
                            </div>
                        </div>
                        {Object.keys(cardData).length ?
                            cardData.data?.map((item, index) =>
                                active === item ?
                                    <div key={item} className={styles.listItemActive}>
                                        <div className={styles.listItemActiveHeader}>
                                            <span className={styles.itemSno}>
                                                {index + 1}
                                            </span>
                                            <div className={styles.itemDetailActive}>
                                                <div className={styles.itemDate}>
                                                    {cardData.time[index][2]}/{cardData.time[index][1]}/{cardData.time[index][0]}
                                                </div>
                                                <div className={styles.itemTitle}>
                                                    {Object.values(item)[0][0].text}
                                                </div>
                                                {/* <div className={styles.itemType}>
                                                    
                                                </div> */}
                                            </div>
                                            {/* <img
                                    src={Down}
                                    alt='Down'
                                    onClick={() => setActive(item)}
                                /> */}
                                        </div>
                                        <div className={styles.listItemActiveBody}>
                                            <ChatFragment chatData={Object.values(item)[0]} />
                                        </div>
                                    </div>
                                    : <>
                                        {
                                            Object.values(item)[0].length ?
                                                <div key={item} className={styles.listItemContainer}>
                                                    <div key={item} className={styles.listItem}>
                                                        <span className={styles.itemSno}>
                                                            {index + 1}
                                                        </span>
                                                        <div className={styles.itemDetail}>
                                                            <div className={styles.itemDate}>
                                                                {cardData.time[index][2]}/{cardData.time[index][1]}/{cardData.time[index][0]}
                                                            </div>
                                                            <div className={styles.itemTitle}>
                                                                {Object.values(item)[0][0].text}
                                                            </div>
                                                            {/* <div className={styles.itemType}>
                                                                {cardData.urls[index]}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={Down}
                                                        alt='Down'
                                                        onClick={() => setActive(item)}
                                                        style={{ alignSelf: 'flex-end' }}
                                                    />
                                                </div> : <></>
                                        }
                                    </>
                            )
                            :
                            Object.keys(conversation).length ?
                                conversation.data?.map((item, index) =>
                                    active === item ?
                                        <div key={item} className={styles.listItemActive}>
                                            <div className={styles.listItemActiveHeader}>
                                                <span className={styles.itemSno}>
                                                    {index + 1}
                                                </span>
                                                <div className={styles.itemDetailActive}>
                                                    <div className={styles.itemDate}>
                                                        {conversation.time[index][2]}/{conversation.time[index][1]}/{conversation.time[index][0]}
                                                    </div>
                                                    <div className={styles.itemTitle}>
                                                        {Object.values(item)[0][0].text}
                                                    </div>
                                                    <div className={styles.itemType}>
                                                        {conversation.urls[index]}
                                                    </div>
                                                </div>
                                                {/* <img
                                            src={Down}
                                            alt='Down'
                                            onClick={() => setActive(item)}
                                        /> */}
                                            </div>
                                            <div className={styles.listItemActiveBody}>
                                                <ChatFragment chatData={Object.values(item)[0]} />
                                            </div>
                                        </div>
                                        : <>
                                            {
                                                Object.values(item)[0].length ?
                                                    <div key={item} className={styles.listItemContainer}>
                                                        <div key={item} className={styles.listItem}>
                                                            <span className={styles.itemSno}>
                                                                {index + 1}
                                                            </span>
                                                            <div className={styles.itemDetail}>
                                                                <div className={styles.itemDate}>
                                                                    {conversation.time[index][2]}/{conversation.time[index][1]}/{conversation.time[index][0]}
                                                                </div>
                                                                <div className={styles.itemTitle}>
                                                                    {Object.values(item)[0][0].text}
                                                                </div>
                                                                <div className={styles.itemType}>
                                                                    {conversation.urls[index]}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <img
                                                            src={Down}
                                                            alt='Down'
                                                            onClick={() => setActive(item)}
                                                            style={{ alignSelf: 'flex-end' }}
                                                        />
                                                    </div> : <></>
                                            }
                                        </>
                                ) : <></>}
                    </div>
                    {/* <div className={styles.conversationFooter}>
                        <Pagination />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;


