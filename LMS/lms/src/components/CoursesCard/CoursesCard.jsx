import React from 'react'
import "./CoursesCard.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CoursesCard = ({courseCardImage,learningPath,coursesno,department,days,imageurl}) => {
    let percentage=60;
  return (
    <div className='courseCard'>
        <img className='courseCardImg' src={imageurl||courseCardImage}/>
        <div className='CourseName'>
            <div className='coursename'>{learningPath}</div>
            <div className='courseDept'>Dept : <span style={{fontWeight:"600"}}> {department}</span></div>
            {/* <CircularProgressbar value={percentage} text={`${percentage}%`} /> */}
        </div>

        <div className='complexity'>
          <div className='begineer'>Duration : <span style={{fontWeight:"600"}}>{days}days</span></div>
          <div className='coursename'>Courses : <span style={{fontWeight:"600"}}>{coursesno}</span></div>
        </div>
    </div>
  )
}
export default CoursesCard