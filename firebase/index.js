var admin = require('firebase-admin')

var serviceAccount = require('./firebase.config.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://klassrum-2884d-default-rtdb.firebaseio.com/',
})

module.exports = admin
