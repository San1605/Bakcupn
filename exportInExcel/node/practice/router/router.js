const express = require("express")

const router = express.Router()
const {
    getPeople,
    deleteUser,
    editUser,
    login
} = require("../controllers/index")


router.get("/", getPeople)
router.post("/login", login)
router.put("/:id", editUser)
router.delete("/:id", deleteUser)

module.exports = router