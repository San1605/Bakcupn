const initialState = {
   upcomingAppointmentListDoctor: [],
   pastAppointmentListDoctor: [],
   appointmentStatistics: {},
   ticketsCount:{},
   feedbackList:[],
   myPatientList:[]
   
};


const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOCTOR_PATIENT_LIST": {
      return {
        ...state,
        myPatientList: action.payload,
      };
    }
    case "DOCTOR_UPCOMING_APPOINTMENTS": {
      return {
        ...state,
        upcomingAppointmentListDoctor: action.payload,
      };
    }
    case "DOCTOR_PAST_APPOINTMENTS": {
      return {
        ...state,
        pastAppointmentListDoctor: action.payload,
      };
    }
    case "APPOINTMENT_STATS": {
      return {
        ...state,
        appointmentStatistics: action.payload,
      };
    }
    case "TICKTES_COUNT": {
      return {
        ...state,
        ticketsCount: action.payload,
      };
    }
    case "FEEDBACK_LIST": {
      return {
        ...state,
        feedbackList: action.payload,
      };
    }
    default:
      return state;
  }
};
export default DoctorReducer;
