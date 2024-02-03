const express = require("express");
const cors = require("cors");
const fileupload = require('express-fileupload');
const router = require("./Routes/index")
const app = express();
app.use(cors());
app.use(fileupload());


app.get("/",(req,res)=>{
    res.send("hello from the server")
})

app.use("/api",router)




app.listen(5005,()=>{
    console.log("server is up and running")
})