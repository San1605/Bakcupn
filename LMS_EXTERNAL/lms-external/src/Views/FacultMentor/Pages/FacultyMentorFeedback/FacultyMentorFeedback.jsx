import React, { useContext, useEffect, useState } from 'react'
import "./FacultyMentorFeedback.css"
import FeedbackComponent from '../../Component/FeedbackComponent/FeedbackComponent'
import FeedbackStudentList from "../../Component/FeedbackStudentList/FeedbackStudentList"
import { GlobalContext } from '../../../../Context/GlobalContext'
import { facultyMentorActions } from '../../Context/FacultyMentorActions'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
const FacultyMentorFeedback = () => {
  const [selectedStudent, setSelectedStudent] = useState({
    email: "",
    name: ""
  })
  const { getDashboardDataFacultyMentor, facultyMentorDashboard, loading, setLoading, dispatch } = useContext(GlobalContext)
  const getDashbaordData = async () => {
    try {
      const res = await getDashboardDataFacultyMentor();
      console.log(res, "res")
      dispatch({
        type: facultyMentorActions.FACULTY_MENTOR_DASHBOARD,
        payload: res?.data,
      });

    }
    catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDashbaordData()
  }, [])


  if (loading) {
    return <Loader />
  }

  return (
    <div className='FacultyMentorFeedback'>
      <div className='FacultyMentorFeedbackDiv'>
        <FeedbackComponent selectedStudent={selectedStudent} />
        <FeedbackStudentList setSelectedStudent={setSelectedStudent} studentList={facultyMentorDashboard?.students?.length > 0 ? facultyMentorDashboard?.students : []} />
      </div>
    </div>
  )
}
export default FacultyMentorFeedback