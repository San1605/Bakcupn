var express = require('express');
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://sandeshsinghalswm:y7kGQgDDxavCdYo2@cluster0.4km1ran.mongodb.net/instaclone")

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  password: String,
  profileImage: String,
  bio:String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
})
userSchema.plugin(plm)
module.exports = mongoose.model("user", userSchema) 