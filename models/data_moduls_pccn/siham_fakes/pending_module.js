const mongoose = require("mongoose");
const PendingSihamDb = new mongoose.Schema(
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
    productType:{
      type:String
    },
    dateIni:{
      type:Date,
      default:""
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
  },
  { timestamps: true }
);
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("pendingsihamdbs", PendingSihamDb);