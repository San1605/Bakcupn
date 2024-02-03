import { combineReducers } from "@reduxjs/toolkit";
import AppReducer from "./AppReducer";

import AdminReducer from "./adminReducer";
import DoctorReducer from "./doctorReducer";
import PatientReducer from "./patientReducer";
const RootReducer = combineReducers({
  AppReducer,
  AdminReducer,
  DoctorReducer,
  PatientReducer,
});

export default RootReducer;
