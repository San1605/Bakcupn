import axios from "axios";
import { BASE_URL } from "../utils/config";

// admin
export const getDoctorList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getdoctor?pageNo=${pageNo}&limit=${limit}`,
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

// admin
export const getTransactionList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getTransactions?pageNo=${pageNo}&limit=${limit}`,
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

//admin
export const getDoctor = async (doctorId) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getdoctor?doctorId=${doctorId}`,
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

//admin
export const getDoctorTicketList = async (doctorId) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getTicket?userId=${doctorId}`,
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

//admin
export const getPatientTicketList = async (patientId) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getTicket?userId=${patientId}`,
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

//admin
export const doctorOnboard = async (payload) => {
  console.log(3333333);
  const authToken = localStorage.getItem("authToken");
  let config = {
    method: "post",
    url: `${BASE_URL}/postdoctor`,
    data: payload,
    headers: {
      Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
      // "ngrok-skip-browser-warning": "69420",
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

//admin
export const getAdminAnalyticsApi = async () => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/adminAnalytics`,
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

// admin
export const getDoctorAnalyticsApi = async (id) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "GET",
    url: `${BASE_URL}/doctorAnalytic?doctorId=${id}`,
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

//admin
export const getPatientByPatientId = async (patientId) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getPatient?patientId=${patientId}`,
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
