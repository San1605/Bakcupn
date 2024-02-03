const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    text: String
})
module.exports = mongoose.model("todo", todoSchema)
