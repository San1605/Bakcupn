import { adminInitialState } from "../Views/Admin/Context/AdminInitialState"
import { userInitialState } from "../Views/User/Context/userInitialState"
import { mentorInitialState } from "../Views/CT-Mentor/Context/MentorInitialStates"
import { FacultyMentorInitialState } from "../Views/FacultMentor/Context/FacultyMentorInitialStates"
const globalInitialState = {
    userType: "",
    loading: false,
    staticdata: {},
    eventsArray: [],
    ct_roles: ["Admin", "HR Buddy", "Mentor"],
    non_ct_roles: ["user", "mentor"],
    totalDomains: [
        { text: "Data Science", value: "Data Science" },
        { text: "Data Engineering", value: "Data Engineering" },
        { text: "Power Apps", value: "Power Apps" },
        { text: "SQL", value: "SQL" },
        { text: "Power BI", value: "Power BI" },
        { text: "DevOps & App Modernization", value: "DevOps & App Modernization" },
        { text: "Cloud Infra & Security", value: "Cloud Infra & Security" },
        { text: "RedHat", value: "RedHat" },
        { text: "ChatBot", value: "ChatBot" }
    ],
    ...adminInitialState,
    ...userInitialState,
    ...mentorInitialState,
    ...FacultyMentorInitialState

}

export default globalInitialState