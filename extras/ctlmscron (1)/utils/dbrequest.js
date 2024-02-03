const sql = require("mssql");
require('dotenv').config({ path: "../config.env" });

const config = {
  user: "ctlms",
  password: "c@t123lm$",
  database: "ctlms",
  server: "ctlms.database.windows.net",
  //   driver: process.env.DRIVER,
};

let pool; // Create a database connection pool

// Database connection
async function dbConnection() {
  // If a connection pool doesn't exist, create one
  if (!pool) {
    pool = await new sql.ConnectionPool(config).connect();
  }
  return pool;
}

const dbrequest = async (query) => {
  // sending request to the database
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await dbConnection(); // Get a connection from the pool
      const request = new sql.Request(connection);
      request.query(query, (err, recordset) => {
        if (err) {
          console.log(err);
          console.log('err');
          reject(err.originalError.info.message || err);
        } else {
          console.log(recordset)
          resolve(recordset.recordset);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = dbrequest;
