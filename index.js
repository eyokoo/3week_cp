const express = require("express");
const bodyParser = require("body-parser"); //by default this app should be assuming request body data as json
const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(require("./routes/items-mysql")); //importing the routes module

//ROUTE



app.listen(port,() => {
  console.log("Listening to the port", port);
});
