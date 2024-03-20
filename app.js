const express = require('express')
const mongoose = require('mongoose')
const Teacher = require('./models/teacher')
const Student = require('./models/student')
const studentRoutes = require('./routes/student')
const sessionRoutes = require('./routes/session')
const teacherRoutes = require('./routes/teacher')
const authRoutes = require('./routes/auth')
const notificationRoutes = require('./routes/notification')
const auth = require('./middlewares/auth')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

mongoose
  .connect(
    'mongodb+srv://vercel-admin-user:9NBlw4pMTKNI7azg@cluster0.2xoon5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => console.log('Success connection with MongoDB!'))
  .catch(() => console.log('Error occured during connection!!!'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.json())

// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
//   )
//   next()
// })

app.get('/api/', (req, res, next) => {
  res.status(200).json({ description: 'Base API Endpoint for Klassrum' })
})

app.get('/api/auth/', (req, res, next) => {
  res
    .status(200)
    .json({ description: 'Authentification API Endpoint for Klassrum' })
})

app.get('/api/auth/teachers', (req, res, next) => {
  res.status(200).json({
    description: 'Authentification API Endpoint for teachers - Klassrum',
  })
})

app.get('/api/auth/students', (req, res, next) => {
  res.status(200).json({
    description: 'Authentification API Endpoint for students - Klassrum',
  })
})

app.get('/api/auth/', (req, res, next) => {
  res
    .status(200)
    .json({ description: 'Authentification API Endpoint for Klassrum' })
})

app.use('/api/students', auth, studentRoutes)
app.use('/api/teachers', auth, teacherRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/notifications', auth, notificationRoutes)
app.use('/api/sessions', sessionRoutes)

module.exports = app
