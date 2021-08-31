const express = require("express");
const router = express.Router();
var HistoriqueGh = require("../../models/golden_horn_Models/historique_goldenhornmdl");
router.get("/api/historique/goldenhorn/", async (req, res) => {
  const getHistorique = await HistoriqueGh.find();
  return res.status(202).json(getHistorique);
});
router.post("/api/goldenhorn/date/", async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const dataForceDate = await HistoriqueGh.find({
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
router.delete("/api/historique/deleteAll/golden", async (req, res) => {
  await HistoriqueGh.deleteMany();
  return res.json("supprimer tous ");
});

module.exports = router;
