//App reducer

export const setIsSidebarNavDisplay = (value) => {
  return {
    type: "SIDEBAR_NAVBAR_DISPLAY",
    payload: value,
  };
};


export const setShowChatBot = (value) => {
  return {
    type: "TOGGLE_CHATBOT",
    payload: value,
  };
};

export const toggleSidebar = (value) => {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: value,
  };
};
export const mtoggleSidebar = (value) => {
  return {
    type: "MOBILE_TOGGLE_SIDEBAR",
  };
};

//Admin Reducer
export const setDoctorsList = (value) => {
  return {
    type: "DOCTOR_LIST",
    payload: value,
  };
};

export const setAdminPatientList = (value) => {
  return {
    type: "ADMIN_PATIENT_LIST",
    payload: value,
  };
};

//Doctor Reducer
export const setMyPatientList = (value) => {
  return {
    type: "DOCTOR_PATIENT_LIST",
    payload: value,
  };
};

export const setDicomFile = (value) => {
  return {
    type: "DICOM_FILE",
    payload: value,
  };
};
export const setChatCLient = (value) => {
  return {
    type: "CHAT_CLIENT",
    payload: value,
  };
};
export const setNotificationChatThread = (value) => {
  return {
    type: "NOTIFICATION_CHAT_THREAD",
    payload: value,
  };
};
export const setPrescriptionData = (value) => {
  return {
    type: "PRESCRIPTION_DATA",
    payload: value,
  };
};
export const setChatThread = (value) => {
  return {
    type: "CHAT_THREAD",
    payload: value,
  };
};

export const setChatMessages = (value) => {
  return {
    type: "ONCALL_CHAT_MESSAGES",
    payload: value,
  };
};

//PatientReducer

export const setShowAppointmentModal = (value) => {
  return {
    type: "SHOW_APPOINTMENT_MODAL",
    payload: value,
  };
};

export const setBookAppointmentPayload = (value) => {
  return {
    type: "BOOK_APPOINTMENT_PAYLOAD",
    payload: value,
  };
};
export const setUpcomingAppointmentList = (value) => {
  return {
    type: "UPCOMING_APPOINTMENT_LIST",
    payload: value,
  };
};
export const setPatientTicketsList = (value) => {
  return {
    type: "PATIENT_TICKETS_LIST",
    payload: value,
  };
};
export const setTransactionsList = (value) => {
  return {
    type: "TRANSACTION_LIST",
    payload: value,
  };
};
export const setUpcomingAppointmentPatient = (value) => {
  return {
    type: "PATIENT_UPCOMING_APPOINTMENTS",
    payload: value,
  };
};

export const setPastAppointmentPatient = (value) => {
  return {
    type: "PATIENT_PAST_APPOINTMENTS",
    payload: value,
  };
};

export const setUpcomingAppointmentDoctor = (value) => {
  return {
    type: "DOCTOR_UPCOMING_APPOINTMENTS",
    payload: value,
  };
};

export const setPastAppointmentDoctor = (value) => {
  return {
    type: "DOCTOR_PAST_APPOINTMENTS",
    payload: value,
  };
};

export const setAdminAnalytics = (value) => {
  return {
    type: "ADMIN_ANALYTICS",
    payload: value,
  };
};

export const setDoctorAnalytics = (value) => {
  return {
    type: "DOCTOR_ANALYTICS",
    payload: value,
  };
};
export const setDoctorBasedOnSpeciality = (value) => {
  return {
    type: "DOCTOR_SPECIALITY",
    payload: value,
  };
};
export const setAppointmentStatistics = (value) => {
  return {
    type: "APPOINTMENT_STATS",
    payload: value,
  };
};
export const setTicketsCount = (value) => {
  return {
    type: "TICKTES_COUNT",
    payload: value,
  };
};
export const setFeedbacklist = (value) => {
  return {
    type: "FEEDBACK_LIST",
    payload: value,
  };
};
