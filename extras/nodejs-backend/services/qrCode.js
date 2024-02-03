var QRCode = require('qrcode');

async function generateQRCode(text) {
    try {
        const qrtoDataURL = await QRCode.toDataURL(text);
        await storeQRCodeImage(text);
        return { message: "QR Code generated", data: qrtoDataURL, statusCode: 200 };
    } catch (err) {
        return { message: "Unable to create QR Code.", error: err, statusCode: 500 };
    }
}

function storeQRCodeImage(text) {
    const fileName = generateFileName(text);
    console.log(fileName);
    const path = `static/assets/qrCode/${fileName}`;
    return new Promise((resolve, reject) => {
        QRCode.toFile(path, text, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`QR code saved to ${path}`);
                resolve();
            }
        });
    });
}

function generateFileName(text) {
    const first10Words = text.split(" ").slice(0, 3).join("_");
    const date = new Date().toISOString().replace(/:/g, "-");
    return `${first10Words}_${date}.png`;
}

module.exports = { generateQRCode }