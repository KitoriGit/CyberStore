export const showToast = (message) => {
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