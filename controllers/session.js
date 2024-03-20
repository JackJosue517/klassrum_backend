const ShedulerCourse = require('../models/session')

exports.newSession = async (req, res) => {
  try {
    const shedulerCourse = new ShedulerCourse(req.body)
    await shedulerCourse.save()
    res.status(201).json(shedulerCourse)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
;(exports.deleteSession = getShedulerCourse),
  async (req, res) => {
    try {
      await res.shedulerCourse.remove()
      res.json({ message: 'ShedulerCourse supprimé avec succès' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
;(exports.updateSession = getShedulerCourse),
  async (req, res) => {
    if (req.body.code != null) {
      res.shedulerCourse.code = req.body.code
    }
    // Mettre à jour les autres champs de manière similaire

    try {
      const updatedShedulerCourse = await res.shedulerCourse.save()
      res.json(updatedShedulerCourse)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

exports.getSessions = async (req, res) => {
  try {
    const shedulerCourses = await ShedulerCourse.find()
    res.json(shedulerCourses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
;(exports.getSession = getShedulerCourse),
  (req, res) => {
    res.json(res.shedulerCourse)
  }

// Middleware pour obtenir un ShedulerCourse par ID
async function getShedulerCourse(req, res, next) {
  try {
    const shedulerCourse = await ShedulerCourse.findById(req.params.id)
    if (shedulerCourse == null) {
      return res.status(404).json({ message: 'ShedulerCourse introuvable' })
    }
    res.shedulerCourse = shedulerCourse
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
