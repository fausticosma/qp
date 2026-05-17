const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    localStorage.setItem("usuario", "logueado");
    window.location.href = "../index.html";
});