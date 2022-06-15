const mongoose = require("mongoose");
const uuid = require("uuid");

const UserAuthSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    
      },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  
})

module.exports = mongoose.model("User",UserAuthSchema);