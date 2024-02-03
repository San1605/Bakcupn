import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Crypto = () => {
  
  const secretKey = 'THIS_IS_TESTING_KEY';
  var payload = {
    username: "user123",
    email: "user@example.com",
  };

  const generateRandomIV = () => {
    var iv = CryptoJS.lib.WordArray.random(16);
    return iv;
  };

  const encryptText = (data, iv) => {
    var payloadJSON = JSON.stringify(payload);
    var encryptedPayload = CryptoJS.AES.encrypt(payloadJSON, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    setEncrypt(encryptedPayload);
  };

  const decryptPayload = (ciphertext, iv) => {
    var decryptedBytes = CryptoJS.AES.decrypt(ciphertext, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    var decryptedPayloadJSON = decryptedBytes.toString(CryptoJS.enc.Utf8);
    var decryptedPayload = JSON.parse(decryptedPayloadJSON);
    setDecrypt(decryptedPayload);
  };

  const [encrypt, setEncrypt] = useState('');
  const [decrypt, setDecrypt] = useState('');
  
  console.log(encrypt,"encrypt");
  console.log(decrypt,"decrypt")

  return (
    <div>
      <button onClick={() => encryptText(payload, generateRandomIV())}>
        Encrypt
      </button>
      <button onClick={() => decryptPayload(encrypt, encrypt.iv)}>Decrypt</button>
    </div>
  );
};
export default Crypto;