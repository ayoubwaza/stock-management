const express = require("express");
const router = express.Router();
const PendingSchemaSiham = require("../../../models/data_moduls_pccn/siham_fakes/pending_module");
const ConfirmedSihamSchema = require("../../../models/data_moduls_pccn/siham_fakes/confirmed_module");
const PostPonnedSihamDb = require("../../../models/data_moduls_pccn/siham_fakes/postPonned_module");
const CancelSihamDb = require("../../../models/data_moduls_pccn/siham_fakes/cancel_module");
const NoAnswerSihamDb = require("../../../models/data_moduls_pccn/siham_fakes/no_answer_module");
router.get("/pending/all/", async (req, res) => {
  const getPendingData = await PendingSchemaSiham.find();
  return res.status(202).json(getPendingData);
});
//siham Route pending DB
router.get("/pending/db/all/", async (req, res) => {
  const getPendingData = await PendingSchemaSiham.find();
  return res.status(202).json(getPendingData);
});
//siham update Data Client
router.put("/pending/db/:id", async (req, res) => {
  try {
    const updatedData = await PendingSchemaSiham.findByIdAndUpdate(
      req.params.id
    );
    updatedData.nom = req.body.nom;
    updatedData.city = req.body.city;
    updatedData.addresse = req.body.addresse;
    updatedData.phone = req.body.phone;
    updatedData.status = req.body.status;
    updatedData.observation = req.body.observation;
    updatedData.dayOne = req.body.dayOne;
    updatedData.dayTwo = req.body.dayTwo;
    updatedData.dayThree = req.body.dayThree;
    updatedData.dayFour = req.body.dayFour;
    await updatedData.save();
  } catch (err) {
    console.log(err);
  }
});
//get
router.get("/pending/siham/pending/db/all/:id", async (req, res) => {
  const getByIDClt = await PendingSchemaSiham.findById(req.params.id);
  return res.status(202).json(getByIDClt);
});
router.post("/api/pending/userid/all_All/", async (req, res) => {
  try {
    const delta = await req.body.dataPending;
    delta.map((clt) => {
      const name = clt.CltNames;
      const city = clt.CltCity;
      const addresse = clt.CLtAddresse;
      const phone = clt.CltPhone;
      const productType = clt.CltProduct;
      const observation = "";
      const dayOne = "";
      const dayTwo = "";
      const dayThree = "";
      const dayFour = "";
      PendingSchemaSiham.findOne({ phone })
        .then((data) => {
          if (data) {
            return "";
          }
          const newPendingSchemaSiham = new PendingSchemaSiham({
            name,
            city,
            addresse,
            phone,
            productType,
            observation,
            dayOne,
            dayTwo,
            dayThree,
            dayFour,
          });
          newPendingSchemaSiham
            .save()
            .then(() => console.log(""))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    console.log("error : ", error);
  }
});
//removing pending lead to confirm
router.post("/remove/pending/lead/:id", async (req, res) => {
  const removingPendLead = await PendingSchemaSiham.findByIdAndRemove(
    req.params.id
  );
  const name = removingPendLead.name;
  const city = removingPendLead.city;
  const addresse = removingPendLead.addresse;
  const phone = removingPendLead.phone;
  const type = "confirmé";
  const prix = req.body.prix;
  const Qte = req.body.Qte;
  const howSending = req.body.howSending;
  const delivered_not = req.body.delivered_not;
  const intialDate = removingPendLead.createdAt;
  const productType  = removingPendLead.productType;
  const newConfirmedSiham = new ConfirmedSihamSchema({
    name,
    city,
    addresse,
    phone,
    productType,
    type,
    prix,
    Qte,
    howSending,
    delivered_not,
    intialDate
  });
  console.log(newConfirmedSiham);
  newConfirmedSiham
    .save()
    .then((data) => {
      return res.status(202).json(data);
    })
    .catch((err) => console.log(err));
});
//removing pending lead to postPonned
router.post("/remove/pending/lead/to/ppnd/:id", async (req, res) => {
  const removingPendLead = await PendingSchemaSiham.findByIdAndRemove(
    req.params.id
  );
  const name = removingPendLead.name;
  const city = removingPendLead.city;
  const addresse = removingPendLead.addresse;
  const phone = removingPendLead.phone;
  const comments = req.body.comments;
  const dateCall = req.body.dateCall;
  const intialDate = removingPendLead.createdAt;
  const productType = removingPendLead.productType;
  const newConfirmedSiham = new PostPonnedSihamDb({
    name,
    city,
    addresse,
    phone,
    productType,
    comments,
    dateCall,
    intialDate
  });
  newConfirmedSiham
    .save()
    .then((data) => {
      return res.status(202).json(data);
    })
    .catch((err) => console.log(err));
});
//removing pending lead to cancel
router.post("/remove/pending/lead/to/cancel/:id", async (req, res) => {
  const removingPendLead = await PendingSchemaSiham.findByIdAndRemove(
    req.params.id
  );
  const name = removingPendLead.name;
  const city = removingPendLead.city;
  const addresse = removingPendLead.addresse;
  const phone = removingPendLead.phone;
  const comments = req.body.comments;
  const mehdi = req.body.mehdi;
  const status = "cancel";
  const productType =  removingPendLead.productType;
  const intialDate = removingPendLead.createdAt;
  const newConfirmedSiham = new CancelSihamDb({
    name,
    city,
    addresse,
    phone,
    productType,
    comments,
    mehdi,
    status,
    intialDate
  });
  newConfirmedSiham
    .save()
    .then((data) => {
      return res.status(202).json(data);
    })
    .catch((err) => console.log(err));
});
//removing pending lead 
router.post("/remove/pending/lead/to/no_answer/:id", async (req, res) => {
  const removingNoAnswerLead = await PendingSchemaSiham.findByIdAndRemove(
    req.params.id
  );
  const name = removingNoAnswerLead.name;
  const city = removingNoAnswerLead.city;
  const addresse = removingNoAnswerLead.addresse;
  const phone = removingNoAnswerLead.phone;
  const observation = removingNoAnswerLead.observation;
  const dayOne = removingNoAnswerLead.dayOne;
  const dayTwo = removingNoAnswerLead.dayTwo;
  const dayThree = removingNoAnswerLead.dayThree;
  const dayFour = removingNoAnswerLead.dayFour;
  const status = "No Answer";
  const intialDate = removingNoAnswerLead.createdAt;
  const productType = removingNoAnswerLead.productType;
  const newNoAnswerSchemaSiham = new NoAnswerSihamDb({
    name,
    city,
    addresse,
    phone,
    productType,
    observation,
    dayOne,
    dayTwo,
    status,
    dayThree,
    dayFour,
    intialDate
  });
  newNoAnswerSchemaSiham
    .save()
    .then((data) => {
      return res.status(202).json(data);
    })
    .catch((err) => console.log(err));
});
//delete  pending data
router.delete("/pending/all/", async (req, res) => {
  await PendingSchemaSiham.deleteMany();
  return res.status(202).json("deleted avec succée");
});
module.exports = router;
