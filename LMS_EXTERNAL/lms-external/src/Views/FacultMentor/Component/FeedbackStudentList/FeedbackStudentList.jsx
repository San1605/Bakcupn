import React, { useContext } from 'react'
import "./FeedbackStudentList.css"
import { GlobalContext } from '../../../../Context/GlobalContext'
import { communityMentor, offline, online } from '../../../../Assets/globalIcons'

const FeedbackStudentList = ({ studentList, setSelectedStudent }) => {
    const { staticdata } = useContext(GlobalContext)

    return (
        <div className="studentListFeedback">
            <div className='studentsListheading'>
                <span>Student’s List</span>
                <select className='select' >
                    <option hidden>Select Domain</option>
                    {
                        staticdata && staticdata?.Domain?.length > 0 && staticdata?.Domain?.map((item, index) => (
                            <option key={index} value={item?.value}>{item?.text}</option>
                        ))
                    }
                </select>
            </div>
            <div className="FeedbackMembersList">
                {
                    studentList?.map((item, index) => (
                        <div key={index} className='MemberCard' onClick={() => {
                            const student = {
                                email: item?.emailId,
                                name: item?.studentName
                            }
                            setSelectedStudent(student)
                        }}>
                            <div className='MemberCardImgDiv'>
                                <img src={communityMentor} alt='' />
                            </div>
                            <div className='MemberCardRight'>
                                <div className='MemberCardRightName'>{item?.studentName}</div>
                                <div className='MemberCardRightStatus'>
                                    <img src={item?.status === "online" ? online : offline} alt='' />
                                    <span>{item?.status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FeedbackStudentList
