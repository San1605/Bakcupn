const express = require('express');
const router = express.Router();
const programmingLanguages = require("../services/programmingLang");

/* GET programming languages. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.getRecords(req.query.page));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

/* DELETE programming languages. */

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.deleteRecord(req.params.id));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
})

/* Update programming languages. */
router.put('/', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.updateRecord(req.body))
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
})

/* CreateRecord programming languages. */
router.post('/', async function (req, res, next) {
    try {
        res.json(await programmingLanguages.createRecord(req.body))
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
})

module.exports = router;