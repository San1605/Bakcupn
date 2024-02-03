import { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
import axios from "axios";

const BASE_API_URL = "https://apifornewlms.azurewebsites.net";
// const BASE_API_URL = "https://7cba-103-137-84-126.ngrok-free.app";
const initialState = {
    userToken: "ya29.a0AfB_byBEnKU8AMwQOxWzsUoeXXhlDQ3GVVL1EeaMMNZLCzDQVvEIivF74Q8wnv1H31a98SNK2wqbeOSLXvrEdlh8h2d0v96uMn66a9QDYAKAD_JXCfI022gaFUEl9Av-DeYSeXiQ0sQxebiwtSOimWq3vSJaPhd-ATaIh2gaCgYKAQUSARISFQHsvYlsUCD9ED7X8j--_i53_Vn_Kg0174",
    allLearningPath: [],
    coursesInLearningPath: [],
    allEnrolledPaths: [],
    generalFiles: [],
    linkforenrolledvideo: "",
    enrolledCourseInfo: {},
    myCourses: [],
    playpause: "",
    notesforenrolled: [],
    NotificationArray: [],
    notes: {
        courseId: "",
        topic: "",
        subtopic: "",
        Notes: "",
        timeFrame: "",
        topicID: "",
        subtopicID: "",
    },
    socket: {},
    EnrolledCourse: {},
    messages: {},
    messageArr: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // useEffect(() => {
    //     if (!Object.keys(state.socket).length > 0) {
    //         console.log(state.socket, "if condition")
    //         dispatch({
    //             type: "SOCKET_CONNECTION",
    //             payload: io('https://1c7a-103-137-84-126.ngrok-free.app'
    //                 , {
    //                     transports: ["websocket", "polling", "flashsocket"],
    //                     cors: {
    //                         origin: 'http://localhost:3003',
    //                         methods: ['GET', 'POST'],
    //                     },
    //                 }

    //             )
    //         })
    //         // dispatch({
    //         //     type: "SOCKET_CONNECTION",
    //         //     payload: io('https://bc57-103-137-84-126.ngrok-free.app')
    //         // })
    //     }
    //     else {
    //         console.log(state.socket, "else condition");
    //         state.socket.on("connection", (message) => {
    //             console.log(state.socket, message, "socket.id", state.socket.id);
    //         });
    //         state.socket.emit("clientMessage", "hello this is a client")

    //         // state.socket.on("notification", (arr) => {
    //         //     dispatch({
    //         //         type: "NOTIFICATION_ARRAY",
    //         //         payload: arr
    //         //     })
    //         // })

    //         state.socket.on(("Connection Established"), (id) => {
    //             console.log(id)
    //         })

    //         state.socket.on(("send"), (data) => {
    //             console.log(data, "inside sccket")
    //             dispatch({
    //                 type: "MESSAGE_ARR",
    //                 payload: data
    //             })

    //         })

    //     }
    // }, [state.socket])

    const cheaders = {
        headers: {
            Authorization: `Bearer ${state.userToken}`,
            "ngrok-skip-browser-warning": "69420",
        },
    };
    async function testApiSocket(point, message) {

        const response = await fetch(
            `https://7cba-103-137-84-126.ngrok-free.app/testSocket?point=${point}&message=${message}`,
            {
                headers: {
                    Authorization: `Bearer ${state.userToken}`,
                    "ngrok-skip-browser-warning": "69420",
                },
                method: "GET",
            }
        );
        let data = await response.json();
        console.log(data)
    }

    async function getAllLearningPath() {
        const response = await fetch(`${BASE_API_URL}/api/learningPath/getAllLps`,
            cheaders)
        const paths = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "ALL_LEARNING_PATH",
                payload: paths?.data
            })
        }
    }
    const navigate = useNavigate();

    async function getCoursesInLearningPath(lpName) {
        const response = await fetch(`${BASE_API_URL}/api/learningPath/getALpDetail?lp=${lpName}`,
            cheaders)
        const paths = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "COURSES_IN_LEARNING_PATH",
                payload: paths?.data?.courses
            })
        }
    }

    async function getEnrolledPath() {
        const response = await fetch(`${BASE_API_URL}/api/learningPath/listLearningPath`, cheaders);
        const paths = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "ALL_ENROLLED_PATHS",
                payload: paths?.data
            })
        }
    }
    async function getGeneralFiles() {
        const response = await fetch(`${BASE_API_URL}/api/samplers/download`, cheaders);
        const paths = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "GENERAL_FILES",
                payload: paths?.data
            })
        }
    }
    async function getMyCourses(lpName) {
        const response = await fetch(`${BASE_API_URL}/api/courses/myCourses`, cheaders);
        const paths = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "MY_COURSES",
                payload: paths?.data?.ongoing
            })
        }
    }

    // video player

    const saveasubtopicID = (subtopicID) => {
        dispatch({
            type: "NOTE_SUBTOPIC_ID",
            payload: `${subtopicID}`,
        });
    };

    const getvideoafterclick = (linkforvideo) => {
        dispatch({
            type: "ENROLL_VIDEO_LINK",
            payload: linkforvideo,
        });
    };

    async function posttimeofstartingcourse(coursedata) {
        const sendingtime = {
            courseId: `${coursedata}`,
        };
        const response = await fetch(
            `${BASE_API_URL}/api/courses/currentprogress`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "POST",
                body: JSON.stringify(sendingtime),
            }
        );
        let message = await response.json();
        if (response.status === 200) {
            getmycurrentcourse(coursedata);
        }
    }

    async function getmycurrentcourse(IdofCourse) {
        dispatch({
            type: "LOADING_TRUE",
        });
        const response = await fetch(
            `${BASE_API_URL}/api/courses/getACourseDetailEnrolled?courseId=${IdofCourse}`,
            cheaders
        );
        let enrolledcourse = await response.json();
        if (response.status === 200) {
            if (enrolledcourse.data[0]) {
                startofcoursefromlasttime(IdofCourse, enrolledcourse.data[0]);
            }
        }
        dispatch({
            type: "LOADING_FALSE",
        });
    }

    async function getMyCurrentCourse(IdofCourse) {
        const response = await fetch(
            `${BASE_API_URL}/api/courses/getACourseDetailEnrolled?courseId=${IdofCourse}`,
            cheaders
        );
        const enrolledCourse = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "ENROLLED_COURSE",
                payload: enrolledCourse?.data
            })
        }
    }

    async function startofcoursefromlasttime(courseiD, enrolled) {
        const response = await fetch(
            `${BASE_API_URL}/api/courses/getLastSubtopicTime?courseCode=${courseiD}`,
            cheaders
        );
        let startdetails = await response.json();
        saveacourseid(enrolled.courseId);
        saveasubtopicID(startdetails.data.subTopicId);
        saveatopicID(startdetails.data.topicId);
        dispatch({
            type: "ENROLLED_COURSE_DATA_INFO",
            payload: { ...enrolled, startData: startdetails.data },
        });
    }

    const saveatopic = (heading) => {
        dispatch({
            type: "NOTE_TOPIC",
            payload: `${heading}`,
        });
    };
    const saveatopicID = (headingID) => {
        dispatch({
            type: "NOTE_TOPIC_ID",
            payload: `${headingID}`,
        });
    };

    const saveasubtopic = (subtopic) => {
        dispatch({
            type: "NOTE_SUBTOPIC",
            payload: `${subtopic}`,
        });
    };

    const saveacourseid = (courseid) => {
        dispatch({
            type: "NOTE_COURSEID",
            payload: `${courseid}`,
        });
    };

    const saveasubtopicIDinenrolled = (enrolledsubtopicid) => {
        let shortenroll = state.enrolledCourseInfo;
        shortenroll.startData.subTopicId = `${enrolledsubtopicid}`;
        dispatch({
            type: "UPDATE_ENROLLED",
            payload: shortenroll,
        });
    };

    const saveatopicIDinenrolled = (enrolledtopicid) => {
        let shortenroll = state.enrolledCourseInfo;
        shortenroll.startData.topicId = `${enrolledtopicid}`;
        dispatch({
            type: "UPDATE_ENROLLED",
            payload: shortenroll,
        });
    };

    async function getlatestprogress(coursename) {
        const response = await fetch(
            `${BASE_API_URL}/api/courses/courseProgress?courseId=${coursename}&approvalStatus=1`,
            cheaders
        );
        const resofprog = await response.json();
        if (response.status == 200) {
            dispatch({
                type: "ENROLLED_COURSE_DATA_INFO",
                payload: {
                    ...state.enrolledCourseInfo,
                    completionStatus: resofprog.data.completionStatus,
                },
            });
        }
    }

    async function putupdateofcurrentcourse(course_ID) {
        const updateoftime = {
            topic: `${state.notes.topic}`,
            topicId: `${state.enrolledCourseInfo.startData.topicId}`,
            subTopic: `${state.notes.subtopic}`,
            subTopicId: `${state.enrolledCourseInfo.startData.subTopicId}`,
        };

        const response = await fetch(
            `${BASE_API_URL}/api/courses/updateSubtopicTime?courseCode=${course_ID}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "PUT",
                body: JSON.stringify(updateoftime),
            }
        );
        const resofupdation = await response.json();
        if (response.status == 200) {
            getlatestprogress(course_ID);

        }
    }

    async function getNotes(found) {
        dispatch({
            type: "LOADING_TRUE",
        });
        const response = await fetch(
            `${BASE_API_URL}/api/notes/getNotes?courseId=${state.notes.courseId
            }&topic=${found
                ? state.enrolledCourseInfo.startData.topicIdLatest
                : state.notes.topicID
            }&subTopic=${found
                ? state.enrolledCourseInfo.startData.subTopicIdLatest
                : state.notes.subtopicID
            }`,
            cheaders
        );
        let note = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "NOTES_FOR_ENROLLED",
                payload: note.data,
            });
        }
        dispatch({
            type: "LOADING_FALSE",
        });
    }

    async function addNotes() {
        const toastId = toast.loading("Please wait...");
        const writtingnote = {
            courseId: `${state.notes.courseId}`,
            topic: `${state.notes.topicID}`,
            subtopic: `${state.notes.subtopicID}`,
            Notes: `${state.notes.Notes}`,
            timeFrame: `${state.notes.timeFrame}`,
        };
        const response = await fetch(
            `${BASE_API_URL}/api/notes/addNotes`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "POST",
                body: JSON.stringify(writtingnote),
            }
        );
        let addnote = await response.json();
        toast.dismiss(toastId);
        if (response.status === 200) {
            toast.success("Note is added successfully.");
            const written_note = {
                Notes: state.notes.Notes,
                timeFrame: state.notes.timeFrame,
            };
            dispatch({
                type: "ADD_NOTE",
                payload: written_note,
            });
        }
    }

    const saveanote = (adata) => {
        dispatch({
            type: "NOTE_NOTES",
            payload: `${adata}`,
        });
    };
    const saveatime = (time) => {
        dispatch({
            type: "NOTE_TIME",
            payload: `${time}`,
        });
    };
    async function getNotes(found) {
        dispatch({
            type: "LOADING_TRUE",
        });
    }

    async function updateoftimefromlasttime(course_ID) {
        const updateoftimefromlast = {
            topicId: `${state.notes.topicID}`,
            subTopicId: `${state.notes.subtopicID}`,
            timeStamp: `${state.notes.timeFrame}`,
        };

        const response = await fetch(
            `${BASE_API_URL}/api/courses/updateSubtopicTimeLatest?courseCode=${course_ID}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "PUT",
                body: JSON.stringify(updateoftimefromlast),
            }
        );
    }

    async function runrequest(lpstack) {
        const sender = {
            lp: lpstack,
        };
        const response = await fetch(
            `${BASE_API_URL}/api/courses/courseRunState`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "POST",
                body: JSON.stringify(sender),
            }
        );
        const resofrequest = await response.json();
        if (response.status === 200) {
            dispatch({
                type: "PLAY_PAUSE",
                payload: resofrequest.data.message,
            });
        }
    }

    async function allrequestexit(batchhere) {
        const response = await fetch(
            `${BASE_API_URL}/api/courses/coursePauseResume`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                    Authorization: `Bearer ${state.userToken}`,
                },
                method: "POST",
                body: JSON.stringify(batchhere),
            }
        );
        const resofrequest = await response.json();
        if (response.status == 200) {
            if (resofrequest.data.message.split(" ").includes("cannot")) {
                toast.error(resofrequest.data.message);
                window.history.back();
            } else {
                toast.success(resofrequest.data.message);
            }
            runrequest(batchhere.lp);
        }
    }
    async function getlatestprogress(coursename) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/courses/courseProgress?courseId=${coursename}&approvalStatus=1`,
            cheaders
        );
        const resofprog = await response.json();
        if (response.status == 200) {
            dispatch({
                type: "ENROLLED_COURSE_DATA_INFO",
                payload: {
                    ...state.enrolledCourseInfo,
                    completionStatus: resofprog.data.completionStatus,
                },
            });
        }
    }

    const chatMessageApi = async (email) => {
        const response = await fetch(
            `https://1c7a-103-137-84-126.ngrok-free.app/api/user/communityChat?emailId=${email}`,
            cheaders
        );
        const data = await response.json();
        if (response.status === 200) {
            console.log(data, "data")
            dispatch({
                type: "CHAT_MESSAGES",
                payload: data
            })
        }
    }

    const uploadExcelData = async (files, type) => {
        console.log(files, "files")
        const excelFormData = new FormData();
        let arr = []
        if (type === "excel") {
            excelFormData.append("excelfile", files)
        }
        else {
            arr = {
                studentData: files
            }
        }

        try {
            const requestData = {
                url: `https://1c7a-103-137-84-126.ngrok-free.app/api/collegeAdmin/uploadStudentData/?emailId=sandeshsinghalswm@gmail.com`,
                method: "post",
                // body:excelFormData,
                data: type === 'excel' ? excelFormData : arr,
                headers: {
                    // Authorization: `Bearer ${state.userToken}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            }
            const response = await axios(requestData);
            // const data = await response.json();

            console.log(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <GlobalContext.Provider
            value={{
                chatMessageApi,
                uploadExcelData,
                messages: state.messages,




                allLearningPath: state.allLearningPath,
                getAllLearningPath,
                coursesInLearningPath: state.coursesInLearningPath,
                getCoursesInLearningPath,
                allEnrolledPaths: state.allEnrolledPaths,
                getEnrolledPath,
                generalFiles: state.generalFiles,
                getGeneralFiles,
                myCourses: state.myCourses,
                getMyCourses,


                //videoPlayer
                getlatestprogress,
                getvideoafterclick,
                saveasubtopicID,
                posttimeofstartingcourse,
                saveasubtopicID,
                saveatopicID,
                putupdateofcurrentcourse,
                saveasubtopicIDinenrolled,
                saveatopicIDinenrolled,
                notesforenrolled: state.notesforenrolled,
                addNotes,
                saveanote,
                saveatime,
                posttimeofstartingcourse,
                notes: state.notes,
                getNotes,
                putupdateofcurrentcourse,
                saveasubtopic,
                saveatopic,
                saveatopicIDinenrolled,
                saveasubtopicIDinenrolled,
                updateoftimefromlasttime,
                allrequestexit,
                runrequest,
                playpause: state.playpause,
                linkforenrolledvideo: state.linkforenrolledvideo,
                enrolledCourseInfo: state.enrolledCourseInfo,
                socket: state.socket,
                NotificationArray: state.NotificationArray,
                testApiSocket,
                EnrolledCourse: state.EnrolledCourse,
                getMyCurrentCourse,
                messageArr: state.messageArr,

            }}>
            {children}
        </GlobalContext.Provider>
    )
}