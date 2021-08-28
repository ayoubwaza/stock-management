const express = require('express');
const router = express.Router();
var DeletedInvoicesSchema = require("../models/rubbish_fact");
var facturationSchema = require("../models/facturation");

router.get("/allRubbish",async(req,res) => {
    var sendingRubbish  = await DeletedInvoicesSchema.find().sort({createdAt:-1})
    return res.status(202).json(sendingRubbish)
});

router.delete('/delete/rub/invoice/:id',async (req,res) => {
    var getId = req.params.id;
     await DeletedInvoicesSchema.findByIdAndRemove(getId);
    return res.status(202).json(`facture averc id : ${getId}, a été supprimer avec succée`);
});
router.delete('/restore/invoice/:id',async (req,res) => {
    var getId = req.params.id;
    try {
        const deleteInvoice = await DeletedInvoicesSchema.findByIdAndRemove(getId);
        const ladate = deleteInvoice.ladate;
        const exped = deleteInvoice.exped;
        const telephone = deleteInvoice.telephone;
        const hub = deleteInvoice.hub;
        const client = deleteInvoice.client;
        const addresse = deleteInvoice.addresse;
        const retourn = deleteInvoice.retourn;
        const ndmse = deleteInvoice.ndmse;
        const newInvoice = new facturationSchema({
            ladate,
            exped,
            telephone,
            hub,
            client,
            addresse,
            retourn,
            ndmse
        })
        newInvoice.save();
        return res.status(202).json(`facture avec id ${getId} a été réstaurée avec succée`)
    } catch (error) {
        console.log(error)
    } 
})
module.exports = router;