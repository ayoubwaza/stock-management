const express = require('express');
const router = express.Router();
var HistoriqueCl = require('../../models/collaforce/historique_collaforchmodule');
router.get('/api/historique/collaforce/',async (req,res) => {
    const getHistorique = await HistoriqueCl.find();
    return res.status(202).json(getHistorique);
});
router.delete('/api/historique/deleteAll/cl',async(req,res) => {
    await HistoriqueCl.deleteMany();
    return res.json('supprimer tous ')
});
module.exports = router;