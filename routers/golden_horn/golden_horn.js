const express = require("express");
const router = express.Router();
var StockGoldenHorn = require("../../models/golden_horn_Models/golden_hornModule");
var HistoriqueGh = require("../../models/golden_horn_Models/historique_goldenhornmdl");
router.get("/api/goldenhorn/", async (req, res) => {
  const getallsb = await StockGoldenHorn.find().sort({
    createdAt: -1,
  });
  return res.status(202).json(getallsb);
});

/* 
router.post('/api/golden-horn/add',async (req,res) => {
    const stockValue = 200;
    const added  = 20;
    const minus = 10;
    const newStockValues = new StockGoldenHorn({
        stockValue,
        added,
        minus
    });
    await newStockValues.save();
    return res.status(202).json('valider')
});
*/

router.put("/api/goldenhorn/add/:id", async (req, res) => {
  try {
    var zero = 0;
    const UpdateGh = await StockGoldenHorn.findByIdAndUpdate(req.params.id);
    UpdateGh.stockValue = Number(req.body.stockValue);
    UpdateGh.added = Number(req.body.added);
    UpdateGh.minus = Number(req.body.minus);
    UpdateGh.routurn = Number(req.body.routurn);
    const dataforHistorique = await UpdateGh.save();
    const stockValueGh = dataforHistorique.stockValue;
    const addedGh = dataforHistorique.added;
    const minusGh = dataforHistorique.minus;
    const routurnGh = dataforHistorique.routurn;
    const getInitValueStk = await HistoriqueGh.find();
    const sliceArray =
      getInitValueStk.length <= 0 ? zero : getInitValueStk.slice(-1);
    const stockInitialGh = sliceArray == "0" ? 0 : sliceArray[0].stockValueGh;
    const newHistoriquegh = new HistoriqueGh({
      stockValueGh,
      addedGh,
      minusGh,
      routurnGh,
      stockInitialGh,
    });
    await newHistoriquegh.save();
    return res
      .status(202)
      .json("les donnée de golden horn a été modifiée avec succés");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/remove/slimBody/:id", async (req, res) => {
  try {
    await StockGoldenHorn.findByIdAndRemove(req.params.id);
    return res
      .status(202)
      .json("produit slim body a été supprimer avec succés");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
