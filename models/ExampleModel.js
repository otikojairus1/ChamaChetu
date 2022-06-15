const mongoose = require("mongoose");
const uuid = require("uuid");

const ExampleModelSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuid.v1,
    //     unique: true,
    //   },
    field1: {
        type: String,
        required: true
    },
    field2:{
        type: String,
        required: true
    },
    field3:{
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

module.exports = mongoose.model("ExampleModel",ExampleModelSchema);