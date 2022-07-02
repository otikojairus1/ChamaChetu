const mongoose = require("mongoose");
const uuid = require("uuid");

const merryGoRoundSchema = new mongoose.Schema({
    merrygoround_unique_code: {
        type: String,
        default: uuid.v1,
        unique: true,
      },
    groupName: {
        type: String,
        required: true
    },
    membersEmail:{
        type: Array,
        required: true

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sessions: {
        type: Number,
        required: true
    },
    interval:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("MerryGoRound",merryGoRoundSchema);