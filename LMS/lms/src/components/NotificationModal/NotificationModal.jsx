import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import cross from "../../assets/cross.svg"
import "./NotificationModal.css";
import io from "socket.io-client"
const NotificationModal = (props) => {
    const { socket, NotificationArray ,testApiSocket} = useContext(GlobalContext);
    console.log(socket, "socketModal");
    console.log(NotificationArray, "notificationArrayModal")

    const handleNotification = (id) => {
        socket.emit("read", id)
    }

    const handleCross = () => {
        props.setShowModal(false)
        socket.emit("emptyNotification", "clear all notifications")
    }
    
    return (
        <div className='modalClass'>
            <div className='modalHeader'>
                <span>Notification</span>
                <img className='CrossIcon' src={cross} alt="" onClick={handleCross} />
                <button onClick={()=> testApiSocket("notification","Hiii this is client")}>HIT API</button>
            </div>
            <div className="notification">
                {
                    NotificationArray?.length == 0 ?
                        <div className="NotFound"><span>No Notification Found</span></div>
                        : NotificationArray?.map((notification, index) => (
                            <div key={index} className='notificationBox'>
                                <div className='notificationUpperDiv'>
                                    <div
                                        key={index}
                                        className='notificationContent'>{notification?.message}</div>
                                    <img className='CrossIcon' src={cross} alt=""
                                        onClick={() => handleNotification(notification?.id)}
                                    />
                                </div>
                                <div className='notificationLowerDiv'>
                                    <span className='notificationDate'>{notification?.date}</span>
                                    <span className='notificationTime'>{notification?.time}</span>
                                </div>
                            </div>
                        ))
                }
            </div>

        </div>
    )
}
export default NotificationModal
