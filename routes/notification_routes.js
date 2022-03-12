const express = require('express')
const router = express.Router()

const Notifications = require('../controllers/notification')
const authenticate = require('../common/auth_middleware')

router.get('/',authenticate,Notifications.getNotifications)

router.get('/:id',authenticate,Notifications.getNotificationsListByProfileId)

router.get('/byId/:id',authenticate,Notifications.getNotificationById)

router.post('/:id',authenticate,Notifications.addNotification)

router.patch('/:id',authenticate,Notifications.editNotification)

router.delete('/:id',authenticate,Notifications.deleteNotification)

module.exports = router