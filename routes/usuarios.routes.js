import express from 'express';
import { leerData, escribirData, proximoId } from '../utils/db.js';

const router = express.Router();

// Quita la contraseña antes de mandar el usuario al cliente
function sinContraseña(usuario) {
  const { contraseña, ...resto } = usuario;
  return resto;
}

// POST /api/usuarios  -> registrar usuario nuevo
// body: { nombre, apellido, email, contraseña }
router.post('/', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({
      error: 'Faltan datos. Se requiere nombre, apellido, email y contraseña.',
    });
  }

  const usuarios = leerData('usuario.json');

  const existe = usuarios.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existe) {
    return res.status(409).json({ error: 'Ya existe un usuario con ese email.' });
  }

  const nuevoUsuario = {
    id: proximoId(usuarios),
    nombre,
    apellido,
    email,
    contraseña,
    activo: true,
  };

  usuarios.push(nuevoUsuario);
  escribirData('usuario.json', usuarios);

  res.status(201).json(sinContraseña(nuevoUsuario));
});

// PUT /api/usuarios/:id -> actualizar usuario existente
// body: cualquier combinación de { nombre, apellido, email, contraseña, activo }
router.put('/:id', (req, res) => {
  const usuarios = leerData('usuario.json');
  const id = Number(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No existe un usuario con id ${id}` });
  }

  const { nombre, apellido, email, contraseña, activo } = req.body;

  usuarios[index] = {
    ...usuarios[index],
    ...(nombre !== undefined && { nombre }),
    ...(apellido !== undefined && { apellido }),
    ...(email !== undefined && { email }),
    ...(contraseña !== undefined && { contraseña }),
    ...(activo !== undefined && { activo }),
  };

  escribirData('usuario.json', usuarios);
  res.json(sinContraseña(usuarios[index]));
});

// DELETE /api/usuarios/:id -> elimina un usuario, respetando integridad con ventas
// DELETE /api/usuarios/:id?forzar=true -> además elimina sus ventas asociadas
router.delete('/:id', (req, res) => {
  const usuarios = leerData('usuario.json');
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: `No existe un usuario con id ${id}` });
  }

  const ventas = leerData('ventas.json');
  const ventasDelUsuario = ventas.filter((v) => v.id_usuario === id);
  const forzar = req.query.forzar === 'true';

  if (ventasDelUsuario.length > 0 && !forzar) {
    return res.status(409).json({
      error:
        'No se puede eliminar el usuario porque tiene ventas asociadas. ' +
        'Reasigná o eliminá esas ventas primero, o repetí la solicitud con ?forzar=true.',
      ventas_asociadas: ventasDelUsuario.map((v) => v.id),
    });
  }

  if (ventasDelUsuario.length > 0 && forzar) {
    const ventasRestantes = ventas.filter((v) => v.id_usuario !== id);
    escribirData('ventas.json', ventasRestantes);
  }

  const usuariosRestantes = usuarios.filter((u) => u.id !== id);
  escribirData('usuario.json', usuariosRestantes);

  res.json({
    mensaje: `Usuario ${id} eliminado correctamente.`,
    ventas_eliminadas: forzar ? ventasDelUsuario.map((v) => v.id) : [],
  });
});

export default router;