const express = require('express')
const router = express.Router()

const Notifications = require('../controllers/notification')
const authenticate = require('../common/auth_middleware')

router.get('/:id',authenticate,Notifications.getNotificationsListByProfileId)

router.get('/:id',authenticate,Notifications.getNotificationById)

module.exports = router