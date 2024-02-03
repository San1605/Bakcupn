import React, { useState } from 'react';
import "./EventDetailModal.css";
import { description, location, startDate, startTime } from '../../Assets/globalIcons';

const EventDetailModal = ({ show, setShow, selectedEvent, eventArray }) => {
    const foundEvent = eventArray.find(event => event.id === selectedEvent);

    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);
        const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
        return formattedDate
    }
    function formatTime(inputDate) {
        const dateObject = new Date(inputDate);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const formattedTime = `${(hours % 12 || 12)}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        return formattedTime
    }
    return (
        <div id='eventDetails' className='eventDetailmodal'>
            <div className='eventDetailsModalTitle'>{foundEvent?.title}</div>
            <div className='eventDetailsModalLocation'>
                <img alt='' src={location} />
                <span>{foundEvent?.location}</span>
            </div>
            <div className='eventDetailsModalTime'>
                <div>
                    <img alt="" src={startDate} />
                    <span>{formatDate(foundEvent?.start)}</span>
                </div>
                <div>
                    <img alt="" src={startTime} />
                    <span>{formatTime(foundEvent?.start)}</span>
                </div>
            </div>
            <div className='eventDetailsModalDescription'>
                <img alt='' src={description} />
                <span>{foundEvent?.description}</span>
            </div>
            <div className='eventDetailModalMeetingLink'>
                <button onClick={() => {
                    setShow(false)
                }}>Cancel</button>
                <button onClick={() => {
                    window.open(foundEvent?.EventLink, "_blank")
                }}>
                    Join
                </button>
            </div>

        </div >
    );
}

export default EventDetailModal;
