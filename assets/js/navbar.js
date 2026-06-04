// Páginas para usuarios NO logueados (login está en /pages/)
const paginasPublicas = [
    { titulo: "Home", direccion: "../index.html" },
    { titulo: "Tortas", direccion: "./tortas.html" },
    { titulo: "Cookies", direccion: "./cookies.html" },
    { titulo: "Postres", direccion: "./postres.html" },
    { titulo: "Login", direccion: "./login.html" },
    { titulo: "Registro", direccion: "./registro.html" }
];

// Páginas para usuarios logueados (navbar desde index.html en raíz)
const paginasPrivadas = [
    { titulo: "Home", direccion: "./index.html" },
    { titulo: "Tortas", direccion: "./pages/tortas.html" },
    { titulo: "Cookies", direccion: "./pages/cookies.html" },
    { titulo: "Postres", direccion: "./pages/postres.html" },
];

const nav = document.getElementById("navbar");
const usuario = sessionStorage.getItem("usuario");

// Detecta si estamos en raíz o en /pages/
const enRaiz = !window.location.pathname.includes("/pages/");
const paginas = enRaiz ? paginasPrivadas : paginasPublicas;

paginas.forEach(pagina => {
    nav.innerHTML += `<li><a href="${pagina.direccion}">${pagina.titulo}</a></li>`;
});

// Botón de cerrar sesión solo para usuarios logueados
if (usuario) {
    nav.innerHTML += `<li><a href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>`;
}