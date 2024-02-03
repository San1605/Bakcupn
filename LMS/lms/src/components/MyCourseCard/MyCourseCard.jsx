import React from 'react'
import "./MyCourseCard.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MyCourseCard = ({courseCardImage,courseId,complexity,days,imageurl,completionStatus}) => {
    let percentage=60;
  return (
    <div className='myCourseCard'>
        <img className='myCourseCardImg' src={imageurl||courseCardImage}/>
        <div className='myCourseName'>
            <div className='myCoursename'>{courseId}</div>
            <CircularProgressbar value={completionStatus} text={`${completionStatus}%`} />
        </div>

        <div className='myComplexity'>
          <div className='myBegineer'>Complexity : <span style={{fontWeight:'600'}}>{complexity}</span></div>
          <div className='myCoursename'>Duration :  <span style={{fontWeight:'600'}}>{days} days</span></div>
        </div>
    </div>
  )
}
export default MyCourseCard