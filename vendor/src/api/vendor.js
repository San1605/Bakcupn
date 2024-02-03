import { ACCESS_TOKEN, BASE_URL } from '../utils/config';
import axios from 'axios';

export const getTicketApi = async (mealType) => {
  let data = {
    "mealType": mealType
  }
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/getFeedbacks`,
    headers: {
      'Authorization': ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  }

  catch (error) {
    console.log(error);
  };
}


export const getCardDataApi = async () => {
  let data = JSON.stringify({
    "start_date": "2023-08-21",
    "end_date": "2023-08-21"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/getOrders`,
    headers: {
      'Authorization': ACCESS_TOKEN,
      'Content-Type': 'application/json',
      'Cookie': 'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5'
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  }

  catch (error) {
    console.log(error);
  };

}



export const downloadApi = async () => {
  let config = {
    method: 'get',
    responseType: 'blob',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/downloadFeedback`,
    headers: {
      'Authorization': ACCESS_TOKEN,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Cookie': 'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5'
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  }

  catch (error) {
    console.log(error);
  };

}




export const addMenuApi = async (mealType, value, special) => {
  let data = {
    "mealType": mealType,
    "value": value,
    "special": special,
  }
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/addMenu`,
    headers: {
      'Authorization': ACCESS_TOKEN,
      'Content-Type': 'application/json',
      // 'Cookie': 'ARRAffinity=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5; ARRAffinitySameSite=79e06db539acb57119e709978d2cf1da299e8341753d6f6345007fcab3f69bc5'
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  }

  catch (error) {
    console.log(error);
  };

}