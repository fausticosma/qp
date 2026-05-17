function mostrarProductos(categoria) {
    const contenedor = document.getElementById("contenedor-productos");
    
    const filtrados = categoria 
        ? productos.filter(p => p.categoria === categoria)
        : productos.slice(0, 3);

    filtrados.forEach(producto => {
        contenedor.innerHTML += `
        <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
            <div class="card-acciones">
                <div class="contador">
                    <button onclick="restar(${producto.id})">-</button>
                    <span id="cantidad-${producto.id}">0</span>
                    <button onclick="sumar(${producto.id})">+</button>
                </div>
                <button class="boton-comprar">Comprar</button>
            </div>
        </div>
        `;
    });
}

function sumar(id) {
    const cantidad = document.getElementById(`cantidad-${id}`);
    cantidad.innerText++;
}

function restar(id) {
    const cantidad = document.getElementById(`cantidad-${id}`);
    if (cantidad.innerText > 0) {
        cantidad.innerText--;
    }
}