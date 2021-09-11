const mongoose = require("mongoose");
const NoAnswerSihamDb = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    addresse: {
      type: String,
    },
    phone: {
      type: String,
    },
    productType: {
      type: String,
    },
    status:{
      type:String
    },
    observation: {
      type: String,
    },
    dayOne: {
      type: String,
    },
    dayTwo: {
      type: String,
    },
    dayThree: {
      type: String,
    },
    dayFour: {
      type: String,
    },
    intialDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("noanswerSihamDb", NoAnswerSihamDb);