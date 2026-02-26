import { renderCard, renderCartCard } from "./components/ProductCard.js";
import { fetchProducts } from "./services/api.js";
import { print } from "./router/router.js";
import { showToastSucces, showToastError, showToastWarning } from "./utils/toast.js";
import { priceFormat } from "./utils/formatters.js";


//-------------- CLASES -------------------------------------
class Item {
    constructor(id, title, price, quantity, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
}

class Cart {
    constructor(items = []) {
        this.items = items;
    }

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    add(game) {
        const existingItem = this.items.find((e) => e.id == game.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = new Item(game.id, game.title, game.price, 1, game.image);
            this.items.push(cartItem);
        }

        // Centralizamos la lógica: El carrito se encarga de restar el stock
        const inventoryItem = inventory.find(e => e.id == game.id);
        if (inventoryItem) {
            inventoryItem.quantity--;
        }
        this.saveToStorage();
    }

    getTotal() {
        return priceFormat(this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    }

    getLength() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    increase(id) {
        const stock = inventory.find(e => e.id == id).quantity;
        if (stock > 0) {
            this.items.find(e => e.id == id).quantity++;
            inventory.find(e => e.id == id).quantity--;
            this.saveToStorage();
        } else {
            showToastError(`${inventory.find(e => e.id == id).title} sin stock.`)
        }
    };
    decrease(id) {
        const cartItemQuant = this.items.find(e => e.id == id).quantity;
        if (cartItemQuant > 1) {
            this.items.find(e => e.id == id).quantity--;
            inventory.find(e => e.id == id).quantity++;
            this.saveToStorage();
        } else {
            this.remove(id);
        }
    };
    remove(id) {
        const quantity = this.items.find(e => e.id == id).quantity;
        inventory.find(e => e.id == id).quantity += quantity;
        this.items = this.items.filter(e => e.id != id);
        this.saveToStorage();
    };
    clear() {
        this.items = [];
        this.saveToStorage();
    };
}


//---------------- INVENTORY FETCH Y LOCAL STORAGE ------------------
let inventoryCheck = await fetchProducts();
export let inventory = inventoryCheck.map(game => {
    return new Item(game.id, game.name, game.price, game.stock, game.img);
});

const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
export const cart = new Cart(storedItems);

// Sincronización inicial: Restamos del inventario lo que ya está en el carrito
cart.items.forEach(cartItem => {
    const inventoryItem = inventory.find(item => item.id == cartItem.id);
    if (inventoryItem) {
        inventoryItem.quantity -= cartItem.quantity;
    }
});

let url = window.location.pathname;
print(url);


//---------------- FUNCIONES --------------------------------------
const app = document.getElementById("app");

const refreshProductUI = (id, itemCard) => {
    // Esta función ahora es PURA en cuanto a lógica: solo repinta la UI
    itemCard.outerHTML = renderCard(inventory.find(game => game.id == id));
    document.getElementById("cartCount").innerHTML = cart.getLength();
};

const refreshCartItemUI = (id, itemCard) => {
    const item = cart.items.find(e => e.id == id);

    // 1. Actualizamos contadores globales
    document.getElementById("cartCount").innerHTML = cart.getLength();
    const totalEl = document.querySelector("#totalCounter span:last-child");
    if (totalEl) totalEl.innerText = cart.getTotal();

    // 2. Actualizamos la tarjeta específica
    if (item) {
        itemCard.outerHTML = renderCartCard(item);
        lucide.createIcons(); // Reactivamos iconos
    } else {
        itemCard.remove(); // Si cantidad llegó a 0, quitamos el elemento
        if (cart.getLength() === 0) print(window.location.pathname); // Si vacío, mostrar mensaje
    }
};

const showLoader = () => {
    const loader = document.createElement('div');
    loader.id = 'loader-overlay';
    loader.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.85); z-index: 9999;
        display: flex; justify-content: center; align-items: center;
        flex-direction: column; gap: 15px; color: #00ff9d; font-family: sans-serif;
    `;
    loader.innerHTML = `
        <div style="width: 50px; height: 50px; border: 4px solid #333; border-top: 4px solid #00ff9d; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <h3>Procesando compra...</h3>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loader);
};

const hideLoader = () => {
    const loader = document.getElementById('loader-overlay');
    if (loader) loader.remove();
};

//---------------- EVENTOS UNIFICADOS (DELEGACIÓN) ------------------
app.addEventListener("click", async (e) => {
    // 1. Widget del Carrito (Header) -> Navegación
    if (e.target.closest(".cartWidget")) {
        window.history.pushState({}, "", "/cart");
        print(window.location.pathname);
        return;
    }

    // 2. Botón "Agregar" (Home/Catálogo) -> Lógica de compra
    if (e.target.classList.contains("addBtn") && !e.target.classList.contains("noStock")) {
        const li = e.target.closest('.item');
        const id = li.dataset.id;
        const game = inventory.find(game => game.id == id);
        cart.add(game);
        refreshProductUI(id, li);
        showToastSucces(`¡${game.title} agregado al carrito!`);
        return;
    }

    // 3. Botones de Cantidad (Vista Carrito)
    if (e.target.classList.contains("increase-btn")) {
        const li = e.target.closest('.cartItem');
        const id = li.dataset.id;
        cart.increase(id);
        refreshCartItemUI(id, li);
    }

    if (e.target.classList.contains("decrease-btn")) {
        const li = e.target.closest('.cartItem');
        const id = li.dataset.id;
        cart.decrease(id);
        refreshCartItemUI(id, li);
    }

    if (e.target.closest(".lucide-trash-2")) {
        const id = e.target.closest('.cartItem').dataset.id;
        cart.remove(id);
        showToastWarning("Producto eliminado del carrito");
        print(window.location.pathname); // Re-renderizamos el carrito
    }

    // 5. Botón Comprar (Checkout)
    if (e.target.id === "checkoutBtn") {
        showLoader();

        // Simulamos un pequeño delay de red (1.5 segundos) para que se aprecie el loader
        await new Promise(resolve => setTimeout(resolve, 1500));

        cart.clear();

        // Reiniciamos el inventario (Simulación de reset)
        const inventoryCheck = await fetchProducts();
        inventory = inventoryCheck.map(game => {
            return new Item(game.id, game.name, game.price, game.stock, game.img);
        });

        hideLoader();
        showToastSucces("¡Compra realizada con éxito!");
        print(window.location.pathname);
    }
});

window.addEventListener("popstate", () => {
    print(window.location.pathname);
});