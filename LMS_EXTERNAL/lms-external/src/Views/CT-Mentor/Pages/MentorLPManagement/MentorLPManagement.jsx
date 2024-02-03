import React, { useContext, useEffect, useMemo, useState } from 'react'
import "./MentorLPManagement.css"
import AdminHeaderTabs from '../../../../Components/AdminHeaderTabs/AdminHeaderTabs'
import { kpi1, kpi2, kpi3, kpi4, EmptyLearningPath } from "../../../Admin/Assets/adminIcons"
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import SearchBox from '../../../../Components/SearchBox/SearchBox'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
import { mentorActions } from '../../Context/MentorActions'
import { statusLock, statusUnLock } from '../../Assets/mentorIcons'


const MentorLPManagement = () => {
    const tabsList = ["Learning Path Overview", "General Files"];
    const [selectedTab, setSelectedTab] = useState(0);
    const [filteredLp, setFilteredLp] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [kpis, setkpis] = useState([])
    const navigate = useNavigate();

    const { dispatch, courseListMentor, getCourseListMentor, loading, setLoading } = useContext(GlobalContext)

    const kpiData = useMemo(() => [
        {
            metricKey: "LearningPathNo",
            text: "No. of Learning Path",
            value: 0,
            imgUrl: kpi1,
            bgColor: "#FFF4EB"
        },
        {
            metricKey: 'activateLearningPath',
            text: "Active Learning Path",
            value: 0,
            imgUrl: kpi2,
            bgColor: "#FFF7FF"
        },
        {
            metricKey: 'currentWeek',
            text: "Current Week",
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

    const getAllLpsData = async () => {
        setLoading(true)
        try {
            const res = await getCourseListMentor();

            dispatch({
                type: mentorActions.GET_COURSE_LIST,
                payload: res?.data?.courseList
            });
            dispatch({
                type: mentorActions.GET_MENTOR_METRICS,
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
    }

    const handleSearch = (list, input) => {
        return list?.filter(item =>
            item?.coruse_code?.toLowerCase().includes(input?.toLowerCase()) ||
            item?.technology?.toLowerCase().includes(input?.toLowerCase())
        );
    };

    useEffect(() => {
        const arr = handleSearch(courseListMentor, searchQuery);
        setFilteredLp(arr)
    }, [searchQuery]);

    useEffect(() => {
        setFilteredLp(courseListMentor)
    }, [courseListMentor])

    useEffect(() => {
        getAllLpsData();
    }, [])
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
                            <span>{courseListMentor?.length}</span>
                        </div>
                    </div>
                    <div className='lpListHeader'>
                        {courseListMentor?.length > 0 && <div className='lpListHeaderLeft'>
                            <SearchBox
                                placeholder={"Search By LP or Technology"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>}
                    </div>
                    {selectedTab === 0 && <div className='lpList'>
                        {
                            filteredLp?.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr className='headingRow'>
                                            <th>Serial No.</th>
                                            <th>Learning Path</th>
                                            <th>Technology</th>
                                            <th>Path Duration</th>
                                            <th>No. of Topics</th>
                                            <th>Added By</th>
                                            <th>Status on</th>
                                        </tr>
                                    </thead>

                                    <tbody className='tbodyAdminTable'>
                                        {
                                            filteredLp?.map((item, index) => (
                                                <tr style={{
                                                    cursor: "pointer"
                                                }} className='tableRowadmin' key={index} onClick={() => navigate(`/courses/${item?.coruse_code}`)}>
                                                    <td >{index + 1}</td>
                                                    <td >{item?.coruse_code}</td>
                                                    <td>{item?.technology}</td>
                                                    <td>{item?.course_duration_week} weeks</td>
                                                    <td>{item?.totalTopic}</td>
                                                    <td>{item?.last_modified_on}</td>
                                                    <td><img src={item?.isLocked ? statusLock : statusUnLock} alt='' /></td>
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
                        general files
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default MentorLPManagement