import React from 'react'
import "./UserDashBoard.css"
import LearningPathprogress from '../../../../Components/DashboardComponents/LearningPathProgress/LearningPathprogress'
import MentorDetails from '../../../../Components/DashboardComponents/MentorDetails/MentorDetails'
import ProgressReport from '../../../../Components/DashboardComponents/ProgressReport/ProgressReport'
import LearningFiles from '../../../../Components/DashboardComponents/LearningFiles/LearningFiles'
import UpcomingEvents from '../../../../Components/DashboardComponents/UpcomingEvents/UpcomingEvents'
import LeaderBoards from '../../../../Components/DashboardComponents/LeaderBoard/LeaderBoards'
const UserDashBoard = () => {
  return (
    <div className='studentDashboardPage'>
      <div className='studentDashboardLeft'>
        <LearningPathprogress />
        <div className="studentDashboardLeftBottom">
          <MentorDetails />
          <div className='studentDashboardLeftBottomRight'>
            <ProgressReport />
            <LearningFiles />
          </div>
        </div>
      </div>
      <div className='studentDashboardRight'>
        <UpcomingEvents />
        <LeaderBoards />
      </div>
    </div>
  )
}

export default UserDashBoard
