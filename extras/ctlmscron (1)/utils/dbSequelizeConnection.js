require('dotenv').config()
const Sequelize = require("sequelize");
// const logException = require('../utils/logException')
let sequelize = null;
function connect() {
  return (
    sequelize ||
    (sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
      host: process.env.SERVER,
      logging: false,
      dialect: "mssql",
      requestTimeout: 300000,
      operatorsAliases: 0,
      pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000,
      },
    }))
  );
}
function sqlRequest() {
  const db = {}
  const connection = connect();
  db.Sequelize = Sequelize;
  db.sequelize = connection;
  return db
}
function testConnection(db) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.authenticate()
      //logException('Connection has been established successfully.');
    } catch (error) {
      // logException('Unable to connect to the database: ' + error.message);
    }
  })
}
module.exports = { sqlRequest, testConnection };
