const mongoose = require("mongoose");
const uuid = require("uuid");

const ShareModelSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    email: {
        type: String,
        required: true
    },
    share:{
        type: Number,
        required: true

    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

})

module.exports = mongoose.model("ShareModel",ShareModelSchema);