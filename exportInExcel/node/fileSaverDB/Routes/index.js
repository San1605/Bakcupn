const getFileController = require("../controller/getFIleController");

const Router= require("express").Router();

Router.route("/getfile").post(getFileController)

module.exports=Router