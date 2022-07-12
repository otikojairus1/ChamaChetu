const mongoose = require("mongoose");
const uuid = require("uuid");

const GroupRequestSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    groupName: {
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

})

module.exports = mongoose.model("GroupRequest",GroupRequestSchema);