const express = require("express");
const router = express.Router();
var CollaForceStock = require("../../models/collaforce/collaforcemodule");
var HistoriqueCL = require("../../models/collaforce/historique_collaforchmodule");
router.get("/api/collaforce/", async (req, res) => {
  const getallsb = await CollaForceStock.find();
  return res.status(202).json(getallsb);
});
/* 
router.post("/api/colla/force/add", async (req, res) => {
  try {
    const stockValue = 20;
    const added = 20;
    const minus = 10;
    const newStockValues = new CollaForceStock({
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
router.put("/api/collaforce/add/:id", async (req, res) => {
  var zero = 0;
  const UpdateCl = await CollaForceStock.findByIdAndUpdate(req.params.id);
  UpdateCl.stockValue = Number(req.body.stockValue);
  UpdateCl.added = Number(req.body.added);
  UpdateCl.minus = Number(req.body.minus);
  UpdateCl.routurn = Number(req.body.routurn);
  const dataforHistorique = await UpdateCl.save();
  const stockValueC = dataforHistorique.stockValue;
  const addedC = dataforHistorique.added;
  const minusC = dataforHistorique.minus;
  const routurnC = dataforHistorique.routurn;
  const getInitValueStk = await HistoriqueCL.find();
  const sliceArray =
    getInitValueStk.length <= 0 ? zero : getInitValueStk.slice(-1);
  const stockInitialC = sliceArray == "0" ? "0" : sliceArray[0].stockValueG;
  const newHistoriquesb = new HistoriqueCL({
    stockValueC,
    addedC,
    minusC,
    routurnC,
    stockInitialC,
  });
  await newHistoriquesb.save();
  return res
    .status(202)
    .json("les donnée de Colla Force a été modifiée avec succés");
});
/*
router.delete("/api/remove/slimBody/:id", async (req, res) => {
  await StockSlimBody.findByIdAndRemove(req.params.id);
  return res.status(202).json("produit slim body a été supprimer avec succés");
});
*/

module.exports = router;
