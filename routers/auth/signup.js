const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
var UsersSchema = require("../../models/users");
router.get("/bring/all/users", async (req, res) => {
  const getUsersData = await UsersSchema.find({});
  return res.status(202).json(getUsersData);
});
router.post("/api/signup/user/", async (req, res) => {
  const { email, password, role } = req.body;
  const data = await UsersSchema.findOne({ email });
  if (data) {
    return res.status(500).json("user already Exist, please try again");
  } else {
    const newUser = new UsersSchema({
      email,
      password,
      role,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
        return res
          .status(202)
          .json("Merci votre compte a été créé avec succès");
      });
    });
  }
});

module.exports = router;
