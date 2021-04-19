let sqlite3 = require("sqlite3");

let connection = new sqlite3.Database("./app.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (error) {
    if (error) {
      console.error("Failed to make a connection to the db", error);
    } else {
      console.log("Connection to db established");
      setupDB();
    }
  })

let createItemsTable = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name varchar NOT NULL,
  status varchar
);
`

let setupDB = function () {
  console.log("Setting up db");
  connection.exec(createItemsTable, function (error) {
    if(error){
      console.error("Failed when setting up databse, error");
    }else{
      console.log("done setting up db")
    }
  })
}

module.exports = connection;