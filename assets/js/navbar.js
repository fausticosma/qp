const paginas = [
    { titulo: "Home", direccion: "../index.html" },
    { titulo: "Tortas", direccion: "tortas.html" },
    { titulo: "Cookies", direccion: "cookies.html" },
    { titulo: "Postres", direccion: "postres.html" },
    { titulo: "Login", direccion: "login.html" },
    { titulo: "Registro", direccion: "registro.html" }
];

const nav = document.getElementById("navbar");

paginas.forEach(pagina => {
    nav.innerHTML += `<li><a href="${pagina.direccion}">${pagina.titulo}</a></li>`;
});