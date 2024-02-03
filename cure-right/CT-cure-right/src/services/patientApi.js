import axios from "axios";
import { BASE_URL } from "../utils/config";

//patient
export const patientSignUp = async (payload) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/signUp`,
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

//patient
export const postPatientAppointment = async (payload) => {
  const authToken = localStorage.getItem("authToken");
  let config = {
    method: "post",
    url: `${BASE_URL}/addAppointment`,
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
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

//patient
export const getRazorPayLink = async (payload) => {
  const authToken = localStorage.getItem("authToken");
  let config = {
    method: "post",
    url: `${BASE_URL}/payment`,
    data: payload,
    headers: {
      Accept: "application/json",
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

//patient
export const getAPayment = async (params, appointmentId) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getAPayment?${params}&appointmentId=${appointmentId}`,
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

//patient
export const getPatientMyAppointmentsList = async () => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let baseUrl = `${BASE_URL}/getAppointment?patientId=${userId}&flag=true`;
  let config = {
    method: "get",
    url: baseUrl,
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

//patient
export const getProblemsList = async () => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/problemsOfPatients`,
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
    throw error.response.data.error;
  }
};

//patient
export const getAvailableDoctorsForAppointments = async (
  selectedAppointmentDate,
  problem
) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getAvailableDoctors?selectedAppointmentDate=${selectedAppointmentDate}&problem=${problem}&emergency=0`,
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
    throw error.response.data.error;
  }
};

//patient
export const getPatientUpcomingAppointmentsList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getUpcomingAppointment?patientId=${userId}&pageNo=${pageNo}&limit=${limit}`,
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

//patient
export const getSpecialistDataPatient = async () => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getSpecialityList`,
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

//patient
export const getOrgansList = async () => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/listOfOrgans`,
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

//patient
export const getPatientPastAppointmentsList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getPastAppointment?patientId=${userId}&pageNo=${pageNo}&limit=${limit}`,
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

//patient
export const getPatientPrescriptionList = async () => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getPrescription?patientId=${userId}`,
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

//patient
export const getPatientParticularPrescription = async (id) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "get",
    url: `${BASE_URL}/getPrescription?prescriptionId=${id}`,
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

//patient
export const getDoctorFilteredOnSpecialityPatientApi = async (
  speciality,
  pageNo,
  limit
) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getdoctor?speciality=${speciality}&pageNo=${pageNo}&limit=${limit}`,
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

export const postSosDetailsApi = async (sosDetails) => {
  let authToken = localStorage.getItem("authToken");

  let config = {
    method: "post",
    url: `${BASE_URL}/postSosDetails`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
    data:sosDetails
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};







export const startRecordingApi = async (callId) => {
  let authToken = localStorage.getItem("authToken");

  let config = {
    method: "post",
    url: `${BASE_URL}/startRecording`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
    data:{ serverCallId: callId }
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
};