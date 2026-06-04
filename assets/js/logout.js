function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    window.location.href = "./pages/login.html"; // ✅ ruta relativa desde index
}