const express = require("express");
const router = express.Router();
var StockSlimBody = require("../../models/slim bbody/mega_module");
var HistoriqueSb = require("../../models/slim bbody/historique_slimbodymd");
router.get("/api/slimbody/", async (req, res) => {
  const getallsb = await StockSlimBody.find().sort({
    createdAt: -1,
  });
  return res.status(202).json(getallsb);
});
/* 
router.post('/api/slimbody/add',async (req,res) => {
    const stockValue = 200;
    const added  = 20;
    const minus = 10;
    const newStockValues = new StockSlimBody({
        stockValue,
        added,
        minus
    });
    await newStockValues.save();
    return res.status(202).json('valider')
});
*/
router.put("/api/slimbody/add/:id", async (req, res) => {
  try {
    var zero = 0;
    const UpdateSB = await StockSlimBody.findByIdAndUpdate(req.params.id);
    UpdateSB.stockValue = Number(req.body.stockValue);
    UpdateSB.added = Number(req.body.added);
    UpdateSB.minus = Number(req.body.minus);
    UpdateSB.routurn = Number(req.body.routurn);
    const dataforHistorique = await UpdateSB.save();
    const stockValueH = dataforHistorique.stockValue;
    const addedH = dataforHistorique.added;
    const minusH = dataforHistorique.minus;
    const routurnH = dataforHistorique.routurn;
    const getInitValueStk = await HistoriqueSb.find();
    const sliceArray =
      getInitValueStk.length <= 0 ? zero : getInitValueStk.slice(-1);
    const stockInitialH = sliceArray == "0" ? 0 : sliceArray[0].stockValueH;
    const newHistoriquesb = new HistoriqueSb({
      stockValueH,
      addedH,
      minusH,
      routurnH,
      stockInitialH,
    });
    await newHistoriquesb.save();
    return res
      .status(202)
      .json("les donnée de slm body a été modifiée avec succés");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/remove/slimBody/:id", async (req, res) => {
  try {
    await StockSlimBody.findByIdAndRemove(req.params.id);
    return res
      .status(202)
      .json("produit slim body a été supprimer avec succés");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
