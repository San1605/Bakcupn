const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/LibraryController")

router.get("/",LibraryController.getAllBooks);
router.post("/",LibraryController.addBook);
router.put("/",LibraryController.updateBook);
router.delete("/:id",LibraryController.deleteBook)

module.exports=router