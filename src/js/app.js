import { renderCard } from "./components/ProductCard.js";
import { fetchProducts } from "./services/api.js";
import { print } from "./router/router.js";

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
const cartCounter = document.getElementById("cartCount");
cartCounter.innerHTML = cart.items.length;

const updateQuantity = (id, itemCard) => {
    inventory.forEach(e => {
        if (e.id == id) {
            e.quantity--;
        }
    });
    itemCard.innerHTML = renderCard(inventory.find(game => game.id == id));
    cartCounter.innerHTML = cart.items.length;

};

const app = document.getElementById("app");

app.addEventListener("click", async (e) => {
    if (e.target.classList.contains("addBtn")) {
        const li = e.target.closest('.item');
        const id = li.dataset.id;
        const game = inventory.find(game => game.id == id);
        if (game.quantity > 0) {
            cart.items.push(game);
            // console.log(game);
            console.log(cart);
            // console.log(cart.items.length);
            updateQuantity(id, li);
        } else {
        }
    }
});


//---------------- START -----------------------------------------
