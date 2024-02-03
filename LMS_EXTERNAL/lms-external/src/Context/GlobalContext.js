import { createContext, useEffect, useReducer } from "react"
import globalReducer from "./Reducer";
import globalInitialState from "./InitialState";
import io from "socket.io-client"
import toast from "react-hot-toast"
import {
    sendTokenToBackend,
    getAllLps,
    getAllColleges,
    getCourseList,
    getCourseDetail,
    getCollegeMentors,
    getCelebalMentors,
    uploadStudentData,
    addCelebalRoles,
    addColleges,
    addLP,
    deleteRoles,
    addCollegeMentor,
    getStudents,
    addStudent,
    addCourse,
    getCommunityChatArr,
    getCoursesDetail,
    changeCourseStatus,
    deleteCourse,
    getRoleList,
    deleteColleges,
    deleteStudents,
    getDashBoardDataAdmin,
    getDashBoardDataHRBuddy
} from "../Views/Admin/Context/AdminFunctions";

import {
    forgotPasswordUser,
    authenticateUser,
    updatePasswordUser,
    otpUser,
    handleNewPassword,
    markAsComplete,
    getMyCurrentCourse,
    getCourseListUser,
    submitCertificate,
    submitAssignment,
    getUserDashboard
} from "../Views/User/Context/userFunctions"

import {
    getCourseListMentor,
    getCourseDetailMentor,
    unlockWeekMentor,
    getMentorDashboardData
} from "../Views/CT-Mentor/Context/MentorFunctions"


import {
    getDashboardDataFacultyMentor,
    submitFeedback
} from "../Views/FacultMentor/Context/FacultyMentorFunctions"

import { globalActions } from "./GlobalActions";
import { BASE_URL } from "../Utils/config";
import axios from "axios";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(globalReducer, globalInitialState);

    useEffect(() => {
        if (localStorage.getItem("role") && localStorage.getItem("role") !== 'user')
            try {
                getStaticData()
            }
            catch (error) {
                console.log(error)
            }
    }, [])


    // useEffect(() => {
    //     sendTokenToBackend(localStorage.getItem("token"))
    // },[])

    // useEffect(() => {
    //     if (!Object.keys(state.socket).length > 0) {
    //         dispatch({
    //             type: adminActions.SOCKET_CONNECTION,
    //             payload: io(BASE_URL
    //                 , {
    //                     transports: ["websocket", "polling", "flashsocket"],
    //                     cors: {
    //                         origin: 'http://localhost:3000',
    //                         methods: ['GET', 'POST'],
    //                     },
    //                 }

    //             )
    //         })

    //     }
    //     else {
    //         console.log(state.socket, "else condition");
    //         state.socket.on("connection", (message) => {

    //         });
    //         state.socket.emit("clientMessage", "hello this is a client")

    //         state.socket.on(("Connection Established"), (id) => {
    //             console.log(id)
    //         })

    //         state.socket.on(("send"), (data) => {
    //             dispatch(
    //                 {
    //                     type: adminActions.SOCKET_MESSAGE_OBJ,
    //                     payload: data
    //                 }
    //             )
    //         })
    //     }
    // }, [state.socket])



    async function getStaticData() {
        let authToken = localStorage.getItem("token");
        let config = {
            method: "get",
            url: `${BASE_URL}/api/dropdowns`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };
        try {
            const response = await axios(config);
            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: globalActions.GET_STATIC_DATA,
                    payload: response.data?.data
                })
            }
        }
        catch (error) {
            console.error(error);
            // throw error.response.data.error;
        }
    }


    function setLoading(value) {
        dispatch({
            type: globalActions.SET_LOADING,
            payload: value,
        });
    }


    async function getEvents() {
        let authToken = localStorage.getItem("token");
        let config = {
            method: "get",
            url: `https://3751-14-195-17-218.ngrok-free.app/api/global/getEvents?emailId=${localStorage.getItem("email")}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "ngrok-skip-browser-warning": "69420"
            },
        };
        try {
            const response = await axios(config);
            if (response.status >= 200 && response.status < 300) {
                return response.data
            }
        }
        catch (error) {
            console.error(error);
            throw error.response.data.error;
        }
    }
    // const getISTISOString = (date) => {
    //     const options = { timeZone: 'Asia/Kolkata' };
    //     return date.toISOString();
    // };

    async function addEvents({ title,
        participants,
        startTime,
        endTime,
        recurringSession,
        location,
        description,
        meetingLink, }) {
        let authToken = localStorage.getItem("token");
        const data = {
            title: title,
            participant: participants,
            timeFrom: startTime.toISOString(),
            timeTo: endTime?.toISOString(),
            recurringSession: recurringSession,
            Description: description,
            location: location,
            meetingLink: meetingLink
        }

        let config = {
            method: "post",
            url: `https://3751-14-195-17-218.ngrok-free.app/api/admin/addEvent`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        };
        try {
            const response = await axios(config);
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
        } catch (error) {
            console.error(error);
            throw error.response.data;
        }
    }





    return (
        <GlobalContext.Provider value={{
            userType: state.userType,
            staticdata: state.staticdata,
            totalDomains: state.totalDomains,
            non_ct_roles: state.non_ct_roles,
            ct_roles: state.ct_roles,
            eventsArray: state.eventsArray,
            dispatch,
            getStaticData,
            setLoading,
            getEvents,
            addEvents,

            // admin states

            lpList: state.lpList,
            collegeList: state.collegeList,
            courseList: state.courseList,
            courseDetail: state.courseDetail,
            collegeMentors: state.collegeMentors,
            celebalMentors: state.celebalMentors,
            studentList: state.studentList,
            loading: state.loading,
            socket: state.socket,
            communityChatArray: state.communityChatArray,
            messageObj: state.messageObj,
            selectedTabIndex: state.selectedTabIndex,
            courseStatusList: state.courseStatusList,
            selectedTabIndexRole: state.selectedTabIndexRole,
            collegeRoleList: state.collegeRoleList,
            adminDashboard: state.adminDashboard,
            hrBuddyDashboard: state.hrBuddyDashboard,
            getAllLps,
            getAllColleges,
            getCourseList,
            getCourseDetail,
            getCollegeMentors,
            getCelebalMentors,
            uploadStudentData,
            addCollegeMentor,
            addCelebalRoles,
            addColleges,
            addLP,
            deleteRoles,
            getStudents,
            addStudent,
            addCourse,
            getCommunityChatArr,
            getCoursesDetail,
            changeCourseStatus,
            sendTokenToBackend,
            deleteCourse,
            getRoleList,
            deleteColleges,
            deleteStudents,
            getDashBoardDataAdmin,
            getDashBoardDataHRBuddy,

            // user  states

            enrolledCourseInfo: state.enrolledCourseInfo,
            enrolledCourseList: state.enrolledCourseList,
            userProfile: state.userProfile,
            userDashboard: state.userDashboard,
            authenticateUser,
            updatePasswordUser,
            otpUser,
            handleNewPassword,
            markAsComplete,
            getMyCurrentCourse,
            getCourseListUser,
            forgotPasswordUser,
            submitCertificate,
            submitAssignment,
            getUserDashboard,


            // mentor

            courseListMentor: state.courseListMentor,
            mentorMetrics: state.mentorMetrics,
            coursesDetailMentor: state.coursesDetailMentor,
            mentorDashboard: state.mentorDashboard,
            getCourseListMentor,
            unlockWeekMentor,
            getCourseDetailMentor,
            getMentorDashboardData,


            // faculty-mentor
            facultyMentorDashboard: state.facultyMentorDashboard,
            getDashboardDataFacultyMentor,
            submitFeedback,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}