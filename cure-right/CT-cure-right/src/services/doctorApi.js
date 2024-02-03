import axios from "axios";
import { BASE_URL } from "../utils/config";

//doctor
export const getDoctorUpcomingAppointmentsList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");

  let config = {
    method: "get",
    url: `${BASE_URL}/getUpcomingAppointment?doctorId=${userId}&pageNo=${pageNo}&limit=${limit}`,
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

//doctor
export const getDoctorPastAppointmentsList = async (pageNo, limit) => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getPastAppointment?doctorId=${userId}&pageNo=${pageNo}&limit=${limit}`,
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

<<<<<<< Updated upstream
//doctor
export const getDoctorAppointmentStats = async () => {
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");
  let config = {
    method: "get",
    url: `${BASE_URL}/getAppointmentForDoctor`,
=======

export const getPatientInfoDoctor = async (id) => {
  let authToken = localStorage.getItem("authToken");
  let config = {
    method: "GET",
    url: `${BASE_URL}/getPatient?patientId=${id}`,
>>>>>>> Stashed changes
    headers: {
      Authorization: `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.error;
  }
<<<<<<< Updated upstream
};
=======
};

>>>>>>> Stashed changes
