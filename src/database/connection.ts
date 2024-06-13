import mysql, { ConnectionOptions } from "mysql2";

const options: ConnectionOptions = {
  user: "hammad",
  database: "library_db",
  password: "hammad123?",
  rowsAsArray: false,
};

export const sql_db = mysql.createConnection(options);

// sql_db.execute("CREATE TABLE IF NOT EXISTS ", (err, result) => {
//   if (err) {
//     console.log("Error creating table ", err);
//     return;
//   }
//   console.log(result);
// });
