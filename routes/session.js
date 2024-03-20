const express = require('express')
const router = express.Router()

const sessionCtrl = require('./../controllers/session')

// Créer un nouveau ShedulerCourse
router.post('/', sessionCtrl.newSession)

// Obtenir tous les ShedulerCourses
router.get('/', sessionCtrl.getSessions)

// Obtenir un seul ShedulerCourse par ID
router.get('/:id')

// Mettre à jour un ShedulerCourse par ID
router.put('/:id', sessionCtrl.updateSession)

// Supprimer un ShedulerCourse par ID
router.delete('/:id', sessionCtrl.deleteSession)

module.exports = router
