const express = require("express");
const router = express.Router();
var GiantGelStock = require("../../models/giantmodels/giant_module");
var HistoriqueGG = require("../../models/giantmodels/historiquegg");
router.get("/api/giantgel/", async (req, res) => {
  const getallsb = await GiantGelStock.find();
  return res.status(202).json(getallsb);
});
/* 
router.post("/api/giantgel/add", async (req, res) => {
  try {
    const stockValue = 20;
    const added = 20;
    const minus = 10;
    const newStockValues = new GiantGelStock({
      stockValue,
      added,
      minus,
    });
    await newStockValues.save();
    return res.status(202).json("valider");
  } catch (error) {
    console.log(error);
  }
});
*/
router.put("/api/giantgel/add/:id", async (req, res) => {
  var zero = 0;
  const UpdateSB = await GiantGelStock.findByIdAndUpdate(req.params.id);
  UpdateSB.stockValue = Number(req.body.stockValue);
  UpdateSB.added = Number(req.body.added);
  UpdateSB.minus = Number(req.body.minus);
  UpdateSB.routurn = Number(req.body.routurn);
  const dataforHistorique = await UpdateSB.save();
  const stockValueG = dataforHistorique.stockValue;
  const addedG = dataforHistorique.added;
  const minusG = dataforHistorique.minus;
  const routurnG = dataforHistorique.routurn;
  const getInitValueStk = await HistoriqueGG.find();
  const sliceArray =
    getInitValueStk.length <= 0 ? zero : getInitValueStk.slice(-1);
  const stockInitialG = sliceArray == "0" ? "0" : sliceArray[0].stockValueG;
  const newHistoriquesb = new HistoriqueGG({
    stockValueG,
    addedG,
    minusG,
    routurnG,
    stockInitialG,
  });
  await newHistoriquesb.save();
  return res
    .status(202)
    .json("les donnée de giant gel a été modifiée avec succés");
});
/*
router.delete("/api/remove/slimBody/:id", async (req, res) => {
  await StockSlimBody.findByIdAndRemove(req.params.id);
  return res.status(202).json("produit slim body a été supprimer avec succés");
});
*/

module.exports = router;
