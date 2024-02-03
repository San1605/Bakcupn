const initialState = {
  sidebarCollapse: true,
  msidebarCollapse: false,
  showChatBot: false,
  isSidebarNavDisplay: true,
  dicomFile: null,
  prescriptionData: "",
  chatMessages: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIDEBAR_NAVBAR_DISPLAY": {
      return {
        ...state,
        isSidebarNavDisplay: action.payload,
      };
    }
    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        sidebarCollapse: action.payload,
      };
    }
    case "MOBILE_TOGGLE_SIDEBAR": {
      return {
        ...state,
        msidebarCollapse: !state?.msidebarCollapse,
      };
    }
    case "TOGGLE_CHATBOT": {
      return {
        ...state,
        showChatBot: action.payload,
      };
    }
    case "DICOM_FILE": {
      return {
        ...state,
        dicomFile: action.payload,
      };
    }

    case "PRESCRIPTION_DATA": {
      return {
        ...state,
        prescriptionData: action.payload,
      };
    }
    case "ONCALL_CHAT_MESSAGES": {
      return {
        ...state,
        chatMessages: action.payload,
      };
    }
    default:
      return state;
  }
};
export default AppReducer;