import React, { useContext, useEffect } from 'react'
import "./AlllearningPath.css"
import courseCardImg1 from "../../assets/courseCardImg1.png"
import CoursesCard from '../../components/CoursesCard/CoursesCard'
import { GlobalContext } from '../../context/GlobalContext'
import { Link } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'
const AllLearningPath = () => {
    const { allLearningPath, getAllLearningPath } = useContext(GlobalContext);
    // console.log(allLearningPath)

    useEffect(() => {
        getAllLearningPath()
    }, [])
    if (allLearningPath.length === 0) {
        return (
            <div className="page-loader-div">
                <Bars
                    height="50"
                    width="50"
                    color="#4F52B2"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass="page-loader"
                    visible={true}
                />
            </div>)
    }
    return (
        <div className='learningPathCardDiv'>
            <div className='viewAllDiv'>
                <p style={{fontSize:"18px"}}>All Learning Paths</p>

            </div>
            <div className='AllLearningPathDiv'>
                {
                    allLearningPath?.map((lp, index) => (
                        <Link to={`/courses/${lp.learningPath}`} key={index} >
                            <CoursesCard {...lp} courseCardImage={courseCardImg1} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default AllLearningPath
