function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "../pages/login.html";
}