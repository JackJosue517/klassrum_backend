const teacher = require('./../models/teacher')
const Teacher = require('./../models/teacher')
const bcrypt = require('bcrypt')
const fs = require('fs')

exports.getAllTeachers = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      res.status(200).json(teachers)
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-ERROR-GET-DATA' })
    })
}

exports.getOneTeacher = (req, res, next) => {
  Teacher.find({ _id: req.params.id })
    .then((teacher) => {
      res.status(200).json(teacher)
    })
    .catch((error) => {
      res
        .status(404)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-ERROR-GET-DATA' })
    })
}

exports.addNewTeacher = (req, res, next) => {
  const teacherObject = JSON.parse(req.body.teacher)
  delete teacherObject._userId

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      delete req.body.password
      const teacher = Teacher({
        ...teacherObject,
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

exports.updateTeacher = (req, res, next) => {
  const teacherObject = req.file
    ? {
        ...JSON.parse(req.body.teacher),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  delete teacherObject._userId
  Teacher.findOne(
    { _id: req.params.id },
    { ...teacherObject, _id: req.params.id }
  )
    .then((teacher) => {
      if (teacher._id != req.auth.id) {
        res
          .status(401)
          .json({ error, description: 'UNAUTHORIZED-REQUEST', code: 'E08' })
      } else {
        Teacher.updateOne(
          { _id: req.params.id },
          { ...teacherObject, _id: req.params.id }
        )
          .then(() =>
            res
              .status(200)
              .json({ code: 'S02', description: 'RESSOURCE-UPDATED' })
          )
          .catch((error) => res.status(401).json({ error }))
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

exports.removeTeacher = (req, res, next) => {
  Teacher.findOne({ _id: req.params.id })
    .then((teacher) => {
      if (teacher._id != req.auth.userId) {
        res
          .status(401)
          .json({ error, description: 'UNAUTHORIZED-REQUEST', code: 'E08' })
      } else {
        const filename = teacher.imageUrl.split('/images/')[1]

        fs.unlink(`images/${filename}`, () => {
          Teacher.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({
                code: 'S03',
                description: 'RESSOURCE-DELETED',
              })
            )
            .catch((error) => res.status(401).json({ error }))
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
