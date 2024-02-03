import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import toast from "react-hot-toast";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import { useContext } from "react";
import { AppContext } from "../Context";
import { useMsal } from "@azure/msal-react";
import io from "socket.io-client";
import { useEffect } from "react";

// import MenteeList from "../views/mentor-mentee/pages/menteeList/MenteeList";
const ENDPOINT = window.location.origin === "https://ct-lms.azurewebsites.net"?process.env.REACT_APP_API_PROD_URL: process.env.REACT_APP_API_DEV_URL;

const initialState = {
  tickets: [],
  myCourses: [],
  myCompletedcourses: [],
  loading: false,
  sampleFiles: [],
  getTechnogoiesInfo: [],
  allCousersData: {},
  leaderboardData: [],
  singleCourseInfo: [],
  singlePathInfo: {},
  linkforenrolledvideo: "",
  notesforenrolled: [],
  enrolledCourseInfo: {},
  ticketStatusInfo: { raised: 0, resolved: 0, pending: 0, rejected: 0 },
  courseCompletionData: { completed: 0, inProgress: 0 },
  hrm_id: localStorage.getItem("hrm"),
  userMail: localStorage.getItem("email"),
  userToken: localStorage.getItem("token"),
  refreshhelper: localStorage.getItem("refreshhere"),
  notes: {
    courseId: "",
    topic: "",
    subtopic: "",
    Notes: "",
    timeFrame: "",
    topicID: "",
    subtopicID: "",
  },
  allunenrolledpath: {},
  allenrolledpaths: {},
  role: Number(localStorage.getItem("role")),
  menteelistdata: [],
  userprofiledata: {},
  menteescoursesrequest: undefined,
  menteedetailsofview: {},
  menteeticketlist: undefined,
  buddylists: { hrarr: [], hrcount: 0 },
  enrollcoursesreport: [],
  taskdonereport: [],
  feedbackfromreport: {},
  menteenotificationlist: [],
  lplistdata: {},
  reasonsofticket: [],
  dashlist: undefined,
  adminlinedata: {},
  departmentlistdata: [],
  lpListdatacoursemanager: [],
  firstattempt: false,
  managerlistall: [],
  adminlistall: [],
  hrlistall: [],
  budticketlist: [],
  allcoursesmanagement: {},
  profileImg: "",
  cmlist: [],
  graphdata: {},
  bdt: [],
  poc: [],
  listofmenteesinsm: [],
  listofallsecondary: [],
  listoffreementee: [],
  playpause: "",
  conversionmentordata: undefined,
  conversionmenteehead: "",
  pmtlrole: 0,
  tllist: [],
  pmlist: [],
  projectslist: [],
  curractivereport: {},
  downloadreportalldata: {
    alist: [],
    blist: [],
  },
  downloadsinglefull: [],
  downloadsingleonly: [],
  downloadrepoforhr: [],
  adminDataAnalytics: {},
  adminDepartmentList: [],
  adminDataOfDepartmentSelect: [],
  adminLoading: false,
  adminDataAnalyticsDepartmentName: null,
  adminDataAnalyticsMentorHrmId: "",
  newinterviewdetails: {},
  depselforallpath: "",
  mentorinfomail: "",
  //muskan : hrbuddiesConversionDetails
  hrbuddyConversionList: [],
  departmentsForHr: [],
  departmentsForMentee: [],
  menteeConversionList: [],
  navdata: [],
  convarr: [],
  comdeplist: [],
  activenavpoint: "00",
  requesttrigger: {},
  navroutes: [],
  departmentlistdatahr: [],
  depheadlistall: [],
  adminDepartmentListDephead: [],
  lpadminlist: {},
  courseedlist: {},
  lpnamelist: {},
  lpnamereleventfilter: [],
  lpnamerelevent: [],
  coursemanagerlist: {},
  courseviewlist: {},
  conversionmanagerlist: {},
  lpmanagerdetails: {},
  defaultcounts: {},
  lpinnerlistdata: {},
  customsno: [],
  customindata: {},
  comconprev: {
    currentPage: 1,
    buddyDepartment: [],
    hrBuddyName: "",
    conversionType: "",
    fromDates: "",
    toDates: "",
    conversionRangeSelect: "",
  },
  buddyconprev: {
    currentPage: 1,
    buddyDepartment: [],
    hrBuddyName: "",
    conversionType: "",
    fromDates: "",
    toDates: "",
    conversionRangeSelect: "",
  },
  depheadconprev: {
    currentPage: 1,
    buddyDepartment: [],
    hrBuddyName: "",
    conversionType: "",
    fromDates: "",
    toDates: "",
    conversionRangeSelect: "",
  },
  menteeconprev: {
    currentPage: 1,
    buddyDepartment: [],
    hrBuddyName: "",
    conversionType: "",
    fromDates: "",
    toDates: "",
    conversionRangeSelect: "",
  },
  interviewlist: {},
  tabswitchforrolemanagement: "home",
  defaultavailabletime: {},
  assistantdata: [],
  postdata: {},
  buddyactivestate: 1,
  buddylistsearchvar: "",
  secondaryseen: false,
  mentoractivestate: 1,
  activehierarchy: 1,
  mentorlistsearchvar: "",
  depheadlistdata: { deparr: [], depcount: 0 },
  deplongerintegration: true,
  hrbuddylongerintegration: true,
  depheaddatapageno: 1,
  hrbuddypageno: 1,
  empsforHr: [],
  deploading: false,
  hrloading: false,
  deplistsearchvar: "",
  deplistdepartsaved: [],
  depheadconversionlist: [],
  depheadactiveside: 1,
  downrepforcommoncon: [],
  downloadrepoforhrsimple: [],
  depoflp: [],
  teamlist: [],
  coursecompletedata: {},
  coursemanagechangingdata: {
    searchkey: "",
    departmentname: "",
  },
  commentsData: [],
  roleforemployee: { isReviewer: 0 },
  interviewerlist: [],
  listdataofteamleads: [],
  socket: {},
  userprofileengagementdata: {},
  downrepoforadminemp: [],
  hiearchydata: {
    alist: [],
    blist: [],
  },
  evalresult: [],
  downintersched: [],
  downrepoindephead: [],
  NotificationArray: [],
  adminnameloading: false,
  activeAdminDashboard: { adminmain: 1, admin_inner: 1 },
  pipRequestsList: [],
  adminDataAnalyticsActiveUsers: 0,
  adminemplongerintegration: true,
  adminempcurrentpage: 1,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {
    if (!(Object.keys(state.socket).length > 0)) {
      //   dispatch({
      //     type: "SOCKET_CONNECTION",
      //     payload: io('https://2e09-103-137-84-126.ngrok-free.app'
      //         , {
      //             transports: ["websocket", "polling", "flashsocket"],
      //             cors: {
      //                 origin: 'http://localhost:3000',
      //                 methods: ['GET', 'POST'],
      //             },
      //         }

      //     )
      // })
      dispatch({
        type: "SOCKET_CONNECTION",
        payload: io(`${ENDPOINT}`),
      });
    } else {
      state.socket.on("connect", () => {
        const email = localStorage.getItem("email");
        state.socket.emit("clientMessage", email);
      });
      state.socket.on("Connection Established", (id) => {
        // console.log("connected");
      });
      state.socket.on("joinRoomResponse", (res) => {
        if (res.includes("singlepathmanagement")) {
          navigate(`${res}`);
        }
      });

      //notification

      state.socket.on("notification", (arr) => {
        dispatch({
          type: "NOTIFICATION_ARRAY",
          payload: arr,
        });
      });
    }
  }, [state.socket]);

  const cheaders = {
    headers: {
      Authorization: `Bearer ${state.userToken}`,
    },
  };
  const { instance } = useMsal();
  const { setIsAuthenticated } = useContext(AppContext);
  const handleLogout = (logoutType) => {
    localStorage.clear("token");
    document.cookie = "access_token=";
    setIsAuthenticated(false);
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    }
  };
  const navigate = useNavigate();

  // socket = io(`${ENDPOINT}`)

  async function allTickets() {
    const response = await fetch(
      `${ENDPOINT}/api/tickets/getTicketsInfo`,
      cheaders
    );
    const tas = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_TICKETS",
        payload: tas.data,
      });
    }
  }

  async function addTicket(ticket) {
    const toastId = toast.loading("Please wait...");
    const response = await fetch(
      `${ENDPOINT}/api/tickets/addTicket`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(ticket),
      }
    );
    let addticket = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      if (addticket.data.status === true) {
        toast.success("Ticket added successfully.");
        // dispatch({
        //   type: "ADD_TASK",
        //   payload: ticket,
        // });
        allTickets();
        getTicketStatusInfo();
      }
    }
  }

  async function getMyCourse() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/myCourses`,
      cheaders
    );
    const mycoursedata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_MY_COURSE",
        payload: mycoursedata.data.ongoing,
      });
      dispatch({
        type: "GET_MY_COMPLETED_COURSE",
        payload: mycoursedata.data.completed,
      });
    }
  }

  async function getSamplerFile() {
    const response = await fetch(
      `${ENDPOINT}/api/samplers/download`,
      cheaders
    );
    const samplerdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_SAMPLER_FILES",
        payload: samplerdata.data,
      });
    }
  }

  async function getTechnogoies() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/listTechnologies`,
      cheaders
    );
    const gettechdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_TECHNOGIES",
        payload: gettechdata.data,
      });
    }
  }

  async function getCourseCompletionNumber() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/courseCompletionStatus`,
      cheaders
    );
    const mycoursecompletiondata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_COURSE_COMPLETION_DATA",
        payload: mycoursecompletiondata.data,
      });
    }
  }

  async function getTicketStatusInfo() {
    const response = await fetch(
      `${ENDPOINT}/api/tickets/getStatus`,
      cheaders
    );
    const ticketInfo = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_TICKET_STATUS_INFO",
        payload: ticketInfo.data,
      });
    }
  }

  async function getAllCourses(pageno, tech) {
    const response = await axios.get(
      `${ENDPOINT}/api/courses/getAllCourses?technology=&pageNumber=${pageno}&limit=10`,
      cheaders
    );
    const allcousersInfo = response.data;
    if (response.status === 200) {
      dispatch({
        type: "GET_ALL_COURSE_DATA",
        payload: allcousersInfo.data,
      });
    }
  }

  async function getLeaderBoard() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/leaderboard`,
      cheaders
    );
    const ldata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_LEADERBOARD",
        payload: ldata.data,
      });
    }
  }

  async function gethrmusingzoho(token) {
    dispatch({
      type: "LOADING_TRUE",
    });
    const response = await fetch(
      `${ENDPOINT}/api/notification/hrmFromEmail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let hrmInfo = await response.json();
    if (response.status === 200) {
      document.cookie = `employeeInfo=${hrmInfo.data.EmployeeID}`;
      localStorage.setItem("hrm", hrmInfo.data.EmployeeID);
      dispatch({
        type: "ADD_HRM",
        payload: hrmInfo.data.EmployeeID,
      });
      rolecheck(hrmInfo.data.EmployeeID);
    }
  }
  async function rolecheck(hrm) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/mentorMenteeDifference?HRMID=${hrm}`
    );
    const checker = await response.json();
    if (response.status === 200) {
      localStorage.setItem("role", checker.data.status);
      dispatch({
        type: "ROLE_CHECKER",
        payload: checker.data.status,
      });
      const geturl = window.location.pathname.split("/");
      if (geturl[1] !== "admin") {
        navigate("/dashboard");
      }
    }
    dispatch({
      type: "LOADING_FALSE",
    });
  }
  async function enrollCourse(courseId, courseName) {
    const toastId = toast.loading("Please wait...");
    const course = {
      courseId: courseId,
      courseName: courseName,
    };

    const response = await fetch(
      `${ENDPOINT}/api/courses/enroll`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(course),
      }
    );
    let enrolledCourse = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      if (enrolledCourse.data.status === true) {
        toast.success(enrolledCourse.data.message);
        getMyCourse();
        navigate("/courses");
      }
    }
  }

  async function courseDataById(courseId) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/getACourseDetail?courseId=${courseId}`,
      cheaders
    );
    let courseData = await response.json();
    if (response.status === 200 && courseData.data[0]) {
      dispatch({
        type: "COURSE_DATA_INFO",
        payload: courseData.data[0],
      });
    } else {
      console.error();
    }
  }

  async function getNotes(found) {
    dispatch({
      type: "LOADING_TRUE",
    });
    const response = await fetch(
      `${ENDPOINT}/api/notes/getNotes?courseId=${state.notes.courseId
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
      `${ENDPOINT}/api/notes/addNotes`,
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
      `${ENDPOINT}/api/courses/currentprogress`,
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
      `${ENDPOINT}/api/courses/getACourseDetailEnrolled?courseId=${IdofCourse}`,
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
  async function startofcoursefromlasttime(courseiD, enrolled) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/getLastSubtopicTime?courseCode=${courseiD}`,
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
  async function putupdateofcurrentcourse(course_ID) {
    const updateoftime = {
      topic: `${state.notes.topic}`,
      topicId: `${state.enrolledCourseInfo.startData.topicId}`,
      subTopic: `${state.notes.subtopic}`,
      subTopicId: `${state.enrolledCourseInfo.startData.subTopicId}`,
    };

    const response = await fetch(
      `${ENDPOINT}/api/courses/updateSubtopicTime?courseCode=${course_ID}`,
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
  async function updateoftimefromlasttime(course_ID) {
    const updateoftimefromlast = {
      topicId: `${state.notes.topicID}`,
      subTopicId: `${state.notes.subtopicID}`,
      timeStamp: `${state.notes.timeFrame}`,
    };

    const response = await fetch(
      `${ENDPOINT}/api/courses/updateSubtopicTimeLatest?courseCode=${course_ID}`,
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
  async function getallpath(pageno, dep, searched) {
    const sender = {
      department: dep,
    };
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/getAllLps?pageNumber=${pageno}&lpName=${searched}`,
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
    const allpaths = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_UNENROLLED_PATHS",
        payload: allpaths.data,
      });
    } else {
      console.error();
    }
  }
  async function getsingleunenrolledpath(pathname) {
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/getALpDetail?lp=${pathname}`,
      cheaders
    );
    const singlepath = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "SINGLE_UNENROLLED_PATH",
        payload: singlepath.data,
      });
    } else {
      console.error();
    }
  }
  async function enrollPath(pathname) {
    const toastId = toast.loading("Please wait...");
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/enroll?lp=${pathname}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
      }
    );
    let enrolledPath = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      if (enrolledPath.data.status === true) {
        toast.success(enrolledPath.data.message, {
          duration: 4000,
        });
      }
      if (enrolledPath.data.status === false) {
        toast.error(enrolledPath.data.message, {
          duration: 4000,
        });
      }
      getMyCourse();
      // navigate("/courses");
    }
  }
  async function getallpathindashboard() {
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/listLearningPath`,
      cheaders
    );
    const allpathsofdashboard = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_ENROLLED_PATH",
        payload: allpathsofdashboard.data,
      });
    } else {
      console.error();
    }
  }
  async function getallmenteelist() {
    const email = localStorage.getItem("email");
    const response = await fetch(
      `${ENDPOINT}/api/mentor/menteeDetails?emailId=${email}`,
      cheaders
    );
    const menteeslist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_MENTEE_LIST_HIERARCHY_1",
        payload: menteeslist.data.datas,
      });
      // dispatch({
      //   type: "ALL_MENTEE_LIST",
      //   payload: menteeslist.data.datas,
      // });
      dispatch({
        type: "SECONDARY_SEEN",
        payload: menteeslist.data.showSecondaryMentorButton,
      });
    } else {
      console.error();
    }
  }
  async function getallfullmenteelist() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/hierarchyMenteeList`,
      cheaders
    );
    const menteeslist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_MENTEE_LIST_HIERARCHY_2",
        payload: menteeslist.data.datas,
      });
    } else {
      console.error();
    }
  }
  async function getallmenteelistforeach(mail) {
    dispatch({
      type: "LOADING_TRUE",
    });
    const response = await fetch(
      `${ENDPOINT}/api/mentor/menteeDetails?emailId=${mail}`,
      cheaders
    );
    const menteeslist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_MENTEE_LIST",
        payload: menteeslist.data.datas,
      });
      dispatch({
        type: "MENTORMAIL",
        payload: menteeslist.data.mentorMail,
      });

      dispatch({
        type: "LOADING_FALSE",
      });
    } else {
      console.error();
    }
  }
  async function getallmenteelistvalidation(pervalid) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/menteeDetails?HRMID=${state.hrm_id}`,
      cheaders
    );
    const menteeslist = await response.json();
    if (response.status === 200) {
      const purivlaid = `${pervalid}@celebaltech.com`;
      if (
        menteeslist.data.find((elem) => {
          return elem.EmailID == purivlaid;
        }) == undefined
      ) {
        navigate("/");
      } else {
        conversionmentor(pervalid);
        reportforeach(pervalid);
      }
    } else {
      console.error();
    }
  }
  async function getprofiledata() {
    const response1 = await fetch(
      `${ENDPOINT}/api/mentor/profileDetails`,
      cheaders
    );
    const userinfo = await response1.json();
    if (response1.status == 200) {
      dispatch({
        type: "USER_PROFILE",
        payload: { ...userinfo.data },
      });
    }
  }
  async function getprofileengagement() {
    const response = await fetch(
      `${ENDPOINT}/api/profile/getProjectAndCertificationDetail`,
      cheaders
    );
    const userinfo = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "USER_PROFILE_ENGAGEMENT",
        payload: userinfo.data,
      });
    }
  }
  async function uploadcertificate(uploadingcertificate) {
    const toastId = toast.loading("Uploading...");
    const bodyFormData = new FormData();
    bodyFormData.append("certificateName", uploadingcertificate.name);
    bodyFormData.append("certificateFile", uploadingcertificate.file);
    bodyFormData.append("certificationDate", uploadingcertificate.date);
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/profile/uploadCertificate`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const postdetails = await response.data;
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (postdetails.data.status) {
          toast.success(postdetails.data.message);
          getprofileengagement();
        } else {
          toast.error(postdetails.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletecertificate(cerid) {
    const data = {
      certificateId: cerid,
    };
    const toastId = toast.loading("Please wait...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/profile/deleteUploadedCertificate`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(data),
        }
      );
      let resofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofdelete.data.status) {
          toast.success(resofdelete.data.message);
          getprofileengagement();
        } else {
          toast.error(resofdelete.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  // async function getprofilephto() {
  //   try {
  //     let img = null;
  //     let config = {
  //       headers: {
  //         Authorization: `Bearer ${state.userToken}`,
  //       },
  //       responseType: "arraybuffer",
  //     };
  //     const response2 = await axios
  //       .get(
  //         `https://graph.microsoft.com/v1.0/users/${state.userMail}/photo/$value`,
  //         config
  //       )
  //       .catch(() => {
  //         console.log("handling popout");
  //       });
  //     const avatar = await Buffer.from(response2.data, "binary").toString(
  //       "base64"
  //     );
  //     if (response2.status === 200) {
  //       console.log(response2, "new image", avatar);
  //       img = "data:image/jpeg;base64, " + avatar;
  //       console.log(img, "imgnope");
  //       dispatch({
  //         type: "USER_PROFILE_IMG",
  //         payload: img,
  //       });
  //     } else {
  //       localStorage.clear("token");
  //       document.cookie = "access_token=";
  //       navigate("/");
  //     }
  //   } catch {
  //     localStorage.clear("token");
  //     document.cookie = "access_token=";
  //     navigate("/");
  //   }
  // }

  async function getmenteescourserequest() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/courseRequest?HRMID=${state.hrm_id}`,
      cheaders
    );
    const menteescoursesrequestinfo = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "COURSE_REQUEST",
        payload: menteescoursesrequestinfo.data,
      });
    } else {
      console.error();
    }
  }
  async function updatecourserequest(
    statusofapproval,
    reasonforit,
    menteemail,
    lp,
    request,
    dateMentioned
  ) {
    const toastId = toast.loading("Please wait...");
    const usercourse = {
      approvalStatus: statusofapproval,
      // HRMID: state.hrm_id,
      // HRMID: state.hrm_id,
      reason: reasonforit,
      requestType: request,
      requestedDate: dateMentioned,
    };
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/approveCourse?lp=${lp}&emailId=${menteemail}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "PUT",
        body: JSON.stringify(usercourse),
      }
    );
    const statusofresponse = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      toast.success("Action has been taken");
      getmenteescourserequest();
    } else {
      console.error();
    }
  }
  async function ticketdataofemployee() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/ticketRequest?HRMID=${state.hrm_id}`,
      cheaders
    );
    const ticketdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "TICKET_LIST",
        payload: ticketdata.data,
      });
    } else {
      console.error();
    }
  }
  async function updateticketrequest(
    statusofticket,
    reasonforticket,
    mail,
    date
  ) {
    const toastId = toast.loading("Please wait...");
    const userticket = {
      HRMID: state.hrm_id,
      status: statusofticket,
      reason: reasonforticket,
    };
    const response = await fetch(
      `${ENDPOINT}/api/tickets/updateStatus?emailId=${mail}&createdDate=${date}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "PUT",
        body: JSON.stringify(userticket),
      }
    );
    const statusofresponse = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      toast.success("Action has been taken");
      ticketdataofemployee();
    } else {
      console.error();
    }
  }
  async function hrbuddylist(page, name, department, type, wm, wl, engagement, avi, prjstatus) {
    const senddata = {
      department: department,

      employeeType: type,

      workMode: wm,

      workLocation: wl,

      engagementType: engagement,
      name: name,
      availability: avi,
      limit: 50,
      emailId: "",
      projectStatus: prjstatus
    };

    dispatch({
      type: "HR_LOADING_TRUE",
    });

    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/adminDashboard?pageNumber=${page}`,
        {
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",

            "ngrok-skip-browser-warning": "69420",

            Authorization: `Bearer ${state.userToken}`,
          },

          method: "POST",

          body: JSON.stringify(senddata),
        }
      );

      const buddyresponse = await response.json();

      if (response.status === 200) {
        dispatch({
          type: "HR_LOADING_FALSE",
        });

        if (page === 1) {
          dispatch({
            type: "FILTER_BUDDY_LIST",

            payload: buddyresponse.data,
          });
        } else {
          dispatch({
            type: "BUDDY_LIST",

            payload: buddyresponse.data,
          });
        }
      } else {
        dispatch({
          type: "HR_LOADING_FALSE",
        });
      }
    } catch (err) {
      if (state.buddylists.hrarr.length === 0) {
        toast.error("Error in Hr buddy:" + err.message);
      }

      dispatch({
        type: "HR_LOADING_FALSE",
      });
    }
  }
  async function getallbuddylistvalidation(pervalid) {
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/buddyLists?HRMID=${state.hrm_id}`,
      cheaders
    );
    const hrbuddylisthere = await response.json();
    if (response.status === 200) {
      const purivlaid = `${pervalid}@celebaltech.com`;
      if (
        hrbuddylisthere.data.result.find((elem) => {
          return elem.EmailId == purivlaid;
        }) == undefined
      ) {
        navigate("/");
      } else {
        conversionmentor(pervalid);
        reportforeach(pervalid);
      }
    } else {
      console.error();
    }
  }
  const saveanote = (adata) => {
    dispatch({
      type: "NOTE_NOTES",
      payload: `${adata}`,
    });
  };
  const addToken = (tokenI, tokenF, mailid) => {
    dispatch({
      type: "SET_TOKEN",
      payload: tokenI,
    });
    dispatch({
      type: "SET_ID_TOKEN",
      payload: tokenF,
    });
    dispatch({
      type: "SET_MAIL",
      payload: mailid,
    });
  };
  const saveatime = (time) => {
    dispatch({
      type: "NOTE_TIME",
      payload: `${time}`,
    });
  };
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
  const saveasubtopicID = (subtopicID) => {
    dispatch({
      type: "NOTE_SUBTOPIC_ID",
      payload: `${subtopicID}`,
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
  async function menteedetailsforview(email) {
    const response1 = await fetch(
      `${ENDPOINT}/api/mentor/menteeProfileDetails?emailId=${email}@celebaltech.com`,
      cheaders
    );
    const menteeprofiledata = await response1.json();
    if (response1.status === 200) {
      dispatch({
        type: "MENTEE_DETAILS_VIEW",
        payload: { ...menteeprofiledata.data },
      });
    }
  }
  async function lpformenteereport(mail) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/listMenteeLps?emailId=${mail}@celebaltech.com`,
      cheaders
    );
    const lpmenteedetails = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "ALL_ENROLLED_PATH",
        payload: lpmenteedetails.data,
      });
    } else {
      console.error();
    }
  }
  async function ticketformenteereport(mail) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/getMenteeTicketStatus?emailId=${mail}@celebaltech.com&HRMID=${state.hrm_id}`,
      cheaders
    );
    const ticketreportdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_TICKET_STATUS_INFO",
        payload: ticketreportdata.data,
      });
    } else {
      console.error();
    }
  }
  async function coursestatusofmentee(mail, year, month) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/menteeEnrolledCourse?emailId=${mail}@celebaltech.com&year=${year}&month=${month}`,
      cheaders
    );
    const coursesinfo = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "COURSE_REPORT",
        payload: coursesinfo.data.courses,
      });
      dispatch({
        type: "INTERVIEW_DETAILS",
        payload: coursesinfo.data.interviews,
      });
    } else {
      console.error();
    }
  }
  async function uploadtaskofmentee(uploadintask, email) {
    const toastId = toast.loading("Uploading...");
    const bodyFormDataReport = new FormData();
    bodyFormDataReport.append("title", uploadintask.title);
    bodyFormDataReport.append("date", uploadintask.date);
    bodyFormDataReport.append("recordingLink", uploadintask.recordingLink);
    bodyFormDataReport.append("review", uploadintask.review);
    bodyFormDataReport.append("docfile", uploadintask.docfile);

    try {
      const response = await axios.post(
        `${ENDPOINT}/api/mentor/interviewReport?emailId=${email}@celebaltech.com`,
        bodyFormDataReport,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const postdetailsofreport = await response.data;
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (postdetailsofreport.data.status == false) {
          toast.error(postdetailsofreport.data.message);
        } else {
          // toast.success("Uploaded");
          dispatch({
            type: "INTERVIEW_CONNECT",
            payload: postdetailsofreport.data.data,
          });
          // gettaskdonereport(email);
          coursestatusofmentee(
            state.curractivereport.idhere,
            state.curractivereport.year,
            state.curractivereport.month
          );
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function postdetailsoffeedbackreport(email, feedbackform) {
    const toastId = toast.loading("Uploading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/mentor/menteeFeedbackReport?emailId=${email}@celebaltech.com`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(feedbackform),
        }
      );
      const feedbackresult = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Submitted");
        const empty = {};
        dispatch({
          type: "INTERVIEW_CONNECT",
          payload: empty,
        });
        coursestatusofmentee(
          state.curractivereport.idhere,
          state.curractivereport.year,
          state.curractivereport.month
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function updatedetailsoffeedbackreport(feedbackform) {
    const toastId = toast.loading("Uploading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/mentor/updateMenteeFeedbackReport`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "PUT",
          body: JSON.stringify(feedbackform),
        }
      );
      const feedbackresult = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Updated");
        coursestatusofmentee(
          state.curractivereport.idhere,
          state.curractivereport.year,
          state.curractivereport.month
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  // async function gettaskdonereport(email) {
  //   const response = await fetch(
  //     `${ENDPOINT}/api/mentor/listMenteeInterviewReports?emailId=${email}@celebaltech.com`,
  //     cheaders
  //   );
  //   const tasksofmenteedata = await response.json();
  //   if (response.status === 200) {
  //     dispatch({
  //       type: "INTERVIEW_DETAILS",
  //       payload: tasksofmenteedata.data,
  //     });
  //   } else {
  //     console.error();
  //   }
  // }
  async function getfeedbackofmentee(email) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/getMenteeFeedbackReport?emailId=${email}@celebaltech.com`,
      cheaders
    );
    const feedbackdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "FEEDBACK_DETAILS",
        payload: feedbackdata.data[0],
      });
    } else {
      console.error();
    }
  }
  async function updateprofiledata(somedata) {
    const toastId = toast.loading("Uploading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/mentor/updateProfileDetail`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "PUT",
          body: JSON.stringify(somedata),
        }
      );
      const profileResult = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        getprofiledata();
        firsttimelogin();
        toast.success("Submitted");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function menteenotification() {
    const response = await fetch(
      `${ENDPOINT}/api/notification/notifies?HRMID=${state.hrm_id}`,
      cheaders
    );
    const allnotify = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "menteenotifify",
        payload: allnotify.data,
      });
    } else {
      console.error();
    }
  }
  async function sendtoperson(person) {
    const response = await fetch(
      `${ENDPOINT}/api/tickets/dropdownReasonPerson?concernedPerson=${person}`,
      cheaders
    );
    const persondata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "LIST_OF_REASONS",
        payload: persondata.data,
      });
    } else {
      console.error();
    }
  }
  async function firsttimelogin() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/firstTimeLogin`,
      cheaders
    );
    const dependent = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "FIRST_TIME",
        payload: dependent.data.status,
      });
    }
  }
  async function buddiestickets() {
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/ticketRequestsBuddy?HRMID=${state.hrm_id}`,
      cheaders
    );
    const buddies = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "BUD_TICKETS",
        payload: buddies.data,
      });
    } else {
      console.error();
    }
  }
  async function updatebuddieticketrequest(
    statusofticket,
    reasonforticket,
    mail,
    date
  ) {
    const toastId = toast.loading("Please wait...");
    const userticketbuddie = {
      HRMID: state.hrm_id,
      status: statusofticket,
      reason: reasonforticket,
    };
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/updateTicketStatus?emailId=${mail}&createdDate=${date}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "PUT",
        body: JSON.stringify(userticketbuddie),
      }
    );
    const statusofresponsebuddie = await response.json();
    toast.dismiss(toastId);
    if (response.status === 200) {
      toast.success("Action has been taken");
      buddiestickets();
    } else {
      console.error();
    }
  }
  async function getlistofcoursemanager() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/courseManager`,
      cheaders
    );
    const resofcm = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "RES_CM",
        payload: resofcm.data,
      });
    }
  }
  async function getlatestprogress(coursename) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/courseProgress?courseId=${coursename}&approvalStatus=1`,
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
  async function geteachassigner(personmail) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/getSecondaryMentorList?HRMID=${state.hrm_id}&emailId=${personmail}`,
      cheaders
    );
    const resofassigner = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "SET_ASSINED_LIST",
        payload: resofassigner.data.assignedMentee,
      });
    }
  }
  async function getallassigner() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/secondaryMentorCount?HRMID=${state.hrm_id}`,
      cheaders
    );
    const resofallassigner = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "SET_ALLSM",
        payload: resofallassigner.data,
      });
    }
  }
  async function secondmentor(secondlist) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/assignSecondaryMentor`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(secondlist),
      }
    );
    const sencondresp = await response.json();
    if (response.status == 200) {
      getallassigner();
      freementor();
    }
  }
  async function freementor() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/getFreeMentees?HRMID=${state.hrm_id}`,
      cheaders
    );
    const resoffree = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "SET_FREE",
        payload: resoffree.data,
      });
    }
  }
  async function allrequestexit(batchhere) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/coursePauseResume`,
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
  async function runrequest(lpstack) {
    const sender = {
      lp: lpstack,
    };
    const response = await fetch(
      `${ENDPOINT}/api/courses/courseRunState`,
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
    if (response.status == 200) {
      dispatch({
        type: "PLAY_PAUSE",
        payload: resofrequest.data.message,
      });
    }
  }
  // async function pmtc() {
  //   const response = await fetch(
  //     `${ENDPOINT}/api/conversion/isPmTc`,
  //     cheaders
  //   );
  //   const respmtc = await response.json();
  //   if (response.status == 200) {
  //     // console.log(respmtc.data.status);
  //     dispatch({
  //       type: "PMTL_ROLE",
  //       payload: respmtc.data.status,
  //     });
  //   }
  // }
  async function conversionmentor(menteemail) {
    dispatch({
      type: "LOADING_TRUE",
    });
    const response = await fetch(
      `${ENDPOINT}/api/conversion/menteeConversionRequest?emailId=${menteemail}@celebaltech.com`,
      cheaders
    );
    const resconv = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "CONVERSION_MENTOR_DATA",
        payload: resconv.data.datas,
      });
      dispatch({
        type: "CONVERSION_MENTEE_HEAD",
        payload: resconv.data.message,
      });
    }
    dispatch({
      type: "LOADING_FALSE",
    });
  }
  async function pmrequest() {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/projectManagerRequest`,
      cheaders
    );
    const pmres = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "PMRES",
        payload: pmres.data,
      });
    }
  }
  async function tlrequest() {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/teamCoordinatorRequest`,
      cheaders
    );
    const tlresp = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "TLRES",
        payload: tlresp.data,
      });
    }
  }
  async function projectlistofper(mailh) {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/projectList?emailId=${mailh}@celebaltech.com`,
      cheaders
    );
    const resofar = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "PRLIST",
        payload: resofar.data,
      });
    }
  }
  async function actionoftl(id, act) {
    const temp = {
      interviewId: id,
      status: act,
    };
    const toastId = toast.loading("Please wait...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/conversion/teamCoordinatorAction`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(temp),
        }
      );
      const resoftl = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        toast.success("Submitted");
        tlrequest();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function formofpm(fm) {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/conversion/projectManagerForm`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(fm),
        }
      );
      const resofpm = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        toast.success("Submitted");
        pmrequest();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  const setcurrreport = async (tempreport) => {
    dispatch({
      type: "CURRENT_STORE",
      payload: tempreport,
    });
  };
  async function downloadreportall() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/downloadMenteeReport?HRMID=${state.hrm_id}&emailId=${state.userMail}`,
      cheaders
    );
    const resofreportall = await response.json();
    if (response.status == 200) {
      downloadreportallfull(resofreportall.data);

    }
  }
  async function downloadreportallfull(prevdata) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/downloadAllHierarchyMenteeReport`,
      cheaders
    );
    const resofreportall = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "DOWNREPORTALL",
        payload: { downrep1: prevdata, downrep2: resofreportall.data }
      });
    }
  }
  async function reportforeach(passingone) {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/downloadMenteeConversionForm?emailId=${passingone}@celebaltech.com`,
      cheaders
    );
    const getreporter = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "FULL_ONE",
        payload: getreporter.data,
      });
    }
  }
  async function downloadsingleonlyfn(prone, interviewsId) {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/downloadMenteesSingleConversionForm?emailId=${prone}@celebaltech.com&interviewId=${interviewsId}`,
      cheaders
    );
    const getreporter = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "SINGLE_ONE",
        payload: getreporter.data,
      });
    }
  }
  async function downloadreportforhr(department, name, type, from, to) {
    const toastId = toast.loading("Downloading ....");
    let department1 = {
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT
      }/api/hrbuddy/downloadHrConversionDetail?from=${from ? from : ""}&to=${to ? to : ""
      }&conversionType=${type ? type : ""}&name=${name ? name : ""}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const downrepdata = await response.json();
    toast.dismiss(toastId);
    if (response.status == 200) {
      dispatch({
        type: "MUL_HR",
        payload: downrepdata.data,
      });
      toast.success("Downloaded");
    }
  }
  async function downloadreportforhrsimple(
    deplist,
    name,
    emplist,
    wm,
    wl,
    engagement,
    availableList,
    projectstatus
  ) {
    const data = {
      name: name,
      emailId: "",
      department: deplist,
      employeeType: emplist,
      workMode: wm,
      workLocation: wl,
      engagementType: engagement,
      availability: availableList,
      projectStatus: projectstatus
    }

    const response = await fetch(
      `${ENDPOINT}/api/admin/downloadAdminDashboardData`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const getreporterhr = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "MUL_HR_SIMPLE",
        payload: getreporterhr.data,
      });
    }
  }
  async function havenav() {
    const response = await fetch(
      `${ENDPOINT}/api/role/navbar`,
      cheaders
    );
    const havresponse = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "NAV_ROUTES_THINGS",
        payload: havresponse.data.routes,
      });
      dispatch({
        type: "NAV_THINGS",
        payload: havresponse.data.tabs,
      });
    }
  }
  async function convtype() {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/conversionCheckersAuthorityList`,
      cheaders
    );
    const convresp = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "CON_THINGS",
        payload: convresp.data,
      });
    }
  }
  async function commonconverionbigapi(page, department, name, type, from, to) {
    // console.log(page, department, name, type , from ,to , ",dsfnjnjkmljsefe")
    dispatch({
      type: "LOADING_TRUE",
    });
    let department1 = {
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT
      }/api/conversion/listConversionMonthDetailForChecker?from=${from ? from : ""
      }&to=${to ? to : ""}&conversionType=${type ? type : ""}&name=${name ? name : ""
      }&pageNumber=${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const hrbuddylist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "HR_BUDDY_CONVERSION_LIST",
        payload: hrbuddylist.data,
      });
      dispatch({
        type: "LOADING_FALSE",
      });
    } else {
      console.error();
    }
  }

  async function getavailableschedule(data) {
    const response = await fetch(
      `${ENDPOINT}/api/interview/getAvailableSchedule`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const availabletime = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "AVAILABLE_TIME",
        payload: availabletime.data,
      });
    }
  }
  async function interviewlistdata(data) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/interview/scheduledInterviewsDb`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const interviews = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "INTERVIEW_LIST",
          payload: interviews.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
      toast.error("Something went wrong");
    }
  }

  async function download_report_for_interview_scheduling(
    department,
    name,
    type,
    from,
    to,
    interviewstatus
  ) {
    const toastId = toast.loading("Downloading ....");
    let data = {
      from: from,
      to: to,
      name: name,
      interviewType: type,
      interviewStatus: interviewstatus,
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT}/api/interview/downloadScheduledInterviewsDb`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const downrepdata = await response.json();
    toast.dismiss(toastId);
    if (response.status == 200) {
      dispatch({
        type: "REPORTDATA_INTERVIEW_SCHEDULING",
        payload: downrepdata.data,
      });
      toast.success("Downloaded");
    }
  }
  //*********************************************************************************** */
  //Admin
  //*********************************************************************************** */

  async function gethrmusingzohoforadmin(tokken) {
    dispatch({
      type: "LOADING_TRUE",
    });
    const response = await fetch(
      `${ENDPOINT}/api/notification/hrmFromEmail`,
      {
        headers: {
          Authorization: `Bearer ${tokken}`,
        },
      }
    );
    let hrmInfo = await response.json();
    if (response.status === 200) {
      document.cookie = `employeeInfo=${hrmInfo.data.EmployeeID}`;
      //will be changed to cookie in future
      localStorage.setItem("hrm", hrmInfo.data.EmployeeID);
      dispatch({
        type: "ADD_HRM",
        payload: hrmInfo.data.EmployeeID,
      });
      rolecheckfromadmin(hrmInfo.data.EmployeeID, tokken);
    }
  }
  async function rolecheckfromadmin(hrm, tokken) {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/mentorMenteeDifference?HRMID=${hrm}`
    );
    const checker = await response.json();
    if (response.status === 200) {
      localStorage.setItem("role", checker.data.status);
      dispatch({
        type: "ROLE_CHECKER",
        payload: checker.data.status,
      });
      checkadmin(tokken, true);
    }
  }
  async function checkadmin(tokken, admintry) {
    const response = await fetch(
      `${ENDPOINT}/api/admin/isAdmin`,
      {
        headers: {
          Authorization: `Bearer ${tokken}`,
        },
      }
    );
    const ISadmin = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "LOADING_FALSE",
      });
      if (ISadmin.data.status === true) {
        localStorage.setItem("isadmin", "y");
        if (admintry) {
          navigate("/admin/dashboard");
        }
      } else {
        if (admintry) {
          navigate("/");
        }
      }
    } else {
      console.error();
    }
  }

  async function uploadcourse(uploadingcourse, passon) {
    const toastId = toast.loading("Uploading...");
    const bodyFormData = new FormData();
    bodyFormData.append("xl", uploadingcourse.xl);
    // bodyFormData.append('courseName', uploadingcourse.courseName);
    bodyFormData.append("courseId", uploadingcourse.courseId);
    bodyFormData.append("complexity", uploadingcourse.complexity);
    bodyFormData.append("department", uploadingcourse.department);
    // bodyFormData.append('courseOwner', uploadingcourse.courseOwner);
    bodyFormData.append("technology", uploadingcourse.technology);
    bodyFormData.append("days", uploadingcourse.days);
    bodyFormData.append("description", uploadingcourse.description);
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/admin/addCourse`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const postdetails = await response.data;
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Course is uploaded");
        allcoursesinadmin(passon);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function lpcreate(lpname) {
    const toastId = toast.loading("Uploading...");
    const bodyFormDataofCreateLP = new FormData();
    bodyFormDataofCreateLP.append("containerName", lpname.containerName);
    bodyFormDataofCreateLP.append("department", lpname.department);
    bodyFormDataofCreateLP.append("thumbnail", lpname.thumbnail);
    bodyFormDataofCreateLP.append("type", lpname.type);
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/admin/createLp`,
        bodyFormDataofCreateLP,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const resoflp = await response.data;
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resoflp.data.status === true) {
          toast.success(resoflp.data.message);
        } else {
          toast.error(resoflp.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function lplistforlpm() {
    const response = await fetch(
      `${ENDPOINT}/api/courses/departmentOfLearningPathManagement`,
      cheaders
    );
    const lpdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "LPLIST",
        payload: lpdata.data,
      });
    }
  }

  async function admindashdata(
    pageno,
    name,
    dep,
    emp,
    eml,
    wm,
    wl,
    engagement,
    available,
    projectstatus
  ) {
    const sender = {
      name: name,
      department: dep,
      employeeType: emp,
      limit: 50,
      emailId: eml,
      workMode: wm,
      workLocation: wl,
      engagementType: engagement,
      availability: available,
      projectStatus: projectstatus
    };
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/adminDashboard?pageNumber=${pageno}`,
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
      const dashdata = await response.json();
      dispatch({
        type: "LOADING_FALSE",
      });
      if (response.status === 200) {

        if (pageno == 1) {
          dispatch({
            type: "FILTER_ADMIN_EMP_RES",
            payload: dashdata.data
          });
        }
        else {
          dispatch({
            type: "DASH_LIST",
            payload: dashdata.data,
          });
        }



      } else {
        dispatch({
          type: "DASH_LIST",
          payload: {},
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
      dispatch({
        type: "DASH_LIST",
        payload: {},
      });
    }
  }

  async function admindashline() {
    const response = await fetch(
      `${ENDPOINT}/api/admin/dashboardDepartmentAdmin`,
      cheaders
    );
    const linedata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DASH_LINES_DATA",
        payload: linedata.data,
      });
    } else {
      console.error();
    }
  }
  const departmentlist = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/admin/listDistinctDepartment`,
      cheaders
    );
    const departmentdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEPARTMENT_LIST",
        payload: departmentdata.data,
      });
    } else {
      console.error();
    }
  };
  const departmentlistforhrselect = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/listInternTraineeDepartment`,
      cheaders
    );
    const departmentdata = await response.json();
    if (response.status == 200) {
      const temp = await departmentdata.data.map((elem) => {
        return { Department: elem };
      });
      dispatch({
        type: "DEPARTMENT_LIST_HR",
        payload: temp,
      });
    } else {
      console.error();
    }
  };
  async function newadmincreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/createAdmin`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listadmin(1, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newhrbuddycreate(hrbuddy) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/hrbuddy/createHrbuddy`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(hrbuddy),
        }
      );
      const resofhr = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofhr.data.status == false) {
          toast.error(resofhr.data.message);
        } else {
          toast.success(resofhr.data.message);
          listHr(1, "", "");
        }
      } else {
        if (response.status == 400) {
          toast.error(resofhr.message.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newcoursemanager(coursemanager) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addLpManager`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(coursemanager),
        }
      );
      const resofhr = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success(resofhr.data.message);
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  //not in use this is all lp list api for future reference
  // async function lpList(){
  //   const response = await fetch(
  //     `${ENDPOINT}/api/learningPath/listAllLpFromDbs`,
  //     cheaders
  //   )
  //   const lpdata = await response.json();
  //   if(response.status === 200)
  //   {
  //     dispatch({
  //       type:"LP_LIST",
  //       payload:lpdata.data
  //     })
  //   }
  //   else{
  //     console.error();
  //   }
  // }
  async function lpfordep(dep) {
    const sender = {
      department: dep,
    };
    const response = await fetch(
      `${ENDPOINT}/api/admin/listLpsOfDepartment`,
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
    const lpdata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "LP_LIST",
        payload: lpdata.data,
      });
    } else {
      console.error();
    }
  }
  async function learningpathmanagerlist(pageno, searched) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listCourseManager?pageNumber=${pageno}&firstName=${searched}`,
        cheaders
      );
      const managerfound = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LP_MANAGER_LIST",
          payload: managerfound.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function generalfilesadd(file) {
    const toastId = toast.loading("Uploading...");
    const bodyFormDataofgeneral = new FormData();
    bodyFormDataofgeneral.append("pdf", file.filename);
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/samplers/upload`,
        bodyFormDataofgeneral,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const resoffile = await response.data;
      toast.dismiss(toastId);
      if (response.status == 200) {
        toast.success("File has been uploaded");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletemanager(mail, lp) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteLpManager?emailId=${mail}&learningPath=${lp}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
        }
      );
      const result = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        toast.success("Action has been performed");
        learningpathmanagerlist(1, "");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listadmin(pageno, namer) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listAdmin?pageNumber=${pageno}&name=${namer}`,
        cheaders
      );
      const lists = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_ADMIN",
          payload: lists.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deleteAdmin(roledata) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteAdmin`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Admin has been inactivated ");
            } else {
              toast.success("Admin has been activated");
            }
          } else {
            toast.success("Admin deleted successfully");
          }
        }
        listadmin(roledata.pageno, roledata.searchkey);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listHr(pageno, namer, dep) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listHr?pageNumber=${pageno}&name=${namer}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify({ department: dep }),
        }
      );
      const listsofadmin = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_HR",
          payload: listsofadmin.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deleteHr(submit) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteHr`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(submit),
        }
      );
      const resultofdeletehr = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdeletehr.data.status == false) {
          toast.error(resultofdeletehr.data.message);
        } else {
          if (submit.state !== 0) {
            if (submit.state == 2) {
              toast.success("Hr has been inactivated ");
            } else {
              toast.success("Hr has been activated");
            }
          } else {
            toast.success(
              `Hr access has been revoked from ${submit.department} department`
            );
          }
        }
        listHr(submit.pageno, submit.searchkey, submit.seldep);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function allcoursesinadmin(lpname) {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/learningPath/getALpDetailRoleBase?lp=${lpname}`,
        cheaders
      );
      const allcourseslist = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "ALLCOURSES_ADMIN",
          payload: allcourseslist.data,
        });
      }
    } catch {
      console.error();
    }
  }

  async function admindashgraph() {
    const response = await fetch(
      `${ENDPOINT}/api/admin/dashboardCard`,
      cheaders
    );
    const dashgraph = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "DASH_GRAPH",
        payload: dashgraph.data,
      });
    }
  }
  async function adminhrinnerlist(dep, personmail) {
    const submit = {
      department: dep,
      emailId: personmail,
    };
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/buddiesOfDepartment`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(submit),
      }
    );
    const resofadminhrinner = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "HR_OP",
        payload: resofadminhrinner.data,
      });
    }
  }
  async function graphapiforempdetails(name) {
    const response = await axios
      .get(
        `https://graph.microsoft.com/v1.0/users?$select=displayName,mail,id&$filter=startswith(displayName,'${name}')&$top=10`,
        cheaders
      )
      .then((response) => {
        const againuse = response.data.value;
        const temp = againuse.map((elem) => {
          return {
            url: `/users/${elem.id}/photos/48x48/$value`,
            method: "GET",
            id: `${elem.id}`,
          };
        });
        const sender = {
          requests: temp,
        };
        if (temp.length > 0) {
          batchinit(sender, againuse);
        }
      })
      .catch((error) => console.log(error));
  }
  async function batchinit(sender, againuse) {
    const response = await axios
      .post("https://graph.microsoft.com/v1.0/$batch", sender, {
        headers: {
          Authorization: `Bearer ${state.userToken}`,
        },
      })
      .then((res) => {
        let listofpeople = againuse.map((elem) => {
          const here = res.data.responses.filter((ele) => ele.id === elem.id);
          return {
            ...elem,
            photo: "data:image/jpeg;base64, " + here[0].body,
          };
        });
        const anotherpeople = listofpeople.filter((ment) => {
          return ment.photo.split(" ")[1].substring(0, 4) == "/9j/";
        });
        dispatch({
          type: "ALL_PEOPLE_LIST",
          payload: anotherpeople,
        });
      })
      .catch((error) => console.log(error));
  }
  async function refreshtoken() {
    if (!window.location.pathname.includes("preview")) {
      const sender = {
        idToken: state.refreshhelper,
      };
      try {
        const response = await fetch(
          `${ENDPOINT}/api/refreshToken`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
              // Authorization: `Bearer ${state.userToken}`,
            },
            method: "POST",
            body: JSON.stringify(sender),
          }
        );
        const resofrt = await response.json();
        if (response.status == 200) {
          dispatch({
            type: "SET_TOKEN",
            payload: resofrt.data.access_token,
          });
          localStorage.setItem("token", resofrt.data.access_token);
          dispatch({
            type: "SET_ID_TOKEN",
            payload: resofrt.data.refresh_token,
          });
          localStorage.setItem("refreshhere", resofrt.data.refresh_token);
        }
        // else{
        //   localStorage.clear("token");
        //         document.cookie = "access_token=";
        //         navigate("/");
        // }
      } catch {
        console.log("refresh didn't worked");
        // localStorage.clear("token");
        //       document.cookie = "access_token=";
        //       navigate("/");
      }
    }
  }
  //Admin Dashboard data Analytics
  async function AdminDashboardDataAnalytics(require_pramas) {
    dispatch({
      type: "ADMIN_LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/adminDashboardDataAnalytics`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(require_pramas),
        }
      );
      const admin_dash_data = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "ADMIN_DATA_ANALYTICS",
          payload: admin_dash_data.data,
        });
        dispatch({
          type: "ADMIN_LOADING_FALSE",
        });
      }
    } catch (error) {
      dispatch({
        type: "ADMIN_LOADING_FALSE",
      });
      console.log(error);
    }
  }
  async function AdminDashboardNameAnalytics(required_name, required_dep) {
    dispatch({
      type: "LOADING_NAME_ADMIN_ANALYTICS_TRUE",
    });
    const data = {
      emailId: required_name,
      department: required_dep,
    };
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/adminDashboardDataAnalyticRMResource`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const resofanalysis = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "LOADING_NAME_ADMIN_ANALYTICS_FALSE",
        });
        dispatch({
          type: "ADMIN_NAME_ANALYSIS",
          payload: resofanalysis.data,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again");
      dispatch({ type: "LOADING_NAME_ADMIN_ANALYTICS_FALSE" });
    }
  }

  async function AdminDepartmentListData() {
    if (state.adminDepartmentList.length == 0) {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listDistinctDepartment`,
        cheaders
      );
      const list = await response.json();
      if (response.status === 200) {
        dispatch({
          type: "ADMIN_DASHBOARD_DEPARTMENT_LIST",
          payload: list.data,
        });
        dispatch({
          type: "COMMON_DEP_DATA",
          payload: list.data.map((elem) => elem.Department),
        });
      }
    }
  }

  async function AdminDashboardDataSelect(require_pramas) {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listMentorOfDepartment`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(require_pramas),
        }
      );
      const admin_department_select = await response.json();

      if (response.status === 200) {
        dispatch({
          type: "ADMIN_DATA_OF_DEPARTMENT_SELECT",
          payload: admin_department_select.data.mentorList,
        });
        dispatch({
          type: "ADMIN_DATA_ANALYTICS_ACTIVE_USERS",
          payload: admin_department_select.data.totalActiveUsers
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function rolecheckregular() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/mentorMenteeDifference?HRMID=${state.hrm_id}`
    );
    const checker = await response.json();
    if (response.status === 200) {
      localStorage.setItem("role", checker.data.status);
      dispatch({
        type: "ROLE_CHECKER",
        payload: checker.data.status,
      });
      checkadminregular();
    }
  }
  async function checkadminregular() {
    const response = await fetch(
      `${ENDPOINT}/api/admin/isAdmin`,
      {
        headers: {
          Authorization: `Bearer ${state.userToken}`,
        },
      }
    );
    const ISadmin = await response.json();
    if (response.status === 200) {
      if (ISadmin.data.status === true) {
        localStorage.setItem("isadmin", "y");
      } else {
        localStorage.removeItem("isadmin");
        const geturl = window.location.pathname.split("/");
        if (geturl[1] === "admin") {
          navigate("/");
        }
      }
    } else {
      console.error();
    }
  }
  //muskan : hrbuddiesconversionlistapicalling

  async function hrBuddiesConversionList(
    page,
    department,
    name,
    type,
    from,
    to
  ) {
    // console.log(page, department, name, type , from ,to , ",dsfnjnjkmljsefe")
    dispatch({
      type: "LOADING_TRUE",
    });
    let department1 = {
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/hrConversionDetails?from=${from ? from : ""
      }&to=${to ? to : ""}&conversionType=${type ? type : ""}&name=${name ? name : ""
      }&pageNumber=${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const hrbuddylist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "HR_BUDDY_CONVERSION_LIST",
        payload: hrbuddylist.data,
      });
      dispatch({
        type: "LOADING_FALSE",
      });
    } else {
      console.error();
    }
  }

  async function menteedepConversionList(
    page,
    department,
    name,
    type,
    from,
    to
  ) {
    dispatch({
      type: "LOADING_TRUE",
    });
    // console.log(page, department, name, type , from ,to , ",dsfnjnjkmljsefe")
    let department1 = {
      department: department,
      HRMID: state.hrm_id,
    };
    const response = await fetch(
      `${ENDPOINT
      }/api/mentor/menteeConversionDetail?from=${from ? from : ""}&to=${to ? to : ""
      }&conversionType=${type ? type : ""}&name=${name ? name : ""
      }&pageNumber=${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const hrbuddylist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "MENTEE_DEPARTMENT_CONVERSION_LIST",
        payload: hrbuddylist.data,
      });
      dispatch({
        type: "LOADING_FALSE",
      });
    } else {
      console.error();
    }
  }

  async function hrBuddiesDepartmentList() {
    const response = await fetch(
      `${ENDPOINT}/api/hrbuddy/departmentsForHr`,
      {
        headers: {
          Authorization: `Bearer ${state.userToken}`,
        },
      }
    );
    const hrbuddydepartmentlist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEPARTMENT_FOR_HR",
        payload: hrbuddydepartmentlist.data.departmentList,
      });
      dispatch({
        type: "EMPLOYEE_FOR_HR",
        payload: hrbuddydepartmentlist.data.employeeType,
      });
    } else {
      console.error();
    }
  }

  async function menteeDepartmentList() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/departmentsForMentor`,
      {
        headers: {
          Authorization: `Bearer ${state.userToken}`,
        },
      }
    );
    const menteedepartmentlist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEPARTMENT_FOR_MENTEE",
        payload: menteedepartmentlist.data,
      });
    } else {
      console.error();
    }
  }
  async function requestdata() {
    const response = await fetch(
      `${ENDPOINT}/api/role/requestInsight`,
      cheaders
    );
    const requestdatajson = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "REQUEST_DATA",
        payload: requestdatajson.data,
      });
    } else {
      console.error();
    }
  }
  async function listdephead(pageno, namer, dep) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listDepartmentHead?pageNumber=${pageno}&name=${namer}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify({ department: dep }),
        }
      );
      const listsofadmindep = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_DEP_HEAD",
          payload: listsofadmindep.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deletedephead(submit) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteDepartmentHead`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(submit),
        }
      );
      const resultofdeletehr = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdeletehr.data.status == false) {
          toast.error(resultofdeletehr.data.message);
        } else {
          if (submit.state !== 0) {
            if (submit.state == 2) {
              toast.success("Department head has been inactivated ");
            } else {
              toast.success("Department head has been activated");
            }
          } else {
            toast.success(
              `Department head's access has been revoked from ${submit.department} department`
            );
          }
        }
        listdephead(submit.pageno, submit.searchkey, submit.seldep);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newheadofdepcreate(depheadatta) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addDepartmentHead`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(depheadatta),
        }
      );
      const resofhr = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofhr.data.status == false) {
          toast.error(resofhr.data.message);
        } else {
          toast.success(resofhr.data.message);
          listdephead(1, depheadatta.searchkey, depheadatta.seldep);
        }
      } else {
        if (response.status == 400) {
          toast.error(resofhr.message.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listlpadmin(pageno, namer) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listLpAdmin?pageNumber=${pageno}&name=${namer}`,
        cheaders
      );
      const lists = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_LP_ADMIN",
          payload: lists.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deletelpAdmin(roledata) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteLpAdmin`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("LP Admin has been inactivated ");
            } else {
              toast.success("LP Admin has been activated");
            }
          } else {
            toast.success("LP Admin deleted successfully");
          }
        }
        listlpadmin(roledata.pageno, roledata.searchkey);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newlpadmincreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addLpAdmin`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listlpadmin(1, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function lpnamesapi() {
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/existingLpList`,
      cheaders
    );
    const listsofnames = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "LIST_OF_LP_NAMES",
        payload: listsofnames.data,
      });
    }
  }
  async function listcourseEditor(pageno, namer, learningPath) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listCourseEditor?pageNumber=${pageno}&name=${namer}&learningPath=${learningPath}`,
        cheaders
      );
      const listsofcourseed = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_COURSE_ED",
          payload: listsofcourseed.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function newcourseeditorcreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addCourseEditor`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listcourseEditor(1, "", "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletecourseEditor(roledata) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteCourseEditor`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Course Editor has been inactivated ");
            } else {
              toast.success("Course Editor has been activated");
            }
          } else {
            toast.success(
              `Course Editor access has been revoked from ${roledata.courseId} course successfully`
            );
          }
        }
        listcourseEditor(roledata.pageno, roledata.searchkey, roledata.seldep);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listCourseReviewer(pageno, namer, learningPath) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listCourseReviewer?pageNumber=${pageno}&name=${namer}&learningPath=${learningPath}`,
        cheaders
      );
      const listsofcourseed = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_COURSE_REVIEW",
          payload: listsofcourseed.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function newcoursereviewercreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addCourseReviewer`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listCourseReviewer(1, "", "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletecourseReviewer(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteCourseReviewer`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Course Reviewer has been inactivated ");
            } else {
              toast.success("Course Reviewer has been activated");
            }
          } else {
            toast.success(
              `Course Reviewer access has been revoked from ${roledata.courseId} course successfully`
            );
          }
        }
        listCourseReviewer(
          roledata.pageno,
          roledata.searchkey,
          roledata.seldep
        );
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listCourseViewer(pageno, namer, learningPath) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listCourseViewer?pageNumber=${pageno}&name=${namer}&learningPath=${learningPath}`,
        cheaders
      );
      const listsofcourseed = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_COURSE_VIEW",
          payload: listsofcourseed.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function newcourseviewercreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addCourseViewer`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listCourseViewer(1, "", "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletecourseViewer(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteCourseViewer`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Course Viewer has been inactivated ");
            } else {
              toast.success("Course Viewer has been activated");
            }
          } else {
            toast.success(
              `Course Viewer access has been revoked from ${roledata.courseId} course successfully`
            );
          }
        }
        listCourseViewer(roledata.pageno, roledata.searchkey, roledata.seldep);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listConversionManager(pageno, namer) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/conversion/listConversionChecker?pageNumber=${pageno}&name=${namer}`,
        cheaders
      );
      const listsofcourseed = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_CONVERSION_MANAGER",
          payload: listsofcourseed.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function newconversionmanageradd(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/conversion/createConversionChecker`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listConversionManager(1, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function deletecourseManager(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/conversion/deleteConversionChecker`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Conversion Manager has been inactivated ");
            } else {
              toast.success("Conversion Manager has been activated");
            }
          } else {
            toast.success(
              `Conversion Manager access has been revoked successfully`
            );
          }
        }
        listConversionManager(roledata.pageno, roledata.searchkey);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listlpmanager(pageno, namer, learningPath) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listLpManager?pageNumber=${pageno}&learningPath=${learningPath}&name=${namer}`,
        cheaders
      );
      const listsofcourseed = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_LP_MANAGER",
          payload: listsofcourseed.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deleteLpManager(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteLpManager`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Lp manager has been inactivated ");
            } else {
              toast.success("Lp manager has been activated");
            }
          } else {
            toast.success(
              `Lp manager access has been revoked from ${roledata.learningPath} course successfully`
            );
          }
        }
        listlpmanager(roledata.pageno, roledata.searchkey, roledata.seldep);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newlpmanageradd(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addLpManager`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listlpmanager(1, "", "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function defaultcountapi() {
    const response = await fetch(
      `${ENDPOINT}/api/admin/countOfRole`,
      cheaders
    );
    const roledata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "COUNT_OF_ROLE",
        payload: roledata.data,
      });
    }
  }
  async function innerlpteam(pageno, namer, learningPath, courseid) {
    const response = await fetch(
      `${ENDPOINT}/api/admin/listMemberFromlpTeam?pageNumber=${pageno}&learningPath=${learningPath}&courseId=${courseid}&name=${namer}`,
      cheaders
    );
    const listsofcourseed = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "LP_MANAGER_INNERLIST",
        payload: listsofcourseed.data,
      });
    }
  }
  async function deleteinnerlp(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteMemberFromLpTeam`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Member has been inactivated ");
            } else {
              toast.success("Member has been activated");
            }
          } else {
            toast.success(
              `Member access has been revoked from ${roledata.courseId} course successfully`
            );
          }
        }
        innerlpteam(
          roledata.pageno,
          roledata.searchkey,
          roledata.learningPath,
          roledata.selcour
        );
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newinnerlpteam(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/assignMemberToLpTeam`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          innerlpteam(1, "", adminemail.learningPath, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function createcustomrole(roledata) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/role/createCustomRole`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(roledata),
        }
      );
      const customdata = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (customdata.data.status == true) {
          toast.success(customdata.data.message);
          defaultcountapi();
          customdashvalues();
        } else {
          toast.error(customdata.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function customdashvalues() {
    const response = await fetch(
      `${ENDPOINT}/api/admin/customRolesDashboard`,
      cheaders
    );
    const dashres = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "CUS_ROLE_DATA",
        payload: dashres.data,
      });
    }
  }
  async function listcustomdata(pageno, namer, roleid) {
    const response = await fetch(
      `${ENDPOINT}/api/admin/listMembersOfCustomRole?pageNumber=${pageno}&name=${namer}&customRoleId=${roleid}`,
      cheaders
    );
    const listsofcourseed = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "LIST_CUSTOM_DATA",
        payload: listsofcourseed.data,
      });
    }
  }
  async function scheduleinterview(data, page) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/interview/scheduleInterview`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const customdata = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (customdata.data.status == true) {
          toast.success(customdata.data.message);
        } else {
          toast.error(customdata.data.message);
        }
        interviewlistdata({
          pageNumber: page,
          from: "",
          to: "",
          name: "",
          interviewType: "Mock,Trainee,FTE",
          interviewStatus: "Completed,Scheduled",
        });
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function schedulingassistant(data) {
    const response = await fetch(
      `${ENDPOINT}/api/interview/schedulingAssistant`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const resofassistant = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "ASSISTANT_DATA",
        payload: resofassistant.data,
      });
    }
  }
  async function postdetailsofinterviewdata(data, page) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/interview/fillInterviewFeedback`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const resofassistant = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resofassistant.data.status == true) {
          toast.success(resofassistant.data.message);
        } else {
          toast.error(resofassistant.data.message);
        }
        interviewlistdata({
          pageNumber: page,
          from: "",
          to: "",
          name: "",
          interviewType: "Mock,Trainee,FTE",
          interviewStatus: "Completed,Scheduled",
        });
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function getdetailsofinterviewdata(id) {
    const response = await fetch(
      `${ENDPOINT}/api/interview/getInterviewFeedbackData?sInterviewId=${id}`,
      cheaders
    );
    const resofassistant = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "POST_DATA",
        payload: resofassistant.data,
      });
    }
  }
  async function deleteempofcustom(data) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteMembersFromCustomRole`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const resofassistant = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resofassistant.data.status == true) {
          toast.success(resofassistant.data.message);
          listcustomdata(data.pageno, data.searchkey, data.customRoleId);
        } else {
          toast.error(resofassistant.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }

  async function deletecustomrole(data) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/role/deleteCustomRole`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(data),
        }
      );
      const resofassistant = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resofassistant.data.status == true) {
          toast.success(resofassistant.data.message);
        } else {
          toast.error(resofassistant.data.message);
        }
        customdashvalues();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function addcustommember(customdata) {
    const toastId = toast.loading("Adding Member...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addMemberToCustomRole`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(customdata),
        }
      );
      const resofassistant = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resofassistant.data.status == true) {
          toast.success(resofassistant.data.message);
          listcustomdata(
            customdata.pageno,
            customdata.searchkey,
            customdata.customRoleId
          );
        } else {
          toast.error(resofassistant.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }

  async function depheadlist(page, name, department, type, wm, wl, engagement, avi, prjstatus) {
    const senddata = {
      department: department,

      employeeType: type,

      workMode: wm,

      workLocation: wl,

      engagementType: engagement,
      name: name,
      availability: avi,
      limit: 50,
      emailId: "",
      projectStatus: prjstatus
    };

    dispatch({
      type: "DEP_LOADING_TRUE",
    });

    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/adminDashboard?pageNumber=${page}`,

        {
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",

            Authorization: `Bearer ${state.userToken}`,
          },

          method: "POST",

          body: JSON.stringify(senddata),
        }
      );

      const depres = await response.json();

      if (response.status === 200) {
        dispatch({
          type: "DEP_LOADING_FALSE",
        });

        if (page === 1) {
          dispatch({
            type: "FILTER_DEPRES",

            payload: depres.data,
          });
        } else {
          dispatch({
            type: "DEPRES_LIST",

            payload: depres.data,
          });
        }
      } else {
        dispatch({
          type: "DEP_LOADING_FALSE",
        });
      }
    } catch (err) {
      if (state.depheadlistdata.deparr.length === 0) {
        toast.error("Error in department head: " + err.message);
      }

      dispatch({
        type: "DEP_LOADING_FALSE",
      });
    }
  }
  async function depheaddeplist() {
    const response = await fetch(
      `${ENDPOINT}/api/departmentHead/listDepartments`,
      cheaders
    );
    const depres = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEPARTMENT_LIST",
        payload: depres.data.departmentList,
      });
    } else {
      console.error();
    }
  }

  async function depheadConversionList(page, department, name, type, from, to) {
    // console.log(page, department, name, type , from ,to , ",dsfnjnjkmljsefe")
    dispatch({
      type: "LOADING_TRUE",
    });
    let department1 = {
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT
      }/api/departmentHead/listResourcesConversion?from=${from ? from : ""
      }&to=${to ? to : ""}&conversionType=${type ? type : ""}&name=${name ? name : ""
      }&pageNumber=${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const headconlist = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEPHEAD_CONVERSION_LIST",
        payload: headconlist.data,
      });
      dispatch({
        type: "LOADING_FALSE",
      });
    } else {
      console.error();
    }
  }
  async function downreportforcomcon(department, name, type, from, to) {
    const toastId = toast.loading("Downloading ....");
    let department1 = {
      department: department,
    };
    const response = await fetch(
      `${ENDPOINT
      }/api/conversion/downloadListConversionMonthDetailForChecker?from=${from ? from : ""
      }&to=${to ? to : ""}&conversionType=${type ? type : ""}&name=${name ? name : ""
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(department1),
      }
    );
    const downrepdata = await response.json();
    toast.dismiss(toastId);
    if (response.status == 200) {
      dispatch({
        type: "REPORTDATA_COMMON_CON",
        payload: downrepdata.data,
      });
      toast.success("Downloaded");
    }
  }
  async function assigndeptolp(lpdata) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/assignDepartmentToLps`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(lpdata),
        }
      );
      const resoflp = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success(resoflp.data.message);
        allcoursesinadmin(lpdata.lp);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function coursecreating(coursedata) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/courses/ongoingCourseCreationUpload`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(coursedata),
        }
      );
      toast.dismiss(toastId);
      const resofcourse = await response.json();
      if (response.status === 200) {
        if (resofcourse.data.status == true) {
          toast.success(resofcourse.data.message);
          window.history.back();
        } else {
          toast.error(resofcourse.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function getdepoflp(lpname) {
    const response = await fetch(
      `${ENDPOINT}/api/learningPath/getDepartmentOfLp?lp=${lpname}`,
      cheaders
    );
    const depodata = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "DEP_OF_LP",
        payload: depodata.data,
      });
    }
  }
  async function gettllist() {
    const response = await fetch(
      `${ENDPOINT}/api/conversion/listTeamLead`,
      cheaders
    );
    const tldata = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "GETTLLIST",
        payload: tldata.data,
      });
    }
  }
  async function submitcourse(coursedata) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/courses/ongoingCourseCreationContent`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(coursedata),
        }
      );
      toast.dismiss(toastId);
      const resofcourse = await response.json();
      if (response.status == 200) {
        if (resofcourse.data.status == true) {
          toast.success("Course Progress have been saved");
        } else {
          toast.error("Something went wrong. Please Try again");
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function getupdatedcourse(courseid) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/getOngoingCourseCreationContent?courseId=${courseid}`,
      cheaders
    );
    const resofcourse = await response.json();
    if (response.status == 200) {
      let coursevalues = resofcourse.data.coursevalues;
      let finalAssessment = resofcourse.data.finalAssessment;
      if (coursevalues == null) {
        coursevalues = [];
      }
      if (finalAssessment == null) {
        finalAssessment = { isdone: false };
      }
      const temp = {
        ...resofcourse.data,
        type: "Save",
        coursevalues: coursevalues,
        finalAssessment: finalAssessment,
      };
      if (sessionStorage) {
        if (sessionStorage.getItem(`course:${temp.courseId}`)) {
          // toast("Save your Progress as Draft. Before it gets lost");
        } else {
          sessionStorage.setItem(
            `course:${temp.courseId}`,
            JSON.stringify(temp)
          );
        }
      } else {
        sessionStorage.setItem(`course:${temp.courseId}`, JSON.stringify(temp));
      }
      dispatch({
        type: "C_D_C",
        payload: temp,
      });
    }
  }
  async function postcomment(data) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/courses/addCommentsToUnderDevelopmentCourse`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      toast.dismiss(toastId);
      const resofcomment = await response.json();
      if (response.status == 200) {
        if (resofcomment.data.status == true) {
          toast.success(resofcomment.data.message);
          getcomments(data.courseId);
        } else {
          toast.error(resofcomment.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function getcomments(courseid) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/getCommentsOfUnderDevelopmentCourse?courseId=${courseid}`,
      cheaders
    );
    const resofcom = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "GET_COMMENTS",
        payload: resofcom.data,
      });
    }
  }
  async function sendforapproval(course) {
    const data = {
      courseId: course,
    };
    const toastId = toast.loading("Requesting...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/courses/sendCourseForApproalByEditor`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      toast.dismiss(toastId);
      const resofcomment = await response.json();
      if (response.status == 200) {
        if (resofcomment.data.status == true) {
          toast.success(resofcomment.data.message);
        } else {
          toast.error(resofcomment.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function getroleforpreview(lp, course) {
    const response = await fetch(
      `${ENDPOINT}/api/courses/getRoleForLearningPathManagementOfSpecificCourse?courseId=${course}&learningPath=${lp}`,
      cheaders
    );
    const resofrole = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "ROLEFOR_E_R",
        payload: resofrole.data,
      });
    }
  }
  async function publishcourse(course) {
    const data = {
      courseId: course,
    };
    const toastId = toast.loading("Requesting...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/courses/reviewerPublishCourse`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      toast.dismiss(toastId);
      const resofcomment = await response.json();
      if (response.status == 200) {
        if (resofcomment.data.status == true) {
          toast.success(resofcomment.data.message);
        } else {
          toast.error(resofcomment.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please Try again");
    }
  }
  async function listinterviewers(pageno, namer) {
    dispatch({
      type: "LOADING_TRUE",
    });
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listInterviewSchedular?pageNumber=${pageno}&name=${namer}`,
        cheaders
      );
      const lists = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_INTERVIEWER",
          payload: lists.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deleteInterviewer(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteInterviewSchedular`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Interviewer has been inactivated ");
            } else {
              toast.success("Interviewer has been activated");
            }
          } else {
            toast.success("Interviewer deleted successfully");
          }
        }
        listinterviewers(roledata.pageno, roledata.searchkey);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newinterviewercreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addInterviewSchedular`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listinterviewers(1, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function listteamleads(pageno, namer) {
    dispatch({
      type: "LOADING_TRUE",
    });
    let rolewhere = "";
    const geturl = window.location.pathname.split("/");
    if (geturl[1] === "admin") {
      rolewhere = "a";
    } else {
      rolewhere = "d";
    }
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/listAllTeamLead?pageNumber=${pageno}&name=${namer}&role=${rolewhere}`,
        cheaders
      );
      const lists = await response.json();
      if (response.status == 200) {
        dispatch({
          type: "LOADING_FALSE",
        });
        dispatch({
          type: "LIST_OF_TEAMLEADS",
          payload: lists.data,
        });
      }
    } catch {
      dispatch({
        type: "LOADING_FALSE",
      });
    }
  }
  async function deleteTeamlead(roledata) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/deleteTeamLead`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "DELETE",
          body: JSON.stringify(roledata),
        }
      );
      const resultofdelete = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (resultofdelete.data.status == false) {
          toast.error(resultofdelete.data.message);
        } else {
          if (roledata.state !== 0) {
            if (roledata.state == 2) {
              toast.success("Team Lead has been inactivated ");
            } else {
              toast.success("Team Lead has been activated");
            }
          } else {
            toast.success("Team Lead deleted successfully");
          }
        }
        listteamleads(roledata.pageno, roledata.searchkey);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function newteamleadcreate(adminemail) {
    const toastId = toast.loading("Saving...");
    try {
      const response = await fetch(
        `${ENDPOINT}/api/admin/addTeamLead`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(adminemail),
        }
      );
      const resofadmin = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (resofadmin.data.status == false) {
          toast.error(resofadmin.data.message);
        } else {
          toast.success(resofadmin.data.message);
          listteamleads(1, "");
        }
      } else {
        console.error();
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function downreportforadminemp(
    name,
    department,
    type,
    email,
    wm,
    wl,
    engagement,
    availability,
    projectStatus
  ) {
    // const toastId = toast.loading("Downloading ....");
    let data = {
      name: name,
      emailId: email,
      department: department,
      employeeType: type,
      workMode: wm,
      workLocation: wl,
      engagementType: engagement,
      availability: availability,
      projectStatus: projectStatus
    };
    const response = await fetch(
      `${ENDPOINT}/api/admin/downloadAdminDashboardData`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const downrepdata = await response.json();
    // toast.dismiss(toastId);
    if (response.status == 200) {
      dispatch({
        type: "REPORTDATA_ADMIN_EMP",
        payload: downrepdata.data,
      });
      // toast.success("Downloaded");
    }
  }
  async function getallusersforfiles(email) {
    const response = await fetch(
      `${ENDPOINT}/api/dataEvaluation/getAllFile?emailId=${email !== "" ? `${email}@celebaltech.com` : ""
      }`,
      cheaders
    );
    const resofeval = await response.json();
    if (response.status === 200) {
      dispatch({
        type: "EVAL_RESULT",
        payload: resofeval.data,
      });
    }
  }
  async function uploadfilesofevaluation(uploadingfiles) {
    const toastId = toast.loading("Uploading...");
    const bodyFormData = new FormData();
    for (const file of uploadingfiles) {
      bodyFormData.append("pdfFiles", file);
    }
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/dataEvaluation/fileUpload`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.userToken}`,
          },
        }
      );
      const postdetails = await response.data;
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (postdetails.data.status) {
          toast.success(postdetails.data.message);
          getallusersforfiles("");
        } else {
          toast.error(postdetails.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function downreportfordephead(
    searchkey,
    departments,
    employess,
    wm,
    wl,
    engagement,
    availability,
    projectStatus
  ) {
    // const toastId = toast.loading("Downloading ....");
    let data = {
      name: searchkey,
      emailId: "",
      department: departments,
      employeeType: employess,
      workMode: wm,
      workLocation: wl,
      engagementType: engagement,
      availability: availability,
      projectStatus: projectStatus
    };
    const response = await fetch(
      `${ENDPOINT}/api/admin/downloadAdminDashboardData`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const downrepdata = await response.json();
    // toast.dismiss(toastId);
    if (response.status == 200) {
      dispatch({
        type: "REPORTDATA_DEP_HEAD",
        payload: downrepdata.data,
      });
      // toast.success("Downloaded");
    }
  }
  async function addworkmodelocation(mode, location) {
    const toastId = toast.loading("Saving ....");
    let data = {
      workMode: mode,
      workLocation: location,
    };
    try {
      const response = await fetch(
        `${ENDPOINT}/api/profile/addWorkModeAndLocation`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      const putdata = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (putdata.data.status) {
          toast.success(putdata.data.message);
          getprofiledata();
        } else {
          toast.error(putdata.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  async function addskills(primary, overall) {
    const toastId = toast.loading("Saving ....");
    let data = {
      primarySkill: primary,
      overallSkills: overall,
    };
    try {
      const response = await fetch(
        `${ENDPOINT}/api/profile/addPrimaryAndOverallSkills`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      const putdata = await response.json();
      toast.dismiss(toastId);
      if (response.status == 200) {
        if (putdata.data.status) {
          toast.success(putdata.data.message);
          getprofileengagement();
        } else {
          toast.error(putdata.data.message);
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }




  const takeActionForPipHRBuddy = async (email, type) => {
    const toastId = toast.loading("Please Wait !!!");

    const data = {
      emailId: email,
      type: type
    }

    try {
      const response = await fetch(
        `${ENDPOINT}/api/hrbuddy/pipInitialization`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const postData = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (postData.data.status) {
          toast.success(postData.data.message);

        } else {
          toast.error(postData.data.message);
        }
      }
    }
    catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }

  async function PIPRequest() {
    const response = await fetch(
      `${ENDPOINT}/api/mentor/menteePIPRequests`,
      cheaders
    );
    const pipReq = await response.json();
    if (response.status == 200) {
      dispatch({
        type: "PIP_REQUESTS",
        payload: pipReq.data,
      });
    }
  }

  const PIPActionFromMentor = async (CID, status) => {
    const toastId = toast.loading("Please Wait !!!");

    const data = {
      CID: CID,
      status: status
    }

    try {
      const response = await fetch(
        `${ENDPOINT}/api/mentor/menteePIPActions`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
          method: "PATCH",
          body: JSON.stringify(data),
        }
      );
      const postData = await response.json();
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (postData.data.status) {
          toast.success(postData.data.message);
          PIPRequest();
        } else {
          toast.error(postData.data.message);
        }
      }
    }
    catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }



  return (
    <GlobalContext.Provider
      value={{
        refreshhelper: state.refreshhelper,
        tickets: state.tickets,
        hrm_id: state.hrm_id,
        myCourses: state.myCourses,
        sampleFiles: state.sampleFiles,
        loading: state.loading,
        getTechnogoiesInfo: state.getTechnogoiesInfo,
        courseCompletionData: state.courseCompletionData,
        ticketStatusInfo: state.ticketStatusInfo,
        allCousersData: state.allCousersData,
        leaderboardData: state.leaderboardData,
        singleCourseInfo: state.singleCourseInfo,
        notesforenrolled: state.notesforenrolled,
        linkforenrolledvideo: state.linkforenrolledvideo,
        enrolledCourseInfo: state.enrolledCourseInfo,
        notes: state.notes,
        saveacourseid,
        saveatime,
        saveatopic,
        saveanote,
        saveasubtopic,
        getvideoafterclick,
        addNotes,
        getNotes,
        getCourseCompletionNumber,
        getTechnogoies,
        allTickets,
        addTicket,
        getMyCourse,
        getSamplerFile,
        getTicketStatusInfo,
        getAllCourses,
        getLeaderBoard,
        gethrmusingzoho,
        enrollCourse,
        courseDataById,
        navigate,
        addToken,
        userToken: state.userToken,
        posttimeofstartingcourse,
        saveasubtopicID,
        saveatopicID,
        putupdateofcurrentcourse,
        saveasubtopicIDinenrolled,
        saveatopicIDinenrolled,
        updateoftimefromlasttime,
        userMail: state.userMail,
        getallpath,
        allunenrolledpath: state.allunenrolledpath,
        singlePathInfo: state.singlePathInfo,
        getsingleunenrolledpath,
        myCompletedcourses: state.myCompletedcourses,
        enrollPath,
        getallpathindashboard,
        allenrolledpaths: state.allenrolledpaths,
        role: state.role,
        rolecheck,
        menteelistdata: state.menteelistdata,
        getallmenteelist,
        getprofiledata,
        userprofiledata: state.userprofiledata,
        menteescoursesrequest: state.menteescoursesrequest,
        getmenteescourserequest,
        updatecourserequest,
        ticketdataofemployee,
        menteeticketlist: state.menteeticketlist,
        updateticketrequest,
        hrbuddylist,
        buddylists: state.buddylists,
        menteedetailsforview,
        menteedetailsofview: state.menteedetailsofview,
        lpformenteereport,
        ticketformenteereport,
        coursestatusofmentee,
        enrollcoursesreport: state.enrollcoursesreport,
        uploadtaskofmentee,
        postdetailsoffeedbackreport,
        // gettaskdonereport,
        taskdonereport: state.taskdonereport,
        getfeedbackofmentee,
        feedbackfromreport: state.feedbackfromreport,
        updateprofiledata,
        menteenotification,
        menteenotificationlist: state.menteenotificationlist,
        reasonsofticket: state.reasonsofticket,
        sendtoperson,
        buddiestickets,
        budticketlist: state.budticketlist,
        updatebuddieticketrequest,
        profileImg: state.profileImg,
        // getprofilephto,
        cmlist: state.cmlist,
        getlistofcoursemanager,
        getlatestprogress,
        graphapiforempdetails,
        poc: state.poc,
        listofmenteesinsm: state.listofmenteesinsm,
        geteachassigner,
        getallassigner,
        listofallsecondary: state.listofallsecondary,
        secondmentor,
        listoffreementee: state.listoffreementee,
        freementor,
        allrequestexit,
        playpause: state.playpause,
        runrequest,
        conversionmentor,
        conversionmentordata: state.conversionmentordata,
        conversionmenteehead: state.conversionmenteehead,
        // pmtc,
        pmtlrole: state.pmtlrole,
        pmrequest,
        tlrequest,
        pmlist: state.pmlist,
        tllist: state.tllist,
        projectlistofper,
        projectslist: state.projectslist,
        actionoftl,
        formofpm,
        curractivereport: state.curractivereport,
        setcurrreport,
        downloadreportall,
        downloadreportallfull,
        downloadreportalldata: state.downloadreportalldata,
        reportforeach,
        downloadsinglefull: state.downloadsinglefull,
        downloadsingleonlyfn,
        downloadsingleonly: state.downloadsingleonly,
        downloadrepoforhr: state.downloadrepoforhr,
        downloadreportforhr,
        getallmenteelistvalidation,
        getallbuddylistvalidation,
        newinterviewdetails: state.newinterviewdetails,
        updatedetailsoffeedbackreport,
        depselforallpath: state.depselforallpath,
        getallmenteelistforeach,
        mentorinfomail: state.mentorinfomail,
        navdata: state.navdata,
        havenav,
        convtype,
        convarr: state.convarr,
        comdeplist: state.comdeplist,
        commonconverionbigapi,
        activenavpoint: state.activenavpoint,
        defaultavailabletime: state.defaultavailabletime,
        getavailableschedule,
        interviewlist: state.interviewlist,
        interviewlistdata,
        scheduleinterview,
        assistantdata: state.assistantdata,
        schedulingassistant,
        postdetailsofinterviewdata,
        getdetailsofinterviewdata,
        postdata: state.postdata,
        deleteempofcustom,
        deletecustomrole,
        buddyactivestate: state.buddyactivestate,
        buddylistsearchvar: state.buddylistsearchvar,
        mentoractivestate: state.mentoractivestate,
        activehierarchy: state.activehierarchy,
        mentorlistsearchvar: state.mentorlistsearchvar,
        depheadlist,
        depheadlistdata: state.depheadlistdata,
        deplongerintegration: state.deplongerintegration,
        hrbuddylongerintegration: state.hrbuddylongerintegration,
        depheaddatapageno: state.depheaddatapageno,
        hrbuddypageno: state.hrbuddypageno,
        empsforHr: state.empsforHr,
        deploading: state.deploading,
        hrloading: state.hrloading,
        deplistsearchvar: state.deplistsearchvar,
        deplistdepartsaved: state.deplistdepartsaved,
        depheadconversionlist: state.depheadconversionlist,
        depheadConversionList,
        depheadactiveside: state.depheadactiveside,
        downrepforcommoncon: state.downrepforcommoncon,
        downreportforcomcon,
        downrepoindephead: state.downrepoindephead,
        downreportfordephead,
        addworkmodelocation,
        addskills,

        //admin

        checkadmin,
        uploadcourse,
        gethrmusingzohoforadmin,
        lpcreate,
        lplistforlpm,
        lplistdata: state.lplistdata,
        adminDataAnalyticsActiveUsers: state.adminDataAnalyticsActiveUsers,
        admindashdata,
        dashlist: state.dashlist,
        adminlinedata: state.adminlinedata,
        admindashline,
        departmentlistdata: state.departmentlistdata,
        departmentlist,
        newadmincreate,
        newhrbuddycreate,
        newcoursemanager,
        // lpList,
        lpListdatacoursemanager: state.lpListdatacoursemanager,
        lpfordep,
        firsttimelogin,
        firstattempt: state.firstattempt,
        learningpathmanagerlist,
        managerlistall: state.managerlistall,
        generalfilesadd,
        deletemanager,
        listadmin,
        adminlistall: state.adminlistall,
        deleteAdmin,
        hrlistall: state.hrlistall,
        listHr,
        deleteHr,
        allcoursesinadmin,
        allcoursesmanagement: state.allcoursesmanagement,
        graphdata: state.graphdata,
        admindashgraph,
        adminhrinnerlist,
        bdt: state.bdt,
        refreshtoken,
        departmentlistforhrselect,
        AdminDashboardDataAnalytics,
        AdminDashboardNameAnalytics,
        adminDataAnalytics: state.adminDataAnalytics,
        adminDepartmentList: state.adminDepartmentList,
        AdminDepartmentListData,
        AdminDashboardDataSelect,
        adminDataOfDepartmentSelect: state.adminDataOfDepartmentSelect,
        adminLoading: state.adminLoading,
        rolecheckregular,
        adminDataAnalyticsDepartmentName:
          state.adminDataAnalyticsDepartmentName,
        adminDataAnalyticsMentorHrmId: state.adminDataAnalyticsMentorHrmId,
        dispatch,
        //muskan : hrbuddiesconversionlistapicalling
        hrBuddiesConversionList,
        hrbuddyConversionList: state.hrbuddyConversionList,
        departmentsForHr: state.departmentsForHr,
        hrBuddiesDepartmentList,
        departmentsForMentee: state.departmentsForMentee,
        menteeDepartmentList,
        menteedepConversionList,
        menteeConversionList: state.menteeConversionList,
        requestdata,
        requesttrigger: state.requesttrigger,
        navroutes: state.navroutes,
        departmentlistdatahr: state.departmentlistdatahr,
        depheadlistall: state.depheadlistall,
        listdephead,
        deletedephead,
        newheadofdepcreate,
        adminDepartmentListDephead: state.adminDepartmentListDephead,
        listlpadmin,
        newlpadmincreate,
        deletelpAdmin,
        lpadminlist: state.lpadminlist,
        listcourseEditor,
        courseedlist: state.courseedlist,
        lpnamesapi,
        lpnamerelevent: state.lpnamerelevent,
        lpnamelist: state.lpnamelist,
        lpnamereleventfilter: state.lpnamereleventfilter,
        newcourseeditorcreate,
        deletecourseEditor,
        listCourseReviewer,
        newcoursereviewercreate,
        deletecourseReviewer,
        coursemanagerlist: state.coursemanagerlist,
        listCourseViewer,
        newcourseviewercreate,
        deletecourseViewer,
        courseviewlist: state.courseviewlist,
        listConversionManager,
        conversionmanagerlist: state.conversionmanagerlist,
        newconversionmanageradd,
        deletecourseManager,
        listlpmanager,
        lpmanagerdetails: state.lpmanagerdetails,
        deleteLpManager,
        newlpmanageradd,
        defaultcounts: state.defaultcounts,
        defaultcountapi,
        innerlpteam,
        lpinnerlistdata: state.lpinnerlistdata,
        deleteinnerlp,
        newinnerlpteam,
        createcustomrole,
        customdashvalues,
        customsno: state.customsno,
        customindata: state.customindata,
        listcustomdata,
        comconprev: state.comconprev,
        buddyconprev: state.buddyconprev,
        depheadconprev: state.depheadconprev,
        menteeconprev: state.menteeconprev,
        tabswitchforrolemanagement: state.tabswitchforrolemanagement,
        secondaryseen: state.secondaryseen,
        addcustommember,
        downloadreportforhrsimple,
        downloadrepoforhrsimple: state.downloadrepoforhrsimple,
        assigndeptolp,
        coursecreating,
        getdepoflp,
        depoflp: state.depoflp,
        gettllist,
        teamlist: state.teamlist,
        submitcourse,
        getupdatedcourse,
        coursecompletedata: state.coursecompletedata,
        coursemanagechangingdata: state.coursemanagechangingdata,
        postcomment,
        getcomments,
        commentsData: state.commentsData,
        sendforapproval,
        publishcourse,
        getroleforpreview,
        roleforemployee: state.roleforemployee,
        listinterviewers,
        interviewerlist: state.interviewerlist,
        deleteInterviewer,
        newinterviewercreate,
        listteamleads,
        deleteTeamlead,
        newteamleadcreate,
        listdataofteamleads: state.listdataofteamleads,
        socket: state.socket,
        userprofileengagementdata: state.userprofileengagementdata,
        getprofileengagement,
        uploadcertificate,
        deletecertificate,
        downreportforadminemp,
        downrepoforadminemp: state.downrepoforadminemp,
        getallfullmenteelist,
        hiearchydata: state.hiearchydata,
        getallusersforfiles,
        evalresult: state.evalresult,
        uploadfilesofevaluation,
        download_report_for_interview_scheduling,
        downintersched: state.downintersched,
        depheaddeplist,
        NotificationArray: state.NotificationArray,
        adminnameloading: state.adminnameloading,
        activeAdminDashboard: state.activeAdminDashboard,

        takeActionForPipHRBuddy,
        PIPRequest,
        pipRequestsList: state.pipRequestsList,
        PIPActionFromMentor,
        adminemplongerintegration: state.adminemplongerintegration,
        adminempcurrentpage: state.adminempcurrentpage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
