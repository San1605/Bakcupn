const express = require("express");


const app = express();
const routes=require("./router/router");

app.use(express.urlencoded({ extended: true }));  // it will convert urlpayload into meaningful objects
app.use(express.json());   // it will parse body into object it will allow json object to cme


app.use("/api/people",routes)

app.listen(5004, () => {
    console.log("server is running successfully")
})