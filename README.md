# Cyber Store - E-commerce SPA

Este proyecto es una **Single Page Application (SPA)** de un simulador de e-commerce de videojuegos, construida con **Vanilla JavaScript** (sin frameworks), **SCSS modular** y una arquitectura basada en componentes.

## 📂 Estructura del Proyecto

La estructura de archivos está diseñada bajo el principio de separación de responsabilidades para ser escalable y mantenible.

```text
ecommerce-game-store/
│
├── index.html                # Punto de entrada único. Contiene el contenedor principal <div id="app">.
├── README.md                 # Documentación del proyecto.
│
├── api/                      # Simulación de Backend.
│   └── data.json             # "Base de datos" local (productos, usuarios).
│
└── src/                      # Código fuente de la aplicación.
    │
    ├── assets/               # Archivos multimedia estáticos.
    │   ├── img/              # Imágenes de productos, banners.
    │   ├── icons/            # Iconos SVG.
    │   └── fonts/            # Tipografías locales.
    │
    ├── scss/                 # Estilos SASS modularizados (Metodología 7-1 simplificada).
    │   ├── main.scss         # Archivo principal que importa todos los parciales.
    │   ├── base/             # Estilos globales (resets, tipografía).
    │   ├── utils/            # Variables, mixins y funciones (no generan CSS directo).
    │   ├── components/       # Estilos de componentes UI (botones, tarjetas).
    │   ├── layout/           # Estructura mayor (grid, header, footer).
    │   └── pages/            # Estilos específicos de cada vista (evita conflictos globales).
    │
    └── js/                   # Lógica Javascript modularizada (ES Modules).
        ├── app.js            # Punto de entrada JS. Inicializa la app y el Router.
        ├── config.js         # Constantes globales (API_URL, tasas de impuestos, etc.).
        │
        ├── services/         # Capa de comunicación de datos.
        │   └── api.js        # Encargado de hacer fetch a api/data.json.
        │
        ├── router/           # Manejador de navegación.
        │   └── router.js     # Controla qué vista se muestra según la URL.
        │
        ├── components/       # Piezas de UI reutilizables (independientes de la página).
        │   ├── Header.js     # Barra de navegación.
        │   ├── ProductCard.js # Tarjeta de producto individual.
        │   └── CartWidget.js # Resumen del carrito.
        │
        ├── pages/            # Vistas completas ("Páginas Virtuales").
        │   ├── Home.js       # Página de inicio.
        │   ├── Shop.js       # Catálogo completo.
        │   ├── ProductDetail.js # Vista de detalle de un juego.
        │   └── Cart.js       # Vista del carrito de compras.
        │
        └── utils/            # Funciones auxiliares puras (helpers).
            └── formatters.js # Formateo de moneda, fechas, validaciones.
```

## 🧠 Arquitectura y Lógica

### Funcionamiento SPA (Single Page Application)

A diferencia de una web tradicional, esta aplicación **nunca recarga la página**. Funciona mediante la manipulación del DOM y el historial del navegador:

1.  **El Escenario (`index.html`)**: Es un archivo estático que contiene un contenedor vacío (`<div id="app">`).
2.  **El Router (`router.js`)**:
    - Intercepta la navegación para evitar la recarga.
    - Usa `history.pushState` para cambiar la URL visualmente (ej: `/shop`).
    - Detecta la ruta actual y decide qué módulo de `js/pages/` ejecutar.
3.  **Las Vistas (`js/pages/`)**: Son funciones que generan HTML dinámicamente y lo inyectan en el contenedor principal.

### Flujo de Datos

- **Componentes**: Solo se encargan de renderizar la interfaz.
- **Servicios (`api.js`)**: Centralizan las peticiones de datos. Si un componente necesita productos, llama al servicio, no al archivo JSON directamente.
- **Utils**: Proveen lógica compartida (ej: formatear precios) para mantener consistencia en toda la app.
