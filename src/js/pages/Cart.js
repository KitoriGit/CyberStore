import { renderHeader } from "../components/Header.js";
import { renderCard } from "../components/ProductCard.js";
import { cart } from "../app.js";

const app = document.getElementById("app");

export const renderCart = () => {
    app.innerHTML = ""; // Limpiamos la pantalla antes de pintar
    const header = renderHeader();

    if (cart.getLength() > 0) {
        const cardsHtml = cart.items.map(game => renderCard(game)).join('');
        app.innerHTML = `${header}<ul id="gameList">${cardsHtml}</ul>`;
    } else {
        app.innerHTML = `${header}<h1 class="emptyCartTitle">No hay productos en el carrito</h1>`;
    }



    lucide.createIcons();
}