const express = require("express");
const expressSession = require("express-session")
const app = express();

// use for storing data on server
app.use(expressSession({
    resave: false,// dont save unchnaged values
    saveUninitialized: false,
    secret: "Secret_key"
}))


app.get("/", (req, res) => {
    req.session.ban = true;
    res.send("Hello")
})

app.get("/checkban",(req,res)=>{
    if(req.session.ban){
       res.send("you are banned")
    }
    else{
       res.send("you are not banned")
    }
})

app.get("/removeban",(req,res)=>{
    req.session.destroy(function err(){
        // if(err)throw err;
        res.send("ban removed");
    })
})

app.listen(4002, () => {
    console.log("server is up and runnong")
})