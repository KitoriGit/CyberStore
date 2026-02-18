import { renderCard } from "./components/ProductCard.js";
import { fetchProducts } from "./services/api.js";
import { print } from "./router/router.js";
import { showToast } from "./utils/toast.js";

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

app.addEventListener("click", async (e) => {
    if (e.target.classList.contains("addBtn")) {
        const li = e.target.closest('.item');
        const id = li.dataset.id;
        const game = inventory.find(game => game.id == id);
        getToCart(game);

        updateQuantity(id, li);
        showToast(`¡${game.title} agregado al carrito!`);
    }
});


//---------------- CAMBIO DE PAGE -----------------------------------------
const cartIcon = document.querySelector(".cartWidget");
cartIcon.addEventListener("click", () => {
    window.history.pushState({}, "", "/cart");
    let url = window.location.pathname;
    print(url);
});

window.addEventListener("popstate", () => {
    print(window.location.pathname);
});