const express = require('express')
const router = express.Router()

const teacherCtrl = require('./../controllers/teacher')
const multer = require('./../middlewares/multer-config')

router.get('/', teacherCtrl.getAllTeachers)
router.get('/:id', teacherCtrl.getOneTeacher)
router.post('/', multer, teacherCtrl.addNewTeacher)
router.put('/:id', multer, teacherCtrl.updateTeacher)
router.delete('/:id', teacherCtrl.removeTeacher)

module.exports = router
