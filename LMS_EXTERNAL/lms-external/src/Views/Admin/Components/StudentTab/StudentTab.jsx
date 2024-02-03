import React, { useCallback, useContext, useEffect, useState } from 'react'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { useParams } from 'react-router-dom'
import Loader from '../../../../Utils/Loader/Loader'
import CourseComponent from '../CourseComponent/CourseComponent'
import CourseDetailModal from '../CourseDetailModal/CourseDetailModal'
import { decrypt } from '../../../../Utils/encryptDecrypt'
import toast from 'react-hot-toast'
import { adminActions } from '../../Context/AdminAction'


const StudentTab = ({kpis}) => {
    const [showModal, setShowModal] = useState(false)
    const { studentList, getCoursesDetail, getStudents, courseStatusList, dispatch } = useContext(GlobalContext)
    const { id1, id2 } = useParams()
    const tabsList = ["Attendance", "Courses", "Quizzes & Games"];
    const [selectedTab, setSelectedTab] = useState(0);
    const [courseDetailLoading, setCourseDetailLoading] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [status, setStatus] = useState('');

    async function getStudentsApi() {
        setCourseDetailLoading(true)
        try {
            const res = await getStudents(id1);
            dispatch(
                {
                    type: adminActions.GET_STUDENT_LIST,
                    payload: Array.isArray(res?.data?.students) ? res?.data?.students : []
                }
            )
            dispatch(
                {
                    type: adminActions.GET_STUDENTS_METRICS,
                    payload: res?.data?.matrix
                }
            )

            setCourseDetailLoading(false)

        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
            setCourseDetailLoading(false)
        }
    }

    const getCoursesDetailApi = useCallback(async (id2) => {
        setCourseDetailLoading(true);
        try {
            const res = await getCoursesDetail(id2);
            dispatch({
                type:adminActions.SET_COURSE_DETAIL,
                payload: res?.data?.lp_list,
            });
            setCourseDetailLoading(false);
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
            setCourseDetailLoading(false);
        }
    }, [dispatch, getCoursesDetail]);



    useEffect(() => {
        if (selectedTab === 0) {
            if (studentList?.length === 0)
                getStudentsApi();
        } else if (selectedTab === 1) {
            getCoursesDetailApi(decrypt(id2));
        } else {
            //   getCommunityChatArrApi("N_0001");
        }
    }, [selectedTab, getCoursesDetailApi, id2]);





    if (courseDetailLoading) {
        return <Loader />
    }

    return (
        <div className='adminCollegesStudentDiv'>
            <div className='KpiContainer'>
                {kpis.length > 0 &&
                    kpis.map((item, index) => (
                        <KpiCard {...item} key={index} />
                    ))}
            </div>
            <div className='studentListContainer'>
                <div className='studentListHeader'>
                    <div className='studentTabRightHeader'>
                        <div className='tabs'>
                            {
                                tabsList?.map((item, index) => (
                                    <div key={index} className={`tab ${selectedTab === index && "selectedTabCC"}`} onClick={() => setSelectedTab(index)}>{item}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {
                    selectedTab === 0 && <div className='studentList'>

                        <table>
                            <thead>
                                <tr className='headingRow'>
                                    <th className='stickyColumnth'>Student Name</th>
                                    <th>Email ID</th>
                                    <th>Contact No.</th>
                                    <th>B.Tech Stream</th>
                                    <th>Current Sem</th>
                                    <th>Domain</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>

                            <tbody className='tbodyAdminTable'>
                                {
                                    studentList?.map((item, index) => (
                                        <tr className='tableRowadmin' key={item?.id}>
                                            <td className='stickyColumn'>{item?.studentName}</td>
                                            <td>{item?.EmailId}</td>
                                            <td>{item?.contactNo}</td>
                                            <td>{item?.btech_stream}</td>
                                            <td>{item?.current_sem}</td>
                                            <td>{item?.domain}</td>
                                            <td>{item?.attendence}%</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>




                    </div>
                }
                {
                    selectedTab === 1 && <div className='studentList'>
                        <div className="studentCollegeGrid">
                            {
                                courseStatusList?.map((item, index) =>
                                    <CourseComponent
                                        key={index}
                                        {...item}
                                        setShowModal={setShowModal}
                                        showModal={showModal}
                                        setStatus={setStatus}
                                        setCourseName={setCourseName}

                                    />
                                )
                            }
                        </div>
                        <CourseDetailModal
                            show={showModal}
                            setShow={setShowModal}
                            courseName={courseName}
                            runningStatus={status}
                            collegeId={decrypt(id2)}
                            getCoursesDetailApi={getCoursesDetailApi}

                        />
                    </div>
                }
                {
                    selectedTab === 2 && <div className='studentList'>quzzess</div>
                }

            </div>
        </div>
    )
}

export default StudentTab
