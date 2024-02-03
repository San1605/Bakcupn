const apiRequest = require('../utils/apiRequest')
const msApiURL = require('../helpers/msRestApiURL.json');
const format = require('pg-format');

//formData for MS API requests
const apiAccessToken = (resourceURL, cred) => {
    let formData = new URLSearchParams();
    formData.append('resource', resourceURL);
    formData.append('client_id', cred.clientId);
    formData.append('client_secret', cred.clientSecret);
    formData.append('grant_type', "client_credentials");
    formData.append('scope', "read");
    return ({ data: formData })
}
// AuthToken generator using creds from respective resource
const clientCredAuthenticationApi = (cred, resource) => {
    return new Promise(async (resolve, reject) => {
        try {
            let formatURL = format(msApiURL.accessToken.url, cred.tenantId)
            let accessTokenInfo = await apiRequest(formatURL, msApiURL.accessToken.method, apiAccessToken(resource, cred).data).catch(err => reject(err.error)) // Discuss on parameters of api request // cant export form data in the form of json we have to initlize form data in axios model
            resolve(accessTokenInfo.data.access_token)
        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = clientCredAuthenticationApi

