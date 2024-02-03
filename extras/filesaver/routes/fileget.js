
const router = require("express").Router();
const getfilelogic = require("../controllers/getfilelogic");


router.route("/getfile").post(getfilelogic);

module.exports= router