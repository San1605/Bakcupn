import { adminActions } from "../Views/Admin/Context/AdminAction"
import { globalActions } from "./GlobalActions"
import { userActions } from "../Views/User/Context/userAction"
import { mentorActions } from "../Views/CT-Mentor/Context/MentorActions"
import { facultyMentorActions } from "../Views/FacultMentor/Context/FacultyMentorActions"


const globalReducer = (state, action) => {
    switch (action.type) {
        case globalActions.SET_USER_TYPE:
            return {
                ...state,
                userType: action.payload
            }
        case globalActions.GET_STATIC_DATA:
            return {
                ...state,
                staticdata: action.payload
            }
        case globalActions.GET_EVENTS:
            return {
                ...state,
                eventsArray: action.payload
            }


        //admin 

        case adminActions.GET_ALL_LPS:
            return {
                ...state,
                lpList: action.payload
            }
        case adminActions.GET_COLLEGES:
            return {
                ...state,
                collegeList: action.payload
            }
        case adminActions.GET_CELEBAL_ROLES:
            return {
                ...state,
                celebalMentors: action.payload
            }
        case adminActions.GET_COLLEGE_ROLES:
            return {
                ...state,
                collegeMentors: action.payload
            }
        case adminActions.GET_COURSES:
            return {
                ...state,
                courseList: action.payload
            }
        case adminActions.GET_STUDENT_LIST:
            return {
                ...state,
                studentList: action.payload
            }
        case adminActions.GET_STUDENTS_METRICS:
            return {
                ...state,
                collegeMetrics: action.payload
            }
        case adminActions.GET_ADMIN_METRICS:
            return {
                ...state,
                adminMetrics: action.payload
            }
        case adminActions.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case adminActions.SOCKET_CONNECTION:
            return {
                ...state,
                socket: action.payload
            }
        case adminActions.COMMUNITY_CHAT:
            return {
                ...state,
                communityChatArray: action.payload
            }
        case adminActions.SOCKET_MESSAGE_OBJ:
            return {
                ...state,
                messageObj: action.payload
            }
        case adminActions.SET_SELECTED_TAB:
            return {
                ...state,
                selectedTabIndex: action.payload
            }
        case adminActions.SET_COURSE_DETAIL:
            return {
                ...state,
                courseStatusList: action.payload
            }

        case adminActions.GET_COLLEGE_ROLE_LIST:
            return {
                ...state,
                collegeRoleList: action.payload
            }

        case adminActions.HR_BUDDY_DASHBOARD:
            return {
                ...state,
                hrBuddyDashboard: action.payload
            }
        case adminActions.ADMIN_DASHBOARD:
            return {
                ...state,
                adminDashboard: action.payload
            }
        //user

        case userActions.ENROLLED_COURSE_DATA_INFO:
            return {
                ...state,
                enrolledCourseInfo: action.payload,
            };

        case userActions.ENROLLED_COURSE_LIST:
            return {
                ...state,
                enrolledCourseList: action.payload,
            };

        case userActions.GET_PROFILE_DATA:
            return {
                ...state,
                userProfile: action.payload
            }
        case userActions.GET_USER_DASHBOARD:
            return {
                ...state,
                userDashboard: action.payload
            }


        //ct-mentor
        case mentorActions.GET_COURSE_LIST:
            return {
                ...state,
                courseListMentor: action.payload
            }
        case mentorActions.GET_MENTOR_METRICS:
            return {
                ...state,
                mentorMetrics: action.payload
            }
        case mentorActions.GET_COURSE_DETAIL_MENTOR:
            return {
                ...state,
                coursesDetailMentor: action.payload
            }
        case mentorActions.CT_MENTOR_DASHBOARD:
            return {
                ...state,
                mentorDashboard: action.payload
            }






        //faculty-mentor

        case facultyMentorActions.FACULTY_MENTOR_DASHBOARD:
            return {
                ...state,
                facultyMentorDashboard: action.payload
            }
        default:
            return state
    }
}
export default globalReducer