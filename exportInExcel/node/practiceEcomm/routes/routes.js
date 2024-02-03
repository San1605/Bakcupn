const {getController,postController,updateController,deleteController} = require("../controller/controller");


const express = require("express")
const router = express.Router();

router.get("/todo", getController)
router.post("/todo", postController)
router.put("/todo/:id", updateController)
router.delete("/todo/:id", deleteController)


module.exports = router