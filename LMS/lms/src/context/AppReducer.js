const AppReducer = (state, action) => {
  switch (action.type) {
    case "ALL_LEARNING_PATH":
      return {
        ...state,
        allLearningPath: action.payload
      }
    case "COURSES_IN_LEARNING_PATH":
      return {
        ...state,
        coursesInLearningPath: action.payload
      }
    case "ALL_ENROLLED_PATHS":
      return {
        ...state,
        allEnrolledPaths: action.payload
      }
    case "GENERAL_FILES":
      return {
        ...state,
        generalFiles: action.payload
      }
    case "MY_COURSES":
      return {
        ...state,
        myCourses: action.payload
      }


    // video player


    case "NOTE_SUBTOPIC_ID":
      return {
        ...state,
        notes: { ...state.notes, subtopicID: action.payload },
      };


    case "ENROLL_VIDEO_LINK":
      return {
        ...state,
        linkforenrolledvideo: action.payload,
      };

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
    case "ENROLLED_COURSE_DATA_INFO":
      return {
        ...state,
        enrolledCourseInfo: action.payload,
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
    case "UPDATE_ENROLLED":
      return {
        ...state,
        enrolledCourseInfo: action.payload,
      };
    case "PLAY_PAUSE":
      return {
        ...state,
        playpause: action.payload
      }
    case "SOCKET_CONNECTION":
      return {
        ...state,
        socket: action.payload,
      };
    case "NOTIFICATION_ARRAY":
      return {
        ...state,
        NotificationArray: action.payload,
      };
    case "ENROLLED_COURSE":
      return {
        ...state,
        EnrolledCourse: action.payload,
      };
    case "CHAT_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "MESSAGE_ARR":
      return {
        ...state,
        messageArr: action.payload
      };

    default:
      return state
  }
}
export default AppReducer

