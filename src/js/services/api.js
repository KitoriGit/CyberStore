import { api_URL } from "../config.js";
import { cart } from "../app.js";

export const fetchProducts = async () => {
    try {
        const response = await fetch(api_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}