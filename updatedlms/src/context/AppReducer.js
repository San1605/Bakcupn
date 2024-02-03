const AppReducer = (state, action) => {
  switch (action.type) {
    case "ALL_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };
    case "LOADING_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_FALSE":
      return {
        ...state,
        loading: false,
      };
    case "ADD_TASK":
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case "GET_MY_COURSE":
      return {
        ...state,
        myCourses: action.payload,
      };
    case "COURSE_DATA_INFO":
      return {
        ...state,
        singleCourseInfo: action.payload,
      };
    case "ENROLLED_COURSE_DATA_INFO":
      return {
        ...state,
        enrolledCourseInfo: action.payload,
      };
    case "GET_SAMPLER_FILES":
      return {
        ...state,
        sampleFiles: action.payload,
      };
    case "GET_TECHNOGIES":
      return {
        ...state,
        getTechnogoiesInfo: action.payload,
      };
    case "GET_COURSE_COMPLETION_DATA":
      return {
        ...state,
        courseCompletionData: action.payload,
      };
    case "GET_TICKET_STATUS_INFO":
      return {
        ...state,
        ticketStatusInfo: action.payload,
      };
    case "GET_ALL_COURSE_DATA":
      return {
        ...state,
        allCousersData: action.payload,
      };
    case "GET_LEADERBOARD":
      return {
        ...state,
        leaderboardData: action.payload,
      };
    case "ADD_HRM":
      return {
        ...state,
        hrm_id: action.payload,
      };
    case "NOTES_FOR_ENROLLED":
      return {
        ...state,
        notesforenrolled: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notesforenrolled: [...state.notesforenrolled, action.payload],
      };
    case "ENROLL_VIDEO_LINK":
      return {
        ...state,
        linkforenrolledvideo: action.payload,
      };
    case "NOTE_COURSEID":
      return {
        ...state,
        notes: { ...state.notes, courseId: action.payload },
      };
    case "NOTE_TOPIC":
      return {
        ...state,
        notes: { ...state.notes, topic: action.payload },
      };
    case "NOTE_SUBTOPIC":
      return {
        ...state,
        notes: { ...state.notes, subtopic: action.payload },
      };
    case "NOTE_TOPIC_ID":
      return {
        ...state,
        notes: { ...state.notes, topicID: action.payload },
      };
    case "NOTE_SUBTOPIC_ID":
      return {
        ...state,
        notes: { ...state.notes, subtopicID: action.payload },
      };
    case "NOTE_NOTES":
      return {
        ...state,
        notes: { ...state.notes, Notes: action.payload },
      };
    case "NOTE_TIME":
      return {
        ...state,
        notes: { ...state.notes, timeFrame: action.payload },
      };
    case "SET_TOKEN":
      return {
        ...state,
        userToken: action.payload,
      };
    case "UPDATE_ENROLLED":
      return {
        ...state,
        enrolledCourseInfo: action.payload,
      };
    case "ALL_UNENROLLED_PATHS":
      return {
        ...state,
        allunenrolledpath: action.payload,
      };
    case "SINGLE_UNENROLLED_PATH":
      return {
        ...state,
        singlePathInfo: action.payload,
      };
    case "GET_MY_COMPLETED_COURSE":
      return {
        ...state,
        myCompletedcourses: action.payload,
      }
    case "ALL_ENROLLED_PATH":
      return {
        ...state,
        allenrolledpaths: action.payload,
      }
    case "ROLE_CHECKER":
      return {
        ...state,
        role: action.payload,
      }
    case "ALL_MENTEE_LIST":
      return {
        ...state,
        menteelistdata: action.payload,
      }
    case "USER_PROFILE":
      return{
        ...state,
        userprofiledata: action.payload,
      }
    case "USER_PROFILE_IMG":
      return{
        ...state,
        profileImg: action.payload
      }
    case "COURSE_REQUEST":
      return{
        ...state,
        menteescoursesrequest: action.payload,
      }
    case "TICKET_LIST":
      return{
        ...state,
        menteeticketlist: action.payload,
      }
    case "BUDDY_LIST":
      return{
        ...state,
        buddylists: action.payload,
      }
    case "MENTEE_DETAILS_VIEW":
      return{
        ...state,
        menteedetailsofview: action.payload,
      }
    case "COURSE_REPORT":
      return{
        ...state,
        enrollcoursesreport: action.payload,
      }
    case "INTERVIEW_DETAILS":
      return{
        ...state,
        taskdonereport: action.payload,
      }
    case "FEEDBACK_DETAILS":
      return{
        ...state,
        feedbackfromreport: action.payload,
      }
    case "menteenotifify":
      return{
        ...state,
        menteenotificationlist: action.payload,
      }
    case "LPLIST":
      return{
        ...state,
        lplistdata:action.payload
      }
    case "LIST_OF_REASONS":
      return{
        ...state,
        reasonsofticket:action.payload
      }
    case "DASH_LIST":
      return{
        ...state,
        dashlist:action.payload
      }
    case "DASH_LINES_DATA":
      return{
        ...state,
        adminlinedata:action.payload
      }
    case "DEPARTMENT_LIST":
      return{
        ...state,
        departmentlistdata:action.payload
      }
    case "DEPARTMENT_LIST_HR":
      return{
        ...state,
        departmentlistdatahr:[...action.payload,{Department: "All Departments"}]
      }
    case "LP_LIST":
      return{
        ...state,
        lpListdatacoursemanager:action.payload
      }
    case "FIRST_TIME":
      return{
        ...state,
        firstattempt:action.payload
      }
    case "LP_MANAGER_LIST":
      return{
        ...state,
        managerlistall:action.payload
      }
    case "LIST_OF_ADMIN":
      return{
        ...state,
        adminlistall:action.payload
      }
    case "LIST_OF_HR":
      return{
        ...state,
        hrlistall:action.payload
      }
    case "LIST_OF_DEP_HEAD":
      return{
        ...state,
        depheadlistall:action.payload
      }
    case "BUD_TICKETS":
      return{
        ...state,
        budticketlist:action.payload
      }
    case "ALLCOURSES_ADMIN":
      return{
        ...state,
        allcoursesmanagement:action.payload
      }
    case "DEPARTMENT_BUDDY":
      return{
        ...state,
        buddydepartlist:action.payload,
      }
    case "RES_CM":
      return{
        ...state,
        cmlist:action.payload,
      }
    case "DASH_GRAPH":
      return{
        ...state,
        graphdata:action.payload,
      }
    case "HR_OP":
      return{
        ...state,
        bdt:action.payload
      }
    case "ALL_PEOPLE_LIST":
      return{
        ...state,
        poc:action.payload
      }
    case "SET_ID_TOKEN":
      return{
        ...state,
        refreshhelper:action.payload
      }
    case "SET_MAIL":
      return{
        ...state,
        userMail:action.payload
      }
    case "SET_ASSINED_LIST":
      return{
        ...state,
        listofmenteesinsm:action.payload
      }
    case "SET_ALLSM":
      return{
        ...state,
        listofallsecondary:action.payload
      }
    case "SET_FREE":
      return{
        ...state,
        listoffreementee:action.payload
      }
    case "PLAY_PAUSE":
      return{
        ...state,
        playpause:action.payload
      }
    case "CONVERSION_MENTOR_DATA":
      return{
        ...state,
        conversionmentordata:action.payload
      }
    case "CONVERSION_MENTEE_HEAD":
      return{
        ...state,
        conversionmenteehead:action.payload
      }
   case "REQUEST_DATA":
    return{
      ...state,
       requesttrigger:action.payload
    }
    case "PMRES":
      return{
        ...state,
        pmlist:action.payload
      }
    case "TLRES":
      return{
        ...state,
        tllist:action.payload
      }
    case "PRLIST":
      return{
        ...state,
        projectslist:action.payload
      }
    case "CURRENT_STORE":
      return{
        ...state,
        curractivereport:action.payload
      }
    case "DOWNREPORTALL_1":
      return{
        ...state,
        downloadreportalldata:{...state.downloadreportalldata,alist:action.payload}
      }
    case "DOWNREPORTALL_2":
        return{
          ...state,
          downloadreportalldata:{...state.downloadreportalldata,blist:action.payload}
        }
    case "FULL_ONE":
      return{
        ...state,
        downloadsinglefull:action.payload
      }
    case "SINGLE_ONE":
      return{
        ...state,
        downloadsingleonly:action.payload
      }
    case "MUL_HR":
      return{
        ...state,
        downloadrepoforhr:action.payload
      }
      //admin dashboard
    case "ADMIN_DATA_ANALYTICS":
      return{
        ...state , 
        adminDataAnalytics:action.payload
      }
    case "ADMIN_DASHBOARD_DEPARTMENT_LIST":
      return{
        ...state , 
        adminDepartmentList: action.payload,
        adminDepartmentListDephead: [...action.payload, {Department: "All Departments"}]
      }
    case "COMMON_DEP_DATA":
      return{
        ...state,
        comdeplist:action.payload
      }
    case "ADMIN_DATA_OF_DEPARTMENT_SELECT": 
      return{
        ...state ,
        adminDataOfDepartmentSelect : action.payload
      }
    case "ADMIN_LOADING_TRUE":
        return {
          ...state,
          adminLoading: true,
        };
    case "ADMIN_LOADING_FALSE":
        return {
          ...state,
          adminLoading: false,
        };
    case "ADMIN_DATA_ANALYTICS_DEPARTMENT_NAME":
           return { ...state,
             adminDataAnalyticsDepartmentName: action.payload 
            } 
    case "ADMIN_DATA_ANALYTICS_MENTOR_HRMID":
           return { ...state,
             adminDataAnalyticsMentorHrmId: action.payload
             }
    case "INTERVIEW_CONNECT":
          return {
            ...state,
            newinterviewdetails: action.payload
          }
    case "ASSIGN_DEP":
      return {
        ...state,
        depselforallpath:action.payload
      }
    case "MENTORMAIL":
      return {
        ...state,
        mentorinfomail:action.payload
      }

    //muskan : hrBuddiesconversionlistapi
    case "HR_BUDDY_CONVERSION_LIST" : 
    return{
      ...state,
      hrbuddyConversionList:action.payload
    }
    case "DEPARTMENT_FOR_HR" : 
      return{
        ...state,
        departmentsForHr:action.payload
      }
    case "DEPARTMENT_FOR_MENTEE" : 
      return{
        ...state,
        departmentsForMentee:action.payload
      }
    case "MENTEE_DEPARTMENT_CONVERSION_LIST" : 
      return{
        ...state,
        menteeConversionList:action.payload
      }
    case "NAV_THINGS":
      return{
        ...state,
        navdata:action.payload
      }
    case "CON_THINGS":
      return{
        ...state,
        convarr:action.payload
      }
    case "ACCOUNT_NAV":
      return{
        ...state,
        activenavpoint:action.payload
      }
    case "NAV_ROUTES_THINGS":
      return{
        ...state,
        navroutes:action.payload
      }
    case "LIST_OF_LP_ADMIN":
      return{
       ...state,
        lpadminlist:action.payload
      }
    case "LIST_OF_COURSE_ED":
      return{
        ...state,
        courseedlist:action.payload
      }
    case "LIST_OF_LP_NAMES":
      return{
        ...state,
        lpnamelist:action.payload,
        lpnamerelevent: Object.keys(action.payload),
        lpnamereleventfilter:Object.keys(action.payload).concat("All Learning Paths")
      }
    case "LIST_OF_COURSE_REVIEW":
      return{
        ...state,
        coursemanagerlist:action.payload
      }
    case "LIST_OF_COURSE_VIEW":
      return{
        ...state,
        courseviewlist:action.payload
      }
    case "LIST_OF_CONVERSION_MANAGER":
      return{
        ...state,
        conversionmanagerlist:action.payload
      }
    case "LIST_OF_LP_MANAGER":
      return{
        ...state,
        lpmanagerdetails:action.payload
      }
    case "COUNT_OF_ROLE":
      return{
        ...state,
        defaultcounts:action.payload
      }
    case "LP_MANAGER_INNERLIST":
      return{
        ...state,
        lpinnerlistdata:action.payload
      }
    case "CUS_ROLE_DATA":
      return{
        ...state,
        customsno:action.payload
      }
    case "LIST_CUSTOM_DATA":
      return{
        ...state,
        customindata:action.payload
      }
    case "COM_CON_UPDATE":
      return{
        ...state,
        comconprev:action.payload
      }
    case "BUDDY_CON_PREV":
      return{
        ...state,
        buddyconprev:action.payload
      }
    case "MENTEE_CON_PREV":
      return{
        ...state,
        menteeconprev:action.payload
      }
    case "EVENT_FOR_ROLE":
      return{
        ...state,
        tabswitchforrolemanagement:action.payload
      }
    case "AVAILABLE_TIME":
      return{
        ...state,
        defaultavailabletime:action.payload
      }
    case "INTERVIEW_LIST":
      return{
        ...state,
        interviewlist:action.payload
      }
    case "ASSISTANT_DATA":
      return{
        ...state,
        assistantdata:action.payload
      }
    case "POST_DATA":
      return{
        ...state,
        postdata:action.payload
      }
    case "BUDDY_ACTIVE_SIDE":
      return{
        ...state,
        buddyactivestate:action.payload
      }
    case "BUDDY_LAST_SAVED_NAME":
      return{
        ...state,
        buddylistsearchvar:action.payload
      }
    case "SECONDARY_SEEN":
      return{
        ...state,
        secondaryseen:action.payload
      }
    case "MENTOR_ACTIVE_PAGE":
      return{
        ...state,
        mentoractivestate:action.payload
      }
    case "ACTIVE_HIERARCHY":
      return{
        ...state,
        activehierarchy:action.payload
      }
    case "MENTOR_SEARCHED_NAME":
      return{
        ...state,
        mentorlistsearchvar:action.payload
      }
    case "DEPRES_LIST":
      return{
        ...state,
        depheadlistdata:action.payload
      }
    case "DEPARTMENT_HEAD_DEPS":
      return{
        ...state,
        depheaddepartmentslist:action.payload
      }
    case "DEP_HEAD_LIST":
      return{
        ...state,
        deplistsearchvar:action.payload
      }
    case "DEPHEAD_ACTIVE_SIDE":
      return{
        ...state,
        depheadactiveside:action.payload
      }
    case "DEPLIST_DEP_SAVED":
      return{
        ...state,
        deplistdepartsaved:action.payload
      }
    case "DEPHEAD_CONVERSION_LIST":
      return{
        ...state,
        depheadconversionlist:action.payload
      }
    case "DEPHEAD_CON_PREV":
        return{
          ...state,
          depheadconprev:action.payload
        }
    case "REPORTDATA_COMMON_CON":
      return{
        ...state,
        downrepforcommoncon:action.payload
      }
    case "MUL_HR_SIMPLE":
      return{
        ...state,
        downloadrepoforhrsimple:action.payload
      }
    case "DEP_OF_LP":
      return{
        ...state,
        depoflp:action.payload
      }
    case "GETTLLIST":
      return{
        ...state,
        teamlist:action.payload
      }
    case "C_D_C":
      return{
         ...state,
         coursecompletedata:action.payload
        }
    case "CMDATA":
      return{
        ...state,
        coursemanagechangingdata:action.payload
      }
    case "GET_COMMENTS":
      return{
        ...state,
        commentsData: action.payload
      }
    case "ROLEFOR_E_R":
      return{
        ...state,
        roleforemployee:action.payload
      }
    case "LIST_OF_INTERVIEWER":
      return{
        ...state,
        interviewerlist:action.payload
      }
    case "LIST_OF_TEAMLEADS":
      return{
        ...state,
        listdataofteamleads:action.payload
      }
    case "SOCKET_CONNECTION":
      return{
        ...state,
        socket:action.payload
      }
    case "USER_PROFILE_ENGAGEMENT":
      return{
        ...state,
        userprofileengagementdata:action.payload
      }
    case "REPORTDATA_ADMIN_EMP":
      return{
        ...state,
        downrepoforadminemp:action.payload
      }
    case "ALL_MENTEE_LIST_HIERARCHY_1":
      return{
        ...state,
        hiearchydata:{...state.hiearchydata,alist:action.payload}
      }
    case "ALL_MENTEE_LIST_HIERARCHY_2":
      return{
        ...state,
        hiearchydata:{...state.hiearchydata,blist:action.payload}
      }
    case "EVAL_RESULT":
      return{
        ...state,
        evalresult:action.payload
      }
    default:
      return state;
  }
};
export default AppReducer;
