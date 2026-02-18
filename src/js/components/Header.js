import { cart } from "../app.js";

export const renderHeader = () => {
    const headerTemplate = `
        <header>
            <strong>Cyber Store - Videojuegos</strong>
            <div class="cartWidget">
                <i data-lucide="shopping-cart"></i>
                <span id="cartCount">${cart.getLength()}</span>
            </div>
        </header>
    `;

    return headerTemplate;
}