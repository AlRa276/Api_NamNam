
const admin = require('firebase-admin');

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountJson) {
  console.warn('FIREBASE_SERVICE_ACCOUNT environment variable not set. Firebase will not be initialized.');
  module.exports = null;
} else {
  const serviceAccount = JSON.parse(Buffer.from(serviceAccountJson, 'base64').toString('utf-8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  module.exports = admin;
}
