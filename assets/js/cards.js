// cards.js — reemplaza al anterior
// Ahora carga los productos con fetch() desde /data/productos.json
// Todo lo demás (nombres de funciones, HTML de las cards) queda igual

let productos = [];

function mostrarProductos(categoria) {
    fetch("../data/productos.json")
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar productos.json");
            return res.json();
        })
        .then(data => {
            productos = data;
            renderizarCards(categoria);
        })
        .catch(err => {
            console.error(err);
            const contenedor = document.getElementById("contenedor-productos");
            if (contenedor) {
                contenedor.innerHTML = `<p style="color:red; padding:1rem;">
                    Error al cargar los productos.
                </p>`;
            }
        });
}

function renderizarCards(categoria) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const filtrados = categoria
        ? productos.filter(p => p.categoria === categoria)
        : productos.slice(0, 3);

    filtrados.forEach(producto => {
        contenedor.innerHTML += crearCardHTML(producto, "../");
    });
}

function mostrarProductosHome() {
    fetch("data/productos.json")
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar productos.json");
            return res.json();
        })
        .then(data => {
            productos = data;
            renderizarHome();
        })
        .catch(err => console.error(err));
}

function renderizarHome() {
    const categorias = ["tortas", "cookies", "postres"];
    categorias.forEach(cat => {
        const contenedor = document.getElementById(`contenedor-${cat}`);
        if (!contenedor) return;
        contenedor.innerHTML = "";
        productos.filter(p => p.categoria === cat).slice(0, 3).forEach(producto => {
            contenedor.innerHTML += crearCardHTML(producto, "");
        });
    });
}

function crearCardHTML(producto, base) {
    const imgSrc = base
        ? `${base}assets/img/${producto.imagen.split("/").pop()}`
        : `assets/img/${producto.imagen.split("/").pop()}`;
    return `
        <div class="card">
            <img src="${imgSrc}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio.toLocaleString("es-AR")}</span>
            <div class="card-acciones">
                <div class="contador">
                    <button onclick="restar(${producto.id})">-</button>
                    <span id="cantidad-${producto.id}">0</span>
                    <button onclick="sumar(${producto.id})">+</button>
                </div>
                <button class="boton-comprar" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
            </div>
        </div>
    `;
}

function sumar(id) {
    const cantidad = document.getElementById(`cantidad-${id}`);
    cantidad.innerText++;
}

function restar(id) {
    const cantidad = document.getElementById(`cantidad-${id}`);
    if (cantidad.innerText > 0) cantidad.innerText--;
}

function agregarAlCarrito(id) {
    if (!sessionStorage.getItem("usuario")) {
        alert("Tenés que iniciar sesión para comprar.");
        window.location.href = "login.html";
        return;
    }

    const cantidadEl = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadEl.innerText);

    if (cantidad === 0) {
        alert("Seleccioná al menos 1 unidad.");
        return;
    }

    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cantidadEl.innerText = "0";
    mostrarToast(`"${producto.nombre}" agregado al carrito ✓`);
}

function mostrarToast(mensaje) {
    let toast = document.getElementById("toast-qp");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-qp";
        toast.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem;
            background: #3b2a1a; color: #fff;
            padding: 0.85rem 1.4rem; border-radius: 10px;
            font-size: 0.95rem; font-weight: 600;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 9999; opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.style.opacity = "1";
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.style.opacity = "0"; }, 2500);
}