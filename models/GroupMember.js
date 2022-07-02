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
    walletBalance:{
        type: Number,
        default:0,
        required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sessionNo: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("GroupMember",GroupMemberSchema);