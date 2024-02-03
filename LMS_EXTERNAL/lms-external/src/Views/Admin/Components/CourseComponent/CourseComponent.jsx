import React, { useEffect, useState } from 'react'
import "./CourseComponent.css"

const CourseComponent = ({
    lp_name,
    domain,
    totalStudents,
    startDate,
    endDate,
    runningState,
    path_duration,
    showModal,
    setShowModal,
    setStatus,
    setCourseName,
    type
}) => {

    return (
        <div className='CollegeComponent' onClick={() => {
            setStatus(runningState)
            setCourseName(lp_name)
            setShowModal(!showModal)
        }
        }>
            <div className='collegeLogoDiv'>
                <div className='collegeNameDiv' style={{
                    width: "78%"
                }}>
                    <div>
                        {lp_name}
                    </div>
                    <div>
                        {domain}
                    </div>
                </div>
                <div className={`courseStatus ${runningState === "Paused" ? "paused" : "active"}`}>
                    {runningState === "Paused" ? "Paused" : "Active"}
                </div>
            </div>
            <div className='lowerDiv'>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Total Students</span>
                        <span>{totalStudents}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Week</span>
                        <span>{path_duration}</span>
                    </div>
                </div>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Start Date</span>
                        <span>{startDate}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Expected End Date</span>
                        <span>{endDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseComponent
