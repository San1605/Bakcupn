const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {origin: "*"},
  perMessageDeflate :false  
});
const path = require('node:path');
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000/','https://videostream-frontend.azurewebsites.net/', ' https://16c9-103-137-84-138.ngrok-free.app ']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.static(path.join('public')))
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log("New client connected",socket);
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("videoChunk", ({chunk}) => {
    // console.log('in videochunk');
    console.log(chunk);
    socket.broadcast.emit("getStreamingVideo", chunk);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});

app.get("/video", function (req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const videoPath = "./example.mp4";
  const videoSize = fs.statSync(videoPath).size;
  console.log(videoSize);
  if (!videoSize) {
    res.status(400).send("Video is not available");
  }
  // console.log("size of video is:", videoSize);
  const CHUNK_SIZE = 10 ** 6; //1 MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

// =============================================================================

const request = require("request");

app.get("/getVideo", function (req, res) {
  const writableStream = fs.createWriteStream("example.mp4");

  // make a request to a remote video file
  request("http://techslides.com/demos/sample-videos/small.mp4")
    .on("error", (err) => {
      console.error(err);
    })
    .pipe(writableStream);

  // listen for the finish event
  writableStream.on("finish", () => {
    console.log("Write completed.");
    // res.status(200).send("Video is available on server now. Refresh your page.");
    console.log("okokokokokokkkokkokokokokk");
    res.redirect("/");
  });
});
// create a writable stream to a local file

server.listen(port, function () {
  console.log("Server is running on port:", port);
});