const express = require("express");
const router = express.Router();
const NotesSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/notes_siham_module");
router.get("/getAll/siham/Notes", async (req, res) => {
  const WaitingNotesData = await NotesSihamDb.find().sort({
    cratedAt: -1,
  });
  return res.status(202).json(WaitingNotesData);
});
router.post("/newSiham/Notes/", async (req, res) => {
  const { content } = req.body;
  try {
    const newNote = new NotesSihamDb({
      content,
    });
    await newNote.save();
    return res.status(202).json("note has been added successfully")
  } catch (error) {
    console.log(error);
  }
});
router.delete("/notes/all/", async (req, res) => {
  await NotesSihamDb.deleteMany();
  return res.status(202).json("deleted avec succée");
});
module.exports = router;