const express = require("express");
const app = express();
const cors = require("cors");
const programmingRoute = require("./routes/programmingRoute")
app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use("/programming", programmingRoute)

app.get("/", (req, res) => {
    res.json({
        message: "ok"
    })
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    res.status(statusCode).json({message:err.message})
    return
})



app.listen(5003, () => {
    console.log("server is up and running")
})