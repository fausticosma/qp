document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("usuario")) {
        window.location.href = "login.html";
        return;
    }
    renderizarCarrito();
});
 
function renderizarCarrito() {
    const lista   = document.getElementById("carrito-lista");
    const resumen = document.getElementById("carrito-resumen");
    const vacio   = document.getElementById("carrito-vacio");
 
    if (!lista) return;
 
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
 
    lista.innerHTML = "";
 
    if (carrito.length === 0) {
        lista.style.display   = "none";
        if (resumen) resumen.style.display = "none";
        if (vacio)   vacio.style.display   = "flex";
        return;
    }
 
    lista.style.display = "grid";
    if (vacio)   vacio.style.display   = "none";
    if (resumen) resumen.style.display = "block";
 
    let total = 0;
 
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
 
        lista.innerHTML += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img">
                <div class="carrito-info">
                    <h3>${item.nombre}</h3>
                    <p class="carrito-precio-unit">$${item.precio.toLocaleString("es-AR")} c/u</p>
                    <div class="carrito-contador">
                        <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="carrito-derecha">
                    <p class="carrito-subtotal">$${subtotal.toLocaleString("es-AR")}</p>
                    <button class="btn-eliminar" onclick="eliminarProducto(${item.id})">✕ Quitar</button>
                </div>
            </div>
        `;
    });
 
    const totalEl = document.getElementById("carrito-total");
    if (totalEl) totalEl.textContent = `$${total.toLocaleString("es-AR")}`;
}
 
function cambiarCantidad(id, delta) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito.find(p => p.id === id);
    if (!item) return;
 
    item.cantidad += delta;
    if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}
 
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}
 
function vaciarCarrito() {
    if (confirm("¿Vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}
 
function finalizarCompra() {
    alert("¡Gracias por tu compra! 🎉 En breve nos contactamos.");
    localStorage.removeItem("carrito");
    renderizarCarrito();
}