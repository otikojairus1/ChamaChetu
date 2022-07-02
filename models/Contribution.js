const mongoose = require("mongoose");
const uuid = require("uuid");

const contributionSchema = new mongoose.Schema({
    TransactionrefNo: {
        type: String,
        default: uuid.v1,
        unique: true,
      },
    groupName: {
        type: String,
        required: true
    },
    contributorEmail:{
        type: String,
        required: true

    },
    receiverEmail:{
        type: String,
        required: true
    },
    merryGoRoundCode:{
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    session: {
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Contribution",contributionSchema);