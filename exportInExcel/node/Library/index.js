const express = require("express");
const libraryRoutes = require("./routes/LibraryRoutes");
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "ok"
    })
})

app.use("/library", libraryRoutes)

app.use((err, req, res, next) => {
    const statusCode = req.statusCode || 500;
    res.status(statusCode).json({
        message: err.message
    })
    return
})

app.listen(5004, () => {
    console.log("server is up and running")
})