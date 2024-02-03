const express = require('express');
const mongoose = require("mongoose")
const  router  = require('./routes/routes');
const app = express();

mongoose.connect("mongodb+srv://sandeshsinghalswm:y7kGQgDDxavCdYo2@cluster0.4km1ran.mongodb.net/todo").then((result) => {
    app.listen(4003, () => {
        console.log("server is up and running")
    })
}).catch((err) => {
    console.log(err)
}
)

app.use("/api", router)

app.get("/", (req, res) => {
    res.send("hello from server")
})