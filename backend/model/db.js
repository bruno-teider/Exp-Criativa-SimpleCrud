import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 8889,
  user: "root",
  password: "root",
  database: "Trabalho1",
});
