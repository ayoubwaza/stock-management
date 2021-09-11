const mongoose = require("mongoose");
const HandleIssues = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    contentIssue: {
      Type: String,
    },
    answerissue: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HandleIssues", HandleIssues);
