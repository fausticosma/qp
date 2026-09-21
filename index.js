const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');
const ventasRoutes = require('./routes/ventas.routes');

app.use(express.json());

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', authRoutes);
app.use('/api/ventas', ventasRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Qué Pancito funcionando. Ver RUTAS.md para el listado de endpoints.' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.listen(PORT, () => {
  console.log(`Servidor Qué Pancito corriendo en http://localhost:${PORT}`);
});