require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(`ERROR: ${err}`));

//   add all models here...
module.exports.ExampleHandler = require("./ExampleModel");
module.exports.AuthModel = require("./Auth/Auth");



