const router          = require('express').Router();
const auth           = require('../controllers/authController');
const { verificarToken } = require('../middlewares/auth');

// Rutas públicas
router.post('/registro', auth.registrar);
router.post('/login',    auth.login);

// Ruta protegida — requiere token válido
router.get('/perfil', verificarToken, auth.perfil);

module.exports = router;
