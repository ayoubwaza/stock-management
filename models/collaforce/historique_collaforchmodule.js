const mongoose = require('mongoose');
const HistoriqueColla = new mongoose.Schema({
        stockValueC: {
          type: Number,
        },
        addedC: {
          type: Number,
        },
        minusC: {
          type: Number,
        },
        routurnC: {
          type: Number,
        },
        stockInitialC: {
          type: Number,
        },
},{timestamps:true});

module.exports = mongoose.model("historiquecolla",HistoriqueColla);