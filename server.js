var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");

var app = express();
var PORT = process.env.PORT || 8000;
var uRl =
  "mongodb+srv://ayoubwazane:azerty11@.@stock-dev-clus.hvtyu.mongodb.net/stock-dev-clus?retryWrites=true&w=majority";
mongoose
  .connect(uRl, {
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
app.listen(PORT, () => {
  console.log("server is runing ...");
});
