
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Ajusta la ruta a tu JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
