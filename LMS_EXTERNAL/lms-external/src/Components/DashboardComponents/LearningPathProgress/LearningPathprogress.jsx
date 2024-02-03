import React from 'react'
import "./LearningPathprogress.css"
import LearningPatgProgressCard from './LearningPathProgressCard/LearningPatgProgressCard'
const LearningPathprogress = ({courseList}) => {
    return (
        <div className="LearningPathProgress">
            <div className='LearningPathProgressHeading'>Learning Path Progress</div>

            <div className='LearningPathProgressDiv'>
                {
                    courseList?.map((item, index) => (<LearningPatgProgressCard
                        key={index}
                        CourseName={item?.coruse_code}
                        LpName={item?.lp_name}
                        startDate={item?.addedOn}
                        endDate="12/12/12"
                        completedModules="21"
                        currentWeek="12"
                        runningState="false"
                    />))}
            </div>
        </div>
    )
}

export default LearningPathprogress
