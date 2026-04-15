
const admin = require('firebase-admin');

if (process.env.FIREBASE_CONFIG) {
    
    const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
   
    const serviceAccount = require('../../firebase-service-account.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}


module.exports = admin;
