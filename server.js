require("dotenv").config({ path: 'DB_URL' });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");
const handler = require("./handlers");

require("./models");


const app = express();

//  const allowCrossDomain = function (req, res, next) {
//    req.header("Access-Control-Allow-Origin", "*");
//    req.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//  };

// // Middlewares
// app.use(cors(allowCrossDomain))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// add Routes here 
app.use("/api/v1/example/route", routes.ExampleRoute);
app.use("/api/v1/Auth", routes.AuthRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server runnng on ${PORT}`);
});