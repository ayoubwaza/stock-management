const mongoose = require('mongoose');
const HistoriqueGG = new mongoose.Schema({
        stockValueG: {
          type: Number,
        },
        addedG: {
          type: Number,
        },
        minusG: {
          type: Number,
        },
        routurnG: {
          type: Number,
        },
        stockInitialG: {
          type: Number,
        },
},{timestamps:true});

module.exports = mongoose.model("historiquegg",HistoriqueGG);