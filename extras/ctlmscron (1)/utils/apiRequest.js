var axios = require("axios");

//Axios Module for MS  APIs
async function apiRequest(apiURL, apiMethod, body, token, bool = false, basicAuth=false) {
  return new Promise(async (resolve, reject) => {
    try {

      let options = {
        url: apiURL,
        method: apiMethod,
        headers: token &&!basicAuth?{ "Authorization": `Bearer ${token}` } : !basicAuth? undefined:{'Authorization': 'Basic '+ token},
        data: body,
      };
    
      if (bool) {
        options.encoding = null,
          options.responseType = 'arraybuffer'
      }
      await axios(options) //Axios request for required method
        .then((response) => {
          resolve({
            data: response.data,
            statusCode: response.status,
            status: response.statusText
          });
        })
        .catch((err) => {
          reject({
            status: err.response.statusText,
            error: err.response.data.error || err.response.data.message || err.message || err.statusText,
            statusCode: err.response.status || 400,
          });
        });
    } catch (err) {
      reject(err.message);
    }
  });
}
module.exports = apiRequest;
