import React, { useContext, useEffect, useState } from 'react'
import "./LearningPath.css"
import tick from "../../assets/tick.svg"
import lock from "../../assets/lockImg.svg"
import pending from "../../assets/pending.svg"
import { GlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
const LearningPath = () => {
    const { allEnrolledPaths, getEnrolledPath } = useContext(GlobalContext);
    const [selectedPath, setSelectedPath] = useState("");
    // console.log(allEnrolledPaths[selectedPath]?.courseProgressList, "allEnrolledPaths")
    // console.log(Object.values(enrolledPathDetail)[0]?.courseProgressList, "enrolledPathDetail")

    const navigate = useNavigate();

    useEffect(() => {
        getEnrolledPath()
    }, [])

    useEffect(()=>{
        setSelectedPath(Object.keys(allEnrolledPaths)?Object.keys(allEnrolledPaths)[0]:"")
    },[allEnrolledPaths])

    // useEffect(() => {
    //     if (Object.keys(allEnrolledPaths).length > 0) {
    //         if (Object.keys(allEnrolledPaths)?.length > 0) {
    //             setSelectedPath(Object.keys(allEnrolledPaths)[0])
    //             console.log(selectedPath,"selectedPath")
    //             setCoursesArr(allEnrolledPaths[selectedPath]?.courseProgressList)
    //              console.log(selectedPath,"selectedPath")
    //         }
    //     }
    // }, [allEnrolledPaths, selectedPath])


    // useEffect(() => {
    //     if (selectedPath?.length > 0) {
    //         getAEnrolledPathDetail(selectedPath);
    //     }
    // }, [selectedPath])

    const handleClick = (e) => {
        const lpName = e.target.value
        setSelectedPath(lpName);
    }
    return (
        <div className="learningPath">
            <div className='learningPathDiv'>
                <div style={{fontSize:"16px"}}>Learning Path</div>
                <select className='SelectLP'
                    defaultValue={selectedPath}
                    onChange={handleClick}>
                    {/* <option value="" disabled selected>Select Learning path</option> */}
                    {
                        Object.keys(allEnrolledPaths) && Object.keys(allEnrolledPaths)?.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))
                    }

                </select>
                <div className="learningPathBox">
                    {
                        // coursesArr?.length > 0 && coursesArr?.
                        allEnrolledPaths[selectedPath]&&allEnrolledPaths[selectedPath]?.courseProgressList?.map((enrolledPath, index) => (
                            <div key={index} className="learningPathCard" onClick={() => {
                                if (enrolledPath?.progress !== 0) {
                                    navigate(`/mycurrentcourse/${enrolledPath?.name}`)
                                }
                            }
                            }>
                                <div className='learningPathImg' style={{ backgroundColor: enrolledPath?.progress === 1 ? "#F5CF6D" : enrolledPath?.progress === 0 ? "#D9D9D9" : "#68C155" }}>
                                    <img src={enrolledPath?.progress === 100 ? tick : enrolledPath?.progress === 0 ? lock : pending} alt="" />
                                </div>
                                <span className='LearningPathName' style={{color:enrolledPath?.progress === 1 ?"#6063B2":"black"}}>{enrolledPath?.name}</span>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default LearningPath
