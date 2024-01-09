const express = require('express')
const mongoose = require('mongoose')
const Teacher = require('./models/Teacher')
const Student = require('./models/Student')

const app = express()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Success connection with MongoDB!'))
  .catch(() => console.log('Error occured during connection!!!'))

app.use(express.static(__dirname + '/public'))

console.log(process.env)

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

app.post('/api/teachers', (req, res) => {
  delete req.body._id
  const teacher = Teacher({
    ...req.body,
  })
  teacher
    .save()
    .then(() =>
      res.status(201).json({
        status: 'OK',
        msg: 'Nouveau enseignant enregistré avec succès!',
      })
    )
    .catch((error) => res.status(400).json({ error }))
})

app.get('/api/teachers', (req, res) => {
  Teacher.find()
    .then((teachers) => res.status(200).json(teachers))
    .catch((error) => res.status(400).json({ error }))
})

app.get('/api/teachers/:id', (req, res) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }))
})

app.put('/api/teachers/:id', (req, res) => {
  Teacher.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() =>
      res.status(200).json({
        message: 'Mise à jour du profil effectuée avec succès!',
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    )
})

app.delete('/api/teachers/:id', (req, res) => {
  Teacher.deleteOne({
    _id: req.params.id,
  })
    .then(() =>
      res.status(200).json({
        message: 'Suppression effectuée avec succès',
      })
    )
    .catch((error) => res.status(400).json({ error }))
})

module.exports = app
