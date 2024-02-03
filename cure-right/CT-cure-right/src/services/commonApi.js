import axios from "axios";
import { BASE_URL } from "../utils/config";

//common patient + doctor + admin
export const loginApi = async (payload) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/login`,
    data: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

//common  doctor + admin
export const getPatientFeedback = async (doctorId) => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getPatientFeedback?doctorId=${userId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common admin + doctor
export const getPatientList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getPatient?pageNo=${pageNo}&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common admin + doctor
export const getCalenderAppointments = async (id, startDate, endDate) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getCalendarAppointment?doctorId=${id}&startDate=${startDate}&endDate=${endDate}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common patient + doctor
export const resetPassword = async (payload) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/changepassword`,
    data: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

//common patient + doctor
export const startRecordingApi = async (callId) => {
  let authToken = localStorage.getItem("authToken");

  let config = {
    method: "post",
    url: `${BASE_URL}/startRecording`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
    data: { serverCallId: callId },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common doctor + patient
export const forgotPassword = async (payload) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/forgotpassword`,
    data: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

//common doctor + patient
export const verifyOtp = async (payload) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/otpVerification`,
    data: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

//common doctor + patient
export const getUserTicketStatus = async () => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getUserTicketStatus?userId=${userId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common doctor + patient
export const getTicketsList = async () => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getticket?userId=${userId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

//common patient + doctor
export const getParticularAppointment = async (id) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getAppointment?appointmentId=${id}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};

//common patient + doctor
export const updateAppointment = async (payload) => {
  let authToken = localStorage.getItem("authToken");

  let config = {
    method: "PUT",
    url: `${BASE_URL}/appointmentUpdate`,
    data: payload,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};
