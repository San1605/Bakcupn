const express = require("express")
const router = express.Router();
const programmingController = require("../controllers/programmingController")

router.get("/", programmingController.getRecordsController)
router.post("/",programmingController.createRecordsController)
router.delete("/:id",programmingController.deleteRecordsController)
router.put("/",programmingController.updateRecordsController)

module.exports = router;
