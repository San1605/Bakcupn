import React, { useContext, useEffect } from 'react'
import "./ContainerLeft.css"
import courseCardImage1 from "../../assets/courseCardImg1.png"

import { GlobalContext } from '../../context/GlobalContext'
import MyCourseCard from '../MyCourseCard/MyCourseCard'
import { Link } from 'react-router-dom'
const ContainerLeft = () => {
    const { myCourses, getMyCourses } = useContext(GlobalContext)
    useEffect(() => {
        getMyCourses()
    }, [])
    return (
        <div className='containerLeft'>
            <div className="containerLeftImg"></div>
            <div className='ongoingCourse'>
                <div className='viewAllDiv'>
                    <p>Ongoing Courses</p>
                </div>
                <div className="coursesCardDiv">
                    {
                        myCourses?.map((course, index) => (
                            <Link key={index} to={`/mycurrentcourse/${course?.courseId}`}>

                            <MyCourseCard {...course} courseCardImage={courseCardImage1} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ContainerLeft


