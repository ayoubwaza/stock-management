const express = require('express');
const router = express.Router();
var HistoriqueGG = require('../../models/giantmodels/historiquegg');
router.get('/api/historique/giantgel/',async (req,res) => {
    const getHistorique = await HistoriqueGG.find();
    return res.status(202).json(getHistorique);
});
router.delete('/api/historique/deleteAll/gg',async(req,res) => {
    await HistoriqueGG.deleteMany();
    return res.json('supprimer tous ')
});

module.exports = router;