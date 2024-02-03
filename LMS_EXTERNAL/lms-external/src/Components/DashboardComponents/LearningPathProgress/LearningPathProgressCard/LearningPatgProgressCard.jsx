import React from 'react'
import "./LearningPathProgressCard.css"

const LearningPatgProgressCard = ({
    CourseName,
    LpName,
    startDate,
    endDate,
    completedModules,
    currentWeek,
    runningState
}) => {

    return (
        
        <div className='learningPathProgressCard'>
            <div className='lpCardDiv'>
                <div className='LPNameDiv'>
                    <div>
                        {CourseName}
                    </div>
                    <div>
                        {LpName}
                    </div>
                </div>
                <div className={`courseStatus ${runningState === "Paused" ? "paused" : "active"}`}>
                    {runningState === "Paused" ? "Paused" : "Active"}
                </div>
            </div>
            <div className='LPCardlowerDiv'>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Modules</span>
                        <span>{completedModules}</span>
                    </div> 
                    <div className='totalStudentsDiv'>
                        <span>Current Week</span>
                        <span>{currentWeek}</span>
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

export default LearningPatgProgressCard