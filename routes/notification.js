const express = require('express')
const router = express.Router()

const notificationCtrl = require('./../controllers/notification')

router.post('/one', notificationCtrl.sendToThisDevice)
router.post('/all', notificationCtrl.sendToMultipleDevices)
router.post('/:topic', notificationCtrl.sendToTopics)
router.post('/subscribe/:topic', notificationCtrl.subscribeNewClient)
router.post('/unsubscribe/:topic', notificationCtrl.unsubscribeClient)
router.get('/:idUser', notificationCtrl.getAllNotifications)
router.delete('/:idUser', notificationCtrl.removeAllNotifications)
router.delete('/:idUser/:idNotification', notificationCtrl.removeOneNotification)

module.exports = router
