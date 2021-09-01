const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
var UsersSchema = require("../../models/users");
router.get("/bring/all/users", async (req, res) => {
  const getUsersData = await UsersSchema.find({});
  return res.status(202).json(getUsersData);
});
router.get("/api/get/user_id/:id",async (req,res) => {
  const waitingDatauser = await UsersSchema.findById(req.params.id);
  return res.status(202).json(waitingDatauser);
});
router.delete('/api/remove/all/users',async(req,res) => {
  await UsersSchema.deleteMany();
})
router.post("/api/signin/user/", async (req, res) => {
  const { email, password } = req.body;
  UsersSchema.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json(`Cette utilisateur n'est pas existe`);
      }
      const Token = jwt.sign({ user: user._id }, process.env.SECRET_Key_JWT, {
        expiresIn: "10d",
      });
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json(`Mot de passe ou Email n'est pas valide`);
          }
          return res.status(200).json({
            Token: {
              Token,
              userIden: user._id,
            },
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
router.post("/SignOut", (req, res) => {
  res.json(`bye bye`);
});
module.exports = router;
