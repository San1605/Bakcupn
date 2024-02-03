const http = require("http");
const { createReadStream } = require("fs")


// create a server then send data to page in chunks


const server = http.createServer((req, res) => {
    const fileStream = createReadStream("./big.txt", { encoding: 'utf8' });
    fileStream.on("open", () => {
        fileStream.pipe(res);
    })
    fileStream.on("error", (error) => {
        fileStream.pipe(error);
    })
})

server.listen(4002, () => {
    console.log("server running successfully")
})