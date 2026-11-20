const nav = document.getElementById("navbar");
const usuario = sessionStorage.getItem("usuario");
const enRaiz = !window.location.pathname.toLowerCase().includes("/pages/");

const base = enRaiz ? "./pages/" : "./";
const home = enRaiz ? "./index.html" : "../index.html";

// Links siempre visibles
const linksBase = [
    { titulo: "Home",    direccion: home },
    { titulo: "Tortas",  direccion: `${base}tortas.html` },
    { titulo: "Cookies", direccion: `${base}cookies.html` },
    { titulo: "Postres", direccion: `${base}postres.html` },
    { titulo: "Productos", direccion: `${base}productos.html` },
];

linksBase.forEach(p => {
    nav.innerHTML += `<li><a href="${p.direccion}">${p.titulo}</a></li>`;
});

if (usuario) {
    // Logueado: mostrar carrito, nombre y cerrar sesión
    const datos = JSON.parse(usuario);
    nav.innerHTML += `<li><a href="${base}carrito.html">Carrito</a></li>`;
    nav.innerHTML += `<li><span style="padding: 0 0.5rem; opacity: 0.7; font-size: 0.9rem;">👤 ${datos.nombre}</span></li>`;
    nav.innerHTML += `<li><a href="#" id="btn-cerrar-sesion">Cerrar sesión</a></li>`;
} else {
    // No logueado: mostrar login y registro
    nav.innerHTML += `<li><a href="${base}login.html">Login</a></li>`;
    nav.innerHTML += `<li><a href="${base}registro.html">Registro</a></li>`;
}

// Cerrar sesión: borra usuario y token, y vuelve al login
const btnCerrar = document.getElementById("btn-cerrar-sesion");
if (btnCerrar) {
    btnCerrar.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("token");
        window.location.href = `${base}login.html`;
    });
}