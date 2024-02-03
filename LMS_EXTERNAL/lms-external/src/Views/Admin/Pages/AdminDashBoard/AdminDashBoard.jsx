import React, { useContext, useEffect, useMemo, useState } from 'react'
import "./AdminDashBoard.css"
import TopColleges from '../../../../Components/DashboardComponents/TopColleges/TopColleges'
import CollegeInformation from '../../../../Components/DashboardComponents/CollegeInformation/CollegeInformation'
import GeneralFiles from '../../../../Components/DashboardComponents/GeneralFiles/GeneralFiles'
import MostEnrolledCourses from '../../../../Components/DashboardComponents/MostEnrolledCourses/MostEnrolledCourses'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import { kpi1, kpi2, kpi3, kpi4 } from '../../Assets/adminIcons'
import { GlobalContext } from '../../../../Context/GlobalContext'
import Loader from '../../../../Utils/Loader/Loader'
import toast from 'react-hot-toast'
import { adminActions } from '../../Context/AdminAction'
const AdminDashBoard = () => {
  const { getDashBoardDataAdmin, adminDashboard, loading, setLoading, dispatch, collegeList, getAllColleges } = useContext(GlobalContext)
  const [kpis, setKpis] = useState([]);
  console.log(adminDashboard, "adminDashboard")
  console.log(collegeList, "collegeList")
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
      const res = await getDashBoardDataAdmin();
      console.log(res, "res")
      dispatch({
        type: adminActions.ADMIN_DASHBOARD,
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

  const getCollegeData = async () => {
    setLoading(true)
    try {
      const res = await getAllColleges();
      dispatch({
        type: adminActions.GET_COLLEGES,
        payload: res?.data,
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
    if (Object.keys(adminDashboard)?.length === 0) {
      getDashbaordData()
    }
    if (collegeList?.length === 0) {
      getCollegeData()
    }
  }, [])

  const pdfUrl = "https://storageekapoc.blob.core.windows.net/pnb-container/POL-TD-008_EMERGING%20TECHNOLOGY%20POLICY_v2/page_6.pdf"
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
          <TopColleges topColleges={adminDashboard?.topColleges?.length > 0 ? adminDashboard?.topColleges : []} />
          <CollegeInformation collegeList={collegeList?.length > 0 ? collegeList : []} />
        </div>
        <div className='adminDashboardRight'>
          <MostEnrolledCourses mostEnrolledCourses={adminDashboard?.mostEnrollDomain?.length > 0 ? adminDashboard?.mostEnrollDomain : []} />
          <GeneralFiles />
        </div>
      </div>

      {/* <iframe src={`https://328e-14-195-17-218.ngrok-free.app?pdfUrl=${pdfUrl}`} title="PDF Viewer" width={610} height={400} /> */}

    </div>
  )
}

export default AdminDashBoard