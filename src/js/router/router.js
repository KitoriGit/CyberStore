import { renderHome } from "../pages/Home.js";
import { renderCart } from "../pages/cart.js";

export const print = (path) => {
    switch (path) {
        case "/":
            renderHome();
            break;
        case "/index.html": // Por si acceden directo al archivo
            renderHome();
            break;
        case "/cart":
            renderCart();
            break;
        case "/product":
            renderProduct();
            break;
        default:
            console.log("Página no encontrada (404)");
            break;
    }
}