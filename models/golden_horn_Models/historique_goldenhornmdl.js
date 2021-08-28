var mongoose = require("mongoose");

const HistoriqueGh = new mongoose.Schema(
  {
    stockValueGh: {
      type: Number,
    },
    addedGh: {
      type: Number,
    },
    minusGh: {
      type: Number,
    },
    routurnGh: {
      type: Number,
    },
    stockInitialGh: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("historiqueGh", HistoriqueGh);
