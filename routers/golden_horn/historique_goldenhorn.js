const express = require('express');
const router = express.Router();
var HistoriqueGh = require('../../models/golden_horn_Models/historique_goldenhornmdl');
router.get('/api/historique/goldenhorn/',async (req,res) => {
    const getHistorique = await HistoriqueGh
    .find();

    return res.status(202).json(getHistorique);
});
router.delete('/api/historique/deleteAll/golden',async(req,res) => {
    await HistoriqueGh.deleteMany();
    return res.json('supprimer tous ')
})

module.exports = router;