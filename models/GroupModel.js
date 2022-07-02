const mongoose = require("mongoose");
const uuid = require("uuid");

const GroupModelSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    groupName: {
        type: String,
        required: true
    },
    Admin:{
        type: String,
        required: true

    },
    groupDescription:{
        type: String,
        required: true

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deleted: {
        type: Boolean
    }
})

module.exports = mongoose.model("GroupModel",GroupModelSchema);