const express = require("express");
const getFileController = require("../controller/getFileController");
const router = express.Router();

router.route("/getfile").post(getFileController)

// router.post("/getfile",getFileController)
module.exports=router