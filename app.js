const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

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
  console.log(req.body)
  res.status(201).json({
    status: 'OK',
    msg: 'Nouveau enseignant enregistré avec succès!',
  })
})

app.get('/api/teachers', (req, res) => {
  const teachers = [
    {
      _id: '1',
      firstname: 'HOETOWOU',
      lastname: 'Yaovi',
      fullname: 'M. HOETOWOU Yaovi',
      role: "Enseignant à l'Ecole Polytchnique de Lomé",
      courses: ['Programmation Orienté Objet'],
    },
    {
      _id: '2',
      firstname: 'BARATE',
      lastname: 'Mohamed',
      fullname: 'M. BARATE Mohamed',
      role: "Enseignant à l'Ecole Polytchnique de Lomé",
      courses: ['Utilitaires de dépannage'],
    },
  ]
  res.status(200).json(teachers)
})

module.exports = app
