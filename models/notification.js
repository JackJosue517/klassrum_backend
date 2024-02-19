const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  type: { type: String, required: true, default: 'NotificationType.info' },
})

module.exports = mongoose.model('Notification', notificationSchema)
