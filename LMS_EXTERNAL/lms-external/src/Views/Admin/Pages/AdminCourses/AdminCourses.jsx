import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./AdminCourses.css"
import AdminHeaderTabs from "../../../../Components/AdminHeaderTabs/AdminHeaderTabs"
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import EmptyLearningPath from "../../Assets/Img/EmptyLearningPath.svg"
import SearchBox from '../../../../Components/SearchBox/SearchBox'
import { useNavigate, useParams } from 'react-router-dom'
import backIcon from "../../../../Assets/icons/backIcon.svg"
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
import AdminAddCoursesModal from '../../Components/AdminAddCoursesModal/AdminCoursesModal'
import { adminActions } from '../../Context/AdminAction'
import { deleteIcon } from '../../Assets/adminIcons'
const AdminCourses = () => {
    const { getCourseList, dispatch, courseList, loading, setLoading, deleteCourse } = useContext(GlobalContext)
    const [show, setShow] = useState(false)
    const tabsList = ["Learning Path Overview", "General Files"];
    const [selectedTab, setSelectedTab] = useState(0);
    const [filteredCourse, setFilteredCourse] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { id1 } = useParams();
    const navigate = useNavigate()


    const getCourseListApi = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getCourseList(id1);
            dispatch(
                {
                    type: adminActions.GET_COURSES,
                    payload: res?.data?.courseList
                }
            )
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }, [dispatch, getCourseList, id1,])


    const handleSearch = (list, input) => {
        return list?.filter(item =>
            item?.coruse_code.toLowerCase().includes(input?.toLowerCase())
        );
    };

    useEffect(() => {
        const arr = handleSearch(courseList, searchQuery);
        setFilteredCourse(arr)
    }, [searchQuery]);



    useEffect(() => {
        setFilteredCourse(courseList)
    }, [courseList])

    useEffect(() => {
        getCourseListApi();
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [])


    const handleDocumentClick = (e) => {
        if (!document.getElementById('addCourses')?.contains(e.target)
            && document.getElementById('addCoursesOverlay')?.contains(e.target)
        ) {
            setShow(false);
        }
    };


    async function deleteCourseApi(courseName) {
        const toastId = toast.loading("Please Wait")
        try {
            const res = await deleteCourse(courseName);
            toast.dismiss(toastId);
            toast.success("Course Deleted Successfully");
            getCourseListApi();
        }
        catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }


    if (loading) {
        return <Loader />
    }
    return (
        <div className='AdminLearningPaths'>
            <AdminHeaderTabs
                tabsList={tabsList}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className='AdminLearningPathsDiv'>

                <div className='courseListContainer'>
                    <div className='lpListHeader'>
                        <div className="courseListHeaderLeftFirst">
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>Learning Path Management</span>
                            <span>&gt;</span>
                            <span>{id1}</span>
                        </div>
                    </div>
                    <div className='lpListHeader'>
                        <div className='courseListSecondHeaderLeft'>
                            <img src={backIcon} alt='' onClick={() => navigate(-1)} style={{ marginRight: "1rem", cursor: "pointer" }} />
                            <span>{id1} |</span>
                            <span> {filteredCourse?.length} Courses</span>
                        </div>
                        <div className='lpListHeaderRight'>
                            {courseList?.length > 0 && <SearchBox
                                placeholder={"Search By Course Name"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />}
                            {/* <img src={filter} alt='' /> */}
                            <HeaderButton
                                show={show}
                                setShow={setShow}
                                text="Add Course" />

                        </div>
                    </div>
                    <AdminAddCoursesModal
                        show={show}
                        setShow={setShow}
                        getApi={getCourseListApi}
                        lpId={id1}
                    />
                    {selectedTab === 0 && <div className='CourseList'>
                        {
                            filteredCourse?.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr className='headingRow'>
                                            <th>Serial No.</th>
                                            <th>Course Name</th>
                                            <th>Description</th>
                                            <th>Total Topic</th>
                                            <th>Duration</th>
                                            <th>Added on</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className='tbodyAdminTable'>
                                        
                                        {
                                            filteredCourse?.map((item, index) => (
                                                <tr style={{cursor:"pointer"}} className='tableRowadmin' key={item?.id} onClick={()=> navigate(`/courses/${item?.coruse_code}`)}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.coruse_code}</td>
                                                    <td style={{
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        whiteSpace: 'nowrap',
                                                        maxWidth: '200px',
                                                    }} >{item?.Description || "description"}</td>
                                                    <td>{item?.totalTopic}</td>
                                                    <td>{item?.course_duration_week} week</td>
                                                    <td>{item?.addedOn}</td>
                                                    <td
                                                        style={{
                                                            cursor: "pointer",
                                                            paddingLeft: '20px'
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteCourseApi(item?.coruse_code)
                                                        }} ><img src={deleteIcon} alt='' /></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
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

export default AdminCourses