import React from 'react'
import "./UpcomingEvents.css"
import { upcomingEvents } from '../../../Assets/globalIcons'
const UpcomingEvents = ({ event }) => {

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
        <div className="upcomingEvents">
            <div className='upcomingEventsHeading'>Upcoming Events</div>
            <div className='upcomingEventsDiv'>

                <div className='upComingEventImage'
                    style={{
                        backgroundImage: `url(${upcomingEvents})`,
                        backgroundSize: "cover",
                    }}
                >
                </div>

                <div className='UpcomingEventUpper'>
                    <div>{event?.title}</div>
                    {/* <div>Online</div> */}
                </div>

                <div className='UpcomingEventLower'>
                    <div>
                        <span>Date: {formatDate(event?.start)}</span>
                        <span>Time: {formatTime(event?.start)}</span>
                    </div>
                    <div className='join-now-button' onClick={() => {
                        window.open(event?.EventLink, "_blank")
                    }}>
                        <button>Join now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingEvents