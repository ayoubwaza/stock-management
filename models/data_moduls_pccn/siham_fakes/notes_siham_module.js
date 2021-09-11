const mongoose = require("mongoose");
const NotesSiham = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
const sihamDb = mongoose.connection.useDb("siham");
module.exports = sihamDb.model("NoteSihamFakes", NotesSiham);