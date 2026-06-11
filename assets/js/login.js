if (sessionStorage.getItem("usuario")) {
    window.location.href = "../index.html";
}

const usuarios = [
    { email: "usuario@quepancito.com", password: "pancito123", nombre: "Usuario" },
    { email: "admin@quepancito.com",   password: "admin123",   nombre: "Admin" }
];

function iniciarSesion() {
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorEl  = document.getElementById("login-error");

    if (errorEl) errorEl.style.display = "none";

    if (!email || !password) {
        mostrarError("Completá todos los campos.");
        return;
    }

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        sessionStorage.setItem("usuario", JSON.stringify({
            email: usuario.email,
            nombre: usuario.nombre
        }));
        window.location.href = "../index.html";
    } else {
        mostrarError("Email o contraseña incorrectos.");
    }
}

function mostrarError(msg) {
    const errorEl = document.getElementById("login-error");
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.style.display = "block";
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") iniciarSesion();
});