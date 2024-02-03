const initialState = {
  doctorList: [],
  patientList: [],
  transactionList:[],
  adminAnaltyics:[]
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOCTOR_LIST": {
      return {
        ...state,
        doctorList: action.payload,
      };
    }
    case "ADMIN_PATIENT_LIST": {
      return {
        ...state,
        patientList: action.payload,
      };
    }
    case "TRANSACTION_LIST": {
      return {
        ...state,
        transactionList: action.payload,
      };
    }
    case "ADMIN_ANALYTICS" : {
      return{
        ...state,
        adminAnaltyics:action.payload
      }
    }
    case "DOCTOR_ANALYTICS":{
      return{
        ...state,
        doctorAnalytics:action.payload
      }
    }
    default:
      return state;
  }
};
export default AdminReducer;
