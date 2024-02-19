const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  title: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Students' }],
})

module.exports = mongoose.model('Chat', chatSchema)
