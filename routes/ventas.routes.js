const express = require('express');
const router = express.Router();
const { leerData, escribirData, proximoId } = require('../utils/db');

// GET /api/ventas
// GET /api/ventas?id_usuario=1
router.get('/', (req, res) => {
  const ventas = leerData('ventas.json');
  const { id_usuario } = req.query;

  if (id_usuario) {
    const filtradas = ventas.filter((v) => v.id_usuario === Number(id_usuario));
    return res.json(filtradas);
  }

  res.json(ventas);
});

// POST /api/ventas -> crea una venta nueva
// body: { id_usuario, dirección, productos: [{ id_producto, cantidad }] }
router.post('/', (req, res) => {
  const { id_usuario, dirección, productos } = req.body;

  if (!id_usuario || !dirección || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({
      error: 'Se requiere id_usuario, dirección y un array de productos con al menos un ítem.',
    });
  }

  const usuarios = leerData('usuario.json');
  const usuarioExiste = usuarios.some((u) => u.id === id_usuario);
  if (!usuarioExiste) {
    return res.status(404).json({ error: `No existe un usuario con id ${id_usuario}` });
  }

  const catalogoProductos = leerData('productos.json');
  let total = 0;

  for (const item of productos) {
    const producto = catalogoProductos.find((p) => p.id === item.id_producto);
    if (!producto) {
      return res.status(404).json({
        error: `No existe un producto con id ${item.id_producto}`,
      });
    }
    total += producto.precio * item.cantidad;
  }

  const ventas = leerData('ventas.json');
  const nuevaVenta = {
    id: proximoId(ventas),
    id_usuario,
    fecha: new Date().toISOString().slice(0, 10),
    total,
    dirección,
    pagado: false,
    productos,
  };

  ventas.push(nuevaVenta);
  escribirData('ventas.json', ventas);

  res.status(201).json(nuevaVenta);
});

module.exports = router;