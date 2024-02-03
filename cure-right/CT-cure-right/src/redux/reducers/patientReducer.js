const initialState = {
  showAppointmentModal: false,
  upcomingAppointmentList: [],
  bookAppointmentPayload: {},
  patientTicketsList: [],
  upcomingAppointmentListPatient: [],
  pastAppointmentListPatient: [],
  doctorBasedOnSpeciality: [],

};

const PatientReducer = (state = initialState, action) => {
  // console.log("IN PATIENT REDUCER");
  switch (action.type) {
    case "SHOW_APPOINTMENT_MODAL": {
      return {
        ...state,
        showAppointmentModal: action.payload,
      };
    }
    case "BOOK_APPOINTMENT_PAYLOAD": {
      return {
        ...state,
        bookAppointmentPayload: action.payload,
      };
    }
    case "UPCOMING_APPOINTMENT_LIST": {
      return {
        ...state,
        upcomingAppointmentList: action.payload,
      };
    }
    case "PATIENT_TICKETS_LIST": {
      return {
        ...state,
        patientTicketsList: action.payload,
      };
    }
    case "PATIENT_UPCOMING_APPOINTMENTS": {
      return {
        ...state,
        upcomingAppointmentListPatient: action.payload,
      };
    }
    case "PATIENT_PAST_APPOINTMENTS": {
      return {
        ...state,
        pastAppointmentListPatient: action.payload,
      };

    }
    case "DOCTOR_SPECIALITY": {
      return {
        ...state,
        doctorBasedOnSpeciality: action.payload,
      };

    }

    default:
      return state;
  }
};
export default PatientReducer;
