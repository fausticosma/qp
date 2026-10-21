# 🥐 Qué Pancito (Front)

Tienda online de pastelería artesanal. Proyecto de **Aplicaciones Web**, tercera entrega: interfaz conectada a una API propia.

Este es el repositorio del **front-end**. El servidor (API REST) está en otro repositorio:
👉 **[qp-backend](https://github.com/fausticosma/qp-backend)**

## Funcionalidades

- Listado de todos los productos
- Filtro de productos por categoría (tortas, cookies, postres)
- Carrito de compras guardado en `localStorage`
- Registro e inicio de sesión de usuarios (validado por la API)
- Finalizar compra: genera una orden de compra en el back-end asociada al usuario

## Tecnologías

- HTML, CSS y JavaScript vanilla
- `fetch` para consumir la API
- `localStorage` (carrito) y `sessionStorage` (sesión)

## Estructura

```
qp/
├── index.html
├── pages/            # tortas, cookies, postres, productos, login, registro, carrito
└── assets/
    ├── css/
    ├── img/
    └── js/
        ├── config.js   # URL base de la API (API_URL)
        ├── cards.js    # render de productos y filtros
        ├── login.js
        ├── carrito.js  # carrito y compra
        └── navbar.js
```

## Cómo correrlo

1. Levantá primero el back-end (ver el README de [qp-backend](https://github.com/fausticosma/qp-backend)). Debe quedar en `http://localhost:3000`.
2. Abrí este proyecto en VS Code.
3. Clic derecho sobre `index.html` → **Open with Live Server** (queda en `http://127.0.0.1:5500`).

La URL de la API se configura en un solo lugar: `assets/js/config.js`.

```js
const API_URL = "http://localhost:3000/api";
```

## Autor

Fausti Cosma