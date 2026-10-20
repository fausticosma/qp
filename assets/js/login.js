if (sessionStorage.getItem("usuario")) {
    window.location.href = "../index.html";
}

async function iniciarSesion() {
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorEl  = document.getElementById("login-error");

    if (errorEl) errorEl.style.display = "none";

    if (!email || !password) {
        mostrarError("Completá todos los campos.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contraseña: password })
        });

        const data = await res.json();

        if (!res.ok) {
            mostrarError(data.error || "No se pudo iniciar sesión.");
            return;
        }

        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "../index.html";
    } catch (err) {
        console.error(err);
        mostrarError("No se pudo conectar con el servidor.");
    }
}

function mostrarError(msg) {
    const errorEl = document.getElementById("login-error");
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.style.display = "block";
}