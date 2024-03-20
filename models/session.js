const mongoose = require('mongoose')

const shedulerCourseSchema = mongoose.Schema({
  code: { type: String, required: true },
  intitule: { type: String, required: true },
  chapitre: { type: String, required: true },
  description: { type: String, required: true },
  enseignant: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  heureDebut: { type: String, required: true },
  heureFin: { type: String, required: true },
  nombreEtudiants: { type: Number, required: true },
})

module.exports = mongoose.model('ShedulerCourse', shedulerCourseSchema)
