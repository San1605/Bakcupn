import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Arrow from "../../assets/Arrow.svg"
import "./AllCourses.css"
import { GlobalContext } from '../../context/GlobalContext'
const AllCourses = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { coursesInLearningPath, getCoursesInLearningPath } = useContext(GlobalContext);
    useEffect(() => {
        getCoursesInLearningPath(id);
    }, [])
    // console.log(coursesInLearningPath);
    return (
        <div className='courseList'>
            <div className="lpName">
                <div>
                    <img style={{cursor:"pointer"}} src={Arrow} alt="" onClick={() => navigate("/alllearningpath")} />
                    <span className='courseListName'>Course List</span>
                </div>
                <div className='lpNameInCourseList'>{id}</div>
            </div>

            <div className="coursesBox">
                <table className='courseTable'>
                    <thead>
                        <tr style={{ backgroundColor: "#F9FAFF", borderBottom: '1px solid #E8E8E8' }}>
                            <th >Course Name</th>
                            <th  >Description</th>
                            <th  >Duration</th>
                            <th  >Topics</th>
                            <th  >Complexity</th>
                        </tr>
                    </thead>
                </table>
                <div className='tableDiv'>
                    <table className='courseTable'>
                        <tbody>
                            {
                                coursesInLearningPath?.map((course, index) => (
                                    <tr key={course.CID} style={{ borderBottom: '1px solid #E8E8E8' }} onClick={()=>navigate(`/mycurrentcourse/${course.courseId}`)}>
                                        <td  >{course.courseId}</td>
                                        <td >{course.description}</td>
                                        <td  >{course.days} days</td>
                                        <td  >{course.totalTopics}</td>
                                        <td  >{course.complexity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default AllCourses
