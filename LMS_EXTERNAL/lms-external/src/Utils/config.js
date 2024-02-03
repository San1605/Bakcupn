import CryptoJS from "crypto-js";

export const BASE_URL="https://ct-lms-coe-backend-dev.azurewebsites.net";
export const iv = CryptoJS.lib.WordArray.random(16);