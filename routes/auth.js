const express = require('express')
const router = express.Router()

const authCtrl = require('./../controllers/auth')

router.post('/teachers/login', authCtrl.loginTeacher)
router.post('/teachers/signup', authCtrl.signupTeacher)
router.post('/students/signup', authCtrl.signupStudent)
router.post('/students/login', authCtrl.loginStudent)
router.post('/students/logout', authCtrl.logout)
router.post('/teachers/logout', authCtrl.logout)

module.exports = router
