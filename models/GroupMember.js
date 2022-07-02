const mongoose = require("mongoose");
const uuid = require("uuid");

const GroupMemberSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    groupName: {
        type: String,
        required: true
    },
    memberEmail:{
        type: String,
        required: true

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    active: {
        type: Boolean
    }
})

module.exports = mongoose.model("GroupMember",GroupMemberSchema);