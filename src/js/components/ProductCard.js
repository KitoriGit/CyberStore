import { priceFormat } from "../utils/formatters.js";


export const renderCard = (game) => {
    const { id, title, price, quantity, image } = game;
    let cardTemplate = "";

    if (quantity >= 1) {
        cardTemplate = `
            <li class="item" data-id="${id}">
                <img src="${image}" alt="" srcset="">
                <div class="gameInfo">
                    <strong class="gameTitle">${title}</strong>
                    <span class="quantity">stock: ${quantity}</span>
                    <span class="price">${priceFormat(price)}</span>
                    <button class="addBtn stock">Agregar</button>
                </div>
            </li>
        `
    } else {
        cardTemplate = `
            <li class="item" data-id="${id}">
                <img src="${image}" alt="" srcset="">
                <div class="gameInfo">
                    <strong class="gameTitle">${title}</strong>
                    <span class="quantity">stock: ${quantity}</span>
                    <span class="price">${priceFormat(price)}</span>
                    <button class="addBtn noStock">No hay stock</button>
                </div>
            </li>
        `
    }

    return cardTemplate;
}

export const renderCartCard = (game) => {
    const { id, title, price, quantity, image } = game;
    let cardTemplate = "";

    cardTemplate = `
        <li class="cartItem" data-id="${id}">
            <img src="${image}" alt="" srcset="">
            <div class="gameInfo">
                <strong class="gameTitle">${title}</strong>
                <span class="price">${priceFormat(price)}</span>
                <div class="gameCounter">
                    <div class="counter">
                        <button class="decrease-btn">-</button>
                        <span>${quantity}</span>
                        <button class="increase-btn">+</button>
                    </div>
                    <i class="remove-btn" data-lucide="trash-2"></i>
                </div>
            </div>
        </li>
    `

    return cardTemplate;
}