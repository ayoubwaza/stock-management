var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
var app = express();
var PORT = process.env.PORT || 8000;
require("dotenv").config();
var uRl =
  "mongodb+srv://ayoubwazane:azerty11@.@stock-dev-clus.hvtyu.mongodb.net/stock-dev-clus?retryWrites=true&w=majority";
mongoose
  .connect(process.env.Db_ACCESS, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connection is working Great ..."))
  .catch((err) => console.log(err));
var FacturationRouter = require("./routers/facturationRoute");
var Rubbish = require("./routers/rubbichfactRoute");
var SlimBodyRoutes = require("./routers/slim_body/sliml_body");
var SlimBodyHistorique = require("./routers/slim_body/historique_slibody");
var GiantGelRoutes = require("./routers/giant_gel/giantgelapi");
var GiantGelHistorique = require("./routers/giant_gel/historique_gg");
var CollaForceRoutes = require("./routers/colla_force/colla_force");
var CollForceHistorique = require("./routers/colla_force/historique_collaforce");
var GoldenHornRoutes = require("./routers/golden_horn/golden_horn");
var GoldenHornHistorique = require("./routers/golden_horn/historique_goldenhorn");
var GoogleSheetSiham = require("./routers/googleSheet/sheets");
var UserAuthSignUp = require("./routers/auth/signup");
var UserAuthSignIn = require("./routers/auth/signin");
var PendingSiham = require("./routers/auth/data_pccn/pending");
var ConfirmedSiham = require("./routers/auth/data_pccn/sihem_routers/confirmed_by_siham");
var PostPonnedSiham = require("./routers/auth/data_pccn/sihem_routers/postPonned_by_siham");
var CancledSihamDb = require("./routers/auth/data_pccn/sihem_routers/cancels_by_siham");
var AnswerSihamDb = require("./routers/auth/data_pccn/sihem_routers/no_answer");
var NoteSiham = require("./routers/auth/data_pccn/sihem_routers/NotesRouteSihame");
var IssueData = require("./routers/auth/data_pccn/issuesRoute");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", FacturationRouter);
app.use("", Rubbish);
app.use("", SlimBodyRoutes);
app.use("", SlimBodyHistorique);
app.use("", GiantGelRoutes);
app.use("", GiantGelHistorique);
app.use("", CollaForceRoutes);
app.use("", CollForceHistorique);
app.use("", GoldenHornRoutes);
app.use("", GoldenHornHistorique);
app.use("", GoogleSheetSiham);
app.use("/apis", UserAuthSignUp);
app.use("/apis", UserAuthSignIn);
app.use("/apis", PendingSiham);
app.use("/apis", ConfirmedSiham);
app.use("/apis", PostPonnedSiham);
app.use("/apis", CancledSihamDb);
app.use("/apis", AnswerSihamDb);
app.use("/apis", NoteSiham);
app.use("/apis", IssueData);
app.listen(PORT, () => {
  console.log("server is runing ...");
});
