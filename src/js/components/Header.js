export const renderHeader = () => {
    const headerTemplate = `
        <header>
            <strong>Cyber Store - Videojuegos</strong>
            <div class="cartWidget">
                <i data-lucide="shopping-cart"></i>
                <span id="cartCount">0</span>
            </div>
        </header>
    `;

    return headerTemplate;
}