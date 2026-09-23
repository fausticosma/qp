import express from 'express';
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

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