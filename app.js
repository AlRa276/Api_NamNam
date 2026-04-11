const express = require('express');
const cors    = require('cors');
const app     = express();

// ── Middlewares globales ───────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173'],
}));
app.use(express.json());

// ── Rutas ──────────────────────────────────────────────────────────────
app.use('/api/auth',         require('./src/routes/authRouter'));
app.use('/api/categorias',   require('./src/routes/categoriaRouter'));
app.use('/api/usuarios',     require('./src/routes/usuarioRouter'));
app.use('/api/recetas',      require('./src/routes/recetaRouter'));
app.use('/api/favoritos',    require('./src/routes/favoritoRouter'));
app.use('/api/valoraciones', require('./src/routes/valoracionRouter'));
app.use('/api/comentarios',  require('./src/routes/comentarioRouter'));
app.use('/api/configuracion', require('./src/routes/configuracionGlobalRouter'));

// ── Ruta de salud (health check) ───────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ── Middleware de errores global ───────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    ok:      false,
    mensaje: err.message || 'Error interno del servidor',
  });
});

module.exports = app;