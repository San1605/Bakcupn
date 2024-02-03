import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({
    courseCode,
    lpName,
    courseduration,
    currentWeek,
    description,
    isLocked,
    progress,
    totalTopicCovered,
    totalTopics,
}) => {
    const navigate = useNavigate("")
    return (
        <div className='CollegeComponent' onClick={() => {
            navigate(`/learn/${courseCode}`)
        }
        }>
            <div className='collegeLogoDiv'>
                <div className='collegeNameDiv' style={{
                    width: "78%"
                }}>
                    <div>
                        {courseCode}
                    </div>
                    <div>
                        {lpName}
                    </div>
                </div>

                <div className={`courseStatus ${isLocked ? "paused" : "active"}`}>
                    {isLocked ? "Locked" : "Active"}
                </div>
            </div>
            <div className='lowerDiv'>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Progress</span>
                        <span>{progress}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Current Week</span>
                        <span>{currentWeek}</span>
                    </div>
                </div>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Topics Covered</span>
                        <span>{totalTopicCovered}/{totalTopics}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Course Duration</span>
                        <span>{courseduration}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
