const express = require('express');
const router = express.Router();
const qrCode  = require("../services/qrCode");

router.post('/', async function(req, res, next){
    try {
        res.json(await qrCode.generateQRCode(req.body.text))
    } catch (error) {
        console.error(`Error`, error.message);
        next(err);
    }
})

module.exports = router;