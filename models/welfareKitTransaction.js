const mongoose = require("mongoose");
const uuid = require("uuid");

const WelfareKitTransactionSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    WelfareId: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true

    },
    senderEmail:{
        type: String,
        required: true
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },

})

module.exports = mongoose.model("WelfareKitTransaction",WelfareKitTransactionSchema);