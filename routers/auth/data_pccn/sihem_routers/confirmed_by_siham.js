const express = require("express");
const router = express.Router();
const ConfirmedSihamSchema = require("../../../../models/data_moduls_pccn/siham_fakes/confirmed_module");
const CanceledSihamDb = require("../../../../models/data_moduls_pccn/siham_fakes/cancel_module");
router.get("/get/all/siham/confirmed/", async (req, res) => {
  const getIt = await ConfirmedSihamSchema.find({}).sort({
    createdAt: -1,
  });
  return res.status(202).json(getIt);
});
router.get("/pending/siham/confirmed/db/all/:id", async (req, res) => {
  try {
    const getByIDClt = await ConfirmedSihamSchema.findById(req.params.id);
    return res.status(202).json(getByIDClt);
  } catch (error) {
    console.log(error);
  }
});
router.post("/get/confirmed/siham/by/Dates/", async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    console.log(startDate, endDate);
    const awaitDataDates = await ConfirmedSihamSchema.find({
      intialDate: {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
    });
    return res.status(202).json(awaitDataDates);
  } catch (error) {
    console.log(error);
  }
});
//remove confirmed lead to cancel
router.post("/from/confirmed/reload/cancel/:id", async (req, res) => {
  try {
    const AwaitingDeletedData = await ConfirmedSihamSchema.findByIdAndRemove(
      req.params.id
    );
    const name = AwaitingDeletedData.name;
    const city = AwaitingDeletedData.city;
    const addresse = AwaitingDeletedData.addresse;
    const phone = AwaitingDeletedData.phone;
    const status = "cancel";
    const comments = req.body.comments;
    const mehdi = req.body.mehdi;
    const productType = AwaitingDeletedData.productType;
    const newCanceled = new CanceledSihamDb({
      name,
      city,
      addresse,
      phone,
      productType,
      status,
      comments,
      mehdi,
    });
    newCanceled.save();
    return res.status(202).json("woks great");
  } catch (error) {
    console.log(error);
  }
});
router.put("/confirmed/clt/db/:id", async (req, res) => {
  try {
    const dataUpdatedConf = await ConfirmedSihamSchema.findByIdAndUpdate(
      req.params.id
    );
    dataUpdatedConf.name = req.body.name;
    dataUpdatedConf.city = req.body.city;
    dataUpdatedConf.addresse = req.body.addresse;
    dataUpdatedConf.phone = req.body.phone;
    dataUpdatedConf.type = req.body.type;
    dataUpdatedConf.prix = req.body.prix;
    dataUpdatedConf.Qte = req.body.Qte;
    dataUpdatedConf.howSending = req.body.howSending;
    dataUpdatedConf.delivered_not = req.body.delivered_not;
    await dataUpdatedConf.save();
    return res.status(202).json("yes");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/confirmed/all/", async (req, res) => {
  await ConfirmedSihamSchema.deleteMany();
  return res.status(202).json("deleted avec succée");
});

//dates MLonths

router.get("/alldata/by/dates/month/Siham/", async (req, res) => {
  try {
    const getDataOct = await ConfirmedSihamSchema.find({
      createdAt: {
        $gte: "2021-09-1",
        $lte: "2021-09-30",
      },
    });
    return res.status(202).json(getDataOct);
  } catch (error) {
    console.log(error);
  }
});
router.get("/alldata/by/dates/month/Siham/nov/", async (req, res) => {
  try {
    const getDataNov = await ConfirmedSihamSchema.find({
      createdAt: {
        $gte: "2021-11-1",
        $lte: "2021-11-30",
      },
    });
    return res.status(202).json(getDataNov);
  } catch (error) {
    console.log(error);
  }
});
router.get("/alldata/by/dates/month/Siham/dec/", async (req, res) => {
  try {
    const getDataDec = await ConfirmedSihamSchema.find({
      createdAt: {
        $gte: "2021-12-1",
        $lte: "2021-12-31",
      },
    });
    return res.status(202).json(getDataDec);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
