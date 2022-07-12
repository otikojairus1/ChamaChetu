const mongoose = require("mongoose");
const uuid = require("uuid");

const WelfareKitSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    groupName: {
        type: String,
        required: true
    },
    welfareWallet:{
        type: Number,
        required: true

    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },

})

module.exports = mongoose.model("WelfareKit",WelfareKitSchema);