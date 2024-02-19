const mongoose = require('mongoose')

const resourceSchema = mongoose.Schema({
  fileName: { type: String, required: true, unique: true },
  fileUrl: { type: String, required: true, unique: true },
  fileType: { type: String },
  fileSize: { type: Number },
  uploadDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Resource', resourceSchema)
