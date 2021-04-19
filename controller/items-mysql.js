const express = require("express");
const router = express.Router(); //getting the router from express
const controller = require("../controller/items-mysql"); //whatever is being exported from the controller file path is being put into the variable controller
//ANYTHING MISSING HERE?

router.get("/items-mysql", controller.list); // GET returns the list of items in my database

router.get("/items-mysql/:id", controller.get);// GET returns the list of items in my database

router.post("/items-mysql", controller.create);//POST should call the create function, and add an item to my databse

router.put("/items-mysql/:id", controller.update);//PUT should call the update fucntion, and update the item in my database

router.delete("/items-mysql/:id", controller.remove);// DELETE should call the delete function, and delete the item from my database


module.exports = router; //need to expot this router so that is becomes available to the rest of your code
//what im exporting here is what i am importing in my index.js file -->app.use(require("./routes/items-mysql"));