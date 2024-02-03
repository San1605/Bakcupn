const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(fileupload());
app.use(cookieParser());
const {fileget} = require("./routes");

app.get("/",(req,res)=>res.send("hello from server"));
app.use("/api",fileget);

app.listen(4000,()=>{
    console.log("server started at port 4000");
});