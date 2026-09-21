const express = require('express');
const router = express.Router();
const { leerData } = require('../utils/db');

// POST /api/login -> autentica un usuario
// body: { email, contraseña }
router.post('/', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Se requiere email y contraseña.' });
  }

  const usuarios = leerData('usuario.json');
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!usuario || usuario.contraseña !== contraseña) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos.' });
  }

  if (!usuario.activo) {
    return res.status(403).json({ error: 'El usuario está inactivo.' });
  }

  const { contraseña: _, ...usuarioSinContraseña } = usuario;
  res.json({ mensaje: 'Login exitoso', usuario: usuarioSinContraseña });
});

module.exports = router;