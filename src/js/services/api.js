import { api_URL } from "../config.js";
import { showToastError } from "../utils/toast.js";

export const fetchProducts = async () => {
    try {
        const response = await fetch(api_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo en la API:", error);
        showToastError("No se pudo cargar el catálogo. Verifique su conexión.");
        return []; // Retornamos array vacío para salvar la ejecución de app.js
    }
}