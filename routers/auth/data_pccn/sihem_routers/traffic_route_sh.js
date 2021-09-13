const express = require("express");
const router = express.Router();
const ConfirmedSihamSchema = require("../../../../models/data_moduls_pccn/siham_fakes/confirmed_module");
router.post("/siham/traffic/data/", async (req, res) => {
  try {
    const getDataProduct = req.body.nameProduct;
    const dataDayFive = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-05",
        $lte: "2021-09-06",
      },
    });
    const dataDaySex = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-06",
        $lte: "2021-09-07",
      },
    });
    const dataDaySeven = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-07",
        $lte: "2021-09-08",
      },
    });
    const dataDayEight = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-08",
        $lte: "2021-09-09",
      },
    });
    const dataDayNine = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-09",
        $lte: "2021-09-10",
      },
    });
    const dataDayTen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-10",
        $lte: "2021-09-11",
      },
    });
    const dataDayEleven = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-11",
        $lte: "2021-09-12",
      },
    });
    const dataDayTwelve = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-12",
        $lte: "2021-09-13",
      },
    });
    const dataDayThirtheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-13",
        $lte: "2021-09-14",
      },
    });
    const dataDayfourtheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-14",
        $lte: "2021-09-15",
      },
    });
    const dataDayfiftheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-15",
        $lte: "2021-09-16",
      },
    });
    const dataDaysextheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-16",
        $lte: "2021-09-17",
      },
    });
    const dataDayseventheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-17",
        $lte: "2021-09-18",
      },
    });
    const dataDayeighteen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-18",
        $lte: "2021-09-19",
      },
    });
    const dataDayninetheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-19",
        $lte: "2021-09-20",
      },
    });
    const dataDaytweenty = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-20",
        $lte: "2021-09-21",
      },
    });
    const dataDaytwentyOne = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-21",
        $lte: "2021-09-22",
      },
    });
    const dataDaytwentyTwo = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-22",
        $lte: "2021-09-23",
      },
    });
    const dataDaytwentyThree = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-23",
        $lte: "2021-09-24",
      },
    });
    const dataDaytwentyFour = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-24",
        $lte: "2021-09-25",
      },
    });
    const dataDaytwentyFive = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-25",
        $lte: "2021-09-26",
      },
    });
    const dataDaytwentySex = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-26",
        $lte: "2021-09-27",
      },
    });
    const dataDaytwentySeven = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-27",
        $lte: "2021-09-28",
      },
    });
    const dataDaytwentyEight = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-28",
        $lte: "2021-09-29",
      },
    });
    const dataDaytwentyNine = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-29",
        $lte: "2021-09-30",
      },
    });
    const dataDaytThirtheen = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-30",
        $lte: "2021-09-31",
      },
    });
    const dataDaytThirtyOne = await ConfirmedSihamSchema.find({
      productType: getDataProduct,
      intialDate: {
        $gte: "2021-09-31",
        $lte: "2021-10-01",
      },
    });
    return res.status(202).json({
      dataDayFive,
      dataDaySex,
      dataDaySeven,
      dataDayEight,
      dataDayNine,
      dataDayTen,
      dataDayEleven,
      dataDayTwelve,
      dataDayThirtheen,
      dataDayfourtheen,
      dataDayfiftheen,
      dataDaysextheen,
      dataDayseventheen,
      dataDayeighteen,
      dataDayninetheen,
      dataDaytweenty,
      dataDaytwentyOne,
      dataDaytwentyTwo,
      dataDaytwentyThree,
      dataDaytwentyFour,
      dataDaytwentyFive,
      dataDaytwentySex,
      dataDaytwentySeven,
      dataDaytwentyEight,
      dataDaytwentyNine,
      dataDaytThirtheen,
      dataDaytThirtyOne,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
