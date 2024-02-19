const Student = require('./../models/student')
const bcrypt = require('bcrypt')
const multer = require('./../middlewares/multer-config')
const fs = require('fs')

exports.getAllStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.status(200).json(students)
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-ERROR-GET-DATA' })
    })
}

exports.getOneStudent = (req, res, next) => {
  Student.find({ _id: req.params.id })
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      res
        .status(404)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-ERROR-GET-DATA' })
    })
}

exports.addNewStudent = (req, res, next) => {
  const studentObject = JSON.parse(req.body.student)
  delete studentObject._userId

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      delete req.body.password
      const student = Student({
        ...studentObject,
        password: hash,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
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
        .status(400)
        .json({ error, code: 'E05', description: 'UNEXCEPTED-ERROR-HASH' })
    )
}

exports.updateStudent = (req, res, next) => {
  const studentObject = req.file
    ? {
        ...JSON.parse(req.body.student),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  delete studentObject._userId
  Student.findOne(
    { _id: req.params.id },
    { ...studentObject, _id: req.params.id }
  )
    .then((student) => {
      if (student._id == req.auth.userId) {
        Student.updateOne(
          { _id: req.params.id },
          { ...studentObject, _id: req.params.id }
        )
        res.status(200).json({ code: 'S02', description: 'RESSOURCE-UPDATED' })
      } else {
        res
          .status(401)
          .json({ error, description: 'UNAUTHORIZED-REQUEST', code: 'E08' })
      }
    })
    .catch((error) =>
      res.status(400).json({
        error,
        code: 'E03',
        description: 'UNEXCEPTED-ERROR-UPDATE-DATA',
      })
    )
}

exports.removeStudent = (req, res, next) => {
  Student.findOne({ _id: req.params.id })
    .then((student) => {
      if (student._id != req.auth.userId) {
        res
          .status(401)
          .json({ error, description: 'UNAUTHORIZED-REQUEST', code: 'E08' })
      } else {
        const filename = student.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Student.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({
                code: 'S02',
                description: 'RESSOURCE-DELETED',
              })
            )
            .catch((error) => {
              res.status(401).json({ error })
            })
        })
      }
    })
    .catch((error) =>
      res.status(400).json({
        error,
        code: 'E04',
        description: 'UNEXCEPTED-ERROR-DELETE-DATA',
      })
    )
}
