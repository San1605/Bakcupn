const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',  default:[] }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("posts", postSchema);