const express = require("express");
const router = express.Router();
const NoAnswerSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/no_answer_module");
router.get("/bring/noAnswers/data/all", async (req, res) => {
  const NoAnswerData = await NoAnswerSihamDb.find({}).sort({ createdAt: -1 });
  return res.status(202).json(NoAnswerData);
});
router.get("/get/nocanswer/:id", async (req, res) => {
  try{
    const GetDataNoANswer = await NoAnswerSihamDb.findById(req.params.id);
  return res.status(202).json(GetDataNoANswer);
  }catch(e){
    console.log(e);
  }
});
router.put("/noanswer/modifier/:id", async (req, res) => {
  try {
    const updatedData = await NoAnswerSihamDb.findByIdAndUpdate(req.params.id);
    updatedData.nom = req.body.nom;
    updatedData.city = req.body.city;
    updatedData.addresse = req.body.addresse;
    updatedData.phone = req.body.phone;
    updatedData.status = req.body.status;
    updatedData.observation = req.body.observation;
    updatedData.dayOne = req.body.dayOne;
    updatedData.dayTwo = req.body.dayTwo;
    updatedData.dayThree = req.body.dayThree;
    updatedData.dayFour = req.body.dayFour;
    await updatedData.save();
  } catch (err) {
    console.log(err);
  }
});
router.delete("/noanswer/all/", async (req, res) => {
  await NoAnswerSihamDb.deleteMany();
  return res.status(202).json("deleted avec succée");
});
module.exports = router;
