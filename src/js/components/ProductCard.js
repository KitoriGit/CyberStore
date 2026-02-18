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