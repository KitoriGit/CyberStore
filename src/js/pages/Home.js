import { renderHeader } from "../components/Header.js";
import { renderCard } from "../components/ProductCard.js";
import { inventory } from "../app.js";

const app = document.getElementById("app");

export const renderHome = () => {
    app.innerHTML = ""; // Limpiamos la pantalla antes de pintar
    const header = renderHeader();

    // 1. Transformamos los datos en HTML (map) y los unimos en un texto (join)
    const cardsHtml = inventory.map(game => renderCard(game)).join('');

    // 2. Ensamblamos la vista final
    app.innerHTML = `${header}<ul id="gameList">${cardsHtml}</ul>`;

    // 3. Importante: Decirle a Lucide que busque y transforme los nuevos iconos
    lucide.createIcons();
}