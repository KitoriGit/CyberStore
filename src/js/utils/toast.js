export const showToastSucces = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Evita que se cierre si pasas el mouse
        style: {
            background: "#00ff9d", // Tu variable --success-color
            color: "#000000",      // Tu variable --text-inverse
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 255, 157, 0.5)" // Efecto neón
        },
    }).showToast();
}

export const showToastError = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Evita que se cierre si pasas el mouse
        style: {
            background: "#ff2a2a", // Tu variable --success-color
            color: "#000000",      // Tu variable --text-inverse
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 255, 157, 0.5)" // Efecto neón
        },
    }).showToast();
}

export const showToastWarning = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#f39c12", // Amarillo advertencia
            color: "#000000",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(243, 156, 18, 0.5)"
        },
    }).showToast();
}