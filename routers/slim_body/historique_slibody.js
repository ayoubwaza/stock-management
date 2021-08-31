const express = require("express");
const router = express.Router();
var HistoriqueSb = require("../../models/slim bbody/historique_slimbodymd");
router.get("/api/historique/slimbody/", async (req, res) => {
  const getHistorique = await HistoriqueSb.find();
  return res.status(202).json(getHistorique);
});
router.post("/api/slimbody/date/", async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.body.endDate);
    endDate.setUTCHours(0, 0, 0, 0);
    const dataForceDate = await HistoriqueSb.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return res.status(202).json(dataForceDate);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/historique/deleteAll", async (req, res) => {
  await HistoriqueSb.deleteMany();
  return res.json("supprimer tous ");
});
module.exports = router;
