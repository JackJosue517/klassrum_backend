const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const studentSchema = mongoose.Schema({
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
  coursesEnrolled: { type: [String] },
  gradeLevel: { type: Number },
  isActive: { type: Boolean, default: true },
  registrationDate: { type: Date, default: Date.now },
  registrationToken: { type: String },
  imageUrl: { type: String },
})

studentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Student', studentSchema)
