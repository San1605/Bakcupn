import React, { useCallback, useContext, useEffect, useState } from 'react'
import AdminHeaderTabs from '../../../../Components/AdminHeaderTabs/AdminHeaderTabs'
import "./MentorLpWeeks.css"
import { lockIcon, lockIconFill } from '../../Assets/mentorIcons';
import Accordion from 'react-bootstrap/Accordion';
import { readingIcon, videoIcon } from '../../../User/Assets/userIcons';
import UnLockModal from '../../Component/UnLockModal/UnLockModal';
import { mentorActions } from '../../Context/MentorActions';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { useParams } from 'react-router-dom';


const MentorLpWeeks = () => {
    const tabsList = ["Learning Path Overview", "General Files"];
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [show, setShow] = useState(false);
    const { setLoading, loading, getCourseDetailMentor, coursesDetailMentor, dispatch } = useContext(GlobalContext)
    const { id1 } = useParams();

    const getCourseDetailApi = useCallback(async (id) => {
        setLoading(true);
        try {
            const res = await getCourseDetailMentor(id);
            const topics = res?.data[0]?.topics;
            let Formattedresponse = [];
            Object.keys(topics)?.forEach((item) => {
                Formattedresponse.push(topics[item]);
            });
            dispatch({
                type: mentorActions.GET_COURSE_DETAIL_MENTOR,
                payload: Formattedresponse,
            });
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch, setLoading, getCourseDetailMentor]);


    useEffect(() => {
        getCourseDetailApi(id1)
    }, [])
    return (
        <div className='AdminLearningPaths'>
            <AdminHeaderTabs
                tabsList={tabsList}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className='AdminLearningPathsDiv'>

                {
                    selectedTab === 0 && <div className='weekListContainer'>
                        <div className='mentorCourseHeader'>UI/UX</div>
                        <div className='weekDiv'>
                            <div className='weekList'>
                                {coursesDetailMentor?.length > 0 && coursesDetailMentor?.map((item, index) => (
                                    <div className={`weekItem ${selectedWeek === index && "selectedWeek"}`} onClick={() => setSelectedWeek(index)}>
                                        <div>Week {index + 1}</div>
                                        {item[0]?.isLocked && <img src={selectedWeek === index ? lockIconFill : lockIcon} alt='' />}
                                    </div>
                                ))}
                            </div>
                            <div className="courseListMentor">
                                <div className='mentorCoursesHeading' onClick={() => setShow(true)}>
                                    <div>Week 01 All topics</div>
                                    {localStorage.getItem("role")==='Mentor' &&  coursesDetailMentor && coursesDetailMentor[selectedWeek]?.length > 0 && coursesDetailMentor[selectedWeek][0]?.isLocked && <div className='unlockButton'>
                                        <span>{"Locked"}</span>
                                        <img src={lockIconFill} alt='' />
                                    </div>}
                                </div>
                                <UnLockModal
                                    show={show}
                                    setShow={setShow}
                                    getApi={getCourseDetailApi}
                                    week={selectedWeek+1}
                                    courseId={id1}
                                />
                                <div className='mentorCourseList'>
                                    <Accordion
                                        defaultActiveKey="0"
                                    >
                                        {
                                            coursesDetailMentor[selectedWeek]?.length > 0 && coursesDetailMentor[selectedWeek]?.map((item, index) => (
                                                <Accordion.Item eventKey={index + ""} key={index}>
                                                    <Accordion.Header className="accordianHeader">{item?.topicName}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            {
                                                                item?.topicData?.length > 0 && item?.topicData?.map((ele, idx) => (
                                                                    <li style={{
                                                                        cursor: "pointer",
                                                                    }} key={idx}>
                                                                        <div className='liDivAccordian'>
                                                                            <img src={ele?.contentType === "Reading" ? readingIcon : videoIcon} alt='' />
                                                                            <span>{ele?.subtopic}</span>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))
                                        }
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    selectedTab === 1 && <div className='weekListContainer'>
                        general files
                    </div>
                }

            </div>
        </div>
    )
}

export default MentorLpWeeks
