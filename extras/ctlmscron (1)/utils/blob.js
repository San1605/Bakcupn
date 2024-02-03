const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.blobConnectionString2);


async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}
async function moveFile(container, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const downloadBlockBlobResponse = await blockBlobClient.download();
            const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
            const destClient = containerClient.getBlockBlobClient("InvalidExcel/" + fileName);
            const uploadBlobResponse = await destClient.upload(downloaded, downloaded.length);
            const deleteBlob = await blockBlobClient.delete()
            resolve(deleteBlob)
        } catch (err) {

            reject(err.message)
        }
    })
}
async function getFileFromBlob(container, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            let testContainer = `https://mahimarga9d1.blob.core.windows.net/cicd-deployment/${fileName}?sp=r&st=2022-07-18T15:31:40Z&se=2022-07-18T23:31:40Z&spr=https&sv=2021-06-08&sr=c&sig=CBNTfCx%2FoTWevwQh80yuDHPQ0f1XVGG0fDkvJBN4uDY%3D`

            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const downloadBlockBlobResponse = await blockBlobClient.download();
            const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody).catch(err => reject(err.message))
            resolve(downloaded)
        } catch (err) {
            reject(err.message)
        }

    })
}
module.exports = { getFileFromBlob, moveFile }