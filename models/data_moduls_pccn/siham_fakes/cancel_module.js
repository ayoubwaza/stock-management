const mongoose = require("mongoose");
const CancelSihamDb = new mongoose.Schema(
  {
    productType: {
      type: String,
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
    status: {
      type: String,
    },
    comments: {
      type: String,
    },
    mehdi: {
      type: String,
    },
    intialDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("CancelSihamdbs", CancelSihamDb);
