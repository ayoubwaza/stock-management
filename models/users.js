const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
    },
    nom: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", UsersSchema);
