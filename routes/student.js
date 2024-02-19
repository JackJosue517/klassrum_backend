const express = require('express')
const router = express.Router()

const studentCtrl = require('./../controllers/student')
const multer = require('./../middlewares/multer-config')

router.get('/', studentCtrl.getAllStudents)
router.get('/:id', studentCtrl.getOneStudent)
router.post('/', multer, studentCtrl.addNewStudent)
router.put('/:id', multer, studentCtrl.updateStudent)
router.delete('/:id', studentCtrl.removeStudent)

module.exports = router
