import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import "./AdminLPManagement.css"
import AdminHeaderTabs from '../../../../Components/AdminHeaderTabs/AdminHeaderTabs'
import { kpi1, kpi2, kpi3, kpi4, EmptyLearningPath, deleteIcon } from "../../Assets/adminIcons"

import KpiCard from '../../../../Components/KpiCard/KpiCard'
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import SearchBox from '../../../../Components/SearchBox/SearchBox'
import { useNavigate } from 'react-router-dom'
import AddLearningPathModal from '../../Components/AddLearningPathModal/AddLearningPathModal'
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
import { adminActions } from '../../Context/AdminAction'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'

const AdminLPManagement = () => {
  const tabsList = ["Learning Path Overview", "General Files"];
  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredLp, setFilteredLp] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const { getAllLps, dispatch, lpList, loading, setLoading, staticdata } = useContext(GlobalContext)

  const kpiData = useMemo(() => [
    {
      metricKey: "noOfLp",
      text: "No. of Learning Path",
      value: 0,
      imgUrl: kpi1,
      bgColor: "#FFF4EB"
    },
    {
      metricKey: 'activeLp',
      text: "Active Learning Path",
      value: 0,
      imgUrl: kpi2,
      bgColor: "#FFF7FF"
    },
    {
      metricKey: 'lowAttendanceLp',
      text: "Low Attendance LP",
      value: 0,
      imgUrl: kpi3,
      bgColor: "#FFFAED"
    },
    {
      metricKey: 'completionRate',
      text: "Completion Rate",
      value: 0,
      imgUrl: kpi4,
      bgColor: "#F4FFEE"
    },
  ], [])

  const [kpis, setkpis] = useState([])


  const getAllLpsData = useCallback(async (department) => {
    setLoading(true)

    try {
      const res = await getAllLps(department);

      dispatch({
        type: adminActions.GET_ALL_LPS,
        payload: res?.data?.lp_list
      });

      dispatch({
        type: adminActions.GET_ADMIN_METRICS,
        payload: res?.data?.matrix
      });
      const updatedKpis = kpiData.map((kpi) => {
        const metricKey = kpi.metricKey;
        return {
          ...kpi,
          value: res?.data?.matrix[metricKey] || 0,
        };
      });
      setkpis(updatedKpis);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
    finally {
      setLoading(false)
    }
  }, [dispatch, getAllLps, kpiData, setkpis]);

  const handleSearch = (list, input) => {
    return list.filter(item =>
      item?.lp_name.toLowerCase().includes(input?.toLowerCase()) ||
      item?.technology.toLowerCase().includes(input?.toLowerCase())
    );
  };

  // useEffect(() => {
  //   if (departmentOptions.length > 0) {
  //     setDepartment(departmentOptions[0]?.value);
  //   }
  // }, [departmentOptions])


  useEffect(() => {
    const arr = handleSearch(lpList, searchQuery);
    setFilteredLp(arr)
  }, [searchQuery]);



  useEffect(() => {
    setFilteredLp(lpList)
  }, [lpList])



  useEffect(() => {
    if (department?.length > 0)
      getAllLpsData(department);
  }, [department])

  if (loading) {
    return <Loader />
  }

  console.log(staticdata, "staticdata")
  return (
    <div className='AdminLearningPaths'>
      <AdminHeaderTabs
        tabsList={tabsList}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className='AdminLearningPathsDiv'>
        <div className='KpiContainer'>
          {
            (kpis?.length > 0 ? kpis : kpiData)?.map((item, index) => (
              <KpiCard {...item} key={index} />
            ))
          }
        </div>
        <div className='lpListContainer'>
          <div className='lpListHeader'>
            <div className="lpListHeaderLeftFirst">
              <span>Total Learning Path |</span>
              <span>{lpList?.length}</span>
            </div>
            <div className='lpListHeaderRight'>
              {/* <img src={filter} alt='' /> */}
              <HeaderButton
                show={show}
                setShow={setShow}
                text={"Add Learning Path"} />
            </div>
          </div>
          <AddLearningPathModal
            show={show}
            setShow={setShow}
            getAllLpsData={getAllLpsData}
          />
          <div className='lpListHeader'>
            {
              lpList?.length > 0 &&
              <div className='lpListHeaderLeft'>
                <SearchBox
                  placeholder={"Search By LP or Technology"}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <select className='select' value={department} onChange={(e) => setDepartment(e.target.value)}>
                  {
                    staticdata && staticdata?.Domain?.length > 0 && [{ text: "Learning Path", value: "all" }, ...staticdata?.Domain]?.map((item, index) => (
                      <option key={index} value={item?.value}>{item?.text}</option>
                    ))
                  }
                </select>
              </div>
            }
            <div className='lpListHeaderRight'>
              {/* <Pagination /> */}
            </div>
          </div>

          {selectedTab === 0 && <div className='lpList'>
            {
              filteredLp?.length > 0 ? (
                <table>
                  <thead>
                    <tr className='headingRow'>
                      <th>Learning Path</th>
                      <th>Technology</th>
                      <th>Path Duration</th>
                      <th>No. of Courses</th>
                      <th>Last Modified by</th>
                      <th>Last Modified on</th>
                      <th>Added By</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>

                  <tbody className='tbodyAdminTable'>
                    {
                      filteredLp?.map((item, index) => (
                        <tr style={{
                          cursor: "pointer"
                        }} className='tableRowadmin' key={index} onClick={() => navigate(`/lpmanagement/${item?.lp_name}`)}>
                          <td >{item?.lp_name}</td>
                          <td>{item?.technology}</td>
                          <td>{item?.path_duration || 0} weeks</td>
                          <td>{item?.course_number}</td>
                          <td>{item?.fullName}</td>
                          <td>{item?.last_modified_on}</td>
                          <td>{item?.added_by}</td>
                          {/* <td
                            style={{
                              cursor: "pointer",
                              display: 'flex',
                              gap: "12px"
                              // textAlign:'center'
                            }}
                          >
                            <img onClick={(e) => {
                              e.stopPropagation()
                              // setRoleId(item?.id)
                              setShowDeleteModal(!showDeleteModal)
                              setUserType(item?.lp_name)
                            }} src={deleteIcon} alt='' />

                          </td> */}
                        </tr>
                      ))
                    }
                  </tbody>
                  <DeleteModal
                    show={showDeleteModal}
                    setShow={setShowDeleteModal}
                    userType={userType}
                    api={getAllLps}
                  />
                </table>
              ) : (
                <div className='NoLPdata'>
                  <img src={EmptyLearningPath} alt='' />
                </div>
              )
            }


          </div>}
          {selectedTab === 1 && <div className='lpList'>
            community chat
          </div>}
        </div>
      </div>
    </div>
  )
}

export default AdminLPManagement