// const {createReadStream,writeFileSync,readFileSync}= require("fs");


// // make a big file 

// // for(let i=0;i<10000000;i++){
// //     writeFileSync("./big.txt",`hello world from line no. ${i}\n`,{flag:"a"})
// // }

// // read a stream


// // const stream = createReadStream("./big.txt",{encoding:"utf8"});

// // stream.on('data',(result)=>{
// //     console.log(result);
// // })


// const  homepage = readFileSync("./index.html");
// const http = require("http");

// const server = http.createServer((req,res)=>{
//     console.log("user hit the server");

//     console.log(req.url);
//     console.log(req.method)

//     res.writeHead(200,{
//         'content-type':"text/html"
//     })
//     res.write("<h1>HELLOOO</H1/>")
//     res.end(homepage)
// })

// // 80  http
// // 443 htpps

// server.listen(4002,()=>{
//     console.log("this port is 4002")
// });

// require("./express3.js")

// require("./expressMiddlewares.js")

require("./methods")