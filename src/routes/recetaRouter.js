const router = require('express').Router();
const receta   = require('../controllers/recetaController');
 
const { verificarToken, soloAdmin } = require('../middlewares/auth');

// ── Rutas públicas ─────────────────────────────────────────────────────
router.get('/',           receta.listar);
router.get('/destacadas', receta.listarDestacadas);
router.get('/:id',        receta.obtener);

// ── Rutas protegidas (requieren login) ────────────────────────────────
router.post('/',      verificarToken, soloAdmin,           receta.crear);
router.put('/:id',    verificarToken, soloAdmin,           receta.actualizar);
router.delete('/:id', verificarToken, soloAdmin,           receta.eliminar);
 
module.exports = router;