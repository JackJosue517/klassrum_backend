const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  fullname: { type: String },
  role: { type: String, required: true },
  courses: { type: Array, required: true },
})

module.exports = mongoose.model('Teacher', teacherSchema)
