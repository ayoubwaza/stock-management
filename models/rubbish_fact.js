const mongoose = require('mongoose');

var DeletedInvoicesSchema = new mongoose.Schema({
    ladate:{
        type:Date,
        required:true
    },
    exped:{
        type:String,
        trim:true
    },
    telephone:{
        type:String
    },
    hub:{
        type:String
    },
    client:{
        type:String
    },
    addresse:{
        type:String
    },
    retourn:{
        type:String
    },
    ndmse:{
        type:String
    },
},{timestamps:true});

module.exports = mongoose.model('rubbis_invoices',DeletedInvoicesSchema)