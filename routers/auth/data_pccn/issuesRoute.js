const express = require("express");
const router = express.Router();

const HandleIssues = require("../../../models/issues_module");

router.get("/get/issues/users/", async (req, res) => {
  const awaitDataIssue = await HandleIssues.find().sort({
    createdAt: -1,
  });
  return res.status(202).json(awaitDataIssue);
});

router.post("/adding/new/issue/", async (req, res) => {
  try {
    const { user, contentIssue, answerissue } = req.body;
    const newIssue = new HandleIssues({
      user,
      contentIssue,
      answerissue,
    });
    await newIssue.save();
    return res.status(202).json("done...");
  } catch (error) {
    console.log(error);
  }
});
router.put("/update/old/issue/:id", async (req, res) => {
  try {
    const awaitDataFromDb = HandleIssues.findByIdAndUpdate(req.params.id);
    awaitDataFromDb.answerissue = req.bod.awaitDataFromDb;
    await awaitDataFromDb.save();
    return res.status(202).json("done...");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;