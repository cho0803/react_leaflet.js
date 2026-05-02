// const { Client } = require("pg"); // PostgreSQL라이브러리 사용
// // require("dotenv").config();
// // PostgreSQL DB setting
// const pgConfig = {
//   host: process.env.REACT_APP_DB_HOST,
//   port: process.env.REACT_APP_PORT,
//   user: process.env.REACT_APP_DB_USER,
//   password: process.env.REACT_APP_DB_PASS,
// };

// const dbConnection = (callback) => {
//   const dbClient = new Client(pgConfig);

//   dbClient.connect();
// };

// module.exports = { dbConnection };

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432, // PostgreSQL 기본 포트
  port: 5437, // 도커 PostgreSQL 포트
  database: "postgres", // 기본은 postgres
  user: "postgres",
  password: "postgres",
});

pool.connect((err) => {
  if (err) console.log(err);
  else console.log("db연결");
});
module.exports = pool;
