const express = require("express");
const router = express.Router();
var HistoriqueCl = require("../../models/collaforce/historique_collaforchmodule");
router.get("/api/historique/collaforce/", async (req, res) => {
  const getHistorique = await HistoriqueCl.find();
  return res.status(202).json(getHistorique);
});
router.post("/api/collaforce/date/", async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const dataForceDate = await HistoriqueCl.find({
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
router.delete("/api/historique/deleteAll/cl", async (req, res) => {
  await HistoriqueCl.deleteMany();
  return res.json("supprimer tous ");
});
module.exports = router;
