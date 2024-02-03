import CryptoJS from 'crypto-js';


export function encrypt(payload) {
    const secretKey = process.env.REACT_APP_KEY;
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(
        payload,
        secretKey,
        { iv }
    );
    let encstring = (
        iv.toString() + encrypted.toString()
    ).replace(/\//g, "hedge");
    return encstring
}


export function decrypt(encstring) {
    const changed = encstring.replaceAll("hedge", "/");
    const secretKey = process.env.REACT_APP_KEY;
    const iv = CryptoJS.enc.Hex.parse(changed.substring(0, 32));
    const encrypted = changed.substring(32);
    const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
        iv,
    }).toString(CryptoJS.enc.Utf8);
    return decrypted
}


export function encryptToken(payload) {
    const jsonString = JSON.stringify(payload);
    const secretKey = process.env.REACT_APP_KEY;
    const encryptedPayload = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
    return encryptedPayload;
}





export const encryptPayload = (payload, iv) => {
    const secretKey = process.env.REACT_APP_KEY;
    const encrypted = CryptoJS.AES.encrypt(
        payload,
        secretKey,
        { iv }
    );
    // Combine IV and encrypted data for storage or transmission
    const encString = iv.toString(CryptoJS.enc.Base64) + encrypted.toString();
    return encString;
};
