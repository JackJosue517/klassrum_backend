const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
  title: { type: String, required: true },
})

module.exports = mongoose.model('Session', sessionSchema)
