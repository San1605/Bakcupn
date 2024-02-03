import React from 'react'
import "./NoticeBoard.css"
import { noticeboard } from '../../../Assets/globalIcons';
const NoticeBoard = ({ type }) => {
  const noticeArray = [
    {
      noticeTopic: "Important Meeting",
      date: "2024-05-01",
      time: "10:00 AM",
      description: "There will be an important meeting on the specified date and time. All are requested tod."
    },
    {
      noticeTopic: "Upcoming Event",
      date: "2024-05-05",
      time: "02:00 PM",
      description: "Don't miss the upcoming event happening on the specified date. Join us for a fun-filled day."
    },
    {
      noticeTopic: "Maintenance Schedule",
      date: "2024-05-10",
      time: "08:00 AM",
      description: "Please be informed that there will be scheduled maintenance on the specified date and time. Plan accordingly."
    },
    {
      noticeTopic: "Seminar Announcement",
      date: "2024-05-15",
      time: "03:30 PM",
      description: "A seminar on a relevant topic will be conducted. Mark your calendars and join us for an insightful session."
    },
    {
      noticeTopic: "Holiday Notice",
      date: "2024-05-20",
      time: "All Day",
      description: "The institution will remain closed on the specified date due to a public holiday. Enjoy your day off!"
    },
    {
      noticeTopic: "Exam Schedule",
      date: "2024-05-25",
      time: "09:00 AM",
      description: "The exam schedule for the upcoming month is now available. Check the details and prepare accordingly."
    },
    {
      noticeTopic: "Library Closure",
      date: "2024-05-28",
      time: "12:00 PM",
      description: "The library will be closed for maintenance. Kindly return any borrowed books before the closure date."
    },
    {
      noticeTopic: "Sports Day",
      date: "2024-06-01",
      time: "01:00 PM",
      description: "Get ready for the annual sports day event. Join us for a day full of sports and activities."
    },
    {
      noticeTopic: "Guest Lecture",
      date: "2024-06-05",
      time: "11:30 AM",
      description: "A renowned speaker will deliver a guest lecture on an interesting topic. Don't miss this opportunity."
    },
    {
      noticeTopic: "Graduation Ceremony",
      date: "2024-06-10",
      time: "05:00 PM",
      description: "The graduation ceremony for the current batch will take place on the specified date. Congratulations to all graduates!"
    }
  ];

  return (
    <div className='NoticeBoard' style={{
      height: type === 'facultyMentor' && "100%",
      width:type==='facultyMentor' && "50%"
    }}>
      <div className="NoticeBoardHeading">
        <span>Notice Board</span>
        <img src={noticeboard} alt='' />
      </div>
      <div className="noticeBoardDiv">
        {
          noticeArray?.map((item, index) => (
            <div className='NoticeBoardBox' key={index}>
              <div className='NoticeBoardTopic'>{item?.noticeTopic}</div>
              <div className='NoticeBoardDate'>{item?.date} | {item?.time}</div>
              <div className='NoticeBoardDescription'>{item?.description}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default NoticeBoard
