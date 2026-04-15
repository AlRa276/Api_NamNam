const { Usuario } = require('../models/index'); 
const jwt = require('jsonwebtoken');
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


const admin = require('../config/firebase');


const loginConGoogle = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: "El token de Firebase es requerido" });
        }

        // 1. Verificar el token usando Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, picture } = decodedToken;

        // 2. Buscar si el usuario ya existe en tu base de datos local
        let usuario = await Usuario.findOne({ where: { email } });

        // 3. Si no existe, registrar al usuario automáticamente
        if (!usuario) {
            usuario = await Usuario.create({
                email: email,
                nombre: name, // O ajusta según los campos de tu DB
                // Como inicia con Google, no hay contraseña.
                // Puedes guardar un hash aleatorio o adaptar tu modelo para que el password sea nullable.
                password: 'login_social_google', 
                foto_perfil: picture
            });
        }

        // 4. Generar tu JWT local de la misma forma que en el login tradicional
        const tokenLocal = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET, // La variable secreta de tu archivo .env
            { expiresIn: '24h' }
        );

        // 5. Devolver tu token al Frontend
        return res.status(200).json({
            mensaje: "Login con Google exitoso",
            token: tokenLocal,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error("Error validando el token de Google:", error);
        return res.status(401).json({ error: "Token de Google inválido o expirado" });
    }
};




module.exports = { registrar, login, perfil, logout, loginConGoogle };
