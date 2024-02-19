const bcrypt = require('bcrypt')
const Student = require('./../models/student')
const Teacher = require('./../models/teacher')
const jwt = require('jsonwebtoken')

exports.loginTeacher = (req, res, next) => {
  Teacher.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          code: 'E09',
          description: 'USER-NOT-FOUND',
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log(valid)
          if (!valid) {
            return res
              .status(401)
              .json({ code: 'E06', description: 'PASSWORD-NOT-MATCH' })
          }
          res.status(200).json({
            code: 'S04',
            description: 'LOGGED-SUCCESS',
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          })
        })
        .catch((error) =>
          res.status(400).json({
            error,
            code: 'E07',
            description: 'UNEXCEPTED-ERROR-COMPARE',
          })
        )
    })
    .catch((error) =>
      res
        .status(400)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-GET-DATA' })
    )
}

exports.loginStudent = (req, res, next) => {
  Student.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          code: 'E09',
          description: 'USER-NOT-FOUND',
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ code: 'E06', description: 'PASSWORD-NOT-MATCH' })
          }
          res.status(200).json({
            code: 'S04',
            description: 'LOGGED-SUCCESS',
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          })
        })
        .catch((error) =>
          res.status(400).json({
            error,
            code: 'E07',
            description: 'UNEXCEPTED-ERROR-COMPARE',
          })
        )
    })
    .catch((error) =>
      res
        .status(400)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-GET-DATA' })
    )
}

exports.signupTeacher = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      delete req.body.password
      const teacher = Teacher({
        ...req.body,
        password: hash,
      })
      teacher
        .save()
        .then(() =>
          res
            .status(201)
            .json({ code: 'S01', description: 'RESSOURCE-CREATED' })
        )
        .catch((error) =>
          res.status(400).json({
            error,
            code: 'E02',
            description: 'UNEXCEPTED-ERROR-POST-DATA',
          })
        )
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error, code: 'E05', description: 'UNEXCEPTED-ERROR-HASH' })
    )
}

exports.signupStudent = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      delete req.body.password
      const student = Student({
        ...req.body,
        password: hash,
      })
      student
        .save()
        .then(() =>
          res
            .status(201)
            .json({ code: 'S01', description: 'RESSOURCE-CREATED' })
        )
        .catch((error) =>
          res.status(400).json({
            error,
            code: 'E02',
            description: 'UNEXCEPTED-ERROR-POST-DATA',
          })
        )
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error, code: 'E05', description: 'UNEXCEPTED-ERROR-HASH' })
    )
}

exports.logout = (req, res) => {
  //TODO: Ajouter le token à une liste noire ou
  //TODO: supprimer le token côté client
  // Répondre avec un message indiquant que la déconnexion a réussi
  res.status(200).json({ description: 'LOG-OUT-SUCCESS' })
}
