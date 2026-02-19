import { renderCard } from "./components/ProductCard.js";
import { fetchProducts } from "./services/api.js";
import { print } from "./router/router.js";
import { showToastSucces, showToastError } from "./utils/toast.js";

//-------------- CLASES -------------------------------------
class item {
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

    getTotal() {
        return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    getLength() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    increase(id) {
        const stock = inventory.find(e => e.id == id).quantity;
        if (stock > 0) {
            this.items.find(e => e.id == id).quantity++;
            inventory.find(e => e.id == id).quantity--;
        } else {
            showToastError(`${inventory.find(e => e.id == id).title} sin stock.`)
        }
    };
    decrease(id) {
        this.items.find(e => e.id == id).quantity--;
        inventory.find(e => e.id == id).quantity++;
    };
    remove(id) {
        const quantity = this.items.find(e => e.id == id).quantity;
        inventory.find(e => e.id == id).quantity += quantity;
        this.items = this.items.filter(e => e.id != id);
    };
    clear() {
        this.items = [];
    };
}


//---------------- INVENTORY FETCH Y LOCAL STORAGE ------------------
let inventoryCheck = await fetchProducts();
export let inventory = inventoryCheck.map(game => {
    return new item(game.id, game.name, game.price, game.stock, game.img);
});

export let cart = new Cart();
cart = JSON.parse(localStorage.getItem('cart')) || cart;

let url = window.location.pathname;
print(url);


//---------------- FUNCIONES --------------------------------------
const app = document.getElementById("app");
const cartCounter = document.getElementById("cartCount");
cartCounter.innerHTML = cart.items.length;

const updateQuantity = (id, itemCard) => {
    inventory.forEach(e => {
        if (e.id == id) {
            e.quantity--;
        }
    });
    itemCard.outerHTML = renderCard(inventory.find(game => game.id == id));
    cartCounter.innerHTML = cart.getLength();
};

const getToCart = (game) => {
    const cartItem = new item(game.id, game.title, game.price, 1, game.image)

    if (cart.items.find((e) => e.id == game.id)) {
        cart.items[cart.items.findIndex((e) => e.id == game.id)].quantity++;
    } else {
        cart.items.push(cartItem);
    }

}

//---------------- EVENTOS UNIFICADOS (DELEGACIÓN) ------------------
app.addEventListener("click", (e) => {
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
        getToCart(game);
        updateQuantity(id, li);
        showToastSucces(`¡${game.title} agregado al carrito!`);
        return;
    }

    // 3. Botones de Cantidad (Vista Carrito)
    if (e.target.classList.contains("increase-btn")) {
        const id = e.target.closest('.cartItem').dataset.id;
        cart.increase(id);
        print(window.location.pathname); // Re-renderizamos el carrito
    }

    if (e.target.classList.contains("decrease-btn")) {
        const id = e.target.closest('.cartItem').dataset.id;
        cart.decrease(id);
        print(window.location.pathname); // Re-renderizamos el carrito
    }

    if (e.target.classList.contains("lucide-trash-2")) {
        console.log("entro")
        const id = e.target.closest('.cartItem').dataset.id;
        console.log(id)
        cart.remove(id);
        print(window.location.pathname); // Re-renderizamos el carrito
    }
});

window.addEventListener("popstate", () => {
    print(window.location.pathname);
});