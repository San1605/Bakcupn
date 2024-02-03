import React, { useContext, useEffect, useMemo, useState } from 'react'
import GeneralFiles from '../../../../Components/DashboardComponents/GeneralFiles/GeneralFiles'
import StudentsDetails from '../../../../Components/DashboardComponents/StudentsDetails/StudentsDetails'
import NoticeBoard from '../../../../Components/DashboardComponents/NoticeBoard/NoticeBoard'
import { kpi1, kpi2, kpi3, kpi4 } from '../../Assets/adminIcons'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import TopColleges from '../../../../Components/DashboardComponents/TopColleges/TopColleges'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { adminActions } from '../../Context/AdminAction'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
import ProgressReport from '../../../../Components/DashboardComponents/ProgressReport/ProgressReport'

const HrBuddyDashBoard = () => {

  const { getDashBoardDataHRBuddy, hrBuddyDashboard, loading, setLoading, dispatch } = useContext(GlobalContext)
  const [kpis, setKpis] = useState([]);
  console.log(hrBuddyDashboard?.progressReport, "hrBuddyDashboard")
  const kpiData = useMemo(() =>
    [
      {
        metricKey: "totalColleges",
        text: "Total Colleges",
        value: 0,
        imgUrl: kpi1,
        bgColor: "#FFF4EB"
      },
      {
        metricKey: "totalLp",
        text: "Total Learning Path",
        value: 0,
        imgUrl: kpi2,
        bgColor: "#FFF7FF"
      },
      {
        metricKey: "totalStudents",
        text: "Total Students",
        value: 0,
        imgUrl: kpi3,
        bgColor: "#FFFAED"
      },
      {
        metricKey: "dailyActiveUser",
        text: "Daily Active Users",
        value: 0,
        imgUrl: kpi4,
        bgColor: "#F4FFEE"
      },
    ]
    , [])


  const getDashbaordData = async () => {
    try {
      const res = await getDashBoardDataHRBuddy();
      console.log(res, "res")
      dispatch({
        type: adminActions.HR_BUDDY_DASHBOARD,
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
    if (Object.keys(hrBuddyDashboard)?.length === 0) {
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
          (kpis?.length > 0 ? kpis : kpiData)?.map((item, index) => (
            <KpiCard {...item} key={index} />
          ))
        }
      </div>
      <div className='adminDashboardPage'>
        <div className='adminDashboardLeft'>
          <ProgressReport role="hrBuddy" progressReport={ Object.keys(hrBuddyDashboard)?.length > 0 && Object.keys(hrBuddyDashboard?.progressReport)?.length > 0 ? hrBuddyDashboard?.progressReport: {}} />
          <StudentsDetails studentList={hrBuddyDashboard?.students?.length > 0 ? hrBuddyDashboard?.students : []} />
        </div>
        <div className='adminDashboardRight'>
          <GeneralFiles role="HrBuddy" />
          <NoticeBoard role="HrBuddy" />
        </div>
      </div>
    </div>
  )
}

export default HrBuddyDashBoard
