const express = require("express");
const router = express.Router();
const CancelSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/cancel_module");
//const PendingSihamDb = require('../../../../models/data_moduls_pccn/siham_fakes/pending_module');
router.get("/canceled/siham/all", async (req, res) => {
  const AwaitingCanceledData = await CancelSihamDb.find().sort({
    createdAt: -1,
  });
  return res.status(202).json(AwaitingCanceledData);
});
router.get("/canceled/each/client/:id", async (req, res) => {
  const AwaitEachClientData = await CancelSihamDb.findById(req.params.id);
  return res.status(202).json(AwaitEachClientData);
});

router.put("/canceled/clt/db/:id", async (req, res) => {
  try {
    const dataUpdatedCanceled = await CancelSihamDb.findByIdAndUpdate(
      req.params.id
    );
    dataUpdatedCanceled.name = req.body.name;
    dataUpdatedCanceled.city = req.body.city;
    dataUpdatedCanceled.addresse = req.body.addresse;
    dataUpdatedCanceled.phone = req.body.phone;
    dataUpdatedCanceled.status = req.body.status;
    dataUpdatedCanceled.comments = req.body.comments;
    dataUpdatedCanceled.mehdi = req.body.mehdi;
    await dataUpdatedCanceled.save();
    return res.status(202).json("yes");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/cancels/all/", async (req, res) => {
  await CancelSihamDb.deleteMany();
  return res.status(202).json("deleted avec succée");
});
module.exports = router;
