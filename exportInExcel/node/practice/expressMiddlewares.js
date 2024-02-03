const express  = require("express");
const app =express();
const logger = require("./logger")
const authorize= require("./authorize");

/// we can use middleware in three types
/*
1 our own like logger and authorize
2 express middleware   express.static("./public")
3 third part (morgan)
*/


// req => middleware =>res

// but if we want to pass middleware in all apis we can use now it wil apply to all 
// app.use(logger)


// if we want to pass separately
// app.get("/",logger,(req,res)=>{
//   res.send("hello world")
// })



// now if you want to apply this middleware to all routes starting from /api 
// app.use("./api",logger) // this will apply to all routes starting from /api ,like "/api/home" 'api/prdoucts' 


// if you want to pass multiple middleware
app.use([logger,authorize])


app.get("/",(req,res)=>{
  res.send("hello world")
})

app.get("/about",(req,res)=>{
  res.send("hello i am about")
})

app.listen(4006,()=>{
    console.log("server is up and running ")
})


