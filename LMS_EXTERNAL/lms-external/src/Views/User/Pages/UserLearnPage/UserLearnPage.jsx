import "./UserLearnPage.css"
import Accordion from 'react-bootstrap/Accordion';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '../../../../Context/GlobalContext';
import { userActions } from '../../Context/userAction';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Loader from '../../../../Utils/Loader/Loader'
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import Navbar from '../../../../Components/Navbar/Navbar';
import { readingIcon, videoIcon, videoIconNormal, assignment, readingIconNormal, readingIconLocked, videoIconLocked, assignmentLocked, assignmentComplete } from "../../Assets/userIcons"
import LockedContent from "../../Components/UserLearnPageComponents/LockedContent";
import TaskContent from "../../Components/UserLearnPageComponents/TaskContent/TaskContent";
import ReadingContent from "../../Components/UserLearnPageComponents/ReadingContent";
import ReactPlayer from "react-player";

const UserLearnPage = () => {
    const { enrolledCourseInfo, dispatch, markAsComplete, getMyCurrentCourse } = useContext(GlobalContext)
    const [collapseSideBar, setCollapseSideBar] = useState(true);
    const [loading, setLoading] = useState(false)
    const [overlayState, setOverlayState] = useState(false);
    const player = useRef(null);
    const [eventKey, setEventKey] = useState("0");
    const [isComplete, setIsComplete] = useState([]);
    const { id1 } = useParams();

    const [showControls, setShowControls] = useState(false);
    const [description, setDescription] = useState("");
    const [currentElement, setCurrentElement] = useState({});
    const [readingContent, setReadingContent] = useState("");
    const [contentType, setContentType] = useState("");
    const [subtopic, setSubtopic] = useState("");
    const [topicIndex, setTopicIndex] = useState(0);
    const [subtopicIndex, setSubtopicIndex] = useState(0);
    const [taskWeek, SetTaskWeek] = useState(1);
    const [tasksArray, setTaskArray] = useState([]);

    const [videoDuration, setVideoDuration] = useState(0);
    const [prevProgress, setPrevProgress] = useState({ playedSeconds: 0, played: 0 });


    const handleDocumentClick = (e) => {
        if (
            !document.getElementById('sidebar')?.contains(e.target) &&
            !document.getElementById('hamburger-icon')?.contains(e.target)) {
            setTimeout(() => {
                setOverlayState(false);
            }, 300)
            setCollapseSideBar(true)
        }
    };


    const getMyCurrentCourseApi = async (courseId) => {
        setLoading(true);
        try {
            const response = await getMyCurrentCourse(courseId);
            const { topics } = response || {};

            dispatch({
                type: userActions.ENROLLED_COURSE_DATA_INFO,
                payload: response,
            });

            if (topics?.length > 0) {
                const firstTopic = topics[0];
                setCurrentElement(firstTopic?.topicData[0])
                setSubtopic(firstTopic?.topicData[0]?.subtopic || "");
                if (!firstTopic?.isLocked) {
                    setReadingContent(firstTopic?.topicData[0]?.link1 || "");
                    setContentType(firstTopic?.topicData[0]?.contentType || "");
                }

                const arr = topics.map((element) =>
                    element.topicData.map((ele) => ele?.completed)
                );

                // Check if taskTopic is present
                // if (response?.taskTopic && response?.taskTopic[0]?.topicData?.length > 0) {
                //     // const taskTopicArr = response.taskTopic[0].topicData.map((ele) => ele?.completed);
                //     // arr.push(...taskTopicArr); // Add taskTopic completed array to the main array

                //     setIsComplete(arr);
                // }
                // else {
                    setIsComplete([...arr, 1]);
                // }

            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    async function markAsCompleteApi(courseId, subtopicId, index, idx) {
        const toastId = toast.loading("Please wait");
        try {
            const response = await markAsComplete(courseId, subtopicId);

            if (response) {
                const updatedIsComplete = [...isComplete];
                updatedIsComplete[index][idx] = true;
                setIsComplete(updatedIsComplete);
            }
            toast.dismiss(toastId);
            toast.success(response?.data?.message);
        } catch (error) {
            console.log(error)
            toast.dismiss(toastId);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    function handleClickContent(ele, index, idx) {
        const { link1, link2, contentType, subtopic } = ele;
        setReadingContent(link1 || link2);
        setCollapseSideBar(true);
        setContentType(contentType);
        setTopicIndex(index);
        setSubtopicIndex(idx);
        setCurrentElement(ele);
        setSubtopic(subtopic);


    }

    function handleClicktask(index, idx, taskArray, week, topic) {
        console.log(taskArray, "lllllllllllllllllllll")
        // const { link1, link2, contentType, description } = ele;
        // setReadingContent(link1 || link2);
        setCollapseSideBar(true);
        setContentType("task");
        setTopicIndex(index);
        setSubtopicIndex(idx);
        // setCurrentElement(ele);
        setSubtopic(topic);
        // setDescription(description)

        setTaskArray(taskArray)
        SetTaskWeek(week)
    }

    function handleMarkAsComplete() {
        if (!isComplete[topicIndex][subtopicIndex]) {
            markAsCompleteApi(id1, currentElement?.ID, topicIndex, subtopicIndex)
        }
        else {
            toast.dismiss();
            toast.error("It is already Completed")
        }
    }


    useEffect(() => {
        getMyCurrentCourseApi(id1);
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);


    if (loading) {
        return <div style={{ height: "100vh", width: "100vw" }}>
            <Loader />
        </div>
    }

    const handleProgress = (progress) => {
        const progressDiff = {
            playedSeconds: progress.playedSeconds - prevProgress.playedSeconds,
            played: progress.played - prevProgress.played,
        };
        console.log(progress, "progress")
        console.log(progressDiff, "progressDiff")
        // Check if the progress.played is close to 1 and the difference is within a reasonable threshold
        if (progress.played >= 0.01 && progressDiff.played <= 0.0005) {
            // Handle video completion logic here
            // Example: You can mark the video as complete
            // markAsCompleteApi(id1, currentElement?.ID, topicIndex, subtopicIndex);
            console.log("completed")
            setShowControls(true)
        }
        setPrevProgress(progress);
    }
    const handleDuration = (duration) => {
        // Store the video duration
        console.log(duration, "duration")
        setVideoDuration(duration);
    };




    return (
        <div className='userlearnPage'>
            <div className={`opacityDull ${overlayState ? "show" : "hide"}`}>
                <Sidebar
                    type="collapse"
                    setCollapseSideBar={setCollapseSideBar}
                    collapseSideBar={collapseSideBar}
                />
            </div>

            <div className='userLearnPageLayout'>
                <Navbar
                    type="collapse"
                    setCollapseSideBar={setCollapseSideBar}
                    collapseSideBar={collapseSideBar}
                    overlayState={overlayState}
                    setOverlayState={setOverlayState}
                />
                <div className='studentLearn'>
                    <div className="videoplayer">
                        <div className="videoPlayerHeading">
                            <span>{currentElement?.contentType === 'task' ? `Assignment - ${subtopic}` : subtopic}</span>
                            {
                                isComplete?.length > 0 && isComplete[topicIndex][subtopicIndex] ?
                                    <div className="topicCompleted">Completed</div>
                                    :
                                    !currentElement?.isLocked ?
                                        <div
                                            onClick={() => handleMarkAsComplete()}
                                            className="topicNotComplete">Mark as Complete</div>
                                        : null
                            }

                        </div>
                        <div className="videoPlayerContainer">
                            {
                                contentType === 'Video' ?
                                    <ReactPlayer
                                        ref={player}
                                        // onEnded={() => setIscompleted(true)}
                                        // onProgress={(progress) => {
                                        //     setTimer(progress.playedSeconds);
                                        // }}
                                        onProgress={handleProgress}
                                        className="react-player"
                                        // onPause={() => {
                                        //     convert_to_min(timer);
                                        // }}
                                        // playing={isPlaying}
                                        controls
                                        width="100%"
                                        height="100%"
                                        url={readingContent}
                                        onDuration={handleDuration}
                                    // style={{ pointerEvents: "none" }}
                                    />
                                    : contentType === "Reading" ?
                                        <ReadingContent readingContent={readingContent} />
                                        :
                                        contentType === 'task' ?
                                            <TaskContent subtopic={subtopic} tasksArray={tasksArray} />
                                            : <LockedContent />
                            }
                        </div>
                    </div>
                    <div className="studentLearnLeft">
                        <div className='studentLearnLeftNavbar'>
                            Course Content
                        </div>
                        <Accordion
                            //defaultActiveKey={eventKey}
                            activeKey={eventKey}
                            onSelect={(key) => setEventKey(key)}
                        >
                            {
                                isComplete?.length > 0 && enrolledCourseInfo?.topics?.map((item, index) => (
                                    <Accordion.Item
                                        eventKey={index + ""}
                                        key={index}>
                                        <Accordion.Header
                                            className={`  ${item?.isLocked ? "accordionButton" : "accordianHeader"}`}>
                                            Week-{item?.week} - {item?.topicName}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {


                                                    // (item?.topicData?.length > 0 ? item.topicData : [])
                                                    //     .concat(
                                                    //         item?.taskTopic && item?.taskTopic[0]?.topicData?.length > 0
                                                    //             ? item.taskTopic[0].topicData
                                                    //             : []
                                                    //     )

                                                    item?.topicData?.length > 0 && item?.topicData?.map((ele, idx) => (
                                                        <li onClick={() => {
                                                            if (ele?.contentType === 'task') {
                                                                handleClicktask(ele, index, idx, item?.taskTopic[0]?.taskName)
                                                            }
                                                            else {
                                                                handleClickContent(ele, index, idx)
                                                            }
                                                        }} style={{
                                                            cursor: "pointer",
                                                            pointerEvents: item?.isLocked && "none",
                                                            color: item?.isLocked ? "#797A80" : isComplete[index][idx] ? "#654E8A" : "#424242",
                                                            fontSize: item?.isLocked && "13px",
                                                            fontWeight: item?.isLocked && "400",
                                                        }} key={idx}>
                                                            <div className='liDivAccordian'>
                                                                <img src={
                                                                    ele?.contentType === "Reading" ?
                                                                        isComplete[index][idx] ? readingIcon : ele?.isLocked ? readingIconLocked : readingIconNormal
                                                                        :
                                                                        ele?.contentType === "Video" ?
                                                                            isComplete[index][idx] ? videoIcon : ele?.isLocked ? videoIconLocked : videoIconNormal

                                                                            : isComplete[index][idx] ? assignmentComplete : ele?.isLocked ? assignmentLocked : assignment


                                                                } alt='' />
                                                                <span>{ele?.contentType === 'task' ? ele?.description : ele?.subtopic}</span>
                                                                {ele?.link1 && ele?.link2 && ele?.contentType === 'Video' && <a target='_blank' className='learnmore' href={ele?.link2} > Learn more</a>}
                                                            </div>
                                                        </li>
                                                    ))
                                                }

                                                {
                                                    item?.taskTopic && item?.taskTopic?.length > 0 && item?.taskTopic[0]?.topicData?.length > 0 &&
                                                    < li onClick={() => {
                                                        handleClicktask(index, item?.topicData?.length, item?.taskTopic[0]?.topicData, item?.week, item?.taskTopic[0]?.taskName)
                                                    }} style={{
                                                        cursor: "pointer",
                                                        pointerEvents: item?.isLocked && "none",
                                                        color: item?.isLocked ? "#797A80" : isComplete[index][item?.topicData?.length] ? "#654E8A" : "#424242",
                                                        fontSize: item?.isLocked && "13px",
                                                        fontWeight: item?.isLocked && "400",
                                                    }} >
                                                        <div className='liDivAccordian'>
                                                            <img src={
                                                                isComplete[index][item?.topicData?.length] ? assignmentComplete : item?.isLocked ? assignmentLocked : assignment
                                                            } alt='' />
                                                            <span>Assignment - {item?.taskTopic[0]?.taskName}</span>
                                                            {/* {item?.taskTopic?.link1 && ele?.link2 && ele?.contentType === 'Video' && <a target='_blank' className='learnmore' href={ele?.link2} > Learn more</a>} */}
                                                        </div>
                                                    </li>
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
        </div >
    )
}
export default UserLearnPage