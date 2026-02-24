import { renderHeader } from "../components/Header.js";
import { renderCartCard } from "../components/ProductCard.js";
import { cart } from "../app.js";

const app = document.getElementById("app");

export const renderCart = () => {
    app.innerHTML = ""; // Limpiamos la pantalla antes de pintar
    const header = renderHeader();

    if (cart.getLength() > 0) {
        const cardsHtml = cart.items.map(game => renderCartCard(game)).join('');
        app.innerHTML = `${header}
            <ul id="cartList">${cardsHtml}</ul>
            <div id="totalCounter">
                <span>Total:</span>
                <span>${cart.getTotal()}</span>
            </div>`;
    } else {
        app.innerHTML = `${header}<h1 class="emptyCartTitle">No hay productos en el carrito</h1>`;
    }
    lucide.createIcons();
}