const express = require('express');
const router = express.Router();
const uploadFileService = require("../services/uploadfile");

// Upload file
router.post('/', async function (req, res, next) {
    try {
        await uploadFileService.uploadFileService(req, res);
        if (req.file == undefined) {
            return res.json({ status: 400, message: "Please upload a file!" });
        }
        return res.json({ status: 200, message: "Uploaded the file successfully: " + req.file.originalname });
    } catch (err) {
        next(err);
        return res.json({ status: 500, message: `Could not upload the file: ${req.file}. ${err}` });
    }
})

// list of all files

router.get('/getAll', async function (req, res, next) {
    try {
        res.json(await uploadFileService.getAllFiles())
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
})


module.exports = router;