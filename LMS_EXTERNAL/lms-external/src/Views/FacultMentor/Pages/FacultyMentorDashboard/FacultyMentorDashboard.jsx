import React, { useContext, useEffect, useMemo, useState } from 'react'
import "./FacultyMentorDashboard.css"
import UpcomingEvents from '../../../../Components/DashboardComponents/UpcomingEvents/UpcomingEvents'
import NoticeBoard from '../../../../Components/DashboardComponents/NoticeBoard/NoticeBoard'
import StudentsDetails from '../../../../Components/DashboardComponents/StudentsDetails/StudentsDetails'
import GeneralFiles from '../../../../Components/DashboardComponents/GeneralFiles/GeneralFiles'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import { kpi1, kpi2, kpi3, kpi4 } from '../../../Admin/Assets/adminIcons'
import TopPerformingStudents from '../../../../Components/DashboardComponents/TopPerformingStudents/TopPerformingStudents'
import Loader from '../../../../Utils/Loader/Loader'
import toast from 'react-hot-toast'
import { facultyMentorActions } from '../../Context/FacultyMentorActions'
import { GlobalContext } from '../../../../Context/GlobalContext'
const AdminDashBoard = () => {
  const { getDashboardDataFacultyMentor, facultyMentorDashboard, loading, setLoading, dispatch } = useContext(GlobalContext)
  const [kpis, setKpis] = useState([]);
  console.log(facultyMentorDashboard, "facultyMentorDashboard")
  const kpiData = useMemo(() =>
    [
      {
        metricKey: "noOfStudent",
        text: "No. of Students",
        value: 0,
        imgUrl: kpi1,
        bgColor: "#FFF4EB"
      },
      {
        metricKey: "totalCollege",
        text: "Total Colleges",
        value: 0,
        imgUrl: kpi2,
        bgColor: "#FFF7FF"
      },
      {
        metricKey: "assignmentSubmitted",
        text: "Assignments Submitted",
        value: 0,
        imgUrl: kpi3,
        bgColor: "#FFFAED"
      },
      {
        metricKey: "ActiveUser",
        text: "Active Users",
        value: 0,
        imgUrl: kpi4,
        bgColor: "#F4FFEE"
      },
    ]
    , [])


  const getDashbaordData = async () => {
    try {
      const res = await getDashboardDataFacultyMentor();
      console.log(res, "res")
      dispatch({
        type: facultyMentorActions.FACULTY_MENTOR_DASHBOARD,
        payload: res?.data,
      });
      const updatedKpis = kpiData?.map((kpi) => {
        const metricKey = kpi.metricKey;
        return {
          ...kpi,
          value: res?.data?.matrix[metricKey] || 0,
        };
      });
      setKpis(updatedKpis);
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
    if (Object.keys(facultyMentorDashboard)?.length === 0) {
      getDashbaordData()
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='adminDashboard'>
      <div className='KpiContainer'>
        {
          (kpiData?.length > 0 ? kpiData : kpiData)?.map((item, index) => (
            <KpiCard {...item} key={index} />
          ))
        }
      </div>
      <div className='adminDashboardPage'>
        <div className='adminDashboardLeft'>
          <div className='facultymentorDashboardLeftTop'>
            <TopPerformingStudents type='facultyMentor' />
            <NoticeBoard type='facultyMentor' />
          </div>
          <StudentsDetails studentList={facultyMentorDashboard?.studentList?.length > 0 ? facultyMentorDashboard?.studentList : []} />
        </div>
        <div className='adminDashboardRight'>
          <UpcomingEvents event={Object.keys(facultyMentorDashboard)?.length > 0 && Object.keys(facultyMentorDashboard?.event)?.length > 0 ? facultyMentorDashboard.event : {}} />
          <GeneralFiles />
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard
