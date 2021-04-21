const connection = require("../sql/connection-mysql");

let list = (req, res) => {
  console.log("Inside the list function",req.params);
  connection.query("SELECT * FROM inventory", (error, rows) => {
    if (error) {
      console.log("Failed to list items", error);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  })
}

//GET/:id  list the items by id
let get = (req, res) => {
  console.log("Inside the get function", req.params.id);
  let id = req.params.id
  let sql = "SELECT id, name FROM inventory WHERE id =?" //sql command to send to the database
  let params = [id];
  
  connections.query(sql, params, (error, rows) => {//make a connection to send the query
    console.log("This is what's inside ROWS:", rows)
    if (error) {
      console.error("Failed to query the db", error);// if we get an error from the db
      res.sendStatus(500);
    } else if (!rows || rows.length == 0) {    // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  })
}

//PUT/:id  update the item by id
let update = (req, res) => {
  console.log("Inside the update function", req.params.id);
  let id = req.params.id
  let updName= req.body.name
  let updQty = req.body.quantity
  let sql = "UPDATE inventory SET name=?, quantity=? WHERE id=?" 
  let params = [updName,updQty,id]
  
  connection.query(sql,params,(error) => {
    if (error){
      console.log("Failed to update item", error);
      res.sendStatus(500);
    }else {
      res.send("Success - Item updated!");
    }
  })
}

//POST create an item
let create = (req, res) => {
  console.log("Inside the create function", req.body);
  let newName = req.body.name
  let newQty = req.body.quantity
  let sql = `INSERT INTO inventory (name, quantity) VALUES (?, ?);`
  let params = [newName, newQty];

    connection.query(sql, params, (error) => {
      if (error) {
        console.error("Failed to insert new item in the database", error);
        res.sendStatus(500);
      } else {
        res.send("Success - You created a new item!");
      }
    })
}

//DELETE an item by id
let remove = (req, res) => {
  console.log("Inside the delete function", req.params.id);
    let id = req.params.id
    let sql = "DELETE FROM inventory WHERE id = ?"
    let params = [id];
  
      connection.query(sql, params, (error) => {
        if (error) {
          console.error("Failed to insert new item in the database", error);
          res.sendStatus(500);
        } else {
          res.send("Success - You delete an item!");
        }
      })
}


module.exports = { list, get, update, create, remove };