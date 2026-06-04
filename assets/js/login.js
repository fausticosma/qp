const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    sessionStorage.setItem("usuario", "logueado");
    window.location.href = "../index.html"; // ✅ ya está bien para login.html que está en /pages/
});