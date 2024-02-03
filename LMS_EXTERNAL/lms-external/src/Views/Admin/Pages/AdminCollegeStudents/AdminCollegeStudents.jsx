import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import "./AdminCollegeStudents.css"
import AdminHeaderTabs from "../../../../Components/AdminHeaderTabs/AdminHeaderTabs"
import { cross, deleteIcon, downloadIcon, kpi1, kpi2, kpi3, kpi4 } from "../../Assets/adminIcons"
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import ExcelFile from "../../Assets/Img/ExcelFile.svg"
import { useDropzone } from 'react-dropzone';
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Loader from '../../../../Utils/Loader/Loader'
import StudentTab from '../../Components/StudentTab/StudentTab'
import { decrypt } from '../../../../Utils/encryptDecrypt'
import { adminActions } from '../../Context/AdminAction'
import AdminAddStudents from '../../Components/AdminAddColleges/AdminAddStudents'
import CommunityChat from '../../../../Pages/CommunityChat/CommunityChat'
import ShowPdfModal from '../../../../Components/ShowPdfModal/ShowPdfModal'
import RoleListCollege from '../../Components/RoleListCollege/RoleListCollege'
import { EditIcon } from '../../../../Assets/globalIcons'
import sampleDocument from "../../Assets/Files/Student_Template.xlsx"
const AdminCollegeStudents = () => {
  const tabsList = ["Overview", "Students", "Community", "Roles"];
  const [show, setShow] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0);
  const [showMou, setShowMou] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadFile, setUploadFile] = useState({});
  const { uploadStudentData, setLoading, deleteStudents } = useContext(GlobalContext)
  const { getStudents, dispatch, studentList, loading, getAllColleges, socket, getCommunityChatArr, communityChatArray, selectedTabIndex } = useContext(GlobalContext)
  const { id1, id2 } = useParams()

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
        metricKey: "noOfDomains",
        text: "No. of Domains",
        value: 0,
        imgUrl: kpi2,
        bgColor: "#FFF7FF"
      },
      {
        metricKey: "totalActiveCourses",
        text: "Total Active Courses",
        value: 0,
        imgUrl: kpi3,
        bgColor: "#FFFAED"
      },
      {
        metricKey: "noOfCtMentor",
        text: "No. of CT Mentors",
        value: 0,
        imgUrl: kpi4,
        bgColor: "#F4FFEE"
      },
    ]
    , [])

  const [kpis, setkpis] = useState([])
  const getStudentsApi = async () => {
    setLoading(true)
    try {
      const res = await getStudents(id1);
      dispatch({
        type: adminActions.GET_STUDENT_LIST,
        payload: Array.isArray(res?.data?.students) ? res?.data?.students : [],
      });
      setPdfUrl(res?.data?.MOU_url);
      dispatch({
        type: adminActions.GET_STUDENTS_METRICS,
        payload: res?.data?.matrix,
      });
      const updatedKpis = kpiData?.map((kpi) => {
        const metricKey = kpi.metricKey;
        return {
          ...kpi,
          value: res?.data?.matrix[metricKey] || 0,
        };
      });
      setkpis(updatedKpis);
    } catch (error) {
      toast.dismiss();
      // toast.error(error?.message);
    }
    finally {
      setLoading(false)
    }
  }

  async function getCommunityChatArrApi(roomId) {
    setLoading(true)
    try {
      const res = await getCommunityChatArr(roomId);
      dispatch(
        {
          type: adminActions.COMMUNITY_CHAT,
          payload: res?.data
        }
      )

    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
    finally {
      setLoading(false)
    }
  }

  const deleteStudentsApi = async (id) => {
    const toastId = toast.loading('Deleting Student');
    try {
      await deleteStudents(id);
      toast.dismiss(toastId);
      toast.success("Successfully deleted");
      getStudentsApi();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message);
    }
  }



  useEffect(() => {
    if (selectedTab === 0) {
      // if (studentList.length === 0)
      getStudentsApi();

    }
    else if (selectedTab === 2) {
      // if (communityChatArray.length === 0)
      getCommunityChatArrApi("N_0001");
    }
  }, [selectedTab])


  const { getInputProps, getRootProps, acceptedFiles, isDragActive } = useDropzone({
    // accept: {
    //   'application/octet-stream': ['.csv']
    // },
    accept: {
      'application/vnd.ms-excel': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    minSize: 0,
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadFile(acceptedFiles[0]);
      }
    },
  })


  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0])
      uploadExcel(acceptedFiles[0])
    }
  }, [acceptedFiles]);

  const uploadExcel = async (value) => {
    const res = await uploadStudentDataApi(value)
    getStudentsApi()
  }

  useEffect(() => {
    if (selectedTabIndex)
      setSelectedTab(selectedTabIndex)
  }, [selectedTabIndex])

  async function uploadStudentDataApi(file) {
    const toastId = toast.loading("Please Wait we are uploading Data...")
    try {
      const res = await uploadStudentData(file, decrypt(id2));
      toast.dismiss(toastId);
      toast.success("Successfully uploaded");

    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message);
    }
  }


  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [])

  const handleDocumentClick = (e) => {
    if (document.getElementById("addStudentsOverlay")?.contains(e.target) && !document.getElementById('addStudents')?.contains(e.target)) {
      setShow(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = sampleDocument;
    a.download = 'sample_document.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div className='AdminCollegeStudents'>
      <div style={{
        width: '100%',
        height: "40px",
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingRight: "15px"
      }}>
        <AdminHeaderTabs
          tabsList={tabsList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {pdfUrl && <span style={{
          textDecoration: 'underline',
          fontSize: '14px',
          color: '#654E8A',
          fontWeight: '800',
          cursor: "pointer"
        }}
          onClick={() => setShowMou(true)}
        >MOU</span>}
      </div>

      <ShowPdfModal
        show={showMou}
        setShow={setShowMou}
        pdfName="Memorandum of understanding"
        pdfUrl={pdfUrl}
      />

      {selectedTab === 0 &&
        <div className='adminCollegesStudentDiv'>
          <div className='KpiContainer'>
            {
              (kpis?.length > 0 ? kpis : kpiData)?.map((item, index) => (
                <KpiCard {...item} key={index} />
              ))
            }
          </div>
          <div className='studentListContainer'>
            <div className='studentListHeader'>
              {studentList?.length > 0 && <span>Student List</span>}
              {studentList?.length === 0 && <span>&nbsp;</span>}
              <HeaderButton
                show={show}
                setShow={setShow}
                text={"Add Student"} />
            </div>
            <AdminAddStudents
              show={show}
              setShow={setShow}
              type="Students"
              CollegeId={decrypt(id2)}
              getApi={getStudentsApi}
            />
            <div className='studentList'>
              {
                studentList?.length > 0 ? (
                  <table>
                    <thead>
                      <tr className='headingRow'>
                        <th className='stickyColumnth'>Student Name</th>
                        <th>Email ID</th>
                        <th>Contact No.</th>
                        <th>B.Tech Stream</th>
                        <th>Current Sem</th>
                        <th>Domain</th>
                        <th>Class 10th %</th>
                        <th>Class 12th %</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody className='tbodyAdminTable'>
                      {
                        studentList?.map((item, index) => (
                          <tr className='tableRowadmin' key={index}>
                            <td className='stickyColumn'>{item?.studentName}</td>
                            <td>{item?.EmailId}</td>
                            <td>{item?.contactNo}</td>
                            <td>{item?.btech_stream}</td>
                            <td>{item?.current_sem}</td>
                            <td>{item?.domain}</td>
                            <td>{item?.class10}%</td>
                            <td>{item?.class12}%</td>
                            <td
                              style={{
                                cursor: "pointer",
                                // display: 'flex',
                                gap: "12px",
                                height: "100%",
                                alignItems: 'center',
                                // textAlign:'center'
                              }}
                            >

                              <img
                                style={{
                                  height: "16px",
                                  width: "14px",
                                  marginRight: '10px'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // setRoleId(item?.id)
                                  // setShowDeleteModal(!showDeleteModal)
                                  // setUserType(item?.lp_name)
                                }} src={EditIcon} alt='' />

                              <img onClick={(e) => {
                                e.stopPropagation()
                                deleteStudentsApi(item?.EmailId)
                              }} src={deleteIcon} alt='' />

                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : (
                  <div className='NoStudentdata'>
                    <div  {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img src={ExcelFile} alt='' />
                      {/* {
                      isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    } */}
                    </div>
                    {
                      Object.keys(uploadFile)?.length > 0 ?
                        <div className='uploadFileName'>
                          <span className=''>{uploadFile?.path}</span>
                          <img onClick={() => setUploadFile({})} src={cross} alt='' />
                        </div>
                        :
                        <div
                          style={{
                            display: 'flex',
                            width: '15%',
                            padding: '0px 6px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // gap: '10px',
                            borderRadius: '2px',
                            color: '#424242',
                            fontSize: '13px',
                            outline: 'none',
                            // marginRight:'40px',
                            // border:'1px solid black'
                          }}
                        >
                          <span>
                            Sample Document
                          </span>
                          <div
                            className=""
                            style={{
                              borderRadius: '4px',
                              height: '20px',
                              width: '20px',
                              padding: '4px',
                              backgroundColor: '#654E8A',
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center',
                              cursor: 'pointer',
                              // border:'1px solid black'
                            }}
                            onClick={handleDownload}
                          >
                            <img src={downloadIcon} alt="" />
                          </div>
                        </div>
                    }




                  </div>
                )
              }


            </div>

          </div>
        </div>
      }
      {selectedTab === 1 && kpis.length > 0 && <StudentTab kpis={kpis} />}
      {selectedTab === 2 && <CommunityChat />}
      {selectedTab === 3 &&
        <RoleListCollege
          kpis={kpis}
          kpiData={kpiData}
        />}

    </div>
  )
}

export default AdminCollegeStudents