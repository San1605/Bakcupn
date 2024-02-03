const express = require('express');
const router = express.Router();
const mailerServices = require('../services/mailer');

// send mail using gmail
router.post('/', async function(req, res, next) {
    try {
        res.json(await mailerServices.sendMail(req.body))
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
})

module.exports = router;