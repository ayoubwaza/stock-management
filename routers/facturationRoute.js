const express = require("express");
const router = express.Router();
var facturationSchema = require("../models/facturation");
var DeletedInvoicesSchema = require("../models/rubbish_fact");
//get request
router.get("/historique/facturation/", async (req, res) => {
  var getAll = await facturationSchema.find().sort({
    ladate: -1,
  });
  return res.status(202).json(getAll);
});
//get request by id
router.get("/getall/:id", async (req, res) => {
  const sendById = await facturationSchema.findById(req.params.id);
  res.status(202).json(sendById);
});
//post request between two dates
router.post("/facture/betweendates/", async (req, res) => {
  const startDate = new Date(req.body.startDate);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(req.body.endDate);
  endDate.setUTCHours(0, 0, 0, 0);
  try {
    const waitingDetails = await facturationSchema.find({
      ladate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return res.status(202).json(waitingDetails);
  } catch (error) {
    console.log(error);
  }
});
//post request
router.post("/add/facture", async (req, res) => {
  const { exped, telephone, hub, client, addresse, retourn, ndmse } = req.body;
  var ladate = Date.parse(req.body.ladate);
  const newFacture = new facturationSchema({
    ladate,
    exped,
    telephone,
    hub,
    client,
    addresse,
    retourn,
    ndmse,
  });
  await newFacture.save();
  return res.status(202).json("facture a été sauvgarder avec succée");
});
//delete request
router.delete("/delete/fact/:id", async (req, res) => {
  var perfectId = req.params.id;
  var forrubbich = await facturationSchema.findById(perfectId);
  var ladate = forrubbich.ladate;
  var exped = forrubbich.exped;
  var telephone = forrubbich.telephone;
  var hub = forrubbich.hub;
  var client = forrubbich.client;
  var addresse = forrubbich.addresse;
  var retourn = forrubbich.retourn;
  var ndmse = forrubbich.ndmse;
  const newRubbich = new DeletedInvoicesSchema({
    ladate,
    exped,
    telephone,
    hub,
    client,
    addresse,
    retourn,
    ndmse,
  });
  newRubbich.save();
  await facturationSchema.findByIdAndRemove(perfectId);
  return res.status(202).json(`facture a été supprimer avec succés`);
});
//update request
router.put("/update/facture/:id", async (req, res) => {
  var updatedata = await facturationSchema.findByIdAndUpdate(req.params.id);
  updatedata.ladate = req.body.ladate;
  updatedata.exped = req.body.exped;
  updatedata.telephone = req.body.telephone;
  updatedata.hub = req.body.hub;
  updatedata.client = req.body.client;
  updatedata.addresse = req.body.addresse;
  updatedata.retourn = req.body.retourn;
  updatedata.ndmse = req.body.ndmse;
  await updatedata.save();
  return res.status(202).json("waitingUpdates");
});
module.exports = router;
