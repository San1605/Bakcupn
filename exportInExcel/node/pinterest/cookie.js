const express = require("express")
const cookieParser = require("cookie-parser");


const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
    res.cookie("age", 22)
    res.send("cookie created")
})
app.get("/read", (req, res) => {
    const cookie = req.cookies
    res.send(cookie)
})
app.get("/delete", (req, res) => {
    res.clearCookie("age")
    res.send("cookie deleted")
})



app.listen(5005, () => {
    console.log("server is up and running")
})