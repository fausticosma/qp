const express = require('express');
const router = express.Router();
const { leerData } = require('../utils/db');

// GET /api/productos
// GET /api/productos?categoria=tortas
router.get('/', (req, res) => {
  const productos = leerData('productos.json');
  const { categoria } = req.query;

  if (categoria) {
    const filtrados = productos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return res.json(filtrados);
  }

  res.json(productos);
});

// GET /api/productos/:id
router.get('/:id', (req, res) => {
  const productos = leerData('productos.json');
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: `No existe un producto con id ${id}` });
  }

  res.json(producto);
});

module.exports = router;