const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const config = require("../config");
const fs = require("fs");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.directoryPath);
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileService = util.promisify(uploadFile);

async function getAllFiles() {
    try {
      const files = await new Promise((resolve, reject) => {
        fs.readdir(config.directoryPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });
  
      const fileInfos = files.map((file) => ({
        name: file,
        url: `http://localhost:8080/${config.directoryPath}/${file}`,
      }));
  
      return { status: 200, fileInfo: fileInfos };
    } catch (error) {
      return { status: 500, message: 'Unable to scan files!', error: error };
    }
  }
  

module.exports = { uploadFileService, getAllFiles };