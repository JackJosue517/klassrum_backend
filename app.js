const express = require('express')
const mongoose = require('mongoose')
const Teacher = require('./models/teacher')
const Student = require('./models/student')
const studentRoutes = require('./routes/student')
const teacherRoutes = require('./routes/teacher')
const authRoutes = require('./routes/auth')
const notificationRoutes = require('./routes/notification')
const auth = require('./middlewares/auth')
const path = require('path')

const app = express()

mongoose
  .connect(
    'mongodb+srv://vercel-admin-user:9NBlw4pMTKNI7azg@cluster0.2xoon5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => console.log('Success connection with MongoDB!'))
  .catch(() => console.log('Error occured during connection!!!'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

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

module.exports = app
