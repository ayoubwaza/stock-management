const express = require("express");
const router = express.Router();
const PostPonnedSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/postPonned_module");
const PendingSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/pending_module");
router.get("/postponned/siham/all", async (req, res) => {
  const AwaitingPostPonned = await PostPonnedSihamDb.find().sort({
    createdAt: -1,
  });
  return res.status(202).json(AwaitingPostPonned);
});

router.delete("/remove/ponned/to/pend/siham/:id", async (req, res) => {
  try {
    const awaitPonnedData = await PostPonnedSihamDb.findByIdAndRemove(
      req.params.id
    );
    console.log(awaitPonnedData);
    const name = awaitPonnedData.name;
    const city = awaitPonnedData.city;
    const addresse = awaitPonnedData.addresse;
    const phone = awaitPonnedData.phone;
    const dateIni = awaitPonnedData.intialDate;
    const observation = "";
    const dayOne = "";
    const dayTwo = "";
    const dayThree = "";
    const dayFour = "";
    const GetRide = new PendingSihamDb({
      name,
      city,
      addresse,
      phone,
      observation,
      dateIni,
      dayOne,
      dayTwo,
      dayThree,
      dayFour,
    });
    await GetRide.save();
    return res.status(202).json("");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/ponned/all/", async (req, res) => {
  try {
    await PostPonnedSihamDb.deleteMany();
    return res.status(202).json("deleted avec succée");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
