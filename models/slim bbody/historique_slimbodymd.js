var mongoose = require("mongoose");

const HistoriqueSb = new mongoose.Schema(
  {
    stockValueH: {
      type: Number,
    },
    addedH: {
      type: Number,
    },
    minusH: {
      type: Number,
    },
    routurnH: {
      type: Number,
    },
    stockInitialH: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("historiqueSb", HistoriqueSb);
