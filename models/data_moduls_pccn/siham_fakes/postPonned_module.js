const mongoose = require("mongoose");
const PostPonnedSihamDb = new mongoose.Schema({
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
  comments: {
    type: String,
  },
  dateCall: {
    type: String,
  },
  intialDate: {
    type: Date,
  },
});
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("PostPonnedSihamdbs", PostPonnedSihamDb);
