const mongoose = require("mongoose");
const ConfirmedSihamSchema = new mongoose.Schema(
  {
    productType:{
      type:String
    },
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
    type: {
      type: String,
    },
    
    prix: {
      type: String,
    },
    Qte: {
      type: String,
    },
    howSending: {
      type: String,
    },
    delivered_not: {
      type: String,
    },
    intialDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("confirmedsihamdbs", ConfirmedSihamSchema);
