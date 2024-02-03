const mongoose = require("mongoose");
const plm= require("passport-local-mongoose")
mongoose.connect("mongodb+srv://sandeshsinghalswm:y7kGQgDDxavCdYo2@cluster0.4km1ran.mongodb.net/")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{type:mongoose.Schema.Types.ObjectId,ref:"posts"}]
});
userSchema.plugin(plm)
module.exports = mongoose.model("user", userSchema)