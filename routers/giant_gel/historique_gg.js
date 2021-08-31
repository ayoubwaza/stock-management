const express = require("express");
const router = express.Router();
var HistoriqueGG = require("../../models/giantmodels/historiquegg");
router.get("/api/historique/giantgel/", async (req, res) => {
  const getHistorique = await HistoriqueGG.find();
  return res.status(202).json(getHistorique);
});
router.post("/api/giantgel/date/", async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const dataForceDate = await HistoriqueGG.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return res.status(202).json(dataForceDate);
  } catch (e) {
    console.log(e);
  }
});
router.delete("/api/historique/deleteAll/gg", async (req, res) => {
  await HistoriqueGG.deleteMany();
  return res.json("supprimer tous ");
});

module.exports = router;
