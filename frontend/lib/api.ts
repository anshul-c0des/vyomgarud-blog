import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(endpoint: string) {
  try {
    const res = await axios.get(`${API_URL}/api/${endpoint}`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${err.response?.status} ${
        err.response?.statusText || err.message
      }`
    );
  }
}
