const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const teacherSchema = mongoose.Schema({
  role: { type: String, required: true },
  courses: { type: [String], required: true },
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  phoneNumber: { type: String },
  isActive: { type: Boolean, default: true },
  registrationDate: { type: Date, default: Date.now },
  registrationToken: { type: String },
  imageUrl: { type: String },
})

teacherSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Teacher', teacherSchema)
