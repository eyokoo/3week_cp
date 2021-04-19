let connection = require("../../3week_checkpoint/sql/connection");

let list = function (req, res) {
  console.log("Inside the list function");
  // we want to issue thi command to the database and return the results
  // select * from users
  connection.all("SELECT name, status FROM items", function (error, rows) {
    if (error) {
      console.log("Failed to fetch items", error);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  })
}

let get = function (req, res) {
  console.log("Inside the get function", req.params);
  res.send("success");
}

let update = function (req, res) {
  console.log("Inside the update function");

  res.send("success");
}

let create = function (req, res) {
  console.log("Inside the create function", req.body);
  let itemName = req.body.name;
  if (itemName) {
    //command i want to issue to database
    //to protect against sql intejction, never trust input passed in for the user/client/browser
    //you should always use parameters and parameterized statements
    let insertStmt = `INSERT INTO items (name, quantity) VALUES (?, ?);`
    let params = [];
    params.push(itemName);
    connection.run(insertStmt, params, function (error) {
      if (error) {
        console.error("Failed to insert new item in the database", error);
        res.sendStatus(500);
      } else {
        res.send("success");
      }
    })
  } else {
    console.error("Cannot add an item with no name");
    res.sendStatus(400);
  }
}

let remove = function (req, res) {
  console.log("Inside the delete function", req.params.id);

  // the reason its req.params.id, is because the route specified the name id (/items/:id)
  let idToDelete = req.params.id;
  if (idToDelete) {
    let deleteStmt = "DELETE FROM items WHERE id = ?"; // we dont trust the user input, so we used a parameterized statement
    let params = [];
    params.push(idToDelete);
    connection.run(deleteStmt, params, function (error) {
      if (error) {
        console.log("Failed to delete", error);
        res.sendStatus(500);
      } else {
        res.send("success");
      }
    })

  } else {
    console.log("Cannot delete if no id is provided");
    res.sendStatus(400);
  }
}


//delete from users where id = x
//update users set firsname = x where id = y
// insert into users (.....)


module.exports = { list, get, update, create, remove };