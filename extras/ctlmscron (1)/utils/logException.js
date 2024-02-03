let appInsights = require("applicationinsights");
require('dotenv').config();
appInsights.setup(process.env.APPLICATIONINSIGHT).start();
let client = appInsights.defaultClient;

module.exports = (error) => {
    client.trackException({ exception: JSON.stringify({ "ERROR": error.message || error }) });
}