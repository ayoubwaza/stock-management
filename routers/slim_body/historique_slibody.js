const express = require('express');
const router = express.Router();
var HistoriqueSb = require('../../models/slim bbody/historique_slimbodymd');
router.get('/api/historique/slimbody/',async (req,res) => {
    const getHistorique = await HistoriqueSb
    .find();

    return res.status(202).json(getHistorique);
});
router.delete('/api/historique/deleteAll',async(req,res) => {
    await HistoriqueSb.deleteMany();
    return res.json('supprimer tous ')
})

module.exports = router;