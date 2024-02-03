
import React, { useContext, useEffect, useMemo, useState } from 'react'
import LearningPathprogress from '../../../../Components/DashboardComponents/LearningPathProgress/LearningPathprogress'
import UpcomingEvents from '../../../../Components/DashboardComponents/UpcomingEvents/UpcomingEvents'
import StudentsDetails from '../../../../Components/DashboardComponents/StudentsDetails/StudentsDetails'
import NoticeBoard from '../../../../Components/DashboardComponents/NoticeBoard/NoticeBoard'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import { kpi1, kpi2, kpi3, kpi4 } from '../../../Admin/Assets/adminIcons'
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import { mentorActions } from '../../Context/MentorActions'
import Loader from '../../../../Utils/Loader/Loader'

const MentorDashBoard = () => {
  const { getMentorDashboardData, mentorDashboard, loading, setLoading, dispatch, courseListMentor, getCourseListMentor } = useContext(GlobalContext)
  const [kpis, setKpis] = useState([]);
  console.log(mentorDashboard, "adminDashboard")
  console.log(courseListMentor, "courseListMentor")
  const kpiData = useMemo(() =>
    [
      {
        metricKey: "learningPath",
        text: "Total Learning Path",
        value: 0,
        imgUrl: kpi1,
        bgColor: "#FFF4EB"
      },
      {
        metricKey: "ActiveLearningPath",
        text: "Active Learning Path",
        value: 0,
        imgUrl: kpi2,
        bgColor: "#FFF7FF"
      },
      {
        metricKey: "currentWeek",
        text: "Current Week",
        value: 0,
        imgUrl: kpi3,
        bgColor: "#FFFAED"
      },
      {
        metricKey: "completionRate",
        text: "Completion Rate",
        value: 0,
        imgUrl: kpi4,
        bgColor: "#F4FFEE"
      },
    ]
    , [])


  const getDashbaordData = async () => {
    try {
      const res = await getMentorDashboardData();
      console.log(res, "res")
      dispatch({
        type: mentorActions.CT_MENTOR_DASHBOARD,
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


  const getAllLpsData = async () => {
    setLoading(true)
    try {
      const res = await getCourseListMentor();

      dispatch({
        type: mentorActions.GET_COURSE_LIST,
        payload: res?.data?.courseList
      });

    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Object.keys(mentorDashboard)?.length === 0) {
      getDashbaordData()
    }
    if (courseListMentor?.length === 0) {
      getAllLpsData()
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  console.log(courseListMentor)

  return (
    <div className='adminDashboard'>
      <div className='KpiContainer'>
        {
          (kpis?.length > 0 ? kpis : kpiData)?.map((item, index) => (
            <KpiCard {...item} key={index} />
          ))
        }
      </div>
      <div className='adminDashboardPage'>
        <div className='adminDashboardLeft'>
          <LearningPathprogress courseList={courseListMentor?.length > 0 ? courseListMentor : []} />
          <StudentsDetails studentList={mentorDashboard?.students?.length > 0 ? mentorDashboard?.students : []} />
        </div>
        <div className='adminDashboardRight'>
          <UpcomingEvents role="HrBuddy" event={Object.keys(mentorDashboard)?.length > 0 && Object.keys(mentorDashboard?.event)?.length > 0 ? mentorDashboard.event : {}} />
          <NoticeBoard role="HrBuddy" />
        </div>
      </div>
    </div>
  )
}
export default MentorDashBoard