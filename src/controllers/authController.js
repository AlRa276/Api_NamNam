const service = require('../services/authService');

const registrar = async (req, res, next) => {
  try {
    const resultado = await service.registrar(req.body);
    res.status(201).json({ ok: true, ...resultado });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const resultado = await service.login(req.body);
    res.json({ ok: true, ...resultado });
  } catch (err) { next(err); }
};

const perfil = async (req, res, next) => {
  try {
    // req.usuario viene del middleware verificarToken
    const usuario = await service.perfil(req.usuario.id);
    res.json({ ok: true, usuario });
  } catch (err) { next(err); }
};

const logout = (req, res) => {
  res.json({
    ok:      true,
    mensaje: 'Sesión cerrada correctamente. Elimina el token del cliente.',
  });
};

module.exports = { registrar, login, perfil, logout };
