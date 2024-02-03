import { BASE_URL } from "./config";
import axios from "axios"

export async function getAllPdfUrls() {
    let config = {
        method: "get",
        url: `${BASE_URL}/`,
        headers: {
            // Authorization: `Bearer ${authToken}`,
        },
    };
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

