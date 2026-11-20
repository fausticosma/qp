function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");

    const enPages = window.location.pathname.includes("/pages/");
    window.location.href = enPages ? "login.html" : "./pages/login.html";
}