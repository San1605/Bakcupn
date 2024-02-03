const express = require("express");
const cors = require("cors");
const getFile = require("./routes/getFile")
const fileupload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(fileupload());

app.get("/", (req, res) => {
    res.send("hello from the server")
});


app.use("/api", getFile)

app.listen(5003, () => {
    console.log("server is up and running")
})